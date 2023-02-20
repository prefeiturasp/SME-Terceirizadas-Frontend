import React, { useState } from "react";
import { Pagination } from "antd";

import "./style.scss";

const TabelaAgrupadaProdutosMarcas = ({
  dadosProdutos,
  filtros,
  getProdutosHomologados,
  quantidadeHomologados
}) => {
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 10;

  const onChangePagination = page => {
    setPage(page);
    getProdutosHomologados({
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
      ...filtros
    });
  };

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
            dadosProdutos.map((produto, index) => {
              return (
                <tr key={index} className="table-body-items">
                  <td>{produto.nome}</td>
                  <td>{produto.marca}</td>
                  <td>{produto.edital}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Pagination
        total={quantidadeHomologados}
        onChange={onChangePagination}
        current={page}
        pageSize={PAGE_SIZE}
      />
    </div>
  );
};

export default TabelaAgrupadaProdutosMarcas;
