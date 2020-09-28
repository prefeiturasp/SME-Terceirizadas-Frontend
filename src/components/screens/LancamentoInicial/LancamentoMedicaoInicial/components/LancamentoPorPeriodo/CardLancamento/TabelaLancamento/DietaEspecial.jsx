import React from "react";
import BorderlessInput from "../../../BorderlessInput";

import "./styles.scss";

export default () => (
  <div className="tabela-lancamento tabela-dieta-especial">
    <div className="cabecalho-tabela">
      <div>
        <span>Dia</span>
      </div>
      <div>
        <span>Freq.</span>
      </div>
      <div>
        <span>
          Lanche
          <br />4 h
        </span>
      </div>
      <div>
        <span>
          Lanche
          <br />5 h
        </span>
      </div>
    </div>
    <div className="linha-tabela">
      <div>08</div>
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
