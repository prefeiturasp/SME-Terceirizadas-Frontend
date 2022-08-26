import React, { useState } from "react";
import { Pagination } from "antd";

import "./style.scss";

const TabelaAgrupadaProdutosTerceirizadas = ({ dadosProdutos }) => {
  const [page, setPage] = useState(1);

  const onChangePagination = page => {
    setPage(page);
  };

  const totalResultados = dadosProdutos && dadosProdutos.length;
  const pageSize = 10;
  const dadosProdutosPaginado =
    dadosProdutos &&
    dadosProdutos.slice(pageSize * (page - 1), pageSize * page);

  return dadosProdutos ? (
    <div>
      <table className="table table-bordered table-items">
        <thead>
          <tr className="table-head-items">
            <th>Terceirizada</th>
            <th>Produto</th>
            <th>Marca</th>
            <th>Edital</th>
            <th>Tipo</th>
            <th>Cadastro</th>
            <th>Homologação</th>
          </tr>
        </thead>
        <tbody>
          {dadosProdutos &&
            dadosProdutosPaginado.map((produto, index) => {
              return (
                <tr key={index} className="table-body-items">
                  <td>{produto.terceirizada}</td>
                  <td>{produto.nome}</td>
                  <td>{produto.marca}</td>
                  <td>{produto.edital}</td>
                  <td>{produto.tipo}</td>
                  <td>{produto.cadastro}</td>
                  <td>{produto.homologacao}</td>
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
  ) : (
    <></>
  );
};

export default TabelaAgrupadaProdutosTerceirizadas;
