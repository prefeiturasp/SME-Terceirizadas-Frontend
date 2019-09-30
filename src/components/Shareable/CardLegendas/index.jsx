import React from "react";

export default () => (
  <div>
    <p className="caption">Legenda</p>
    <div className="caption-choices">
      <span className="mr-5">
        <i className="fas fa-check" />
        Solicitação Autorizada
      </span>
      <span className="mr-5">
        <i className="fas fa-exclamation-triangle" />
        Solicitação Aguardando Aprovação
      </span>
      <span className="mr-5">
        <i className="fas fa-ban" />
        Solicitação Recusada
      </span>

      <span>
        <i className="fas fa-times-circle" />
        Solicitação Cancelada
      </span>
    </div>
  </div>
);
