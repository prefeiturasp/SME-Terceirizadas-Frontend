import React from "react";

//TODO: fazer componente de paginacao

export const Paginacao = props => {
  const { tamanho } = props;
  return (
    <nav aria-label="...">
      <ul className={`pagination pagination-${tamanho}`}>
        <li className="page-item disabled">
          <a className="page-link" href="#" tabIndex="-1">
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
