import React from "react";
import "./style.scss";

export const CardLogo = props => {
  const { titulo, disabled } = props;
  return (
    <div className={disabled ? "card card-logo disabled" : "card card-logo"}>
      <div className="card-body">
        <div className="icon-component">{props.children}</div>
        <div className="card-title">{titulo}</div>
      </div>
    </div>
  );
};

export default CardLogo;
