import React from "react";
import "../TabelaHistoricoLotes/style.scss";

export const TabelaHistoricoLotesDREs = props => {
  const { lotes } = props;
  return (
    <div className="table-lote">
      <p className="pt-3 blockquote-sme">Lotes</p>
      <table>
        <tr>
          <th>Lote</th>
          <th>DRE</th>
          <th className="pl-5">Tipo</th>
        </tr>
        {lotes.map(function(lote) {
          return (
            <tr>
              <td>{lote.lote}</td>
              <td>{lote.dre}</td>
              <td className="pl-5">{lote.tipo}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default TabelaHistoricoLotesDREs;
