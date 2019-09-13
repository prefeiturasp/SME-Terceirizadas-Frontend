import React from "react";
import "./style.scss";

export const HelpText = props => {
  const { helpText } = props;
  return <div className="help-text">{helpText}</div>;
};
