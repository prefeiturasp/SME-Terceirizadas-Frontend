import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";

export default (props) => {
  const { tipo, icone, titulo, solicitacoes } = props;

  return (
    <>
      <div className={`card card-list-panel card-colored ${tipo} mb-4 mr-4`}>
        <div className="card-title-status">
          <i className={"fas " + icone} />
          {titulo}
          <span className="float-end pr-4">Data/Hora</span>
        </div>
        <hr />
        <div className="card-body card-body-sme">
          <div className="card-listagem-solicitacoes">
            {solicitacoes &&
              solicitacoes.map((value, key) => {
                return (
                  <div key={key} className="row">
                    <div className="col-9">
                      <NavLink key={key} to={value.link}>
                        <p className={`data ml-4`}>{`${value.texto}`}</p>
                      </NavLink>
                    </div>
                    <span className={`date-time col-3 text-right`}>
                      {value.data}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="pb-3" />
      </div>
    </>
  );
};
