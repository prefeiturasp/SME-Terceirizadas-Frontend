import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import CardLogo from "../../Shareable/CardLogo/CardLogo";
import IconeGestaoDeAlimentacao from "../../Shareable/Icones/IconeGestaoDeAlimentacao";
import IconeDietaEspecial from "../../Shareable/Icones/IconeDietaEspecial";

class PainelInicial extends Component {
  render() {
    return (
      <div className="row mt-3">
        <div
          className="col-4"
          onClick={() => this.props.history.push("/painel-gestao-alimentacao")}
        >
          <CardLogo titulo={"Gestão de Alimentação"}>
            <IconeGestaoDeAlimentacao />
          </CardLogo>
        </div>
        <div
          className="col-4"
          onClick={() => this.props.history.push("/painel-dieta-especial")}
        >
          <CardLogo titulo={"Dieta Especial"}>
            <IconeDietaEspecial />
          </CardLogo>
        </div>
      </div>
    );
  }
}

export default withRouter(PainelInicial);
