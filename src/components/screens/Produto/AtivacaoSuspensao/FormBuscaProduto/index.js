import React, { useEffect, useReducer } from "react";
import { withRouter } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { Row, Col } from "antd";
import AutoCompleteFieldUnaccent from "components/Shareable/AutoCompleteField/unaccent";
import SelectSelecione from "components/Shareable/SelectSelecione";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import {
  getNomesUnicosProdutos,
  getNomesUnicosMarcas,
  getNomesUnicosFabricantes
} from "services/produto.service";
import "./style.scss";

const initialState = {
  dados: {},
  status: ["Ativo", "Suspenso"],
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
      // eslint-disable-next-line no-console
      console.error("Invalid action type: ", actionType);
  }
}

const FormBuscaProduto = ({
  onSubmit,
  exibirBotaoVoltar,
  exibirStatus = true
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchData() {
      Promise.all([
        getNomesUnicosProdutos(),
        getNomesUnicosMarcas(),
        getNomesUnicosFabricantes()
      ]).then(([produtos, marcas, fabricantes]) => {
        dispatch({
          type: "popularDados",
          payload: {
            produtos: produtos.data.results,
            marcas: marcas.data.results,
            fabricantes: fabricantes.data.results
          }
        });
      });
    }
    fetchData();
  }, []);

  return (
    <Form
      onSubmit={onSubmit}
      render={({ form, handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit} className="busca-produtos-ativacao">
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
                dataSource={state.marcas}
                className="input-busca-produto"
                label="Marca do Produto"
                placeholder="Digite marca do produto"
                name="nome_marca"
              />
            </Col>
            <Col md={24} lg={exibirStatus ? 9 : 12}>
              <Field
                component={AutoCompleteFieldUnaccent}
                dataSource={state.fabricantes}
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
            {!!exibirBotaoVoltar && (
              <Botao
                texto="Limpar Filtro"
                type={BUTTON_TYPE.BUTTON}
                style={BUTTON_STYLE.GREEN_OUTLINE}
                className="float-right ml-3"
                onClick={() => form.reset()}
                disabled={submitting}
              />
            )}
          </div>
        </form>
      )}
    />
  );
};

export default withRouter(FormBuscaProduto);
