import React from "react";
import BorderlessInput from "../../../BorderlessInput";
import CabecalhoDietaConvencional from "./CabecalhoDietaConvencional";

import "./styles.scss";

export default ({ formValues }) => (
  <div className="tabela-lancamento tabela-dieta-convencional">
    <CabecalhoDietaConvencional />
    <div className="linha-tabela">
      <div>
        {formValues.data_lancamento &&
          formValues.data_lancamento.substring(0, 2)}
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
