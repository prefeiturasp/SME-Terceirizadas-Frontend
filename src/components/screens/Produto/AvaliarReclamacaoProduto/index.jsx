import React, { useState } from "react";
import { FormBuscaProduto } from "components/Shareable/FormBuscaProduto";
import { getProdutosPorParametrosGenerico } from "services/produto.service";
import { TabelaProdutos } from "./TabelaProdutos";
import { deepCopy } from "helpers/utilities";
import { formatarValues } from "./helpers";
import "./style.scss";

export const AvaliarReclamacaoProduto = () => {
  const [produtos, setProdutos] = useState(null);

  const onSubmit = async values => {
    const values_ = deepCopy(values);
    const response = await getProdutosPorParametrosGenerico(
      formatarValues(values_)
    );
    setProdutos(response.data.results);
  };

  const exibirDadosProduto = key => {
    const produtos_ = deepCopy(produtos);
    produtos_[key].exibir = !produtos_[key].exibir;
    setProdutos(produtos_);
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
        <TabelaProdutos
          produtos={produtos}
          exibirDadosProduto={exibirDadosProduto}
        />
      </div>
    </div>
  );
};

export default AvaliarReclamacaoProduto;
