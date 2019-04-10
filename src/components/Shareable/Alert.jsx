import React from "react";
import "./custom.css";
import "react-datepicker/dist/react-datepicker.css";
import If from "./layout";

export const ErrorAlert = ({ meta }) => {
  const isVisible = meta !== undefined;
  var divStyle = {
    color: "red"
  };
  return (
    <If isVisible={isVisible}>
      <div>
        {meta.touched &&
          ((meta.error && <span style={divStyle}>{meta.error}</span>) ||
            (meta.warning && <span style={divStyle}>{meta.warning}</span>))}
      </div>
    </If>
  );
};
