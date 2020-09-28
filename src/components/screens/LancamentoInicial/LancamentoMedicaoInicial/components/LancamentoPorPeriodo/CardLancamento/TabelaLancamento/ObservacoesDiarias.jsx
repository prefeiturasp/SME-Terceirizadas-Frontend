import React from "react";

import "./styles.scss";

export default ({ nome_campo, valor }) => (
  <div className="tabela-lancamento tabela-campo-unico">
    <div className="cabecalho-tabela">
      <div>
        <span>{nome_campo}</span>
      </div>
    </div>
    <div className="linha-tabela">
      <div>{valor}</div>
    </div>
  </div>
);
