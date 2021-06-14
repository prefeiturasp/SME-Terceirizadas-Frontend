import React from "react";
import "./style.scss";

export default ({ resultado }) => {
  return (
    <div className="row">
      <div className="col-12">
        <table className="table table-bordered table-alimentacao">
          <thead>
            <tr className="table-head-alimentacao">
              <th>Nome do Protocolo Padrão</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {resultado.results.map((protocoloPadrao, idx) => {
              return (
                <tr className="table-body-alimentacao" key={idx}>
                  <td>{protocoloPadrao.nome_protocolo}</td>
                  <td>{protocoloPadrao.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
