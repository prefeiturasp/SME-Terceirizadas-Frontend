import React from "react";
import "./style.scss";

export const ToggleExpandir = props => {
  const { onClick, ativo } = props;
  return (
    <span onClick={onClick} className="toggle-expandir">
      {ativo ? (
        <i class="fas fa-chevron-up" />
      ) : (
        <i class="fas fa-chevron-down" />
      )}
    </span>
  );
};
