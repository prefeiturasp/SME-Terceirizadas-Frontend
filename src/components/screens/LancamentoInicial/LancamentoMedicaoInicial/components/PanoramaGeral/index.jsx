import React from "react";

import "./styles.scss";

export default ({ panoramaGeral }) => {
  let totalAlunosMatriculados = 0;
  let dietaEspecialTipoA = 0;
  let dietaEspecialEnteral = 0;
  let dietaEspecialTipoB = 0;
  for (let registro of panoramaGeral) {
    totalAlunosMatriculados += registro.qtde_alunos;
    dietaEspecialTipoA += registro.qtde_tipo_a;
    dietaEspecialEnteral += registro.qtde_enteral;
    dietaEspecialTipoB += registro.qtde_tipo_b;
  }
  return (
    <div className="panorama-geral-escola">
      <div className="row">
        <div className="col report-label-value">
          <p className="value">Panorama geral escola</p>
        </div>
      </div>
      <div className="cabecalho-tabela">
        <div>Períodos</div>
        <div>Horas de atendimento</div>
        <div>Total alunos matriculados</div>
        <div className="subcabecalho-tabela">
          <div>Nº alunos matriculados:</div>
          <div className="cabecalho-qtde-dieta">
            <div>Dieta esp. Tipo A</div>
            <div>Tipo A Enteral</div>
            <div>Dieta esp. Tipo B</div>
          </div>
        </div>
      </div>
      {panoramaGeral.map((panorama, index) => (
        <div key={index} className="linha-tabela">
          <div>{panorama.periodo}</div>
          <div>{panorama.horas_atendimento}h</div>
          <div>{panorama.qtde_alunos}</div>
          <div>{panorama.qtde_tipo_a}</div>
          <div>{panorama.qtde_enteral}</div>
          <div>{panorama.qtde_tipo_b}</div>
        </div>
      ))}
      <div className="rodape-tabela">
        <div>Total</div>
        <div>{totalAlunosMatriculados}</div>
        <div>{dietaEspecialTipoA}</div>
        <div>{dietaEspecialEnteral}</div>
        <div>{dietaEspecialTipoB}</div>
      </div>
      <div className="row">
        <p style={{ paddingLeft: "1em" }}>
          Os números dessa tabela são para a data de hoje, no momento da
          consulta.
        </p>
      </div>
    </div>
  );
};
