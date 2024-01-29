import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import HTTP_STATUS from "http-status-codes";
import "./styles.scss";
import moment from "moment";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import { Field, Form, FormSpy } from "react-final-form";
import InputText from "components/Shareable/Input/InputText";
import AutoCompleteField from "components/Shareable/AutoCompleteField";
import { getNomesDistribuidores } from "services/logistica.service";
import SelectSelecione from "components/Shareable/SelectSelecione";
import {
  cadastraCronograma,
  editaCronograma,
  getCronograma,
  getRascunhos,
  getUnidadesDeMedidaLogistica,
} from "services/cronograma.service";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import { useHistory } from "react-router-dom";
import { CRONOGRAMA_ENTREGA, PRE_RECEBIMENTO } from "configs/constants";
import Rascunhos from "../RascunhosCronograma";
import "../CronogramaEntrega/styles.scss";
import { required } from "helpers/fieldValidators";
import { exibeError, formataMilhar } from "helpers/utilities";
import { getEmpresasCronograma } from "services/terceirizada.service";
import { getListaCompletaProdutosLogistica } from "services/produto.service";
import { ModalAssinaturaUsuario } from "components/Shareable/ModalAssinaturaUsuario";
import { MSG_SENHA_INVALIDA } from "components/screens/helper";
import FormEtapa from "../../../PreRecebimento/FormEtapa";
import { onChangeEtapas } from "components/PreRecebimento/FormEtapa/helper";
import FormRecebimento from "components/PreRecebimento/FormRecebimento";
import { getListaTiposEmbalagens } from "../../../../services/qualidade.service";
import { CADASTRO_CRONOGRAMA, EDITAR } from "../../../../configs/constants";

