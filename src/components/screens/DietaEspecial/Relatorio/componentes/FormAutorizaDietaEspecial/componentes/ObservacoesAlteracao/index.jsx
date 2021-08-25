import React from "react";

const ObservacoesAlteracao = observacoes => {
  return (
    <div className="row">
      <div className="col-md-12">
        <p className="mt-3 label">Observações da Alteração</p>
        <div
          className="orientacoes"
          dangerouslySetInnerHTML={{
            __html: observacoes.observacoes
          }}
        />
      </div>
    </div>
  );
};

export default ObservacoesAlteracao;
