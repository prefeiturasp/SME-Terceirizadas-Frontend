import React, { useState } from "react";
import { FormBuscaProduto } from "components/Shareable/FormBuscaProduto";
import "./style.scss";
import { getProdutosPorParametros } from "services/produto.service";
import { TabelaProdutos } from "./TabelaProdutos";

export const AvaliarReclamacaoProduto = () => {
  const [produtos, setProdutos] = useState(null);

  const onSubmit = async values => {
    const response = await getProdutosPorParametros(values);
    setProdutos(response.data.results);
  };

  return (
    <div className="card avaliar-reclamacao-produto">
      <div className="card-body">
        <h2>
          Consulte cadastro completo de produto antes de avaliar reclamação
        </h2>
        <FormBuscaProduto
          naoExibirRowTerceirizadas
          onSubmit={onSubmit}
          statusSelect
        />
        <TabelaProdutos produtos={produtos} />
      </div>
    </div>
  );
};

export default AvaliarReclamacaoProduto;
