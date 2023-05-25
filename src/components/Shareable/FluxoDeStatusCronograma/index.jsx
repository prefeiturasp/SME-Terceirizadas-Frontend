import {
  DETALHAR_ALTERACAO_CRONOGRAMA,
  PRE_RECEBIMENTO
} from "configs/constants";
import React from "react";
import { NavLink } from "react-router-dom";
import { tipoDeStatusClasse } from "./helper";
import "./style.scss";

export const FluxoDeStatusCronograma = ({ listaDeStatus }) => {
  const item = status => (
    <li
      className={`${tipoDeStatusClasse(status)}`}
      style={{ width: 100 / listaDeStatus.length + "%" }}
    >
      {status.criado_em}
      <br />
      {status.usuario && <span>{status.usuario && status.usuario.nome}</span>}
    </li>
  );

  return (
    <div className="w-100">
      <ul className={`progressbar-titles fluxos`}>
        {listaDeStatus.map((status, key) => {
          return <li key={key}>{status.status_evento_explicacao}</li>;
        })}
      </ul>
      <ul className="progressbar">
        {listaDeStatus.map((status, key) => {
          console.log(status);
          return status.justificativa ? (
            <NavLink
              className=""
              to={`/${PRE_RECEBIMENTO}/${DETALHAR_ALTERACAO_CRONOGRAMA}?uuid=${
                status.justificativa
              }`}
              key={key}
            >
              {item(status)}
            </NavLink>
          ) : (
            item(status)
          );
        })}
      </ul>
    </div>
  );
};
