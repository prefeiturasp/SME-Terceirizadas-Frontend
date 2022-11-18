import React, { useState, useEffect } from "react";
import HTTP_STATUS from "http-status-codes";
import TabelaFaixaEtaria from "components/Shareable/TabelaFaixaEtaria";
import { getVinculosTipoAlimentacaoPorEscola } from "services/cadastroTipoAlimentacao.service";
import { formataPeriodos } from "./helper";

export const InclusoesCEI = ({ inclusaoDeAlimentacao }) => {
  const [vinculosAlimentacao, setVinculosAlimentacao] = useState(null);

  const unique = arr => [...new Set(arr)];

  const nomes_periodos = unique(
    inclusaoDeAlimentacao.quantidade_alunos_por_faixas_etarias.map(
      qa => qa.periodo.nome
    )
  );

  const periodos_formatados = formataPeriodos(nomes_periodos);

  const getVinculosAlimentacao = async () => {
    const escola_uuid = inclusaoDeAlimentacao.escola.uuid;
    const response = await getVinculosTipoAlimentacaoPorEscola(escola_uuid);
    if (response.status === HTTP_STATUS.OK) {
      setVinculosAlimentacao(response.data.results);
    }
  };

  useEffect(() => {
    getVinculosAlimentacao();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return vinculosAlimentacao ? (
    <>
      <div className="row">
        <div className="col-12">
          <label
            style={{
              background: "#D4FFE0",
              border: `1px solid #DADADA`,
              borderRadius: "5px",
              margin: "1% 0px",
              width: "100%",
              padding: "8px 15px",
              height: "40px"
            }}
          >
            INTEGRAL
          </label>
        </div>
      </div>
      {periodos_formatados &&
        periodos_formatados.map((p, key) => {
          const qtd_por_faixa = inclusaoDeAlimentacao.quantidade_alunos_por_faixas_etarias.filter(
            qa => qa.periodo.nome === p.nome
          );
          const alimentosFormatados = vinculosAlimentacao
            .find(v => v.periodo_escolar.nome === p.nome)
            .tipos_alimentacao.map(ta => ta.nome)
            .join(", ");
          return (
            <div key={key} className="row">
              <div className="col-12">
                <div className="container-fluid pr-0">
                  <label
                    style={{
                      background: p.background,
                      border: p.borderColor,
                      borderRadius: "5px",
                      margin: "1% 0px",
                      width: "100%",
                      padding: "8px 15px",
                      height: "40px"
                    }}
                  >
                    {p.nome}
                  </label>
                </div>
              </div>
              <div className="col-12 mt-3">
                <div className="container-fluid pr-0">
                  <span>
                    Tipos de alimentação no período {p.nome.toLowerCase()}:{" "}
                    <b>{alimentosFormatados}</b>
                  </span>
                </div>
              </div>
              <div className="col-12">
                <div className="container-fluid pr-0">
                  <TabelaFaixaEtaria key={key} faixas={qtd_por_faixa} />
                </div>
              </div>
            </div>
          );
        })}
    </>
  ) : (
    <></>
  );
};

export default InclusoesCEI;
