import React from "react";
import { DadosReclamacaoProduto } from "../DadosReclamacao";
import { DadosProduto } from "../DadosProduto";
import { Botoes } from "../Botoes";
import { NOME_STATUS } from "../TabelaProdutos/helpers";

export const VerProduto = ({ ...props }) => {
  return (
    <div>
      <Botoes {...props} verUnicoProduto />
      <div className="row">
        <div className="col-3 report-label-value">
          <p>Nome do produto</p>
          <p className="value">{props.produto.nome}</p>
        </div>
        <div className="col-2 report-label-value">
          <p>Marca</p>
          <p className="value">
            {props.produto.marca && props.produto.marca.nome}
          </p>
        </div>
        <div className="col-3 report-label-value">
          <p>Fabricante</p>
          <p className="value">
            {props.produto.fabricante && props.produto.fabricante.nome}
          </p>
        </div>
        <div className="col-4 report-label-value">
          <p>Status</p>
          <p className="value">
            {props.produto.ultima_homologacao &&
              NOME_STATUS[props.produto.ultima_homologacao.status]}
          </p>
        </div>
      </div>
      <hr />
      <DadosReclamacaoProduto {...props} />
      <DadosProduto {...props} />
      <Botoes {...props} verUnicoProduto />
    </div>
  );
};
