import React from "react";

import CardLancamento from "./CardLancamento";

const CORES = ["#198459", "#D06D12"];
const COR_PROJETOS_PEDAGOGICOS = "#2F80ED";

export default () => {
  return (
    <div className="lancamento-por-periodo">
      <div className="row">
        <div className="col report-label-value">
          <p className="value">Selecione período para lançamento da medição</p>
        </div>
      </div>
      <CardLancamento
        textoCabecalho="1º Período: matutino"
        cor={CORES[0]}
        totalAlimentacoes={1320}
        alimentacoesConvencionais={460}
        alimentacoesDietaA={12}
      />
      <CardLancamento
        textoCabecalho="2º Período: vespertino"
        cor={CORES[1]}
        totalAlimentacoes={102}
        alimentacoesConvencionais={690}
        alimentacoesDietaA={4}
        alimentacoesDietaB={22}
      />
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
