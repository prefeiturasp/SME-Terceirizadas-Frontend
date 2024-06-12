import React from "react";

import { formatarPara4Digitos } from "components/screens/helper";

export const CardPorStatus = ({ ...props }) => {
  const { cardStatus, classeCor } = props;

  return (
    <div className={`card-medicao-por-status ${classeCor} me-3 mb-3`}>
      <div className="pt-2">
        <div className="titulo">{cardStatus.label}</div>
        <hr />
        <div className="total">{formatarPara4Digitos(cardStatus.total)}</div>
        <div className="conferir-lista float-end">Conferir lista</div>
      </div>
    </div>
  );
};
