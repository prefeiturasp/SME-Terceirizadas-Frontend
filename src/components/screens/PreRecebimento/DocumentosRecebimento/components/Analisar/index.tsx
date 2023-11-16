import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import moment from "moment";
import "./styles.scss";
import {
  PAINEL_DOCUMENTOS_RECEBIMENTO,
  PRE_RECEBIMENTO,
} from "configs/constants";
import { useHistory } from "react-router-dom";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
} from "../../../../../Shareable/Botao/constants";
import Botao from "../../../../../Shareable/Botao";
import SelectSelecione from "components/Shareable/SelectSelecione";
import {
  analisaDocumentoRecebimento,
  analisaDocumentoRecebimentoRascunho,
  detalharDocumentoParaAnalise,
} from "services/documentosRecebimento.service";
import { getNomesEAbreviacoesUnidadesMedida } from "services/qualidade.service";
import { getListaLaboratoriosCredenciados } from "services/laboratorio.service";
import InputText from "components/Shareable/Input/InputText";
import {
  DocumentosRecebimentoParaAnalise,
  TiposDocumentos,
  UnidadeMedidaSimples,
} from "interfaces/pre_recebimento.interface";
import { required } from "helpers/fieldValidators";
import { deletaValues } from "helpers/formHelper";
import { PRAZO_RECEBIMENTO_OPTIONS } from "../../constants";
import { Field, Form } from "react-final-form";
import { InputComData } from "components/Shareable/DatePicker";
import ModalGenerico from "./components/ModalGenerico";
import ModalCorrecao from "./components/ModalCorrecao";
import { AnaliseDocumentoPayload, OptionsGenerico } from "../../interfaces";
import createDecorator from "final-form-calculate";
import { exibeError, formataMilhar } from "helpers/utilities";
import {
  toastError,
  toastSuccess,
} from "../../../../../Shareable/Toast/dialogs";
import ArquivosTipoRecebimento from "../ArquivosTipoDocumento";
import OutrosDocumentos from "../OutrosDocumentos";

