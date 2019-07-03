import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import If from "./layout";

// TODO: colocar fonte roboto
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
