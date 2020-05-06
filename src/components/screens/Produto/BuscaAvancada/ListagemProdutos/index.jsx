import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setaProdutoRelatorio } from "../produtoAction";

class ListagemProdutos extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { pesquisado, produtos } = this.props;
    return pesquisado === true && produtos.length > 0 ? (
      <section>
        {produtos.map((produto, index) => {
          return <div key={index}>{produto.nome}</div>;
        })}
      </section>
    ) : (
      pesquisado === true && <div>foi</div>
    );
  }
}

const mapStateToProps = state => ({
  produtos: state.produtos.produtosFiltrados
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
)(ListagemProdutos);
