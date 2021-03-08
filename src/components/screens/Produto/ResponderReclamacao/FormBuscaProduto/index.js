import { Row, Col } from "antd";
import React, { useEffect, useReducer } from "react";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import AutoCompleteFieldUnaccent from "components/Shareable/AutoCompleteField/unaccent";
import SelectSelecione from "components/Shareable/SelectSelecione";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import FinalFormToRedux from "components/Shareable/FinalFormToRedux";

import {
  getResponderReclamacaoNomesProdutos,
  getResponderReclamacaoNomesMarcas,
  getResponderReclamacaoNomesFabricantes
} from "services/produto.service";

import "./style.scss";

const initialState = {
  dados: {},
  status: ["Ativo", "Suspenso"],
  produtos: [],
  marcas: [],
  fabricantes: []
};

const FORM_NAME = "formBuscaProduto";

function reducer(state, { type: actionType, payload }) {
  switch (actionType) {
    case "popularDados":
      return { ...state, dados: payload };
    case "resetar":
      return { ...initialState, dados: state.dados };
    default:
      // eslint-disable-next-line no-console
      console.error("Invalid action type: ", actionType);
  }
}

const FormBuscaProduto = ({
  onSubmit,
  exibirStatus = true,
  initialValues,
  history
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchData() {
      Promise.all([
        getResponderReclamacaoNomesProdutos(),
        getResponderReclamacaoNomesMarcas(),
        getResponderReclamacaoNomesFabricantes()
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

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={history.action === "POP" && initialValues}
      render={({ form, handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit} className="busca-produtos-ativacao">
          <FinalFormToRedux form={FORM_NAME} />
          <Row>
            <Col>
              <Field
                component={AutoCompleteFieldUnaccent}
                dataSource={state.dados.produtos}
                label="Nome do Produto"
                placeholder="Digite nome do produto"
                className="input-busca-produto"
                name="nome_produto"
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col md={24} lg={exibirStatus ? 9 : 12}>
              <Field
                component={AutoCompleteFieldUnaccent}
                dataSource={state.dados.marcas}
                className="input-busca-produto"
                label="Marca do Produto"
                placeholder="Digite marca do produto"
                name="nome_marca"
              />
            </Col>
            <Col md={24} lg={exibirStatus ? 9 : 12}>
              <Field
                component={AutoCompleteFieldUnaccent}
                dataSource={state.dados.fabricantes}
                label="Fabricante do Produto"
                placeholder="Digite fabricante do produto"
                name="nome_fabricante"
              />
            </Col>
            {exibirStatus && (
              <Col md={24} lg={6}>
                <div className="">
                  <Field
                    component={SelectSelecione}
                    label="Status"
                    name="status"
                    options={[
                      { nome: "Ativo", uuid: "ativo" },
                      { nome: "Suspenso", uuid: "suspenso" }
                    ]}
                  />
                </div>
              </Col>
            )}
          </Row>
          <div className="mt-4 mb-4">
            <Botao
              texto="Consultar"
              type={BUTTON_TYPE.SUBMIT}
              style={BUTTON_STYLE.GREEN}
              className="float-right ml-3"
              disabled={submitting}
            />

            <Botao
              texto="Limpar Filtro"
              type={BUTTON_TYPE.BUTTON}
              style={BUTTON_STYLE.GREEN_OUTLINE}
              className="float-right ml-3"
              onClick={() =>
                form.reset({
                  status: undefined,
                  nome_fabricante: undefined,
                  nome_marca: undefined,
                  nome_produto: undefined
                })
              }
              disabled={submitting}
            />
          </div>
        </form>
      )}
    />
  );
};

const mapStateToProps = state => {
  return {
    initialValues: state.finalForm[FORM_NAME]
  };
};

export default withRouter(connect(mapStateToProps)(FormBuscaProduto));
