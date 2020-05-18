import React, { Component, Fragment } from "react";
import { reduxForm } from "redux-form";
import "antd/dist/antd.css";
import "./style.scss";

import {
  tranformaEmobjetoDeBusca,
  retornaArrayDeAcordoComPerfil,
  filtrarProdutosNaListagem,
  MIN_DATE
} from "./helpers";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  buscaProdutos,
  buscaNomesProduto,
  buscaNomesMarcas,
  buscaNomesFabricantes,
  setaProdutosFiltrados,
  buscaInformacoesNutricionais
} from "./produtoAction";
import "antd/dist/antd.css";
import { Spin } from "antd";
import ListagemProdutos from "./ListagemProdutos";
import FormBuscaProduto from "./FormBuscaProduto";

class BuscaAvancada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusOptions: [],
      tipos_produto: [
        { nome: "comum", check: false, label: "Comum" },
        { nome: "dieta_especial", check: false, label: "Dieta especial" }
      ],
      produtoComum: false,
      produtoDieta: false,
      produto_alergenico: false,
      selectedItems: [],
      loading: true,
      pesquisado: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSelectStatus = this.onSelectStatus.bind(this);
    this.onDeselectStatus = this.onDeselectStatus.bind(this);
    this.checkTipoProduto = this.checkTipoProduto.bind(this);
    this.checkProdutoAlergenico = this.checkProdutoAlergenico.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  checkTipoProduto = (indice, check, nome) => {
    let { tipos_produto } = this.state;
    tipos_produto[indice].check = !check;
    this.setState({ tipos_produto });
    if (nome === "comum") {
      this.setState({ produtoComum: !check });
    } else {
      this.setState({ produtoDieta: !check });
    }
  };

  checkProdutoAlergenico = () => {
    const { produto_alergenico } = this.state;
    this.setState({ produto_alergenico: !produto_alergenico });
  };

  onSearch = values => {
    const {
      selectedItems,
      produtoComum,
      produtoDieta,
      produto_alergenico
    } = this.state;

    const { produtos } = this.props;

    values["status"] = tranformaEmobjetoDeBusca(selectedItems);
    values["check_comum"] = produtoComum;
    values["check_dieta_especial"] = produtoDieta;
    values["produtos_alergenicos"] = produto_alergenico;

    const retornoProdutos = filtrarProdutosNaListagem(values, produtos);

    retornoProdutos.forEach(produto => {
      produto["ativo"] = false;
    });
    this.props.setaProdutosFiltrados(retornoProdutos);

    this.setState({ pesquisado: true });
  };

  onClear = () => {
    const { change } = this.props;
    let { tipos_produto } = this.state;

    tipos_produto.forEach(tipo => {
      tipo.check = false;
    });

    change("data-de", null);
    change("data-ate", null);
    change("aditivos", null);
    change("nome", null);
    change("marca", null);
    change("fabricante", null);

    this.setState({
      tipos_produto,
      selectedItems: [],
      produto_alergenico: false,
      produtoComum: false,
      produtoDieta: false,
      statusOptions: retornaArrayDeAcordoComPerfil(),
      pesquisado: false
    });
  };

  handleChange = selectedItems => {
    this.setState({ selectedItems });
  };

  componentDidMount() {
    let { statusOptions } = this.state;

    this.props.buscaNomesProduto();
    this.props.buscaNomesMarcas();
    this.props.buscaNomesFabricantes();
    this.props.buscaProdutos();
    this.props.buscaInformacoesNutricionais();

    statusOptions = retornaArrayDeAcordoComPerfil();
    this.setState({ statusOptions });
  }

  componentDidUpdate() {
    const { statusOptions } = this.state;
    if (statusOptions.length > 0) {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 500);
    }
  }

  onSelectStatus = value => {
    if (value === "Todos") {
      const statusOptions = ["Todos"];
      const selectedItems = ["Todos"];
      this.setState({ statusOptions, selectedItems });
    }
  };

  onDeselectStatus = value => {
    if (value === "Todos") {
      const statusOptions = retornaArrayDeAcordoComPerfil();
      this.setState({ statusOptions, selectedItems: [] });
    }
  };

  render() {
    const {
      handleSubmit,
      nomesMarcas,
      nomesFabricantes,
      nomesProdutos
    } = this.props;
    const {
      statusOptions,
      tipos_produto,
      produto_alergenico,
      selectedItems,
      loading,
      pesquisado
    } = this.state;
    return (
      <div className="card">
        <div className="card-body">
          {!loading ? (
            <Fragment>
              <FormBuscaProduto
                statusOptions={statusOptions}
                tipos_produto={tipos_produto}
                produto_alergenico={produto_alergenico}
                selectedItems={selectedItems}
                handleSubmit={handleSubmit}
                nomesMarcas={nomesMarcas}
                nomesFabricantes={nomesFabricantes}
                nomesProdutos={nomesProdutos}
                minDate={MIN_DATE}
                handleChange={this.handleChange}
                onDeselectStatus={this.onDeselectStatus}
                onSelectStatus={this.onSelectStatus}
                checkTipoProduto={this.checkTipoProduto}
                checkProdutoAlergenico={this.checkProdutoAlergenico}
                onClear={this.onClear}
                onSearch={this.onSearch}
              />
              <ListagemProdutos pesquisado={pesquisado} />
            </Fragment>
          ) : (
            <Spin tip="Carregando...">
              <FormBuscaProduto
                statusOptions={statusOptions}
                tipos_produto={tipos_produto}
                produto_alergenico={produto_alergenico}
                selectedItems={selectedItems}
                handleSubmit={handleSubmit}
                nomesMarcas={nomesMarcas}
                nomesFabricantes={nomesFabricantes}
                nomesProdutos={nomesProdutos}
                minDate={MIN_DATE}
              />
            </Spin>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  produtos: state.produtos.list,
  nomesProdutos: state.produtos.nomesProdutos,
  nomesMarcas: state.produtos.nomesMarcas,
  nomesFabricantes: state.produtos.nomesFabricantes
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      buscaProdutos,
      buscaNomesProduto,
      buscaNomesMarcas,
      buscaNomesFabricantes,
      setaProdutosFiltrados,
      buscaInformacoesNutricionais
    },
    dispatch
  );

BuscaAvancada = reduxForm({
  form: "buscaAvancadaDeProduto"
})(BuscaAvancada);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuscaAvancada);
