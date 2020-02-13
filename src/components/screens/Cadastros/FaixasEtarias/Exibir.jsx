import React, { Fragment } from "react";

import Botao from "../../../Shareable/Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "../../../Shareable/Botao/constants";

import { faixaToString } from "./helper";

const FaixasEtariasExibir = ({ faixasEtarias, onRedefinir }) => (
  <Fragment>
    <h5>Resumo do cadastro</h5>
    <table className="table table-bordered">
      <thead className="thead-light">
        <th scope="col">Tipos de faixas etárias</th>
      </thead>
      <tbody>
        {faixasEtarias.map((faixaEtaria, index) => (
          <tr key={index}>
            <td>{faixaToString(faixaEtaria)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <Botao
      texto="Redefinir"
      className="float-right"
      type={BUTTON_TYPE.BUTTON}
      style={BUTTON_STYLE.GREEN_OUTLINE}
      onClick={onRedefinir}
    />
  </Fragment>
);

export default FaixasEtariasExibir;
