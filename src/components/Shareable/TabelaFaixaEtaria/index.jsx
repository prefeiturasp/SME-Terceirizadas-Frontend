import React, { useEffect, useState } from "react";
import { string, arrayOf } from "prop-types";
import { faixaToString } from "../../../helpers/faixasEtarias";
import "./style.scss";
import { getQuantidadeAlunosFaixaEtaria } from "services/inclusaoDeAlimentacao/cei.legacy.service";

const safeGetMatriculados = (obj, faixa) => {
  try {
    const filtered = obj.faixas.some(el => {
      return el.uuid === faixa.faixa_etaria.uuid;
    });
    return filtered.length ? filtered[0].quantidade : "N/A";
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
  return "N/A";
};

const TabelaFaixaEtaria = ({ faixas = [], periodo, data }) => {
  const [matriculados, setMatriculados] = useState({ faixas: [] });
  const [totalMatriculados, setTotalMatriculados] = useState("N/A");

  // FIXME: Remover essa solucao temporária quando o endpoint da solicitacao incluir esses dados
  useEffect(() => {
    async function fetchAlunosMatriculados() {
      if(!periodo.uuid || !data) return
      const result = await getQuantidadeAlunosFaixaEtaria(periodo.uuid, data.split("/").reverse().join("-"));
      if (result.data) {
        setMatriculados(result.data);
        const _total = faixas.reduce(function(acc, v) {
          const n = safeGetMatriculados(result.data, v);
          return typeof val === "number" ? acc + n : acc;
        }, 0);
        setTotalMatriculados(_total || "N/A");
      }
    }
    fetchAlunosMatriculados();
  }, [faixas, periodo, data]);

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
        const qtd = item.quantidade || item.quantidade_alunos;
        return (
          <article key={indice}>
            <div className="faixa-etaria">
              {faixaToString(item.faixa_etaria)}
            </div>
            <div className="alunos-matriculados">
              {safeGetMatriculados(matriculados, item)}
            </div>
            <div>{qtd}</div>
          </article>
        );
      })}
      <article>
        <div className="faixa-etaria">Total {">>"} </div>
        <div className="alunos-matriculados">{totalMatriculados}</div>
        <div className="quantidade">{total}</div>
      </article>
    </section>
  );
};

TabelaFaixaEtaria.propTypes = {
  faixas: arrayOf(string)
};

export default TabelaFaixaEtaria;
