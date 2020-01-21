import React from "react";

export const SolicitacaoVigente = props => {
  const { solicitacoesVigentes } = props;
  return (
    <div>
      {solicitacoesVigentes && (
        <div>
          <p>Dietas Ativas</p>
          {solicitacoesVigentes.map((solicitacaoVigente, key) => {
            return <div key={key}>{SolicitacaoVigente.uuid}</div>;
          })}
        </div>
      )}
    </div>
  );
};

export default SolicitacaoVigente;
