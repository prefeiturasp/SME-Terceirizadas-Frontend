import React from "react";
import { Field } from "react-final-form";
import BorderlessInput from "../../../BorderlessInput";

import "./styles.scss";

export default ({formValues, prefix}) => (
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
      <div>{formValues.data_lancamento && formValues.data_lancamento.substring(0, 2)}</div>
      <div>
        <Field component={BorderlessInput} name={`${prefix}.frequencia`}/>
      </div>
      <div>
        <Field component={BorderlessInput} name={`${prefix}.lanche_4h`}/>
      </div>
      <div>
        <Field component={BorderlessInput} name={`${prefix}.lanche_5h`}/>
      </div>
    </div>
  </div>
);
