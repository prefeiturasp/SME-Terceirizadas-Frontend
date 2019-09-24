import React from "react";
import "./style.scss";

export const ToggleExpandir = props => {
  const { onClick, ativo, className } = props;
  return (
    <span onClick={onClick} className={`toggle-expandir ${className}`}>
      {ativo ? (
        <i class="fas fa-chevron-up" />
      ) : (
        <i class="fas fa-chevron-down" />
      )}
    </span>
  );
};
