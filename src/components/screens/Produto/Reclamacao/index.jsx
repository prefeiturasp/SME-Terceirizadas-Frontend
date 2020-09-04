import { Spin } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";

import FormBuscaProduto from "./components/FormBuscaProduto";
import TabelaProdutos from "./components/TabelaProdutos";

import {
  reset,
  setProdutos,
  setIndiceProdutoAtivo
} from "reducers/reclamacaoProduto";

import { getProdutosPorParametros } from "services/produto.service";

import "./style.scss";

class ReclamacaoProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: "",
      formValues: undefined
    };
  }
  componentWillMount() {
    const { history, reset } = this.props;
    if (history && history.action === "PUSH") {
      reset();
    }
  }
  onAtualizarProduto = () => {
    this.atualizaListaProdutos(this.state.formValues);
  };

  atualizaListaProdutos = formValues => {
    return new Promise(async (resolve, reject) => {
      const response = await getProdutosPorParametros(formValues);
      this.setState({ loading: false });
      if (response.status === 200) {
        this.props.setProdutos(response.data.results);
        resolve();
      } else {
        reject(response.errors);
      }
    });
  };

  onSubmitFormBuscaProduto = formValues => {
    this.setState({
      formValues
    });
    this.setState({ loading: true, error: "" });
    try {
      this.atualizaListaProdutos(formValues);
    } catch (e) {
      this.setState({ error: "Erro ao consultar a lista de produtos." });
    }
  };
  render() {
    const {
      produtos,
      setProdutos,
      indiceProdutoAtivo,
      setIndiceProdutoAtivo,
      formValues
    } = this.props;
    return (
      <Spin tip="Carregando..." spinning={this.state.loading}>
        <div className="card mt-3 page-reclamacao-produto">
          <div className="card-body">
            <FormBuscaProduto
              formName="reclamacao"
              onSubmit={this.onSubmitFormBuscaProduto}
              onAtualizaProdutos={produtos => setProdutos(produtos)}
            />

            {produtos && produtos.length > 0 && (
              <>
                <div className="label-resultados-busca">
                  {formValues && formValues.nome_produto
                    ? `Veja os resultados para: "${formValues.nome_produto}"`
                    : "Veja os resultados para a busca:"}
                </div>
                <TabelaProdutos
                  listaProdutos={produtos}
                  onAtualizarProduto={this.onAtualizarProduto}
                  indiceProdutoAtivo={indiceProdutoAtivo}
                  setIndiceProdutoAtivo={setIndiceProdutoAtivo}
                />
              </>
            )}
            {produtos && produtos.length === 0 && formValues !== undefined && (
              <div className="text-center mt-5">
                A consulta retornou 0 resultados.
              </div>
            )}
          </div>
        </div>
      </Spin>
    );
  }
}

const mapStateToProps = state => {
  return {
    indiceProdutoAtivo: state.reclamacaoProduto.indiceProdutoAtivo,
    produtos: state.reclamacaoProduto.produtos,
    formValues: state.finalForm.reclamacao
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setIndiceProdutoAtivo,
      setProdutos,
      reset
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ReclamacaoProduto)
);
