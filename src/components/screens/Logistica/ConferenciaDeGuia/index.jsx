import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { getGuiaPorUuid } from "../../../../services/logistica.service.js";
import { Form, Field } from "react-final-form";
import { InputComData } from "components/Shareable/DatePicker";
import FinalFormToRedux from "components/Shareable/FinalFormToRedux";
import { InputText } from "components/Shareable/Input/InputText";
import { InputHorario } from "components/Shareable/Input/InputHorario";
import { required, maxLength } from "../../../../helpers/fieldValidators";
import { composeValidators } from "../../../../helpers/utilities";
import TabelaAlimentoConsolidado from "components/Logistica/TabelaAlimentoConsolidado";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import moment from "moment";
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
  const [carregando, setCarregando] = useState(false);
  const [horaEntrega, setHoraEntrega] = useState("00:00");
  const [horaEntregaAlterada, setHoraEntregaAlterada] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  const carregarGuia = async uuid => {
    setCarregando(true);
    const params = gerarParametrosConsulta({ uuid: uuid });
    const response = await getGuiaPorUuid(params);
    setGuia(response.data);
    setInitialValues({
      numero_guia: response.data.numero_guia,
      data_entrega: response.data.data_entrega,
      hora_entrega: "00:00"
    });
    setCarregando(false);
  };

  const escolherHora = hora => {
    if (hora) {
      const horario = moment(hora).format("HH:mm");
      setHoraEntrega(horario);
      setHoraEntregaAlterada(true);
    } else {
      setHoraEntrega("00:00");
      setHoraEntregaAlterada(false);
    }
  };

  const onSubmit = async values => {
    values.hora_entrega = horaEntrega;
  };

  const validaDataEntrega = value => {
    if (guia.status === "Insucesso de entrega") return undefined;
    let dataPrevista = moment(guia.data_entrega, "DD/MM/YYYY");
    let dataReal = moment(value, "DD/MM/YYYY");
    if (moment(dataReal).isAfter(dataPrevista))
      return "Data posterior à data prevista na guia!";
    else return undefined;
  };

  const validaHoraEntrega = value => {
    value = horaEntregaAlterada ? horaEntrega : undefined;
    return value !== undefined ? "" : "Campo obrigatório";
  };

  useEffect(() => {
    const queryString = window.location.search;

    if (queryString) {
      const urlParams = new URLSearchParams(window.location.search);
      const uuid = urlParams.get("uuid");
      carregarGuia(uuid);
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
            render={({ form, handleSubmit, submitting, errors }) => (
              <form onSubmit={handleSubmit}>
                <FinalFormToRedux form={FORM_NAME} />
                <div className="row">
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="Nº da guia de remessa"
                      name="numero_guia"
                      className="input-busca-produto"
                      disabled
                    />
                  </div>
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="Data de Entrega Prevista"
                      name="data_entrega"
                      className="input-busca-produto"
                      disabled
                    />
                  </div>
                  <div className="col-4">
                    <Field
                      component={InputComData}
                      label="Data de recebimento da UE"
                      name="data_entrega_real"
                      className="data-inicial"
                      tooltipText={TOOLTIP_DATA}
                      validate={composeValidators(required, validaDataEntrega)}
                      minDate={null}
                      maxDate={null}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="Nome do Motorista"
                      name="nome_motorista"
                      className="input-busca-produto"
                      tooltipText={TOOLTIP_NOME}
                      validate={composeValidators(required, maxLength(100))}
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
                      validate={composeValidators(required, maxLength(7))}
                      required
                    />
                  </div>
                  <div className="col-4">
                    <Field
                      component={InputHorario}
                      label="Hora da Entrega"
                      name="hora_entrega"
                      placeholder="Selecione a Hora"
                      horaAtual={horaEntrega}
                      onChangeFunction={data => {
                        escolherHora(data);
                      }}
                      className="input-busca-produto"
                      tooltipText={TOOLTIP_HORA}
                      validate={validaHoraEntrega}
                      required
                      functionComponent
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
                    Todos os alimentos descritos nesta Guia de Remessa foram
                    entregues no prazo, na quantidade prevista e em boa
                    qualidade para consumo?
                  </div>

                  <Botao
                    texto="Não"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    className="float-right ml-3"
                    onClick={() => {}}
                    disabled={submitting}
                  />

                  <Botao
                    texto="Sim"
                    type={BUTTON_TYPE.SUBMIT}
                    style={BUTTON_STYLE.GREEN}
                    className="float-right ml-3"
                    disabled={Object.keys(errors).length > 0 || submitting}
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
