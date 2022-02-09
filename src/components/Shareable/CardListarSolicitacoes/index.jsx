import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";
import { RELATORIO } from "../../../configs/constants";
import { caminhoURL } from "../CardStatusDeSolicitacao/helper";
import { conferidaClass } from "helpers/terceirizadas";

export class CardListarSolicitacoes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solicitacoes: this.props.solicitacoes
    };
  }

  render() {
    const { titulo, tipo, solicitacoes, icone } = this.props;
    return (
      <Fragment>
        <div className={`card card-list-panel card-colored ${tipo} mb-4 mr-4`}>
          <div className="card-title-status">
            <i className={"fas " + icone} />
            {titulo}
            <span className="float-right pr-4">Data/Hora</span>
          </div>
          <hr />
          <div className="card-body card-body-sme">
            <div className="card-listagem-solicitacoes">
              {solicitacoes.map((value, key) => {
                let conferida = conferidaClass(value, titulo);
                return (
                  <div key={key} className="row">
                    <div className="col-9">
                      <NavLink
                        key={key}
                        to={
                          value.link ||
                          `${caminhoURL(value.tipo_doc)}/${RELATORIO}?uuid=${
                            value.uuid
                          }&ehInclusaoContinua=${value.tipo_doc ===
                            "INC_ALIMENTA_CONTINUA"}`
                        }
                      >
                        <p className={`data ml-4 ${conferida}`}>{value.text}</p>
                      </NavLink>
                    </div>
                    <span className={`date-time col-3 text-right ${conferida}`}>
                      {value.date}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="pb-3" />
        </div>
      </Fragment>
    );
  }
}

export default CardListarSolicitacoes;
