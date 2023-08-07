import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import CardLancamento from "../LancamentoPorPeriodo/CardLancamento";
import Botao from "components/Shareable/Botao";
import { BUTTON_STYLE } from "components/Shareable/Botao/constants";
import { toastError } from "components/Shareable/Toast/dialogs";
import { getQuantidadeAlimentacoesLancadasPeriodoGrupo } from "services/medicaoInicial/solicitacaoMedicaoInicial.service";
import { CORES } from "../LancamentoPorPeriodo/helpers";
import { usuarioEhEscolaTerceirizadaDiretor } from "helpers/utilities";

export default ({
  periodosEscolaSimples,
  solicitacaoMedicaoInicial,
  periodoSelecionado,
  objSolicitacaoMIFinalizada
}) => {
  const [
    quantidadeAlimentacoesLancadas,
    setQuantidadeAlimentacoesLancadas
  ] = useState(undefined);

  const dadosMockados = [
    {
      nome_periodo_grupo: "INTEGRAL",
      status: "MEDICAO_EM_ABERTO_PARA_PREENCHIMENTO_UE",
      justificativa: null,
      valores: [
        {
          nome_campo: "lanche",
          valor: 1357
        },
        {
          nome_campo: "almoco",
          valor: 1357
        },
        {
          nome_campo: "refeicao_da_tarde",
          valor: 813
        },
        {
          nome_campo: "desjejum",
          valor: 407
        },
        {
          nome_campo: "colacao",
          valor: 253
        }
      ],
      valor_total: 3527
    }
  ];

  const getQuantidadeAlimentacoesLancadasPeriodoGrupoAsync = async () => {
    const params = { uuid_solicitacao: solicitacaoMedicaoInicial.uuid };
    const response = await getQuantidadeAlimentacoesLancadasPeriodoGrupo(
      params
    );
    if (response.status === HTTP_STATUS.OK) {
      setQuantidadeAlimentacoesLancadas(dadosMockados);
      //setQuantidadeAlimentacoesLancadas(response.data.results);
    } else {
      toastError(
        "Erro ao carregar quantidades de alimentações lançadas. Tente novamente mais tarde."
      );
    }
  };

  useEffect(() => {
    getQuantidadeAlimentacoesLancadasPeriodoGrupoAsync();
  }, [periodoSelecionado, solicitacaoMedicaoInicial]);

  const renderBotaoFinalizar = () => {
    if (!solicitacaoMedicaoInicial) {
      return false;
    }
    return true;
  };

  return (
    <div>
      {quantidadeAlimentacoesLancadas && (
        <>
          <div className="row pb-2">
            <div className="col">
              <b className="section-title">Períodos</b>
            </div>
          </div>
          {periodosEscolaSimples.map((periodo, index) => {
            if (periodo.periodo_escolar.nome === "INTEGRAL") {
              return (
                <CardLancamento
                  key={index}
                  textoCabecalho={periodo.periodo_escolar.nome}
                  cor={CORES[index]}
                  tipos_alimentacao={periodo.tipos_alimentacao}
                  periodoSelecionado={periodoSelecionado}
                  solicitacaoMedicaoInicial={solicitacaoMedicaoInicial}
                  objSolicitacaoMIFinalizada={objSolicitacaoMIFinalizada}
                  quantidadeAlimentacoesLancadas={
                    quantidadeAlimentacoesLancadas
                  }
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
