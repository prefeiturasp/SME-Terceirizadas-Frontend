import React, { ChangeEvent, useEffect, useState } from "react";
import { Spin } from "antd";
import "./styles.scss";
import { Field, Form } from "react-final-form";
import AutoCompleteSelectField from "components/Shareable/AutoCompleteSelectField";
import Select from "components/Shareable/Select";
import { formataMilharDecimal } from "helpers/utilities";
import { getListaFiltradaAutoCompleteSelect } from "helpers/autoCompleteSelect";
import { required } from "../../../../../../helpers/fieldValidators";
import InputText from "components/Shareable/Input/InputText";
import { InputComData } from "components/Shareable/DatePicker";
import {
  getListaCronogramasPraCadastro,
  getCronogramaDetalhar,
} from "../../../../../../services/cronograma.service";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
} from "../../../../../Shareable/Botao/constants";
import Botao from "../../../../../Shareable/Botao";
import { useNavigate } from "react-router-dom";
import { DOCUMENTOS_RECEBIMENTO, PRE_RECEBIMENTO } from "configs/constants";
import { CronogramaSimples } from "interfaces/pre_recebimento.interface";
import { FormApi } from "final-form";
import StepsSigpae from "components/Shareable/StepsSigpae";
import Collapse, { CollapseControl } from "components/Shareable/Collapse";

const ITENS_STEPS = [
  {
    title: "Cronograma",
  },
  {
    title: "Dados do Recebimento",
  },
  {
    title: "Embalagens e Rotulagens",
  },
];

