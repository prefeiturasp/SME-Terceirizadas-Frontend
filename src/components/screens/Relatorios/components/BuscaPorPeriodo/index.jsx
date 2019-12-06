import React, { Component } from "react";
import { meusDados } from "../../../../../services/perfil.service";
import FiltrosDeBusca from "./FiltrosDeBusca";

class BuscaPorPeriodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meusDados: null
    };
  }

  componentDidMount() {
    meusDados().then(response => {
      this.setState({
        meusDados: response
      });
    });
  }

  render() {
    const { meusDados } = this.state;
    const { limpaForm, paginacao } = this.props;
    return (
      <FiltrosDeBusca
        meusDados={meusDados}
        renderizarRelatorio={this.props.renderizarRelatorio}
        setaFalseLimpaForm={this.props.setaFalseLimpaForm}
        setaValuesForm={this.props.setaValuesForm}
        setaPaginacao={this.props.setaPaginacao}
        limpaForm={limpaForm}
      />
    );
  }
}

export default BuscaPorPeriodo;
