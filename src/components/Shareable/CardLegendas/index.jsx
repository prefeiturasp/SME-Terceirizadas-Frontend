import React from "react";

export default () => (
  <div>
    <p className="caption">Legenda</p>
    <div className="caption-choices">
      <span className="mr-0">
        <i className="fas fa-check" />
        Solicitação Autorizada
      </span>
      <span className="mr-0">
        <i className="fas fa-exclamation-triangle" />
        Solicitação Aguardando Autorização
      </span>
      <span className="mr-0">
        <i className="fas fa-exclamation-triangle" />
        Solicitação Aguardando Respota da Empresa
      </span>
      <span className="mr-0">
        <i className="fas fa-ban" />
        Solicitação Negada
      </span>

      <span>
        <i className="fas fa-times-circle" />
        Solicitação Cancelada
      </span>
    </div>
  </div>
);