export default () => {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState<boolean>(true);
  const [cronogramas, setCronogramas] = useState<Array<CronogramaSimples>>([]);
  const [collapse, setCollapse] = useState<CollapseControl>({});
  const [cronograma, setCronograma] = useState<any>({});

  const onSubmit = (): void => {
    //setShowModal(true);
  };

  const buscaCronogramas = async (): Promise<void> => {
    setCarregando(true);

    try {
      let response = await getListaCronogramasPraCadastro();
      setCronogramas(response.data.results);
    } finally {
      setCarregando(false);
    }
  };

  const getOpcoesEtapas = () => {
    let options = [];
    cronograma.etapas?.forEach((etapa) => {
      options.push({
        uuid: etapa.uuid,
        nome: `${etapa.etapa} - ${etapa.parte}`,
      });
    });
    return options;
  };

  // const formataPayload = (values): any => {
  //   let documentosPayload: Array<any> =
  //     values.tipos_de_documentos?.map(
  //       (valor: TiposDocumentoChoices): any => {
  //         return {
  //           tipo_documento: valor,
  //           arquivos_do_tipo_de_documento: documentos[valor],
  //           descricao_documento:
  //             valor === "OUTROS" ? values.descricao_documento : undefined,
  //         };
  //       }
  //     );

  //   documentosPayload.push({
  //     tipo_documento: "LAUDO",
  //     arquivos_do_tipo_de_documento: laudo,
  //   });

  //   let payload: any = {
  //     cronograma: cronogramas.find(({ numero }) => numero === values.cronograma)
  //       .uuid,
  //     numero_laudo: values.numero_laudo,
  //     tipos_de_documentos: documentosPayload,
  //   };

  //   return payload;
  // };

  // const salvarDocumentosRecebimiento = async (
  //   values: Record<string, any>
  // ): Promise<void> => {
  //   setCarregando(true);

  //   let payload: any = formataPayload(values);

  //   try {
  //     let response = await cadastraDocumentoRecebimento(payload);
  //     if (response.status === 201 || response.status === 200) {
  //       toastSuccess("Documentos enviados com sucesso!");
  //       voltarPagina();
  //     } else {
  //       toastError("Ocorreu um erro ao salvar o Documento de Recebimento");
  //     }
  //   } catch (error) {
  //     exibeError(error, "Ocorreu um erro ao salvar o Documento de Recebimento");
  //   } finally {
  //     setShowModal(false);
  //     setCarregando(false);
  //   }
  // };

  const voltarPagina = () =>
    navigate(`/${PRE_RECEBIMENTO}/${DOCUMENTOS_RECEBIMENTO}`);

  useEffect(() => {
    buscaCronogramas();
  }, []);

  const optionsCronograma = (values: Record<string, any>) =>
    getListaFiltradaAutoCompleteSelect(
      cronogramas.map(({ numero }) => numero),
      values.cronograma,
      true
    );

  const atualizarCamposCronograma = async (value: string, form: FormApi) => {
    setCarregando(true);
    let cronograma = cronogramas.find((c) => c.numero === value);
    if (cronograma?.uuid) {
      let { data } = await getCronogramaDetalhar(cronograma.uuid);

      setCronograma(data);

      form.change("fornecedor", data?.empresa?.nome_fantasia);
      form.change("numero_contrato", data?.contrato?.numero);
      form.change("pregao", data?.contrato?.numero_chamada_publica);
      form.change("numero_ata", data?.contrato?.ata);
      form.change("produto", data?.ficha_tecnica?.produto?.nome);
      form.change("marca", data?.ficha_tecnica?.marca?.nome);
      form.change(
        "qtd_total_programada",
        `${data?.qtd_total_programada} ${data.unidade_medida?.abreviacao}`
      );
    }

    setCarregando(false);
  };

  const atualizarCamposEtapa = (value: string, form: FormApi) => {
    let etapa = cronograma.etapas.find((e) => e.uuid === value);
    form.change("data_programada", etapa?.data_programada);
    form.change("qtd_programada", etapa?.quantidade);
    form.change("emb_programadas", etapa?.total_embalagens);
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-cadastro-ficha-recebimento">
        <div className="card-body cadastro-ficha-recebimento">
          <Form
            onSubmit={onSubmit}
            initialValues={{}}
            render={({ handleSubmit, values, errors, form }) => (
              <form onSubmit={handleSubmit}>
                {/* <ModalConfirmarEnvio
                  show={showModal}
                  handleClose={() => setShowModal(false)}
                  loading={carregando}
                  handleSim={() => salvarDocumentosRecebimiento(values)}
                /> */}
                <StepsSigpae current={0} items={ITENS_STEPS} />

                <Collapse
                  collapse={collapse}
                  setCollapse={setCollapse}
                  titulos={[
                    <span key={0}>Dados do Cronograma de Entregas</span>,
                    <span key={1}>Etapa, Parte e Data do Recebimento</span>,
                  ]}
                  id="collapseFichaRecebimento"
                >
                  <section id="dadosCronograma">
                    <div className="row">
                      <div className="col-4">
                        <Field
                          component={AutoCompleteSelectField}
                          options={optionsCronograma(values)}
                          label="Nº do Cronograma"
                          name={`cronograma`}
                          className="input-busca-produto"
                          placeholder="Digite o Nº do Cronograma"
                          required
                          validate={required}
                          onChange={(value: string) => {
                            atualizarCamposCronograma(value, form);
                          }}
                        />
                      </div>
                      <div className="col-8">
                        <Field
                          component={InputText}
                          label="Fornecedor"
                          name={`fornecedor`}
                          placeholder="Nome da Empresa"
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <Field
                          component={InputText}
                          label="Nº do Contrato"
                          name={`numero_contrato`}
                          placeholder="Nº do Contrato"
                          disabled={true}
                        />
                      </div>
                      <div className="col-4">
                        <Field
                          component={InputText}
                          label="Nº do Pregão/Chamada Pública"
                          name={`pregao`}
                          placeholder="Nº do Pregão/Chamada Pública"
                          disabled={true}
                        />
                      </div>
                      <div className="col-4">
                        <Field
                          component={InputText}
                          label="Nº da Ata"
                          name={`numero_ata`}
                          placeholder="Nº da Ata"
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <Field
                          component={InputText}
                          label="Produto"
                          name={`produto`}
                          placeholder="Nome do Produto"
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-8">
                        <Field
                          component={InputText}
                          label="Marca"
                          name={`marca`}
                          placeholder="Nome da Marca"
                          disabled={true}
                        />
                      </div>
                      <div className="col-4">
                        <Field
                          component={InputText}
                          label="Quantidade Total Programada"
                          name={`qtd_total_programada`}
                          placeholder="Quantidade Total"
                          disabled={true}
                        />
                      </div>
                    </div>
                    {cronograma.etapas && (
                      <div className="row mt-3">
                        <div className="col-12">
                          <table className="table tabela-dados-cronograma">
                            <thead className="head-crono">
                              <th className="borda-crono">N° do Empenho</th>
                              <th className="borda-crono">
                                Qtde. Total do Empenho
                              </th>
                              <th className="borda-crono">Etapa</th>
                              <th className="borda-crono">Parte</th>
                              <th className="borda-crono">Data Programada</th>
                              <th className="borda-crono">Quantidade</th>
                              <th className="borda-crono">
                                Total de Embalagens
                              </th>
                            </thead>
                            <tbody>
                              {cronograma.etapas.map((etapa, key) => {
                                return (
                                  <tr key={key}>
                                    <td className="borda-crono">
                                      {etapa.numero_empenho}
                                    </td>
                                    <td className="borda-crono">
                                      {formataMilharDecimal(
                                        etapa.qtd_total_empenho
                                      )}{" "}
                                      {cronograma.unidade_medida?.abreviacao}
                                    </td>
                                    <td className="borda-crono">
                                      {etapa.etapa}
                                    </td>
                                    <td className="borda-crono">
                                      {etapa.parte}
                                    </td>
                                    <td className="borda-crono">
                                      {etapa.data_programada}
                                    </td>
                                    <td className="borda-crono">
                                      {formataMilharDecimal(etapa.quantidade)}{" "}
                                      {cronograma.unidade_medida?.abreviacao}
                                    </td>
                                    <td className="borda-crono">
                                      {formataMilharDecimal(
                                        etapa.total_embalagens
                                      )}{" "}
                                      {
                                        cronograma.tipo_embalagem_secundaria
                                          ?.abreviacao
                                      }
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </section>

                  <section id="dadosEtapa">
                    <div className="row">
                      <div className="col-6">
                        <Field
                          component={Select}
                          naoDesabilitarPrimeiraOpcao
                          options={[
                            { nome: "Selecione a Etapa - Parte", uuid: "" },
                            ...getOpcoesEtapas(),
                          ]}
                          label="Etapa e Parte"
                          name="etapa"
                          required
                          validate={required}
                          onChangeEffect={(
                            e: ChangeEvent<HTMLInputElement>
                          ) => {
                            atualizarCamposEtapa(e.target.value, form);
                          }}
                        />
                      </div>
                      <div className="col-3">
                        <Field
                          component={InputComData}
                          label="Data Programada"
                          name={`data_programada`}
                          placeholder="Data do Cronograma"
                          disabled={true}
                        />
                      </div>
                      <div className="col-3">
                        <Field
                          component={InputComData}
                          label="Data da Entrega"
                          name={`data_entrega`}
                          placeholder="Selecionar a Data"
                          required
                          validate={required}
                          writable={false}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3">
                        <Field
                          component={InputText}
                          label="Quantidade Programada"
                          name={`qtd_programada`}
                          placeholder="Quantidade Programada"
                          disabled={true}
                        />
                      </div>
                      <div className="col-3">
                        <Field
                          component={InputText}
                          label="Embalagens Programadas"
                          name={`emb_programadas`}
                          placeholder="Embalagens Programadas"
                          disabled={true}
                        />
                      </div>
                      <div className="col-3">
                        <Field
                          component={InputText}
                          label="Peso Embalagem Primária"
                          name={`peso_emb_primaria`}
                          placeholder="Peso Embalagem Primária"
                          disabled={true}
                        />
                      </div>
                      <div className="col-3">
                        <Field
                          component={InputText}
                          label="Peso Embalagem Secundária"
                          name={`peso_emb_secundaria`}
                          placeholder="Peso Embalagem Secundária"
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <Field
                          component={InputText}
                          label="Embalagem Primária"
                          name={`emb_primaria`}
                          placeholder="Embalagem Primária"
                          disabled={true}
                        />
                      </div>
                      <div className="col-6">
                        <Field
                          component={InputText}
                          label="Embalagem Secundária"
                          name={`emb_secundaria`}
                          placeholder="Embalagem Secundária"
                          disabled={true}
                        />
                      </div>
                    </div>
                  </section>
                </Collapse>

                <hr />

                <div className="mt-4 mb-4">
                  <Botao
                    texto="Salvar e Enviar"
                    type={BUTTON_TYPE.SUBMIT}
                    style={BUTTON_STYLE.GREEN}
                    className="float-end ms-3"
                    disabled={Object.keys(errors).length > 0}
                  />
                  <Botao
                    texto="Cancelar"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    className="float-end ms-3"
                    onClick={() => voltarPagina()}
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
