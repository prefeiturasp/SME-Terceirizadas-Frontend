import React, { Component } from "react";
import { Form, Field } from "react-final-form";

import AutoCompleteField from "./AutoCompleteField";
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

export default class FormBuscaProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomesProdutos: null,
      optionsProdutos: [],
      nomesMarcas: null,
      optionsMarcas: null,
      nomesFabricantes: null,
      optionsFabricantes: null,

      resultadosProduto: [],

      parametrosBusca: {
        nome_fabricante: "",
        nome_marca: "",
        nome_produto: ""
      }
    };
  }
  retornaListaDeNomes = arrayObjetos => {
    let arrayNomes = [];
    arrayObjetos.forEach(objeto => {
      arrayNomes.push(objeto.nome);
    });
    return arrayNomes;
  };
  componentWillMount = async () => {
    const { nomesProdutos, nomesMarcas, nomesFabricantes } = this.state;
    if (
      nomesProdutos === null &&
      nomesMarcas === null &&
      nomesFabricantes === null
    ) {
      const produtos = await getNomesProdutos();
      const marcas = await getNomesMarcas();
      const fabricantes = await getNomesFabricantes();

      this.setState({
        nomesProdutos: this.retornaListaDeNomes(produtos.data.results),
        nomesMarcas: this.retornaListaDeNomes(marcas.data.results),
        nomesFabricantes: this.retornaListaDeNomes(fabricantes.data.results)
      });
    }
  };
  onSearchProduto = searchText => {
    const { nomesProdutos } = this.state;
    let options = !searchText
      ? []
      : nomesProdutos.filter(element =>
          element.toUpperCase().includes(searchText.toUpperCase())
        );
    this.setState({
      optionsProdutos: options
    });
  };

  onSearchMarca = searchText => {
    const { nomesMarcas } = this.state;
    let options = !searchText
      ? []
      : nomesMarcas.filter(element =>
          element.toUpperCase().includes(searchText.toUpperCase())
        );
    this.setState({
      optionsMarcas: options
    });
  };

  onSearchFabricantes = searchText => {
    const { nomesFabricantes } = this.state;
    let options = !searchText
      ? []
      : nomesFabricantes.filter(element =>
          element.toUpperCase().includes(searchText.toUpperCase())
        );
    this.setState({
      optionsFabricantes: options
    });
  };
  onSelectProduto = async nomeProduto => {
    this.setState(
      {
        "parametrosBusca.nome_produto": nomeProduto
      },
      this.atualizaBusca
    );
  };

  onSelectMarca = async nomeMarca => {
    this.setState(
      {
        "parametrosBusca.nome_marca": nomeMarca
      },
      this.atualizaBusca
    );
  };

  onSelectFabricante = async nomeFabricante => {
    this.setState(
      {
        "parametrosBusca.nome_fabricante": nomeFabricante
      },
      this.atualizaBusca
    );
  };

  render() {
    const { optionsProdutos, optionsMarcas, optionsFabricantes } = this.state;
    return (
      <Form
        onSubmit={this.props.onSubmit}
        render={({ form, handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit} className="busca-produtos-formulario">
            <Field
              component={AutoCompleteField}
              dataSource={optionsProdutos}
              label="Nome do Produto"
              className="input-busca-produto"
              onSearch={this.onSearchProduto}
              name="nome_produto"
            />
            <div className="marca-fabricante-inputs">
              <Field
                component={AutoCompleteField}
                dataSource={optionsMarcas}
                label="Marca do Produto"
                onSearch={this.onSearchMarca}
                name="nome_marca"
              />
              <Field
                component={AutoCompleteField}
                dataSource={optionsFabricantes}
                label="Fabricante do Produto"
                onSearch={this.onSearchFabricantes}
                name="nome_fabricante"
              />
            </div>
            <div className="mt-4">
              <Botao
                texto="Consultar"
                type={BUTTON_TYPE.SUBMIT}
                style={BUTTON_STYLE.GREEN}
                className="float-right ml-3"
                disabled={submitting}
              />
            </div>
          </form>
        )}
      />
    );
  }
}
