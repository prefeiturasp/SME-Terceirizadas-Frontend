import React from "react";
import "./style.scss";

export const TabelaProdutos = props => {
  const { produtos } = props;
  return (
    <div className="tabela-lista-produtos">
      {produtos && (
        <table>
          <thead>
            <tr className="row">
              <th className="col-3">Nome do Produto</th>
              <th className="col-3">Marca</th>
              <th className="col-3">Fabricante</th>
              <th className="col-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto, key) => {
              return (
                <tr className="row" key={key}>
                  <td className="col-3">{produto.nome}</td>
                  <td className="col-3">
                    {produto.marca && produto.marca.nome}
                  </td>
                  <td className="col-3">
                    {produto.fabricante && produto.fabricante.nome}
                  </td>
                  <td className="col-3">
                    {produto.ultima_homologacao &&
                      produto.ultima_homologacao.status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
