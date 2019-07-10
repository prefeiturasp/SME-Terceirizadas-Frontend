import React, { Component } from "react";
import { Link } from "react-router-dom";
import CardLogo from "../../Shareable/CardLogo/CardLogo";
import IconePerfil from "../../Shareable/Icones/Cadastros/IconePerfil";
import IconeUnidadeEscolar from "../../Shareable/Icones/Cadastros/IconeUnidadeEscolar";
import IconeLote from "../../Shareable/Icones/Cadastros/IconeLote";
import IconeEmpresa from "../../Shareable/Icones/Cadastros/IconeEmpresa";
import "./style.scss"

class Cadastros extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gestaoDeAlimentacao: false
    };
  }

  render() {
    const { gestaoDeAlimentacao } = this.state;
    return (
      <div>
        <div className="row mt-3">
          <div
            className="col-4"
            onClick={() =>
              this.setState({ gestaoDeAlimentacao: !gestaoDeAlimentacao })
            }
          >
            <CardLogo titulo={"Cadastro de Perfis"} disabled>
              <IconePerfil />
            </CardLogo>
          </div>
          <div className="col-4">
            <CardLogo titulo={"Cadastro de Unidades Escolares"} disabled>
              <IconeUnidadeEscolar />
            </CardLogo>
          </div>
          <div className="col-4">
            <CardLogo titulo={"Cadastro de Lotes"} disabled>
              <IconeLote />
            </CardLogo>
          </div>
        </div>
        <div className="row mt-3">
          <div className="linked-card col-4">
            <Link to="/configuracoes/cadastros/lote">
              <CardLogo titulo={"Cadastro de Empresas"}>
                <IconeEmpresa />
              </CardLogo>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Cadastros;
