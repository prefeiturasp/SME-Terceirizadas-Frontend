import React, { Fragment, useState } from "react";
import "./style.scss";
import { NOME_STATUS } from "./helpers";
import { DadosReclamacaoProduto } from "./components/DadosReclamacao";
import { DadosProduto } from "./components/DadosProduto";
import { Botoes } from "./components/Botoes";

export const TabelaProdutos = ({ produtos, exibirDadosProduto }) => {
  const [verProduto, setVerProduto] = useState(false);

  return (
    <div className="tabela-lista-produtos">
      {produtos && (
        <table>
          <thead>
            <tr className="row">
              <th className="col-3">Nome do Produto</th>
              <th className="col-2">Marca</th>
              <th className="col-3">Fabricante</th>
              <th className="col-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {produtos.length === 0 && (
              <div className="p-3">Nenhum resultado encontrado.</div>
            )}
            {produtos.map((produto, key) => {
              return [
                <tr className="row" key={key}>
                  <td className="col-3">{produto.nome}</td>
                  <td className="col-2">
                    {produto.marca && produto.marca.nome}
                  </td>
                  <td className="col-3">
                    {produto.fabricante && produto.fabricante.nome}
                  </td>
                  <td className="col-4">
                    {produto.ultima_homologacao &&
                      NOME_STATUS[produto.ultima_homologacao.status]}
                    <i
                      className={`fas fa-${
                        produto.exibir ? "angle-up" : "angle-down"
                      }`}
                      onClick={() => exibirDadosProduto(key)}
                    />
                  </td>
                </tr>,
                produto.exibir && (
                  <Fragment>
                    <DadosReclamacaoProduto
                      produto={produto}
                      verProduto={verProduto}
                      setVerProduto={setVerProduto}
                    />
                    {verProduto && <DadosProduto produto={produto} />}
                    <Botoes
                      verProduto={verProduto}
                      setVerProduto={setVerProduto}
                    />
                  </Fragment>
                )
              ];
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
