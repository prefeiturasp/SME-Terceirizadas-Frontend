import React, { ChangeEvent, useEffect, useState } from "react";
import { Spin } from "antd";
import "./styles.scss";
import { Field, Form } from "react-final-form";
import AutoCompleteSelectField from "components/Shareable/AutoCompleteSelectField";
import Select from "components/Shareable/Select";
import { getListaFiltradaAutoCompleteSelect } from "helpers/autoCompleteSelect";
import { required } from "../../../../../../helpers/fieldValidators";
import InputText from "components/Shareable/Input/InputText";
import { InputComData } from "components/Shareable/DatePicker";
import {
  getListaCronogramasPraFichaRecebimento,
  getCronogramaPraCadastroRecebimento,
} from "../../../../../../services/cronograma.service";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
} from "../../../../../Shareable/Botao/constants";
import Botao from "../../../../../Shareable/Botao";
import { useNavigate } from "react-router-dom";
import { FICHA_RECEBIMENTO, RECEBIMENTO } from "configs/constants";
import { CronogramaSimples } from "interfaces/pre_recebimento.interface";
import { FormApi } from "final-form";
import StepsSigpae from "components/Shareable/StepsSigpae";
import Collapse, { CollapseControl } from "components/Shareable/Collapse";
import ModalGenerico from "components/Shareable/ModalGenerico";
import { exibeError } from "helpers/utilities";
import {
  toastError,
  toastSuccess,
} from "../../../../../Shareable/Toast/dialogs";
import { CronogramaFicha, FichaRecebimentoPayload } from "../../interfaces";
import { cadastraRascunhoFichaRecebimento } from "services/fichaRecebimento.service";
import moment from "moment";

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
  const [cronograma, setCronograma] = useState<CronogramaFicha>(
    {} as CronogramaFicha
  );
  const [showModal, setShowModal] = useState<boolean>(false);

  const onSubmit = (): void => {};

  const buscaCronogramas = async (): Promise<void> => {
    setCarregando(true);

    try {
      let response = await getListaCronogramasPraFichaRecebimento();
      setCronogramas(response.data.results);
    } finally {
      setCarregando(false);
    }
  };

  const getOpcoesEtapas = () => {
    let options = [];
    cronograma.etapas?.forEach((etapa) => {
      if (etapa.desvinculada_recebimento) {
        options.push({
          uuid: etapa.uuid,
          nome: `${etapa.etapa} - ${etapa.parte}`,
        });
      }
    });
    return options;
  };

  const formataPayload = (
    values: FichaRecebimentoPayload
  ): FichaRecebimentoPayload => {
    let payload: FichaRecebimentoPayload = {
      etapa: values.etapa,
      data_entrega: values.data_entrega
        ? moment(values.data_entrega, "DD/MM/YYYY").format("YYYY-MM-DD")
        : undefined,
    };

    return payload;
  };

  const salvarRascunho = async (
    values: FichaRecebimentoPayload
  ): Promise<void> => {
    setCarregando(true);

    let payload: FichaRecebimentoPayload = formataPayload(values);

    try {
      let response = await cadastraRascunhoFichaRecebimento(payload);
      if (response.status === 201 || response.status === 200) {
        toastSuccess("Documentos enviados com sucesso!");
        voltarPagina();
      } else {
        toastError("Ocorreu um erro ao salvar o Documento de Recebimento");
      }
    } catch (error) {
      exibeError(error, "Ocorreu um erro ao salvar o Documento de Recebimento");
    } finally {
      setShowModal(false);
      setCarregando(false);
    }
  };

  const voltarPagina = () => navigate(`/${RECEBIMENTO}/${FICHA_RECEBIMENTO}`);

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
    let cronogramaLista = cronogramas.find((c) => c.numero === value);
    if (cronogramaLista?.uuid) {
      let { data } = await getCronogramaPraCadastroRecebimento(
        cronogramaLista.uuid
      );
      let cronograma = data.results;

      setCronograma(cronograma);

      form.change("fornecedor", cronograma.fornecedor);
      form.change("numero_contrato", cronograma.contrato);
      form.change("pregao", cronograma.pregao_chamada_publica);
      form.change("numero_ata", cronograma.ata);
      form.change("produto", cronograma.produto);
      form.change("marca", cronograma.marca);
      form.change("qtd_total_programada", cronograma.qtd_total_programada);
    }

    setCarregando(false);
  };

  const atualizarCamposEtapa = (value: string, form: FormApi) => {
    let etapa = cronograma.etapas.find((e) => e.uuid === value);
    form.change("data_programada", etapa?.data_programada);
    form.change("qtd_programada", etapa?.quantidade);
    form.change("emb_programadas", etapa?.total_embalagens);

    form.change("emb_primaria", cronograma.embalagem_primaria);
    form.change("emb_secundaria", cronograma.embalagem_secundaria);
    form.change(
      "peso_emb_primaria",
      cronograma.peso_liquido_embalagem_primaria
    );
    form.change(
      "peso_emb_secundaria",
      cronograma.peso_liquido_embalagem_secundaria
    );
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-cadastro-ficha-recebimento">
        <div className="card-body cadastro-ficha-recebimento">
          <Form
            onSubmit={onSubmit}
            initialValues={{}}
            render={({ handleSubmit, values, form }) => (
              <form onSubmit={handleSubmit}>
                <ModalGenerico
                  show={showModal}
                  handleClose={() => setShowModal(false)}
                  loading={carregando}
                  handleSim={() =>
                    salvarRascunho(values as FichaRecebimentoPayload)
                  }
                  titulo={<span>Salvar Rascunho</span>}
                  texto={
                    <span>
                      Deseja salvar o rascunho da Ficha de Recebimento?
                    </span>
                  }
                />
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
                                      {etapa.qtd_total_empenho}
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
                                      {etapa.quantidade}
                                    </td>
                                    <td className="borda-crono">
                                      {etapa.total_embalagens}
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
                    texto="Salvar Rascunho"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    className="float-end ms-3"
                    disabled={!values.cronograma || !values.etapa}
                    onClick={(): void => {
                      setShowModal(true);
                    }}
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
