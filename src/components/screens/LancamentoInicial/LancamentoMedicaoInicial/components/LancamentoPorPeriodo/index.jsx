import React from "react";

import CardLancamento from "./CardLancamento";

const CORES = [
  "#198459",
  "#D06D12",
  "#9b51e0",
  "#ffbb00",
  "#00f7ff",
  "#ff0095"
];
const COR_PROJETOS_PEDAGOGICOS = "#2F80ED";

const NOMES_PERIODOS = {
  MANHA: "matutino",
  TARDE: "vespertino",
  NOITE: "noturno",
  INTEGRAL: "integral",
  PARCIAL: "parcial"
};

export default ({ panoramaGeral }) => {
  return (
    <div className="lancamento-por-periodo">
      <div className="row">
        <div className="col report-label-value">
          <p className="value">Selecione período para lançamento da medição</p>
        </div>
      </div>
      {panoramaGeral.map((panorama, index) => (
        <CardLancamento
          key={index}
          textoCabecalho={`${index + 1}º Período: ${
            NOMES_PERIODOS[panorama.periodo]
          }`}
          cor={CORES[index]}
          totalAlimentacoes={1320}
          alimentacoesConvencionais={460}
          alimentacoesDietaA={12}
          panorama={panorama}
        />
      ))}
      <CardLancamento
        textoCabecalho="Programas/projetos pedagógicos autorizados"
        cor={COR_PROJETOS_PEDAGOGICOS}
        totalAlimentacoes={15}
        alimentacoesConvencionais={13}
        alimentacoesDietaB={2}
      />
    </div>
  );
};
