import React, { Fragment } from "react";

import { TIPO_PERFIL } from "constants/shared";

import "./styles.scss";

export default ({ dadosRelatorio }) => {
  console.log('dadosRelatorio', dadosRelatorio)
  if (dadosRelatorio.length === 0) return false;
  const primeiroRegistro = dadosRelatorio[0];
  const tipoUsuario = localStorage.getItem("tipo_perfil");
  const classeGrid = tipoUsuario === TIPO_PERFIL.ESCOLA ? "grid-escola" : tipoUsuario === TIPO_PERFIL.DIRETORIA_REGIONAL ? "grid-dre" : "grid-nutri";
  return (
    <section className="tabela-relatorio-quant-solic-dieta-esp">
      <div className={`header-quantitativo-por-terceirizada ${classeGrid}`}>
        {primeiroRegistro['aluno__escola__diretoria_regional__nome'] && <div>Diretoria Regional</div>}
        {primeiroRegistro['aluno__escola__nome'] && <div>Escola</div>}
        <div>Dietas pendentes</div>
        <div>Dietas ativas</div>
        <div>Dietas inativas</div>
      </div>
      {dadosRelatorio.map((item, index) => {
        return (
          <Fragment key={index}>
            <div className={`row-quantitativo-nome ${classeGrid}`}>
              {item.aluno__escola__diretoria_regional__nome && <div>{item.aluno__escola__diretoria_regional__nome}</div>}
              {item.aluno__escola__nome && <div>{item.aluno__escola__nome}</div>}
              <div>{item.qtde_pendentes}</div>
              <div>{item.qtde_ativas}</div>
              <div>{item.qtde_inativas}</div>
            </div>
          </Fragment>
        );
      })}
    </section>
  );
};
