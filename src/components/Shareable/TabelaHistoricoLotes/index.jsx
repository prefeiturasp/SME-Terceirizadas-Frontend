import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

export const TabelaHistoricoLotes = props => {
  return (
    <div className="table-lote">
      <p className="pt-3">Lotes pertencentes à {props.tipoPerfil || "DRE"}</p>
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
                  <Link
                    to={{
                      pathname: `/configuracoes/cadastros/lote`,
                      state: {
                        prevPath: window.location.pathname,
                        uuid: lote.uuid
                      }
                    }}
                  >
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
