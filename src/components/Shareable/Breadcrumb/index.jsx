import { TemaContext } from "context/TemaContext";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./style.scss";

export default ({ home, anteriores, atual }) => {
  const temaContext = useContext(TemaContext);
  return (
    <div className="breadcrumb-row row">
      <div className="col-10">
        <ul className="br-breadcrumb">
          <li>
            <Link className={`home ${!atual && "is-active"}`} to={home}>
              <i className="fas fa-home home" />
              Início
            </Link>
          </li>
          {anteriores &&
            anteriores.length > 0 &&
            anteriores.map((anterior, key) => {
              return (
                <li key={key}>
                  <Link to={anterior.href}>{anterior.titulo}</Link>
                </li>
              );
            })}
          {atual && (
            <li>
              <Link className="is-active" to={atual.href}>
                {atual.titulo}
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div
        className="col-2 text-end contrast"
        onClick={() => {
          temaContext.mudarTema();
        }}
      >
        <i className="fas fa-adjust" /> Contraste
      </div>
    </div>
  );
};
