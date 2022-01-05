import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Spin, Radio, Checkbox } from "antd";
import {
  getGuiaParaConferencia,
  getConferenciaParaEdicao
} from "../../../../services/logistica.service.js";
import { Form, Field } from "react-final-form";
import { InputComData } from "components/Shareable/DatePicker";
import FinalFormToRedux from "components/Shareable/FinalFormToRedux";
import { InputText } from "components/Shareable/Input/InputText";
import { InputHorario } from "components/Shareable/Input/InputHorario";
import {
  required,
  maxLength,
  apenasLetras,
  alphaNumeric,
  peloMenosUmNumeroEUmaLetra
} from "../../../../helpers/fieldValidators";
import { composeValidators } from "../../../../helpers/utilities";
import TabelaAlimentoConsolidado from "components/Logistica/TabelaAlimentoConsolidado";
import { toastError } from "components/Shareable/Toast/dialogs";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import ReceberSemOcorrencia from "./components/ReceberSemOcorrencia";
import moment from "moment";
import { CONFERENCIA_GUIA_COM_OCORRENCIA, LOGISTICA } from "configs/constants";
import "./styles.scss";

import { gerarParametrosConsulta } from "helpers/utilities";

const FORM_NAME = "conferenciaGuiaRemessa";
const TOOLTIP_DATA = `Preencher com a data em que o alimento foi efetivamente recebido pela Unidade Educacional.
                      Se o alimento foi entregue em data posterior ao previsto na Guia de Remessa,
                      será aberta ocorrência a ser detalhada pelo usuário.`;
const TOOLTIP_HORA = `Preencher com a hora em que o alimento foi entregue na Unidade Educacional.`;
const TOOLTIP_PLACA = `Preencher com o registro da placa do veículo que transportou os alimentos à Unidade Educacional.`;
const TOOLTIP_NOME = `Preencher com o nome do motorista que entregou os alimentos na Unidade Educacional.`;

