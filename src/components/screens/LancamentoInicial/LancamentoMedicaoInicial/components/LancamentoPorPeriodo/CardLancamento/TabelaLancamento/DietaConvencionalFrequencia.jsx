import React from "react";
import BorderlessInput from "../../../BorderlessInput";

import "./styles.scss";

export default () => (
  <div className="tabela-lancamento tabela-dieta-convencional-frequencia">
    <div className="cabecalho-tabela">
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
      <div>
        <span>
          Refeição
          <br />
          1ª oferta
        </span>
      </div>
      <div>
        <span>
          Repet.
          <br />
          refeição
        </span>
      </div>
      <div>
        <span>
          Sobremesa
          <br />
          1ª oferta
        </span>
      </div>
      <div>
        <span>
          Repet.
          <br />
          sobremesa
        </span>
      </div>
    </div>
    <div className="linha-tabela">
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
