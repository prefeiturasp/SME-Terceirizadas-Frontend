import React, { Component } from "react";
import { Stand } from "react-burgers";
import "./style.scss";

export default class CardMatriculados extends Component {
  render() {
    const { collapsed, numeroAlunos } = this.props;
    return (
      <div className="card mt-3">
        <div className="card-body card-enrolled">
          <div className="row title">Nº de Matriculados</div>
          <div className="row">
            <div className="rectangle">{numeroAlunos}</div>
            <div className="col-4 beside-text my-auto">
              Informação automática disponibilizada no <br />
              <span>Cadastro da Unidade Escolar</span>
            </div>
            {collapsed !== undefined && <div className="offset-5 col-1 my-auto text-right">
              <Stand
                onClick={this.props.alterarCollapse}
                color={"#C8C8C8"}
                width={18}
                padding={0}
                lineHeight={3}
                lineSpacing={3}
                active={!collapsed}
              />
            </div>}
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
