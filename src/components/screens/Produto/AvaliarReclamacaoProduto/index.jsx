import React from "react";
import { FormBuscaProduto } from "components/Shareable/FormBuscaProduto";

export const AvaliarReclamacaoProduto = () => {
  const onSubmit = () => {};

  return (
    <div className="card">
      <div className="card-body">
        <FormBuscaProduto
          onSubmit={onSubmit}
          naoExibirRowTerceirizadas
          statusSelect
        />
      </div>
    </div>
  );
};

export default AvaliarReclamacaoProduto;
