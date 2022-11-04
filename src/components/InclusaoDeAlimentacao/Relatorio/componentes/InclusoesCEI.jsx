import React, { useState, useEffect } from "react";
import HTTP_STATUS from "http-status-codes";
import TabelaFaixaEtaria from "components/Shareable/TabelaFaixaEtaria";
import { getVinculosTipoAlimentacaoPorEscola } from "services/cadastroTipoAlimentacao.service";

export const InclusoesCEI = ({ inclusaoDeAlimentacao }) => {
  const [vinculosAlimentacao, setVinculosAlimentacao] = useState(null);

  const unique = arr => [...new Set(arr)];

  const nomes_periodos = unique(
    inclusaoDeAlimentacao.quantidade_alunos_por_faixas_etarias.map(
      qa => qa.periodo.nome
    )
  );

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
              background: "#E0E0E0",
              border: `1px solid #E0E0E0`,
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
      {nomes_periodos &&
        nomes_periodos.map((p, key) => {
          const qtd_por_faixa = inclusaoDeAlimentacao.quantidade_alunos_por_faixas_etarias.filter(
            qa => qa.periodo.nome === p
          );
          const alimentosFormatados = vinculosAlimentacao
            .find(v => v.periodo_escolar.nome === p)
            .tipos_alimentacao.map(ta => ta.nome)
            .join(", ");
          return (
            <div key={key} className="row">
              <div className="col-12">
                <div className="container-fluid">
                  <label
                    style={{
                      background: "#E0E0E0",
                      border: `1px solid #E0E0E0`,
                      borderRadius: "5px",
                      margin: "1% 0px",
                      width: "100%",
                      padding: "8px 15px",
                      height: "40px"
                    }}
                  >
                    {p}
                  </label>
                </div>
              </div>
              <div className="col-12 mt-3">
                <div className="container-fluid">
                  <span>
                    Tipos de alimentação no período {p.toLowerCase()}:{" "}
                    <b>{alimentosFormatados}</b>
                  </span>
                </div>
              </div>
              <div className="col-12">
                <div className="container-fluid">
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
