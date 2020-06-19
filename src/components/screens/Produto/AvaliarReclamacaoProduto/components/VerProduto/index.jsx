import React from "react";
import { DadosReclamacaoProduto } from "../DadosReclamacao";
import { DadosProduto } from "../DadosProduto";
import { Botoes } from "../Botoes";

export const VerProduto = ({ ...props }) => {
  return (
    <div>
      <Botoes {...props} verUnicoProduto />
      <DadosReclamacaoProduto {...props} />
      <DadosProduto {...props} />
      <Botoes {...props} verUnicoProduto />
    </div>
  );
};
