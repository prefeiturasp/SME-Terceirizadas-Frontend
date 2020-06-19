import React, { Fragment, useState } from "react";
import { FormBuscaProduto } from "components/Shareable/FormBuscaProduto";
import { getProdutosPorFiltro } from "services/produto.service";
import { TabelaProdutos } from "./components/TabelaProdutos";
import { deepCopy } from "helpers/utilities";
import { formatarValues } from "./helpers";
import "./style.scss";
import { VerProduto } from "./components/VerProduto";

export const AvaliarReclamacaoProduto = () => {
  const [produtos, setProdutos] = useState(null);
  const [verProduto, setVerProduto] = useState(null);

  const onSubmit = async values => {
    const values_ = deepCopy(values);
    const response = await getProdutosPorFiltro(formatarValues(values_));
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
        {!verProduto && (
          <Fragment>
            <h2>
              Consulte cadastro completo de produto antes de avaliar reclamação
            </h2>
            <FormBuscaProduto
              naoExibirRowTerceirizadas
              onSubmit={onSubmit}
              statusSelect
            />
            <TabelaProdutos
              verProduto={verProduto}
              setVerProduto={setVerProduto}
              produtos={produtos}
              exibirDadosProduto={exibirDadosProduto}
            />
          </Fragment>
        )}
        {verProduto && (
          <VerProduto setVerProduto={setVerProduto} produto={verProduto} />
        )}
      </div>
    </div>
  );
};

export default AvaliarReclamacaoProduto;
