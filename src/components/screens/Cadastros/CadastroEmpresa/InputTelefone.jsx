import React, { Component } from "react";
import MaskedInput from "react-text-mask";

class TelefoneOuCelular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ehCelular: false
    };
  }

  verificaCampo(valor) {
    const quantidadeInput = valor.length;
    if (quantidadeInput <= 12) {
      return [
        /[1-9]/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ];
    }
    if (quantidadeInput > 12) {
      return [
        /[1-9]/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ];
    }
  }

  render() {
    const {
      setaContatosEmpresa,
      setaContatoRepresentante,
      setaContatosNutricionista,
      indice,
      cenario,
      name,
      id,
      input
    } = this.props;
    return (
      <MaskedInput
        {...input}
        name={name}
        id={id}
        mask={valor => this.verificaCampo(valor)}
        className="form-control"
        guide={false}
        onChange={event => {
          cenario === "contatoEmpresa"
            ? setaContatosEmpresa("telefone", event.target.value, indice)
            : cenario === "contatoRepresentante"
            ? setaContatoRepresentante(event.target.value, indice)
            : setaContatosNutricionista("telefone", event.target.value, indice);
        }}
      />
    );
  }
}

export default TelefoneOuCelular;
