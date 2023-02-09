import React from "react";

export const CardMedicaoPorStatus = ({ ...props }) => {
  const { children, total, classeCor } = props;

  return (
    <div className={`card-medicao-por-status ${classeCor} mr-3`}>
      <div className="p-2">
        <div className="titulo">{children}</div>
        <hr />
        <div className="total">{total}</div>
        <div className="conferir-lista">Conferir lista</div>
      </div>
    </div>
  );
};
