import React from "react";
import "./styles.scss";

export default ({ urlAnexo }) => {
  return (
    <a
      href={urlAnexo}
      target="_blank"
      rel="noreferrer"
      className="link-botao-anexo"
    >
      <div className="botao-anexo mb-2">
        <i className="fas fa-eye green mr-2" />
        Visualizar Anexo
      </div>
    </a>
  );
};
