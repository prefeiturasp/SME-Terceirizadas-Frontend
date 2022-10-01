import React, { useState } from "react";
import { Pagination } from "antd";

import "./style.scss";

const TabelaAgrupadaProdutosMarcas = ({ dadosProdutos }) => {
  const [page, setPage] = useState(1);

  const onChangePagination = page => {
    setPage(page);
  };

  const totalResultados = dadosProdutos && dadosProdutos.length;
  const pageSize = 10;
  const dadosProdutosPaginado =
    dadosProdutos &&
    dadosProdutos.slice(pageSize * (page - 1), pageSize * page);

  return (
    <div>
      <table className="table table-bordered table-items">
        <thead>
          <tr className="table-head-items">
            <th>Produto</th>
            <th>Marcas</th>
            <th>Editais</th>
          </tr>
        </thead>
        <tbody>
          {dadosProdutos &&
            dadosProdutosPaginado.map((produto, index) => {
              return (
                <tr key={index} className="table-body-items">
                  <td>{produto.nome}</td>
                  <td>{produto.marcas ? produto.marcas.join(", ") : ""}</td>
                  <td>{produto.editais ? produto.editais.join(", ") : ""}</td>
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
