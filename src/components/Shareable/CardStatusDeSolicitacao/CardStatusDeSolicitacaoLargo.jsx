import React from "react";
import "./style.scss";
import { caminhoURL } from "./helper";
import { NavLink } from "react-router-dom";
import { RELATORIO } from "../../../configs/constants";

export const CardStatusDeSolicitacaoLargo = props => {
  const { titulo, tipo, solicitacoes, icone } = props;
  return (
    <div className={`card card-panel card-colored ${tipo} mb-4 mr-4`}>
      <div className="card-title-status">
        <i className={"fas " + icone} />
        {titulo}
      </div>
      <hr />
      <div className="card-body card-body-sme overflow-auto">
        {solicitacoes.map((solicitacao, key) => {
          return (
            <NavLink
              key={key}
              to={
                solicitacao.link ||
                `${caminhoURL(solicitacao.tipo_doc)}/${RELATORIO}?uuid=${
                  solicitacao.uuid
                }&ehInclusaoContinua=${solicitacao.tipo_doc ===
                  "INC_ALIMENTA_CONTINUA"}`
              }
            >
              <p className="data">
                {solicitacao.descricao || solicitacao.text}
                <span className="mr-3 float-right">
                  {solicitacao.data_log || solicitacao.date}
                </span>
              </p>
            </NavLink>
          );
        })}
      </div>
      <div className="pb-3" />
    </div>
  );
};
