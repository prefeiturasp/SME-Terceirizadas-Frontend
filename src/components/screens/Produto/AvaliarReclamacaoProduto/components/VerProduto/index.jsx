import React from "react";
import { DadosReclamacaoProduto } from "../DadosReclamacao";
import { DadosProduto } from "../DadosProduto";
import { Botoes } from "../Botoes";

export const VerProduto = ({ produto, setVerProduto }) => {
  return (
    <div>
      <Botoes produto={produto} verUnicoProduto setVerProduto={setVerProduto} />
      <DadosReclamacaoProduto produto={produto} />
      <DadosProduto produto={produto} />
      <Botoes produto={produto} verUnicoProduto setVerProduto={setVerProduto} />
    </div>
  );
};
