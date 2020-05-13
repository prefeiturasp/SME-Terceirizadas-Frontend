import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setaProdutoRelatorio } from "../produtoAction";
import ResultadoMock from "./components/resultadoMock";
import CorpoRelatorio from "./components/corpoRelatorio";
import "antd/dist/antd.css";
import { Spin } from "antd";

class RelatorioProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historico: [],
      loading: true
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    window.scrollTo(0, 0);
    const { historico } = this.state;
    if (
      historico === prevState.historico &&
      prevProps.produto !== this.props.produto
    ) {
      const ultimoHistorico = this.props.produto.ultima_homologacao;
      this.setState({ historico: ultimoHistorico });

      setTimeout(() => {
        this.setState({ loading: false });
      }, 100);
    }
  };

  render() {
    const { loading, historico } = this.state;
    const { informacoesNutricionais, produto } = this.props;
    return (
      <div className="card">
        <div className="card-body">
          {loading ? (
            <Spin tip="Carregando...">
              <ResultadoMock />
            </Spin>
          ) : (
            <Fragment>
              <CorpoRelatorio
                informacoesNutricionais={informacoesNutricionais}
                produto={produto}
                historico={historico}
              />
            </Fragment>
            // <ResultadoMock />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  produto: state.produtos.produtoRelatorio,
  informacoesNutricionais: state.produtos.informacoesNutricionais
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setaProdutoRelatorio
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RelatorioProduto);
