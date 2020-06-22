import React, { useEffect, useReducer } from "react";
import { withRouter } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { Row, Col } from "antd";
import AutoCompleteField from "components/Shareable/AutoCompleteField";
import SelectSelecione from "components/Shareable/SelectSelecione";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import {
  getNomesProdutos,
  getNomesMarcas,
  getNomesFabricantes
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
      // eslint-disable-next-line no-console
      console.error("Invalid action type: ", actionType);
  }
}

const FormBuscaProduto = ({ onSubmit, exibirBotaoVoltar, history, exibirStatus = true }) => {
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
      render={({ form, handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit} className="busca-produtos-ativacao">
          <Row>
            <Col>
              <Field
                component={AutoCompleteField}
                dataSource={state.produtos}
                label="Nome do Produto"
                placeholder="Digite nome do produto"
                className="input-busca-produto"
                onSearch={v => onSearch("produtos", v)}
                name="nome_produto"
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col md={24} lg={exibirStatus ? 9 : 12}>
              <Field
                component={AutoCompleteField}
                dataSource={state.marcas}
                className="input-busca-produto"
                label="Marca do Produto"
                placeholder="Digite marca do produto"
                onSearch={v => onSearch("marcas", v)}
                name="nome_marca"
              />
            </Col>
            <Col md={24} lg={exibirStatus ? 9 : 12}>
              <Field
                component={AutoCompleteField}
                dataSource={state.fabricantes}
                label="Fabricante do Produto"
                placeholder="Digite fabricante do produto"
                onSearch={v => onSearch("fabricantes", v)}
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
                type={BUTTON_TYPE.BUTTON}
                icon={BUTTON_ICON.ARROW_LEFT}
                texto={"Voltar"}
                style={BUTTON_STYLE.BLUE_OUTLINE}
                onClick={() => history.push("/")}
                className="float-right ml-3"
              />
            )}
          </div>
        </form>
      )}
    />
  );
};

export default withRouter(FormBuscaProduto);
