import React, { useState } from "react";
import { Pagination } from "antd";

import "./style.scss";

const TabelaAgrupadaProdutosMarcas = ({ dadosProdutos }) => {
  const [page, setPage] = useState(1);

  const onChangePagination = page => {
    setPage(page);
  };

  const totalResultados = dadosProdutos && Object.keys(dadosProdutos).length;
  const pageSize = 10;
  const dadosProdutosPaginado =
    dadosProdutos &&
    Object.entries(dadosProdutos).slice(pageSize * (page - 1), pageSize * page);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th className="nome-produto">Nome do Produto</th>
            <th>Marca</th>
          </tr>
        </thead>
        <tbody>
          {dadosProdutos &&
            dadosProdutosPaginado.map(([nome, marcas], index) => {
              return (
                <tr key={index}>
                  <td>{nome}</td>
                  <td>{marcas.join(", ")}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Pagination
        total={totalResultados}
        onChange={onChangePagination}
        current={page}
        pageSize={pageSize}
      />
    </div>
  );
};

export default TabelaAgrupadaProdutosMarcas;
