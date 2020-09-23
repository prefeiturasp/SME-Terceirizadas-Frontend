import React from "react";

import "./styles.scss";

const CORES = ["#198459", "#D06D12"];
const COR_PROJETOS_PEDAGOGICOS = "#2F80ED";

const Card = ({
  textoCabecalho,
  cor,
  totalAlimentacoes,
  alimentacoesConvencionais,
  alimentacoesDietaA,
  alimentacoesDietaB
}) => (
  <div className="lancamento-por-periodo-card mt-3" style={{ color: cor }}>
    <div className="row">
      <div className="col-10 periodo-cabecalho">{textoCabecalho}</div>
      <div className="col-2 link-abrir">Abrir</div>
    </div>
    <div className="row">
      <div
        className="col-2 total-alimentacoes"
        style={{ backgroundColor: cor }}
      >
        <span>{totalAlimentacoes || "0000"}</span>
        <span>TOTAL ALIMENTAÇÕES</span>
      </div>
      <div className="col-10 alimentacoes-por-tipo">
        <span>
          {alimentacoesConvencionais || "000"} alimentações convencionais
        </span>
        <span>
          {alimentacoesDietaA || "00"} alimentações para dieta especial A
        </span>
        <span>
          {alimentacoesDietaB || "00"} alimentações para dieta especial B
        </span>
      </div>
    </div>
  </div>
);

export default () => {
  return (
    <div className="lancamento-por-periodo">
      <div className="row">
        <div className="col report-label-value">
          <p className="value">Selecione período para lançamento da medição</p>
        </div>
      </div>
      <Card
        textoCabecalho="1º Período: matutino"
        cor={CORES[0]}
        totalAlimentacoes={1320}
        alimentacoesConvencionais={460}
        alimentacoesDietaA={12}
      />
      <Card
        textoCabecalho="2º Período: vespertino"
        cor={CORES[1]}
        totalAlimentacoes={102}
        alimentacoesConvencionais={690}
        alimentacoesDietaA={4}
        alimentacoesDietaB={22}
      />
      <Card
        textoCabecalho="Programas/projetos pedagógicos autorizados"
        cor={COR_PROJETOS_PEDAGOGICOS}
        totalAlimentacoes={15}
        alimentacoesConvencionais={13}
        alimentacoesDietaB={2}
      />
    </div>
  );
};
