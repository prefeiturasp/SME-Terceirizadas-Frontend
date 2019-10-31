import React from "react";
import "./style.scss";

export const ToggleExpandir = props => {
  const { onClick, ativo, className } = props;
  return (
    <span
      onClick={onClick}
      className={`toggle-expandir ${className}`}
      data-cy="botao-expandir"
    >
      {ativo ? (
        <i className="fas fa-chevron-up" />
      ) : (
        <i className="fas fa-chevron-down" />
      )}
    </span>
  );
};
