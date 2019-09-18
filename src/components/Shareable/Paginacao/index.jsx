import React from "react";
import { QUANTIDADE_POR_PAGINA } from "./constants";
import { Link } from "react-router-dom";

//TODO: fazer componente de paginacao

export const Paginacao = props => {
  const { tamanho, numeroDePaginas } = props;
  return (
    <nav aria-label="...">
      <ul className={`pagination pagination-${tamanho}`}>
        <li className="page-item disabled">
          <a className="page-link" href="#" tabindex="-1">
            1
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            2
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            3
          </a>
        </li>
      </ul>
    </nav>
  );
};
