import React from "react";
import "./style.scss";

export const InputErroMensagemCKEditor = (props) => {
  const { meta, touched } = props;

  return (
    <div className="error-or-warning-message">
      {touched &&
        meta &&
        ((meta.error && <div className="error-message">{meta.error}</div>) ||
          (meta.warning && (
            <div className="warning-message">{meta.warning}</div>
          )))}
    </div>
  );
};

export default InputErroMensagemCKEditor;
