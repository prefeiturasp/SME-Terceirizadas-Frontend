import React from "react";
import { array } from "prop-types";
import { faixaToString } from "../../../helpers/faixasEtarias";
import "./style.scss";

const TabelaFaixaEtaria = ({ faixas = [] }) => {
  const total = faixas.reduce(function (acc, v) {
    return acc + (v.quantidade || v.quantidade_alunos);
  }, 0);

  const total_matriculados = faixas.reduce(function (acc, v) {
    return acc + (v.matriculados_quando_criado || 0);
  }, 0);

  return (
    <section className="tabela-faixa-etaria">
      <article className="tabela-rows">
        <div className="faixa-etaria">Faixa Etária</div>
        <div className="alunos-matriculados">Alunos Matriculados</div>
        <div className="quantidade">Quantidade</div>
      </article>

      {faixas.map(
        (
          {
            faixa_etaria,
            quantidade,
            quantidade_alunos,
            matriculados_quando_criado,
          },
          indice
        ) => {
          return (
            <article key={indice} className="tabela-rows">
              <div className="faixa-etaria">{faixaToString(faixa_etaria)}</div>
              <div className="alunos-matriculados">
                {matriculados_quando_criado}
              </div>
              <div className="quantidade">
                {quantidade || quantidade_alunos}
              </div>
            </article>
          );
        }
      )}
      <article className="tabela-rows">
        <div className="faixa-etaria">Total</div>
        <div className="alunos-matriculados">{total_matriculados || "N/A"}</div>
        <div className="quantidade">{total}</div>
      </article>
    </section>
  );
};

TabelaFaixaEtaria.propTypes = {
  faixas: array,
};

export default TabelaFaixaEtaria;
