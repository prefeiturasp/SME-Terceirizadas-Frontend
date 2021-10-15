import React from "react";

const JustificativaNegacao = ({ justificativaNegacao }) => {
  return (
    <div className="row mt-3 mb-3">
      <div className="col-12 mb-3">
        <label className="sectionName">Justificativa da Negação</label>
      </div>
      <div className="col-12">
        <div
          name="justificativa_negacao"
          className="orientacoes"
          dangerouslySetInnerHTML={{
            __html: justificativaNegacao
          }}
        />
      </div>
    </div>
  );
};

export default JustificativaNegacao;
