import React from "react";
import { Field } from "react-final-form"
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
        <Field component={BorderlessInput} name="convencional.frequencia" disabled/>
      </div>
      <div>
        <Field component={BorderlessInput} name="convencional.lanche_4h"/>
      </div>
      <div>
        <Field component={BorderlessInput} name="convencional.lanche_5h"/>
      </div>
      <div>
        <Field component={BorderlessInput} name="convencional.refeicoes.0.ref_oferta"/>
      </div>
      <div>
        <Field component={BorderlessInput} name="convencional.refeicoes.0.ref_repet"/>
      </div>
      <div>
        <Field component={BorderlessInput} name="convencional.refeicoes.0.sob_oferta"/>
      </div>
      <div>
        <Field component={BorderlessInput} name="convencional.refeicoes.0.sob_repet"/>
      </div>
    </div>
  </div>
);
