import moment from "moment";
import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import FinalFormToRedux from "components/Shareable/FinalFormToRedux";
import { InputComData } from "components/Shareable/DatePicker";
import { InputText } from "components/Shareable/Input/InputText";
import Botao from "components/Shareable/Botao";
import { trocaAcentuadasPorSemAcento } from "helpers/utilities.js";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import "./style.scss";

const FORM_NAME = "buscaRequisicoesDilog";

export default ({ setFiltros, setGuias, setTotal }) => {
  const [initialValues] = useState({});

  const onSubmit = async values => {
    const filtros = { ...values };
    if (filtros.nome_unidade)
      filtros.nome_unidade = trocaAcentuadasPorSemAcento(filtros.nome_unidade);
    setFiltros({ ...filtros });
  };

  return (
    <div className="filtros-requisicoes-listagem">
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
                  label="N° da Requisição de Entrega"
                  name="numero_requisicao"
                  placeholder="Digite o número da requisição"
                  className="input-busca-produto"
                />
              </div>
              <div className="col-6">
                <Field
                  component={InputText}
                  label="Nº da guia de remessa"
                  name="numero_guia"
                  placeholder="Digite o número da guia"
                  className="input-busca-produto"
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
              <div className="col-6">
                <Field
                  component={InputText}
                  label="Nome da Unidade Educacional"
                  name="nome_unidade"
                  placeholder="Digite o nome da Unidade Educacional"
                  className="input-busca-produto"
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
                  form.reset({});
                  setGuias(undefined);
                  setTotal(undefined);
                }}
              />
            </div>
          </form>
        )}
      />
    </div>
  );
};
