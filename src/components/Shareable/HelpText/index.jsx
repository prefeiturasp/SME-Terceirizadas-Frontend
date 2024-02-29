import React from "react";
import "./style.scss";

export const HelpText = (props) => {
  const { helpText, customHelpTextClassName } = props;
  return (
    <div className={`help-text ${customHelpTextClassName}`}>{helpText}</div>
  );
};
