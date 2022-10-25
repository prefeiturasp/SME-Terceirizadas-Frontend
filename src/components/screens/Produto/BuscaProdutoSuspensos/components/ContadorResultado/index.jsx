import React from "react";
import "./styles.scss";

const ContadorResultado = ({ filtros, produtosCount, totalSuspensos }) => {
  return (
    <div className="card-body">
      <div className="row">
        <div className="col-md-12 col-xl-12 mb-3">
          <span className="titulo-quantitativo-supenso">
            QUANTITATIVO GERAL DE PRODUTO SUSPENSOS
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 col-xl-12">
          <table className="table table-bordered table-items">
            <thead>
              <tr className="table-head-items">
                <th className="total-suspensos">
                  Total de itens suspensos: <b>{totalSuspensos}</b>
                </th>
                {!["", undefined].includes(filtros.nome_edital) && (
                  <th className="total-suspensos">
                    Total de itens {filtros.nome_edital}: <b>{produtosCount}</b>
                  </th>
                )}
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContadorResultado;
