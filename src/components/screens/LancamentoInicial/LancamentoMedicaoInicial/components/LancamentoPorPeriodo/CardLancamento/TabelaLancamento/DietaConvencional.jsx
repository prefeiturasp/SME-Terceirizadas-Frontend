import React from "react";

import "./styles.scss";

export default () => (
  <div className="tabela-lancamento tabela-dieta-convencional">
    <div className="cabecalho-tabela">
      <div>
        <span>Dia</span>
      </div>
      <div>
        <span>
          Troca
          <br />
          (RPL/LPR)
        </span>
      </div>
      <div>
        <span>
          Merenda
          <br />
          seca
        </span>
      </div>
      <div>
        <span>Kit lanche</span>
      </div>
      <div>
        <span>
          Sobremesa
          <br />
          doce
        </span>
      </div>
    </div>
    <div className="linha-tabela">
      <div>08</div>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);
