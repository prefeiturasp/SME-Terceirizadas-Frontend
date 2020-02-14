import React from "react";
import { Link } from "react-router-dom";
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
        {lotes.map(function(lote, key) {
          return (
            <tr key={key}>
              <td>
                <Link to={`/configuracoes/cadastros/lote?uuid=${lote.uuid}`}>
                  {lote.nome}
                </Link>
              </td>
              <td>
                <Link to="#">{lote.diretoria_regional.nome}</Link>
              </td>
              <td className="pl-5">{lote.tipo_gestao}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default TabelaHistoricoLotesDREs;
