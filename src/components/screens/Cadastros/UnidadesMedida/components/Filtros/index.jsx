import React from "react";
import { Form, Field } from "react-final-form";
import FinalFormToRedux from "components/Shareable/FinalFormToRedux";
import { InputComData } from "components/Shareable/DatePicker";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
} from "components/Shareable/Botao/constants";
import "./style.scss";
import AutoCompleteField from "components/Shareable/AutoCompleteField";
import { NavLink } from "react-router-dom";
import {
  CADASTROS,
  CONFIGURACOES,
  CADASTRO_UNIDADE_MEDIDA,
} from "configs/constants";
import { getListaFiltradaAutoComplete } from "helpers/autoComplete";

const FORM_NAME = "unidades-medida";

export default ({
  setFiltros,
  nomesUnidadesMedida,
  abreviacoesUnidadesMedida,
  setUnidadesMedida,
  setTotal,
}) => {
  const onSubmit = async (values) => {
    const filtros = { ...values };
    setFiltros({ ...filtros });
  };

  return (
    <div className="filtros-cadastros">
      <Form
        onSubmit={onSubmit}
        initialValues={{}}
        render={({ form, handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <FinalFormToRedux form={FORM_NAME} />
            <div className="row">
              <div className="col-6">
                <Field
                  component={AutoCompleteField}
                  dataSource={getListaFiltradaAutoComplete(
                    nomesUnidadesMedida,
                    values.nome
                  )}
                  label="Nome da Unidade de Medida"
                  name="nome"
                  placeholder="Digite o nome da Unidade de Medida"
                  className="filtro-inputs"
                  toUppercaseActive
                />
              </div>
              <div className="col-3">
                <Field
                  component={AutoCompleteField}
                  dataSource={getListaFiltradaAutoComplete(
                    abreviacoesUnidadesMedida,
                    values.abreviacao
                  )}
                  label="Abreviação"
                  name="abreviacao"
                  placeholder="Digite a Abreviação"
                  className="filtro-inputs"
                  toLowerCaseActive
                />
              </div>
              <div className="col-3">
                <Field
                  component={InputComData}
                  label="Data do Cadastro"
                  name="data_cadastro"
                  className="filtro-inputs"
                  placeholder="Selecione a Data"
                  minDate={null}
                  writable={false}
                />
              </div>
            </div>

            <div className="mt-4 mb-4">
              <NavLink
                to={`/${CONFIGURACOES}/${CADASTROS}/${CADASTRO_UNIDADE_MEDIDA}`}
              >
                <Botao
                  texto="Cadastrar Unidade de Medida"
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.GREEN}
                  onClick={() => {}}
                  className="float-left"
                />
              </NavLink>

              <Botao
                texto="Pesquisar"
                type={BUTTON_TYPE.SUBMIT}
                style={BUTTON_STYLE.GREEN}
                className="float-right ml-3"
              />

              <Botao
                texto="Limpar Filtros"
                type={BUTTON_TYPE.BUTTON}
                style={BUTTON_STYLE.GREEN_OUTLINE}
                className="float-right ml-3"
                onClick={() => {
                  form.reset({});
                  setUnidadesMedida(undefined);
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