export default () => {
  const history = useHistory();

  const [carregando, setCarregando] = useState(true);
  const [objeto, setObjeto] = useState<DocumentosRecebimentoParaAnalise>(
    {} as DocumentosRecebimentoParaAnalise
  );
  const [laudo, setLaudo] = useState<TiposDocumentos>({} as TiposDocumentos);
  const [showModalCancelar, setShowModalCancelar] = useState(false);
  const [showModalSalvar, setShowModalSalvar] = useState(false);
  const [showModalAprovar, setShowModalAprovar] = useState(false);
  const [showModalCorrecao, setShowModalCorrecao] = useState(false);
  const [prazos, setPrazos] = useState([true]);
  const [unidades, setUnidades] = useState<OptionsGenerico[]>([]);
  const [laboratorios, setLaboratorios] = useState<OptionsGenerico[]>([]);
  const [initialValues, setInitialValues] = useState<AnaliseDocumentoPayload>(
    {} as AnaliseDocumentoPayload
  );

  const voltarPagina = () =>
    history.push(`/${PRE_RECEBIMENTO}/${PAINEL_DOCUMENTOS_RECEBIMENTO}`);

  const carregarDados = async (): Promise<void> => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    const response = await detalharDocumentoParaAnalise(uuid);

    const objeto = response.data;

    const laudoIndex = objeto.tipos_de_documentos.findIndex(
      (tipo) => tipo.tipo_documento === "LAUDO"
    );
    const laudo = objeto.tipos_de_documentos.splice(laudoIndex, 1)[0];

    setLaudo(laudo);
    setObjeto(objeto);
    geraInitialValues(objeto);
  };

  const carregarUnidadesMedida = async (): Promise<void> => {
    const response = await getNomesEAbreviacoesUnidadesMedida();

    const objeto: OptionsGenerico[] = response.data.results.map(
      (unidade: UnidadeMedidaSimples) => ({
        uuid: unidade.uuid,
        nome: unidade.nome,
      })
    );

    setUnidades(objeto);
  };

  const carregarLaboratorios = async (): Promise<void> => {
    const response = await getListaLaboratoriosCredenciados();

    const objeto: OptionsGenerico[] = response.data.results;

    setLaboratorios(objeto);
  };

  const adicionaPrazo = (): void => {
    setPrazos([...prazos, true]);
  };

  const deletaPrazo = (
    values: AnaliseDocumentoPayload,
    index: number
  ): void => {
    let listaChaves = [
      "data_fabricacao",
      "prazo_maximo",
      "data_maxima",
      "justificativa",
    ];

    deletaValues(prazos, listaChaves, values, index);

    let prazosNovo = [...prazos];
    prazosNovo.splice(index, 1);
    setPrazos(prazosNovo);
  };

  const dataMaxima = createDecorator(
    {
      field: /data_fabricacao_\d/,
      updates: (value, name, allValues) => {
        let index = name.split("_")[2];
        calculaDataMaxima(allValues as AnaliseDocumentoPayload, Number(index));
        return {};
      },
    },
    {
      field: /prazo_maximo_\d/,
      updates: (value, name, allValues) => {
        let index = name.split("_")[2];
        return calculaDataMaxima(
          allValues as AnaliseDocumentoPayload,
          Number(index)
        );
      },
    }
  );

  const calculaDataMaxima = (
    values: AnaliseDocumentoPayload,
    index: number
  ): AnaliseDocumentoPayload => {
    let data = values[`data_fabricacao_${index}`];
    let prazo = values[`prazo_maximo_${index}`];
    if (data && prazo && prazo !== "OUTRO") {
      let novaData = moment(data, "DD/MM/YYYY").add(prazo, "days");
      values[`data_maxima_${index}`] = novaData.format("DD/MM/YYYY");
      setCarregando(true);
      setCarregando(false);
    }
    return values;
  };

  const formataPayload = (
    values: AnaliseDocumentoPayload
  ): AnaliseDocumentoPayload => {
    let payload: AnaliseDocumentoPayload = {
      numero_empenho: values.numero_empenho,
      laboratorio: values.laboratorio,
      quantidade_laudo: formataMilhar(values.quantidade_laudo),
      unidade_medida: values.unidade_medida,
      data_fabricacao_lote: values.data_fabricacao_lote,
      validade_produto: values.validade_produto,
      data_final_lote: values.data_final_lote,
      saldo_laudo: formataMilhar(values.saldo_laudo),
      datas_fabricacao_e_prazos: prazos.map((prazo, index) => ({
        data_fabricacao: values[`data_fabricacao_${index}`],
        prazo_maximo_recebimento: values[`prazo_maximo_${index}`],
        justificativa: values[`justificativa_${index}`],
      })),
      correcao_solicitada: values.correcao_solicitada,
    };

    return payload;
  };

  const salvarRascunho = async (
    values: AnaliseDocumentoPayload
  ): Promise<void> => {
    let payload = formataPayload(values);
    try {
      let response = await analisaDocumentoRecebimentoRascunho(
        payload,
        objeto.uuid
      );
      if (response.status === 201 || response.status === 200) {
        setCarregando(false);
        toastSuccess("Alterações salvas com sucesso!");
        setShowModalSalvar(false);
        voltarPagina();
      } else {
        toastError("Ocorreu um erro ao salvar as alterações");
        setCarregando(false);
      }
    } catch (error) {
      exibeError(error, "Ocorreu um erro ao salvar as alterações");
    }
  };

  const salvarAnalise = async (
    values: AnaliseDocumentoPayload
  ): Promise<void> => {
    let payload = formataPayload(values);
    try {
      let response = await analisaDocumentoRecebimento(payload, objeto.uuid);
      if (response.status === 201 || response.status === 200) {
        setCarregando(false);
        toastSuccess(
          values.correcao_solicitada
            ? "Correções solicitadas ao Fornecedor com sucesso!"
            : "Documentos aprovados com sucesso!"
        );
        setShowModalAprovar(false);
        setShowModalCorrecao(false);
        voltarPagina();
      } else {
        toastError("Ocorreu um erro ao salvar a Analise");
        setCarregando(false);
      }
    } catch (error) {
      exibeError(error, "Ocorreu um erro ao salvar a Analise");
    }
  };

  const geraInitialValues = (doc: DocumentosRecebimentoParaAnalise): void => {
    let newPrazos = [];
    let iniciais = {
      numero_empenho: doc.numero_empenho ? doc.numero_empenho : undefined,
      laboratorio: doc.laboratorio,
      quantidade_laudo: doc.quantidade_laudo?.toString(),
      unidade_medida: doc.unidade_medida,
      data_fabricacao_lote: doc.data_fabricacao_lote
        ? doc.numero_empenho
        : undefined,
      validade_produto: doc.validade_produto ? doc.validade_produto : undefined,
      data_final_lote: doc.data_final_lote ? doc.data_final_lote : undefined,
      saldo_laudo: doc.saldo_laudo?.toString(),
    };
    doc.datas_fabricacao_e_prazos?.map((obj, index) => {
      iniciais[`data_fabricacao_${index}`] = obj.data_fabricacao;
      iniciais[`prazo_maximo_${index}`] = obj.prazo_maximo_recebimento;
      iniciais[`justificativa_${index}`] = obj.justificativa;
      newPrazos.push(true);
    });
    if (newPrazos.length > prazos.length) setPrazos(newPrazos);
    setInitialValues(iniciais as AnaliseDocumentoPayload);
  };

  useEffect(() => {
    (async () => {
      setCarregando(true);
      await carregarDados();
      await carregarUnidadesMedida();
      await carregarLaboratorios();
      setCarregando(false);
    })();
  }, []);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-analisar-documentos-recebimento">
        <div className="card-body">
          <Form
            onSubmit={() => {}}
            initialValues={initialValues}
            decorators={[dataMaxima]}
            render={({ handleSubmit, values, errors }) => (
              <form onSubmit={handleSubmit}>
                <ModalGenerico
                  show={showModalCancelar}
                  handleSim={() => {
                    voltarPagina();
                  }}
                  handleClose={() => {
                    setShowModalCancelar(false);
                  }}
                  loading={carregando}
                  titulo={<>Cancelar Alterações</>}
                  texto={
                    <>
                      Deseja <strong>cancelar</strong> as alterações realizadas
                      no documento de recebimento?
                    </>
                  }
                />
                <ModalGenerico
                  show={showModalSalvar}
                  handleSim={() => {
                    salvarRascunho(values as AnaliseDocumentoPayload);
                  }}
                  handleClose={() => {
                    setShowModalSalvar(false);
                  }}
                  loading={carregando}
                  titulo={<>Salvar Alterações</>}
                  texto={
                    <>
                      Deseja salvar as alterações realizadas no documento de
                      recebimento?
                    </>
                  }
                />
                <ModalCorrecao
                  show={showModalCorrecao}
                  handleSim={() => {
                    salvarAnalise(values as AnaliseDocumentoPayload);
                  }}
                  handleClose={() => {
                    delete values["correcao_solicitada"];
                    setShowModalCorrecao(false);
                  }}
                  loading={carregando}
                  errors={errors}
                />
                <ModalGenerico
                  show={showModalAprovar}
                  handleSim={() => {
                    salvarAnalise(values as AnaliseDocumentoPayload);
                  }}
                  handleClose={() => {
                    setShowModalAprovar(false);
                  }}
                  loading={carregando}
                  titulo={<>Aprovar Documentos</>}
                  texto={
                    <>
                      Deseja aprovar os Documentos de Recebimento referente ao
                      Laudo <strong>Nº {objeto.numero_laudo}</strong>?
                    </>
                  }
                />

                <div className="subtitulo">Dados Gerais</div>
                <div className="row">
                  <div className="col-12">
                    <InputText
                      label="Fornecedor"
                      valorInicial={objeto.fornecedor}
                      required
                      disabled={true}
                    />
                  </div>
                  <div className="col-6">
                    <InputText
                      label="Nº do Cronograma"
                      valorInicial={objeto.numero_cronograma}
                      required
                      disabled={true}
                    />
                  </div>
                  <div className="col-6">
                    <InputText
                      label="Nº do Pregão/Chamada Pública"
                      valorInicial={objeto.pregao_chamada_publica}
                      required
                      disabled={true}
                    />
                  </div>
                  <div className="col-6">
                    <InputText
                      label="Nome do Produto"
                      valorInicial={objeto.nome_produto}
                      required
                      disabled={true}
                    />
                  </div>
                  <div className="col-6">
                    <InputText
                      label="Nº do Processo SEI"
                      valorInicial={objeto.numero_sei}
                      required
                      disabled={true}
                    />
                  </div>
                  <div className="col-6">
                    <InputText
                      label="Nº do Laudo"
                      valorInicial={objeto.numero_laudo}
                      required
                      disabled={true}
                    />
                  </div>
                  <div className="col-6">
                    <Field
                      component={InputText}
                      label="Nº do Empenho"
                      name={`numero_empenho`}
                      placeholder="Digite o Nº do Empenho"
                      required
                      validate={required}
                      proibeLetras
                    />
                  </div>
                </div>
                <div className="subtitulo-documento">
                  Laudo enviado pelo Fornecedor:
                </div>
                <ArquivosTipoRecebimento lista={laudo} />

                <hr />

                <div className="subtitulo">Dados do Laudo</div>

                <div className="row">
                  <div className="col-6">
                    <Field
                      component={SelectSelecione}
                      naoDesabilitarPrimeiraOpcao
                      options={laboratorios}
                      label="Nome do Laboratório"
                      name={`laboratorio`}
                      placeholder="Selecione um Laboratório"
                      className="input-analise"
                      required
                      validate={required}
                    />
                  </div>
                  {values["laboratorio"] && (
                    <div className="col-5 aviso-laboratorio">
                      <i className="fas fa-exclamation-triangle" />
                      <span>
                        Não se esqueça de verificar se o Laboratório é
                        credenciado em Órgãos ou Universidades Oficiais.
                      </span>
                    </div>
                  )}
                </div>

                <div className="row">
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="Quantidade do Laudo"
                      name={`quantidade_laudo`}
                      placeholder="Digite a Quantidade"
                      required
                      validate={required}
                      agrupadorMilhar
                    />
                  </div>
                  <div className="col-4">
                    <Field
                      component={SelectSelecione}
                      naoDesabilitarPrimeiraOpcao
                      options={unidades}
                      label="Unidade de Medida"
                      name={`unidade_medida`}
                      placeholder="Selecione uma Unidade"
                      className="input-analise"
                      required
                      validate={required}
                    />
                  </div>
                  <div className="col-4">
                    <Field
                      component={InputComData}
                      label="Data Fabricação do Lote"
                      name={`data_fabricacao_lote`}
                      placeholder="Selecione uma Data"
                      className="input-analise"
                      required
                      validate={required}
                      minDate={null}
                      maxDate={new Date()}
                    />
                  </div>
                  <div className="col-4">
                    <Field
                      component={InputComData}
                      label="Validade do Produto"
                      name={`validade_produto`}
                      placeholder="Selecione uma Data"
                      className="input-analise"
                      required
                      validate={required}
                      minDate={new Date()}
                    />
                  </div>
                  <div className="col-4">
                    <Field
                      component={InputComData}
                      label="Data Final do Laudo"
                      name={`data_final_lote`}
                      placeholder="Selecione uma Data"
                      className="input-analise"
                      required
                      validate={required}
                      minDate={new Date()}
                    />
                  </div>
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="Saldo do Laudo"
                      name={`saldo_laudo`}
                      placeholder="Digite o Saldo do Lote"
                      required
                      validate={required}
                      agrupadorMilhar
                    />
                  </div>

                  {prazos.map((prazo, index) => (
                    <>
                      <div className="col-4">
                        <Field
                          component={InputComData}
                          label="Data de Fabricação"
                          name={`data_fabricacao_${index}`}
                          placeholder="Selecione uma Data"
                          className="input-analise"
                          required
                          validate={required}
                          minDate={null}
                          maxDate={new Date()}
                        />
                      </div>
                      <div className="col-4">
                        <Field
                          component={SelectSelecione}
                          naoDesabilitarPrimeiraOpcao
                          options={PRAZO_RECEBIMENTO_OPTIONS}
                          className="input-analise"
                          label="Prazo Máximo para Recebimento"
                          name={`prazo_maximo_${index}`}
                          placeholder="Selecione um prazo"
                          required
                          validate={required}
                        />
                      </div>

                      {values[`prazo_maximo_${index}`] !== "OUTRO" && (
                        <div className="col-3">
                          <InputText
                            label="Data Máxima de Recebimento"
                            placeholder="Selecione um prazo"
                            valorInicial={values[`data_maxima_${index}`]}
                            required
                            disabled={true}
                          />
                        </div>
                      )}

                      <div className="col-1 btn-acao">
                        {index === 0 ? (
                          <Botao
                            texto="+"
                            type={BUTTON_TYPE.BUTTON}
                            style={BUTTON_STYLE.GREEN_OUTLINE}
                            className="input-analise"
                            onClick={() => adicionaPrazo()}
                          />
                        ) : (
                          <Botao
                            texto=""
                            icon="fas fa-trash"
                            type={BUTTON_TYPE.BUTTON}
                            style={BUTTON_STYLE.GREEN_OUTLINE}
                            className="input-analise"
                            onClick={() =>
                              deletaPrazo(
                                values as AnaliseDocumentoPayload,
                                index
                              )
                            }
                          />
                        )}
                      </div>
                      {values[`prazo_maximo_${index}`] === "OUTRO" && (
                        <div className="col-12">
                          <Field
                            component={InputText}
                            label="Justifique Outro prazo máximo para Recebimento"
                            name={`justificativa_${index}`}
                            placeholder="Insira sua Justificativa"
                            required
                            validate={required}
                          />
                        </div>
                      )}
                    </>
                  ))}
                </div>

                <hr />

                <OutrosDocumentos documento={objeto} />

                <hr />

                <div className="mt-4 mb-4">
                  <Botao
                    texto="Aprovar Documentos"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN}
                    className="float-right ml-3"
                    icon="fas fa-check"
                    disabled={Object.keys(errors).length > 0}
                    onClick={() => setShowModalAprovar(true)}
                  />
                  <Botao
                    texto="Solicitar Correção"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.ORANGE_OUTLINE}
                    icon="fas fa-pen"
                    className="float-right ml-3"
                    disabled={Object.keys(errors).length > 0}
                    onClick={() => setShowModalCorrecao(true)}
                  />
                  <Botao
                    texto="Salvar Alterações"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    className="float-right ml-3"
                    onClick={() => setShowModalSalvar(true)}
                  />
                  <Botao
                    texto="Cancelar"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    className="float-right ml-3"
                    onClick={() => setShowModalCancelar(true)}
                  />
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </Spin>
  );
};
