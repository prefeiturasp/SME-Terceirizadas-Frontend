import React from "react";
import Botao from "components/Shareable/Botao";
import { BUTTON_STYLE } from "components/Shareable/Botao/constants";
import { CORES } from "../LancamentoPorPeriodo/helpers";
import { usuarioEhEscolaTerceirizadaDiretor } from "helpers/utilities";
import CardLancamentoCEI from "./CardLancamentoCEI";

export default ({
  solicitacaoMedicaoInicial,
  escolaInstituicao,
  periodoSelecionado
}) => {
  const quantidadeAlimentacoesLancadas = [
    {
      nome_periodo_grupo: "INTEGRAL",
      status: "MEDICAO_EM_ABERTO_PARA_PREENCHIMENTO_UE",
      qtd_alunos: 100,
      qtd_refeicoes_diarias: 5,
      valor_total: 500
    },
    {
      nome_periodo_grupo: "PARCIAL",
      status: "MEDICAO_EM_ABERTO_PARA_PREENCHIMENTO_UE",
      qtd_alunos: 100,
      qtd_refeicoes_diarias: 3,
      valor_total: 300
    }
  ];

  const renderBotaoFinalizar = () => {
    if (!solicitacaoMedicaoInicial) {
      return false;
    }
    return true;
  };

  return (
    <div>
      {solicitacaoMedicaoInicial && (
        <>
          <div className="row pb-2">
            <div className="col">
              <b className="section-title">Períodos</b>
            </div>
          </div>
          {quantidadeAlimentacoesLancadas.map((periodo, index) => {
            if (
              solicitacaoMedicaoInicial.ue_possui_alunos_periodo_parcial ||
              periodo.nome_periodo_grupo === "INTEGRAL"
            ) {
              return (
                <CardLancamentoCEI
                  key={index}
                  textoCabecalho={periodo.nome_periodo_grupo}
                  cor={CORES[index]}
                  solicitacaoMedicaoInicial={solicitacaoMedicaoInicial}
                  escolaInstituicao={escolaInstituicao}
                  quantidadeAlimentacoesLancadas={
                    quantidadeAlimentacoesLancadas
                  }
                  periodoSelecionado={periodoSelecionado}
                />
              );
            }
            return null;
          })}
          <div className="mt-4">
            {renderBotaoFinalizar() && (
              <Botao
                texto="Finalizar"
                style={BUTTON_STYLE.GREEN}
                className="float-right"
                disabled={!usuarioEhEscolaTerceirizadaDiretor()}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
