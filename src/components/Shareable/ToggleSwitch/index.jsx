import React from "react";
import "./style.scss";

export const ToggleSwitch = props => {
  const { texto, onClick } = props;
  return (
    <div className="toggle-switch">
      <span>{texto}</span>
      <label className="switch">
        <input type="checkbox" onClick={onClick} />
        <span className="slider round" />
      </label>
    </div>
  );
};