export default () => {
  const [carregando, setCarregando] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [collapse, setCollapse] = useState([]);
  const [produtosOptions, setProdutosOptions] = useState([{}]);
  const [unidadesMedidaOptions, setUnidadesMedidaOptions] = useState([{}]);
  const [tiposEmbalagemOptions, setTiposEmbalagemOptions] = useState([{}]);
  const [empresaSelecionada, setEmpresaSelecionada] = useState(undefined);
  const [contratoSelecionado, setContratoSelecionado] = useState(undefined);
  const [unidadeSelecionada, setUnidadeSelecionada] = useState({});
  const [etapas, setEtapas] = useState([{}]);
  const [recebimentos, setRecebimentos] = useState([{}]);
  const [armazens, setArmazens] = useState([{}]);
  const [fornecedores, setFornecedores] = useState([{}]);
  const history = useHistory();
  const [listaRascunhos, setListaRascunhos] = useState(null);
  const [duplicados, setDuplicados] = useState([]);
  const [restante, setRestante] = useState(undefined);
  const [edicao, setEdicao] = useState(false);
  const [cronograma, setCronograma] = useState({});
  const [etapasValues, setEtapasValues] = useState({});
  const [recebimentosValues, setRecebimentosValues] = useState({});

  const getRascunhosAsync = async () => {
    try {
      const response = await getRascunhos();
      if (response.status === HTTP_STATUS.OK) {
        setListaRascunhos(response.data.results);
      }
    } catch (erro) {
      setListaRascunhos();
      toastError("Ocorreu um erro ao tentar carregar a lista de rascunhos.");
    }
  };

  const onSubmit = () => {
    setShowModal(true);
  };

  const getEmpresaFiltrado = (empresa) => {
    if (empresa) {
      const reg = new RegExp(empresa, "iu");
      return fornecedores.filter((a) => reg.test(a.value));
    }
    return fornecedores;
  };

  const toggleCollapse = (index) => {
    setCollapse({
      [index]: !collapse[index],
    });
  };

  const formataPayload = (values, rascunho) => {
    let payload = {};
    payload.cadastro_finalizado = !rascunho;
    payload.contrato = values.contrato;
    payload.empresa = empresaSelecionada.uuid;
    payload.produto = values.produto;
    payload.qtd_total_programada = values.quantidade_total?.replaceAll(".", "");
    payload.unidade_medida = values.unidade_medida;
    payload.armazem = values.armazem;
    payload.tipo_embalagem = values.tipo_embalagem;

    payload.etapas = etapas.map((etapa, index) => ({
      numero_empenho: values[`empenho_${index}`],
      etapa: values[`etapa_${index}`],
      parte: values[`parte_${index}`],
      data_programada: values[`data_programada_${index}`]
        ? moment(values[`data_programada_${index}`], "DD/MM/YYYY").format(
            "YYYY-MM-DD"
          )
        : undefined,
      quantidade: values[`quantidade_${index}`]?.replaceAll(".", ""),
      total_embalagens: values[`total_embalagens_${index}`],
    }));

    payload.programacoes_de_recebimento = recebimentos.map((etapa, index) => ({
      data_programada: values[`data_recebimento_${index}`],
      tipo_carga: values[`tipo_recebimento_${index}`],
    }));
    return payload;
  };

  const salvarCronograma = async (values, rascunho) => {
    setCarregando(true);
    let payload = formataPayload(values, rascunho);
    if (!rascunho) {
      payload["password"] = values["password"];
    }
    try {
      let response = edicao
        ? await editaCronograma(payload, cronograma.uuid)
        : await cadastraCronograma(payload);
      if (response.status === 201 || response.status === 200) {
        if (rascunho) {
          toastSuccess("Rascunho salvo com sucesso!");
          history.push(
            `/${PRE_RECEBIMENTO}/${CADASTRO_CRONOGRAMA}/${EDITAR}/?uuid=${response.data.uuid}`
          );
        } else {
          toastSuccess(
            "Cadastro de Cronograma salvo e enviado para aprovação!"
          );
          history.push(`/${PRE_RECEBIMENTO}/${CRONOGRAMA_ENTREGA}`);
        }
      } else {
        toastError("Ocorreu um erro ao salvar o Cronograma");
        setCarregando(false);
      }
    } catch (error) {
      if (error.response.status === 401) {
        toastError(MSG_SENHA_INVALIDA);
        setCarregando(false);
      } else {
        exibeError(error, "Ocorreu um erro ao salvar o Cronograma");
      }
    }
  };

  const validaRascunho = (values) => {
    return !values.contrato;
  };
  const lengthOrUnderfined = (value) => {
    let valor = value ? value.toString() : undefined;
    return valor && valor.length > 0 ? valor : undefined;
  };

  const getDadosCronograma = async (uuid) => {
    try {
      const responseCronograma = await getCronograma(uuid);
      if (responseCronograma.status === HTTP_STATUS.OK) {
        const programacoes_de_recebimento =
          responseCronograma.data.programacoes_de_recebimento.reverse();
        setEtapas(responseCronograma.data.etapas);
        setRecebimentos(programacoes_de_recebimento);

        const cronogramaValues = {};
        const crono = responseCronograma.data;
        setEmpresaSelecionada(crono.empresa);
        cronogramaValues["empresa"] = lengthOrUnderfined(
          crono.empresa.nome_fantasia
        );
        setContratoSelecionado(crono.contrato);
        cronogramaValues["contrato"] = lengthOrUnderfined(crono.contrato.uuid);
        cronogramaValues["numero_processo"] = lengthOrUnderfined(
          crono.contrato.processo
        );
        cronogramaValues["quantidade_total"] = lengthOrUnderfined(
          formataMilhar(crono.qtd_total_programada)
        );
        cronogramaValues["unidade_medida"] = lengthOrUnderfined(
          crono.unidade_medida ? crono.unidade_medida.uuid : undefined
        );
        cronogramaValues["produto"] = lengthOrUnderfined(
          crono.produto ? crono.produto.uuid : undefined
        );
        cronogramaValues["armazem"] = lengthOrUnderfined(
          crono.armazem ? crono.armazem.uuid : undefined
        );
        cronogramaValues["tipo_embalagem"] = lengthOrUnderfined(
          crono.tipo_embalagem?.uuid
        );
        cronogramaValues["numero"] = crono.numero ? crono.numero : undefined;
        cronogramaValues["uuid"] = crono.uuid;
        setCronograma(cronogramaValues);

        const etapaValues = {};
        responseCronograma.data.etapas.forEach((etapa, i) => {
          etapaValues[`empenho_${i}`] = lengthOrUnderfined(
            etapa.numero_empenho
          );
          etapaValues[`etapa_${i}`] = lengthOrUnderfined(etapa.etapa);
          etapaValues[`parte_${i}`] = lengthOrUnderfined(etapa.parte);
          etapaValues[`data_programada_${i}`] = lengthOrUnderfined(
            etapa.data_programada
          );
          etapaValues[`quantidade_${i}`] = lengthOrUnderfined(etapa.quantidade);
          etapaValues[`total_embalagens_${i}`] = lengthOrUnderfined(
            etapa.total_embalagens
          );
        });
        setEtapasValues(etapaValues);

        const recebimentoValues = {};
        programacoes_de_recebimento.forEach((recebimento, i) => {
          recebimentoValues[`data_recebimento_${i}`] = lengthOrUnderfined(
            recebimento.data_programada
          );
          recebimentoValues[`tipo_recebimento_${i}`] = lengthOrUnderfined(
            recebimento.tipo_carga
          );
        });
        setRecebimentosValues(recebimentoValues);
        setCarregando(false);
      }
    } catch (e) {
      toastError("Ocorreu um erro ao carregar o Cronograma");
    }
  };

  const getOpcoesContrato = () => {
    if (!empresaSelecionada) return [];
    return empresaSelecionada.contratos.map((contrato) => ({
      nome: contrato.numero,
      uuid: contrato.uuid,
    }));
  };

  const selecionaEmpresa = (uuid_empresa) => {
    if (!empresaSelecionada || empresaSelecionada.uuid !== uuid_empresa) {
      let fornecedor = fornecedores.find((f) => f.value === uuid_empresa);
      setEmpresaSelecionada(fornecedor);
    }
  };

  const selecionaContrato = (values) => {
    let uuid_contrato = values.contrato;
    if (!contratoSelecionado || contratoSelecionado.uuid !== uuid_contrato) {
      let contrato = empresaSelecionada.contratos.find(
        (c) => c.uuid === uuid_contrato
      );
      values.numero_processo = contrato.processo;
      setContratoSelecionado(contrato);
    }
  };

  const selecionaUnidade = (uuid_unidade) => {
    if (!unidadeSelecionada || unidadeSelecionada.uuid !== uuid_unidade) {
      let unidade = unidadesMedidaOptions.find((u) => u.uuid === uuid_unidade);
      setUnidadeSelecionada(unidade);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");

    if (uuid) {
      setEdicao(true);
    }

    const buscaArmazens = async () => {
      const response = await getNomesDistribuidores();
      setArmazens(
        response.data.results.map((armazem) => ({
          nome: armazem.nome_fantasia,
          uuid: armazem.uuid,
        }))
      );
    };

    const buscaFornecedores = async () => {
      const response = await getEmpresasCronograma();
      setFornecedores(
        response.data.results.map((forn) => ({
          uuid: forn.uuid,
          value: forn.nome_fantasia,
          contratos: forn.contratos,
        }))
      );
    };

    const buscaProdutos = async () => {
      const response = await getListaCompletaProdutosLogistica();
      setProdutosOptions(response.data.results);
    };

    const buscaUnidadesMedida = async () => {
      const response = await getUnidadesDeMedidaLogistica();
      setUnidadesMedidaOptions(response.data.results);
    };

    const buscaTiposEmbalagem = async () => {
      const response = await getListaTiposEmbalagens();
      setTiposEmbalagemOptions(response.data.results);
    };

    const carregaPagina = async () => {
      setCarregando(true);
      await Promise.all([
        buscaArmazens(),
        buscaFornecedores(),
        buscaProdutos(),
        buscaUnidadesMedida(),
        buscaTiposEmbalagem(),
        getRascunhosAsync(),
      ]);
      if (uuid) {
        await getDadosCronograma(uuid);
      }
      setCarregando(false);
    };

    carregaPagina();
  }, []);

  const onChangeFormSpy = async (changes) => {
    if (changes.values.empresa) selecionaEmpresa(changes.values.empresa);
    if (changes.values.contrato) selecionaContrato(changes.values);
    if (changes.values.unidade_medida)
      selecionaUnidade(changes.values.unidade_medida);

    onChangeEtapas(changes, etapas, setRestante, setDuplicados);
  };
  return (
    <>
      {!edicao && <Rascunhos listaRascunhos={listaRascunhos} />}
      <Spin tip="Carregando..." spinning={carregando}>
        <div className="card mt-3 card-cadastro-cronograma">
          <div className="card-body cadastro-cronograma">
            <Form
              onSubmit={onSubmit}
              initialValues={{
                ...cronograma,
                ...etapasValues,
                ...recebimentosValues,
              }}
              validate={() => {}}
              render={({ form, handleSubmit, values, errors }) => (
                <form onSubmit={handleSubmit}>
                  <FormSpy
                    subscription={{ values: true, active: true, valid: true }}
                    onChange={(changes) => onChangeFormSpy(changes)}
                  />
                  <div className="row">
                    <div className="col-5">
                      <Field
                        component={AutoCompleteField}
                        options={getEmpresaFiltrado(values.empresa)}
                        label="Pesquisar Empresa"
                        name="empresa"
                        required
                        validate={required}
                        placeholder={"Selecione uma Empresa Cadastrada"}
                        esconderIcone
                      />
                    </div>
                    {edicao && (
                      <div className="col-6 text-end">
                        <p>
                          <b>Nº do Cronograma: </b>

                          <span className="head-green">
                            {cronograma.numero}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="row">
                    <div className="col-8">
                      <Field
                        component={SelectSelecione}
                        naoDesabilitarPrimeiraOpcao
                        options={getOpcoesContrato()}
                        label="Nº do Contrato"
                        name="contrato"
                        required
                        validate={required}
                        placeholder={"Selecione um Contrato"}
                      />
                    </div>
                    <div className="col-4">
                      <Field
                        component={InputText}
                        label="Nº do Processo SEI - Contratos"
                        name="numero_processo"
                        className="input-busca-produto"
                        validate={required}
                        disabled={true}
                      />
                    </div>
                  </div>

                  {values.empresa && values.contrato && (
                    <div className="accordion mt-1" id="accordionCronograma">
                      <div className="card mt-3">
                        <div
                          className={`card-header card-tipo`}
                          id={`heading_1`}
                        >
                          <div className="row card-header-content">
                            <span className="col-11 nome-alimento">
                              Dados do Produto
                            </span>
                            <div className="col-1 align-self-center">
                              <button
                                onClick={() => toggleCollapse(1)}
                                className="btn btn-link btn-block text-end px-0"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse_1`}
                                aria-expanded="true"
                                aria-controls={`collapse_1`}
                              >
                                <span className="span-icone-toogle">
                                  <i
                                    className={
                                      collapse[1]
                                        ? "fas fa-chevron-up"
                                        : "fas fa-chevron-down"
                                    }
                                  />
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>

                        <div
                          id={`collapse_1`}
                          className="collapse"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionCronograma"
                        >
                          <div className="card-body">
                            <div className="row">
                              <div className="col-6">
                                <Field
                                  component={SelectSelecione}
                                  naoDesabilitarPrimeiraOpcao
                                  options={produtosOptions}
                                  label="Produto"
                                  name="produto"
                                  placeholder={"Selecione um Produto"}
                                  required
                                />
                              </div>
                              <div className="col-3">
                                <Field
                                  component={InputText}
                                  label="Quantidade Total Programada"
                                  name="quantidade_total"
                                  className="input-busca-produto"
                                  disabled={false}
                                  agrupadorMilhar
                                  required
                                  placeholder="Informe a Quantidade Total"
                                />
                              </div>
                              <div className="col-3">
                                <Field
                                  component={SelectSelecione}
                                  naoDesabilitarPrimeiraOpcao
                                  options={unidadesMedidaOptions}
                                  label="Unidade de Medida"
                                  name="unidade_medida"
                                  required
                                  validate={required}
                                  placeholder={"Selecione a Unidade"}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-6">
                                <Field
                                  component={SelectSelecione}
                                  naoDesabilitarPrimeiraOpcao
                                  options={armazens}
                                  label="Armazém"
                                  name="armazem"
                                  required
                                  validate={required}
                                  placeholder={"Selecione o Armazém"}
                                />
                              </div>
                              <div className="col-3">
                                <Field
                                  component={SelectSelecione}
                                  naoDesabilitarPrimeiraOpcao
                                  options={tiposEmbalagemOptions}
                                  label="Tipo de Embalagem"
                                  name="tipo_embalagem"
                                  required
                                  validate={required}
                                  placeholder={"Selecione a Embalagem"}
                                />
                              </div>
                            </div>
                            <div className="subtitulo">
                              Cronograma das Entregas
                            </div>
                            <hr className="linha-verde" />
                            <FormEtapa
                              etapas={etapas}
                              setEtapas={setEtapas}
                              values={values}
                              errors={errors}
                              duplicados={duplicados}
                              restante={restante}
                              unidadeMedida={unidadeSelecionada}
                            />
                          </div>
                        </div>
                      </div>

                      <FormRecebimento
                        values={values}
                        form={form}
                        etapas={etapas}
                        recebimentos={recebimentos}
                        setRecebimentos={setRecebimentos}
                      />
                    </div>
                  )}

                  <hr />

                  <div className="mt-4 mb-4">
                    <Botao
                      texto="Assinar e Enviar Cronograma"
                      type={BUTTON_TYPE.SUBMIT}
                      style={BUTTON_STYLE.GREEN}
                      className="float-end ms-3"
                    />
                    <Botao
                      texto="Salvar Rascunho"
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      className="float-end ms-3"
                      onClick={() => salvarCronograma(values, true)}
                      disabled={validaRascunho(values)}
                    />
                  </div>
                  <ModalAssinaturaUsuario
                    titulo="Assinar Cronograma"
                    texto="Você confirma a assinatura digital deste cronograma de entrega"
                    show={showModal}
                    loading={carregando}
                    handleClose={() => {
                      setShowModal(false);
                      setCarregando(false);
                    }}
                    handleSim={(password) => {
                      values["password"] = password;
                      salvarCronograma(values, false);
                    }}
                  />
                </form>
              )}
            />
          </div>
        </div>
      </Spin>
    </>
  );
};
