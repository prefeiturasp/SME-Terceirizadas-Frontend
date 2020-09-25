import moment from "moment";
import React, { useEffect, useReducer } from "react";
import { Form, Field } from "react-final-form";
import AutoCompleteField from "components/Shareable/AutoCompleteField";
import { InputComData } from "components/Shareable/DatePicker";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";

import {
  getNomesProdutos,
  getNomesMarcas,
  getNomesFabricantes
} from "services/produto.service";
import SelectSelecione from "components/Shareable/SelectSelecione";
import { getOpecoesStatus } from "./helpers";

const initialState = {
  dados: {},
  produtos: [],
  marcas: [],
  fabricantes: []
};

function reducer(state, { type: actionType, payload }) {
  switch (actionType) {
    case "popularDados":
      return { ...state, dados: payload };
    case "atualizarFiltro": {
      if (!payload.searchText.length) {
        return { ...state, [payload.filtro]: [] };
      }
      const reg = new RegExp(payload.searchText, "i");
      const filtrado = state.dados[payload.filtro].filter(el => reg.test(el));
      return { ...state, [payload.filtro]: filtrado };
    }
    case "resetar":
      return { ...initialState, dados: state.dados };
    default:
      throw new Error("Invalid action type: ", actionType);
  }
}

const FormBuscaProduto = ({ onSubmit }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchData() {
      Promise.all([
        getNomesProdutos(),
        getNomesMarcas(),
        getNomesFabricantes()
      ]).then(([produtos, marcas, fabricantes]) => {
        dispatch({
          type: "popularDados",
          payload: {
            produtos: produtos.data.results.map(el => el.nome),
            marcas: marcas.data.results.map(el => el.nome),
            fabricantes: fabricantes.data.results.map(el => el.nome)
          }
        });
      });
    }
    fetchData();
  }, []);

  const onSearch = (filtro, searchText) => {
    dispatch({
      type: "atualizarFiltro",
      payload: {
        filtro,
        searchText
      }
    });
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ form, handleSubmit, submitting, values }) => (
        <form onSubmit={handleSubmit} className="busca-produtos-formulario">
          <div className="form-row">
            <div className="col-12 col-md-6">
              <Field
                component={AutoCompleteField}
                dataSource={state.produtos}
                label="Nome do Produto"
                className="input-busca-produto"
                onSearch={v => onSearch("produtos", v)}
                name="nome_produto"
              />
            </div>
            <div className="col-12 col-md-6">
              <Field
                component={AutoCompleteField}
                dataSource={state.marcas}
                label="Marca do Produto"
                onSearch={v => onSearch("marcas", v)}
                name="nome_marca"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="col-12 col-md-6 col-xl-3">
              <Field
                component={AutoCompleteField}
                dataSource={state.fabricantes}
                label="Fabricante do Produto"
                onSearch={v => onSearch("fabricantes", v)}
                name="nome_fabricante"
              />
            </div>
            <div className="col-12 col-md-6 col-xl-3">
              <Field
                component={SelectSelecione}
                label="Situação"
                labelClassName="mb-1"
                name="situacao"
                options={getOpecoesStatus().map(status => {
                  return {
                    uuid: status,
                    nome: status
                  };
                })}
              />
            </div>
            <div className="col-12 col-md-6 col-xl-3 mb-3">
              <Field
                component={InputComData}
                label="Data Cadastro"
                name="data_inicial"
                className="data-inicial"
                labelClassName="datepicker-fixed-padding"
                placeholder="De"
                minDate={null}
                maxDate={
                  values.data_final
                    ? moment(values.data_final, "DD/MM/YYYY")._d
                    : moment()._d
                }
              />
            </div>
            <div className="col-12 col-md-6 col-xl-3 mb-3">
              <Field
                component={InputComData}
                label="&nbsp;"
                name="data_final"
                labelClassName="datepicker-fixed-padding"
                popperPlacement="bottom-end"
                placeholder="Até"
                minDate={
                  values.data_inicial
                    ? moment(values.data_inicial, "DD/MM/YYYY")._d
                    : null
                }
                maxDate={moment()._d}
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
              onClick={() => form.reset()}
              className="float-right ml-3"
              disabled={submitting}
            />
          </div>
        </form>
      )}
    />
  );
};

export default FormBuscaProduto;
