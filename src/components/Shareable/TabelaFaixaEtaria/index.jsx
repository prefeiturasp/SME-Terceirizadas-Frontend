import React from "react";
import { string, arrayOf } from "prop-types";
import { faixaToString } from "../../../helpers/faixasEtarias";
import "./style.scss";

const TabelaFaixaEtaria = ({ faixas = [] }) => {
  const total = faixas.reduce(function(acc, v) {
    return acc + (v.quantidade || v.quantidade_alunos);
  }, 0);

  return (
    <section className="tabela-faixa-etaria">
      <article>
        <div className="faixa-etaria">Faixa Etária</div>
        <div className="alunos-matriculados">Alunos Matriculados</div>
        <div className="quantidade">Quantidade</div>
      </article>

      {faixas.map((item, indice) => {
        const qtd = item.quantidade || item.quantidade_alunos
        return (
          <article key={indice}>
            <div className="faixa-etaria">
              {faixaToString(item.faixa_etaria)}
            </div>
            <div className="alunos-matriculados">{"N/A"}</div>
            <div>{qtd}</div>
          </article>
        );
      })}
      <article>
        <div className="faixa-etaria">Total {">>"} </div>
        <div className="alunos-matriculados">{"N/A"}</div>
        <div className="quantidade">{total}</div>
      </article>
    </section>
  );
};

TabelaFaixaEtaria.propTypes = {
  faixas: arrayOf(string)
};

export default TabelaFaixaEtaria;
