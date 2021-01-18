import React from "react";

const TabelaAgrupadaProdutosMarcas = ({ dadosProdutos }) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Nome do Produto</th>
            <th>Marca</th>
          </tr>
        </thead>
        <tbody>
          {dadosProdutos &&
            Object.entries(dadosProdutos).map(([nome, marcas], index) => {
              return (
                <tr key={index}>
                  <td>{nome}</td>
                  <td>{marcas}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaAgrupadaProdutosMarcas;
