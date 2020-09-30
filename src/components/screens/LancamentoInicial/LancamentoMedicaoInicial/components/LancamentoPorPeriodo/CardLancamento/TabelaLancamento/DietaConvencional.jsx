import React from "react";
import BorderlessInput from "../../../BorderlessInput";

import "./styles.scss";

export default ({formValues}) => (
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
      <div>{formValues.data_lancamento && formValues.data_lancamento.substring(0, 2)}</div>
      <div>
        <BorderlessInput />
      </div>
      <div>
        <BorderlessInput />
      </div>
      <div>
        <BorderlessInput />
      </div>
      <div>
        <BorderlessInput />
      </div>
    </div>
  </div>
);
