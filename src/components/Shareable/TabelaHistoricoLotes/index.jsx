import React from "react";
import { Link } from "react-router-dom";
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
          props.lotes.map((lote, key) => {
            return (
              <tr key={key}>
                <td>
                  <Link to={`/configuracoes/cadastros/lote?uuid=${lote.uuid}`}>
                    {lote.nome}
                  </Link>
                </td>
                <td>
                  {lote &&
                    lote.tipo_gestao &&
                    (lote.tipo_gestao.nome || lote.tipo_gestao)}
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default TabelaHistoricoLotes;
