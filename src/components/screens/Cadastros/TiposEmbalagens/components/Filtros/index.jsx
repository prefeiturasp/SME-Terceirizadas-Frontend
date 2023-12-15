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
  CADASTRO_TIPO_EMBALAGEM,
} from "configs/constants";
import { getListaFiltradaAutoComplete } from "helpers/autoComplete";

const FORM_NAME = "embalagens";

export default ({
  setFiltros,
  nomesEmbalagens,
  abreviacaoEmbalagens,
  setEmbalagens,
  setTotal,
}) => {
  const initialValues = {};

  const onSubmit = async (values) => {
    const filtros = { ...values };
    setFiltros({ ...filtros });
  };

  return (
    <div className="filtros-embalagens">
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={({ form, handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <FinalFormToRedux form={FORM_NAME} />
            <div className="row">
              <div className="col-6">
                <Field
                  component={AutoCompleteField}
                  dataSource={getListaFiltradaAutoComplete(
                    nomesEmbalagens,
                    values.nome
                  )}
                  label="Nome do Tipo de Embalagem"
                  name="nome"
                  placeholder="Digite o nome do Tipo da Embalagem"
                  className="filtro-inputs-embalagens"
                  toUppercaseActive
                />
              </div>
              <div className="col-3">
                <Field
                  component={AutoCompleteField}
                  dataSource={getListaFiltradaAutoComplete(
                    abreviacaoEmbalagens,
                    values.abreviacao
                  )}
                  label="Abreviação"
                  name="abreviacao"
                  placeholder="Digite a Abreviação"
                  className="filtro-inputs-embalagens"
                  maxlength="3"
                  toUppercaseActive
                  proibeNumeros
                />
              </div>
              <div className="col-3">
                <Field
                  component={InputComData}
                  label="Data do Cadastro"
                  name="data_cadastro"
                  className="filtro-inputs-embalagens"
                  placeholder="Selecione a Data"
                  minDate={null}
                  writable={false}
                />
              </div>
            </div>

            <div className="mt-4 mb-4">
              <NavLink
                to={`/${CONFIGURACOES}/${CADASTROS}/${CADASTRO_TIPO_EMBALAGEM}`}
              >
                <Botao
                  texto="Cadastrar Tipo de Embalagem"
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.GREEN}
                  onClick={() => {}}
                  className="float-start"
                />
              </NavLink>

              <Botao
                texto="Pesquisar"
                type={BUTTON_TYPE.SUBMIT}
                style={BUTTON_STYLE.GREEN}
                className="float-end ms-3"
              />

              <Botao
                texto="Limpar Filtros"
                type={BUTTON_TYPE.BUTTON}
                style={BUTTON_STYLE.GREEN_OUTLINE}
                className="float-end ms-3"
                onClick={() => {
                  form.reset({});
                  setEmbalagens(undefined);
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
