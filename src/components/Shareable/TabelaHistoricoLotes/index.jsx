import React from "react";
import "./style.scss";

export const TabelaHistoricoLotes = props => {
  return (
    <div className="table-lote">
      <p className="pt-3">Lotes pertencentes à DRE</p>
      <table>
        <tr>
          <th>Lote</th>
          <th>Tipo de Gestão</th>
        </tr>
        {props.lotes &&
          props.lotes.map(lote => {
            return (
              <tr>
                <td>{lote.nome}</td>
                <td>{lote && lote.tipo_gestao && lote.tipo_gestao.nome}</td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default TabelaHistoricoLotes;