export default () => {
  const [guia, setGuia] = useState({});
  const [alimentos, setAlimentos] = useState([]);
  const [nomesAlimentos, setNomesAlimentos] = useState([]);
  const [uuid, setUuid] = useState();
  const [carregando, setCarregando] = useState(false);
  const [HoraRecebimento, setHoraRecebimento] = useState("00:00");
  const [HoraRecebimentoAlterada, setHoraRecebimentoAlterada] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [existeOcorrencia, setExisteOcorrencia] = useState();
  const [uuidEdicao, setUuidEdicao] = useState(false);

  const carregarGuia = async uuid => {
    let response;
    try {
      setCarregando(true);
      const params = gerarParametrosConsulta({ uuid: uuid });
      response = await getGuiaParaConferencia(params);
      setGuia(response.data);
      //setAlimentos(response.data.alimentos);
      setNomesAlimentos(
        response.data.alimentos.map(alimento => alimento.nome_alimento)
      );
      setInitialValues({
        numero_guia: response.data.numero_guia,
        data_entrega: response.data.data_entrega,
        hora_recebimento: "00:00"
      });
      setCarregando(false);
    } catch (e) {
      toastError(e.response.data.detail);
      setCarregando(false);
    }
  };

  const carregarConferenciaEdicao = async uuid => {
    let response;
    try {
      setCarregando(true);
      const params = gerarParametrosConsulta({ uuid: uuid });
      response = await getConferenciaParaEdicao(params);
      let conferencia = response.data.results;
      setGuia(conferencia.guia);
      //setAlimentos(conferencia.guia.alimentos)
      setNomesAlimentos(
        conferencia.guia.alimentos.map(alimento => alimento.nome_alimento)
      );
      setExisteOcorrencia(conferencia.guia.status !== "Recebida");
      setInitialValues({
        numero_guia: conferencia.guia.numero_guia,
        data_entrega: conferencia.guia.data_entrega,
        hora_recebimento: conferencia.hora_recebimento,
        placa_veiculo: conferencia.placa_veiculo,
        data_entrega_real: moment(conferencia.data_recebimento, "DD/MM/YYYY"),
        nome_motorista: conferencia.nome_motorista
      });
      setHoraRecebimento(conferencia.hora_recebimento);
      setHoraRecebimentoAlterada(true);
      setUuidEdicao(conferencia.uuid);
      localStorage.setItem("conferenciaEdicao", JSON.stringify(conferencia));
      setCarregando(false);
    } catch (e) {
      toastError(e.response.data.detail);
      setCarregando(false);
    }
  };

  const escolherHora = hora => {
    if (hora) {
      const horario = moment(hora).format("HH:mm");
      setHoraRecebimento(horario);
      setHoraRecebimentoAlterada(true);
    } else {
      setHoraRecebimento("00:00");
      setHoraRecebimentoAlterada(false);
    }
  };

  const onSubmit = async values => {
    values.hora_recebimento = HoraRecebimento;
    values.data_recebimento = moment(values.data_entrega_real).format(
      "DD/MM/YYYY"
    );
    values.guia = uuid;
  };

  const onChangeCampos = e => {
    setExisteOcorrencia(e.target.value);
  };

  const validaDataEntrega = value => {
    if (value === null) return "Digite uma data válida";
    if (guia.status === "Insucesso de entrega") return undefined;
    let dataPrevista = moment(guia.data_entrega, "DD/MM/YYYY");
    let dataReal = moment(value, "DD/MM/YYYY");
    if (moment(dataReal).isAfter(dataPrevista))
      return "Data posterior à data prevista na guia!";
    else return undefined;
  };

  const validaHoraRecebimento = value => {
    value = HoraRecebimentoAlterada ? HoraRecebimento : undefined;
    return value !== undefined ? "" : "Campo obrigatório";
  };

  const onChangeAlimentos = list => {
    setAlimentos(list);
    localStorage.alimentosConferencia = JSON.stringify(list);
    //setIndeterminate(!!list.length && list.length < plainOptions.length);
    //setCheckAll(list.length === plainOptions.length);
  };

  const onChangeAlimentosAll = e => {
    let listaAlimentos = e.target.checked ? nomesAlimentos : [];
    setAlimentos(listaAlimentos);
    localStorage.alimentosConferencia = JSON.stringify(listaAlimentos);
    //setIndeterminate(!!list.length && list.length < plainOptions.length);
    //setCheckAll(list.length === plainOptions.length);
  };

  useEffect(() => {
    const queryString = window.location.search;

    if (queryString) {
      const urlParams = new URLSearchParams(window.location.search);
      const uuidParametro = urlParams.get("uuid");
      const edicaoParametro = urlParams.get("editar");
      setUuid(uuidParametro);
      if (edicaoParametro === "true") {
        carregarConferenciaEdicao(uuidParametro);
      } else {
        carregarGuia(uuidParametro);
      }
    }
  }, []);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-conferencia-guia">
        <div className="card-body conferencia-guia">
          <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            validate={() => {}}
            render={({ form, handleSubmit, submitting, errors, values }) => (
              <form onSubmit={handleSubmit}>
                <FinalFormToRedux form={FORM_NAME} />
                <div className="row">
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="Número da guia de remessa"
                      name="numero_guia"
                      className="input-busca-produto"
                      disabled
                    />
                  </div>
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="Data de entrega prevista"
                      name="data_entrega"
                      className="input-busca-produto"
                      disabled
                    />
                  </div>
                </div>
                <hr />
                {guia.alimentos && (
                  <TabelaAlimentoConsolidado
                    className="table-sm tabela-conferencia-guia"
                    alimentosConsolidado={guia.alimentos}
                  />
                )}

                <hr />
                <div className="mt-4 mb-4">
                  <div className="texto-confirma-entrega">
                    <i className="fas fa-exclamation-triangle" />
                    <strong>
                      Todos os alimentos descritos nesta Guia de Remessa foram
                      entregues no prazo, na quantidade prevista e em boa
                      qualidade para consumo?
                    </strong>
                  </div>

                  <Radio.Group
                    size="large"
                    onChange={onChangeCampos}
                    value={existeOcorrencia}
                  >
                    <Radio value={false}>Sim</Radio>
                    <Radio value={true}>Não</Radio>
                  </Radio.Group>

                  {existeOcorrencia === false && (
                    <>
                      <div className="row mt-3 mb-3">
                        <div className="col-4">
                          <Field
                            component={InputComData}
                            label="Data de recebimento da UE"
                            name="data_entrega_real"
                            className="data-inicial"
                            tooltipText={TOOLTIP_DATA}
                            validate={composeValidators(
                              required,
                              validaDataEntrega
                            )}
                            minDate={null}
                            maxDate={null}
                            required
                            writable
                          />
                        </div>
                      </div>

                      <div className="row mb-custom">
                        <div className="col-4">
                          <Field
                            component={InputText}
                            label="Nome do Motorista"
                            name="nome_motorista"
                            className="input-busca-produto"
                            tooltipText={TOOLTIP_NOME}
                            validate={composeValidators(
                              required,
                              maxLength(100),
                              apenasLetras
                            )}
                            required
                          />
                        </div>
                        <div className="col-4">
                          <Field
                            component={InputText}
                            label="Placa do Veículo"
                            name="placa_veiculo"
                            className="input-busca-produto"
                            tooltipText={TOOLTIP_PLACA}
                            validate={composeValidators(
                              required,
                              maxLength(7),
                              alphaNumeric,
                              peloMenosUmNumeroEUmaLetra
                            )}
                            required
                          />
                        </div>
                        <div className="col-4">
                          <Field
                            component={InputHorario}
                            label="Hora da Entrega"
                            name="hora_recebimento"
                            placeholder="Selecione a Hora"
                            horaAtual={HoraRecebimento}
                            onChangeFunction={data => {
                              escolherHora(data);
                            }}
                            className="input-busca-produto"
                            tooltipText={TOOLTIP_HORA}
                            validate={validaHoraRecebimento}
                            required
                            functionComponent
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="mb-3">
                    {existeOcorrencia && (
                      <>
                        <div className="checkbox-container">
                          <div className="checkbox-title">
                            Quais alimentos nesta Guia de Remessa não atendem os
                            critérios descritos acima?
                          </div>
                          <Checkbox
                            onChange={onChangeAlimentosAll}
                            checked={alimentos.length === nomesAlimentos.length}
                          >
                            Todos
                          </Checkbox>
                          <Checkbox.Group
                            options={nomesAlimentos}
                            value={alimentos}
                            onChange={onChangeAlimentos}
                          />
                        </div>
                        <NavLink
                          className="float-right ml-3"
                          to={`/${LOGISTICA}/${CONFERENCIA_GUIA_COM_OCORRENCIA}?uuid=${
                            guia.uuid
                          }${uuidEdicao ? "&editar=true" : ""}`}
                          disabled={alimentos.length < 1}
                        >
                          <Botao
                            texto="Continuar"
                            type={BUTTON_TYPE.BUTTON}
                            style={BUTTON_STYLE.GREEN}
                            disabled={submitting || alimentos.length < 1}
                          />
                        </NavLink>
                      </>
                    )}

                    {!existeOcorrencia && (
                      <ReceberSemOcorrencia
                        values={values}
                        uuidEdicao={uuidEdicao}
                        disabled={
                          Object.keys(errors).length > 0 ||
                          existeOcorrencia !== false ||
                          submitting
                        }
                      />
                    )}
                  </div>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </Spin>
  );
};
