import React, { useEffect, useReducer } from "react";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import AutoCompleteFieldUnaccent from "components/Shareable/AutoCompleteField/unaccent";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import FinalFormToRedux from "components/Shareable/FinalFormToRedux";

import {
  getAvaliarReclamacaoNomesProdutos,
  getAvaliarReclamacaoNomesMarcas,
  getAvaliarReclamacaoNomesFabricantes,
  getNovaReclamacaoNomesProdutos,
  getNovaReclamacaoNomesMarcas,
  getNovaReclamacaoNomesFabricantes
} from "services/produto.service";

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
    case "resetar":
      return { ...initialState, dados: state.dados };
    default:
      throw new Error("Invalid action type: ", actionType);
  }
}

const FormBuscaProduto = ({
  onSubmit,
  history,
  initialValues,
  formName,
  novaReclamacao
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchData() {
      let endpoints;
      if (novaReclamacao) {
        endpoints = [
          getNovaReclamacaoNomesProdutos(),
          getNovaReclamacaoNomesMarcas(),
          getNovaReclamacaoNomesFabricantes()
        ];
      } else {
        endpoints = [
          getAvaliarReclamacaoNomesProdutos(),
          getAvaliarReclamacaoNomesMarcas(),
          getAvaliarReclamacaoNomesFabricantes()
        ];
      }
      Promise.all(endpoints).then(([produtos, marcas, fabricantes]) => {
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

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={history.action === "POP" && initialValues}
      render={({ form, handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit} className="busca-produtos-formulario">
          <FinalFormToRedux form={formName} />
          <Field
            component={AutoCompleteFieldUnaccent}
            dataSource={state.dados.produtos}
            label="Nome do Produto"
            className="input-busca-produto"
            name="nome_produto"
          />
          <div className="marca-fabricante-inputs">
            <Field
              component={AutoCompleteFieldUnaccent}
              dataSource={state.dados.marcas}
              label="Marca do Produto"
              name="nome_marca"
            />
            <Field
              component={AutoCompleteFieldUnaccent}
              dataSource={state.dados.fabricantes}
              label="Fabricante do Produto"
              name="nome_fabricante"
            />
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
              onClick={() =>
                form.reset({
                  nome_fabricante: undefined,
                  nome_marca: undefined,
                  nome_produto: undefined
                })
              }
              className="float-right ml-3"
              disabled={submitting}
            />
          </div>
        </form>
      )}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: state.finalForm[ownProps.formName]
  };
};

export default withRouter(connect(mapStateToProps)(FormBuscaProduto));
