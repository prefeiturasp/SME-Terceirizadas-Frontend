import moment from "moment";
import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import FinalFormToRedux from "components/Shareable/FinalFormToRedux";
import { InputComData } from "components/Shareable/DatePicker";
import { InputText } from "components/Shareable/Input/InputText";
import MultiSelect from "components/Shareable/FinalForm/MultiSelect";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import "./style.scss";

const FORM_NAME = "buscaRequisicoesDilog";

export default ({ setFiltros, initialValuesProp }) => {
  const [initialValuesDefault] = useState({
    status: ["PENDENTE_DE_CONFERENCIA"]
  });

  const initialValues = initialValuesProp
    ? initialValuesProp
    : initialValuesDefault;

  const onSubmit = async values => {
    const filtros = { ...values };
    setFiltros({ ...filtros });
  };

  return (
    <div className="filtros-conferir-entrega">
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={({ form, handleSubmit, submitting, values }) => (
          <form onSubmit={handleSubmit}>
            <FinalFormToRedux form={FORM_NAME} />
            <div className="row">
              <div className="col-6">
                <Field
                  component={InputText}
                  label="Nº da guia de remessa"
                  name="numero_guia"
                  placeholder="Digite o número da guia"
                  className="input-busca-produto"
                />
              </div>

              <div className="col-6">
                <Field
                  label="Status"
                  component={MultiSelect}
                  disableSearch
                  name="status"
                  multiple
                  nomeDoItemNoPlural="status"
                  options={[
                    {
                      value: "PENDENTE_DE_CONFERENCIA",
                      label: "Pendente"
                    },
                    {
                      value: "RECEBIDA",
                      label: "Recebida"
                    },
                    {
                      value: "RECEBIMENTO_PARCIAL",
                      label: "Parcial"
                    },
                    {
                      value: "NAO_RECEBIDA",
                      label: "Não Recebida"
                    },
                    {
                      value: "DISTRIBUIDOR_REGISTRA_INSUCESSO",
                      label: "Insucesso"
                    },
                    {
                      value: "REPOSICAO_PARCIAL",
                      label: "Reposição parcial"
                    },
                    {
                      value: "REPOSICAO_TOTAL",
                      label: "Reposição total"
                    }
                  ]}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <Field
                  component={InputComData}
                  label="Período de Entrega"
                  name="data_inicial"
                  className="data-inicial"
                  placeholder="De"
                  minDate={null}
                  maxDate={
                    values.data_final
                      ? moment(values.data_final, "DD/MM/YYYY")._d
                      : null
                  }
                />
              </div>
              <div className="col-3">
                <Field
                  component={InputComData}
                  label="&nbsp;"
                  name="data_final"
                  popperPlacement="bottom-end"
                  placeholder="Até"
                  minDate={
                    values.data_inicial
                      ? moment(values.data_inicial, "DD/MM/YYYY")._d
                      : null
                  }
                  maxDate={null}
                />
              </div>
            </div>

            <div className="mt-4 mb-4">
              <Botao
                texto="Consultar"
                type={BUTTON_TYPE.SUBMIT}
                style={BUTTON_STYLE.GREEN}
                className="float-right ml-3"
                disabled={submitting}
              />

              <Botao
                texto="Limpar Filtros"
                type={BUTTON_TYPE.BUTTON}
                style={BUTTON_STYLE.GREEN_OUTLINE}
                className="float-right ml-3"
                onClick={() => {
                  form.reset(initialValues);
                  setFiltros(initialValues);
                }}
              />
            </div>
          </form>
        )}
      />
    </div>
  );
};
