import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { FluxoDeStatus } from "components/Shareable/FluxoDeStatus";
import { fluxoPartindoEscola } from "components/Shareable/FluxoDeStatus/helper";
import RelatorioHistoricoJustificativaEscola from "components/Shareable/RelatorioHistoricoJustificativaEscola";
import RelatorioHistoricoQuestionamento from "components/Shareable/RelatorioHistoricoQuestionamento";
import { toastError } from "components/Shareable/Toast/dialogs";
import { TIPO_SOLICITACAO } from "constants/shared";
import {
  corDaMensagem,
  justificativaAoNegarSolicitacao,
  prazoDoPedidoMensagem
} from "helpers/utilities";
import React, { useState } from "react";
import { getRelatorioAlteracaoCardapio } from "services/relatorios";

export const CorpoRelatorio = ({ ...props }) => {
  const [imprimindo, setImprimindo] = useState(false);
  const { dadosTabela, matriculados, solicitacao } = props;

  const totalAlunosPorPeriodoCEI = (faixas, keyName) => {
    let totalAlunos = 0;
    return faixas.reduce(function(total, faixa) {
      return total + faixa[keyName];
    }, totalAlunos);
  };


  const imprimirRelatorio = () => {
    setImprimindo(true);
    try {
      getRelatorioAlteracaoCardapio(
        solicitacao.uuid,
        TIPO_SOLICITACAO.SOLICITACAO_CEMEI
      );
    } catch (e) {
      toastError("Houve um erro ao imprimir o relatório");
      setImprimindo(false);
    }
  };
  
  return (
    <>
      <p
        className={`col-12 title-message ${corDaMensagem(
          prazoDoPedidoMensagem(solicitacao.prioridade)
        )}`}
      >
        {prazoDoPedidoMensagem(solicitacao.prioridade)}
        <Botao
          type={BUTTON_TYPE.BUTTON}
          style={imprimindo ? BUTTON_STYLE.GREEN_OUTLINE : BUTTON_STYLE.GREEN}
          icon={imprimindo ? BUTTON_ICON.LOADING : BUTTON_ICON.PRINT}
          disabled={imprimindo}
          className="float-right"
          onClick={imprimirRelatorio}
        />
      </p>
      <div className="row mt-3">
        <div className="col-3">
          <div className="id-externo-style">
            <p className="id-externo-font">
              <b># {solicitacao.id_externo}</b>
            </p>
            <p>
              <b>Nº da Solicitação</b>
            </p>
          </div>
        </div>
        <div className="col-3">
          <p>Escola Solicitante:</p>
          <p>
            <b>{solicitacao.escola.nome}</b>
          </p>
        </div>
        <div className="offset-3 col-3">
          <p>EOL:</p>
          <p>
            <b>{solicitacao.escola.codigo_eol}</b>
          </p>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-3">
          <p>DRE:</p>
          <p>
            <b>{solicitacao.escola.diretoria_regional.nome}</b>
          </p>
        </div>
        <div className="col-3">
          <p>Lote:</p>
          <p>
            <b>{solicitacao.escola.lote.nome}</b>
          </p>
        </div>
        <div className="col-3">
          <p>Tipo de Gestão</p>
          <p>
            <b>{solicitacao.escola.tipo_gestao.nome}</b>
          </p>
        </div>
        <div className="col-3">
          <p>Empresa:</p>
          <p>
            <b>{solicitacao.escola.lote.terceirizada.nome_fantasia}</b>
          </p>
        </div>
      </div>
      <hr />
      <div className="row mx-3">
        <FluxoDeStatus
          listaDeStatus={solicitacao.logs}
          fluxo={fluxoPartindoEscola}
          eh_gestao_alimentacao={true}
        />
      </div>
      <hr />
      <div className="row mt-3">
        <div className="col-12">
          <p>
            <b>Solicitação de Alteração</b>
          </p>
        </div>
        <div className="col-4">
          <p>Tipo de Alteração:</p>
          <p>
            <b>{solicitacao.motivo.nome}</b>
          </p>
        </div>
        <div className="col-3">
          <p>Alterar de:</p>
          <p>
            <b>
              {solicitacao.data_inicial
                ? solicitacao.data_inicial
                : solicitacao.alterar_dia}
            </b>
          </p>
        </div>

        <div className="col-3">
          {solicitacao.data_final && (
            <>
              <p>Até o dia:</p>
              <p>
                <b>{solicitacao.data_final}</b>
              </p>
            </>
          )}
        </div>
      </div>
      {dadosTabela.map((periodo, index) => {
        let qtdMatriculadosNoPeriodo = matriculados.find(
          p => p.nome === periodo.nome
        );
        const uuids = periodo.substituicoesCEI
          ? periodo.substituicoesCEI.faixas_etarias
              .map(s => s.faixa_etaria)
              .map(f => f.uuid)
          : [];
        const faixasCEI = qtdMatriculadosNoPeriodo.CEI.filter(f =>
          uuids.includes(f.uuid)
        );
        return (
          <div className="row" key={index}>
            <div className="col-12">
              <label
                style={{
                  background: periodo.background,
                  border: `1px solid ${periodo.borderColor}`,
                  borderRadius: "5px",
                  margin: "1% 0px",
                  width: "100%",
                  padding: "8px 15px",
                  height: "40px"
                }}
              >
                {periodo.nome}
              </label>
            </div>
            <div className="col-12">
              <div className="container-fluid pr-0">
                {periodo.substituicoesCEI && (
                  <div className="row">
                    <div className="col-12">
                      <label className="periodo-label-style">Alunos CEI</label>
                    </div>
                    <div className="col-12 substituicoes-font-style">
                      <p>
                        Alteração do tipo de Alimentação de:{" "}
                        <b className="tipos-alimentacao-style">
                          {periodo.substituicoesCEI.tipos_alimentacao_de
                            .map(ta => ta.nome)
                            .join(", ")}
                        </b>
                      </p>
                      <p>
                        Para o tipo de Alimentação:{" "}
                        <b className="tipos-alimentacao-style">
                          {periodo.substituicoesCEI.tipos_alimentacao_para
                            .map(ta => ta.nome)
                            .join(", ")}
                        </b>
                      </p>
                    </div>
                    <div className="col-12">
                      <table className="table faixas-etarias-cei-alteracao">
                        <thead>
                          <tr>
                            <th className="col-7">Faixa Etária</th>
                            <th className="col-3 text-center">
                              Alunos matriculados
                            </th>
                            <th className="col-2 text-center">Quantidade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {periodo.substituicoesCEI.faixas_etarias.map(
                            (faixa, idxFaixa) => {
                              let qtdMatriculadosNaFaixa = matriculados.find(
                                p => p.nome === periodo.nome
                              );
                              qtdMatriculadosNaFaixa = qtdMatriculadosNaFaixa.CEI.find(
                                f => f.uuid === faixa.faixa_etaria.uuid
                              );
                              qtdMatriculadosNaFaixa = qtdMatriculadosNaFaixa
                                ? qtdMatriculadosNaFaixa.quantidade_alunos
                                : "teste";
                              return (
                                <tr key={idxFaixa}>
                                  <td className="col-7">
                                    {faixa.faixa_etaria.__str__}
                                  </td>
                                  <td className="col-3 text-center">
                                    {qtdMatriculadosNaFaixa}
                                  </td>
                                  <td className="col-2 text-center">
                                    {faixa.quantidade}
                                  </td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                        <thead>
                          <tr>
                            <th className="col-7">Total</th>
                            <th className="col-3 text-center">
                              {totalAlunosPorPeriodoCEI(
                                faixasCEI,
                                "quantidade_alunos"
                              )}
                            </th>
                            <th className="col-2 text-center">
                              {totalAlunosPorPeriodoCEI(
                                periodo.substituicoesCEI.faixas_etarias,
                                "quantidade"
                              )}
                            </th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                )}
                {periodo.substituicoesEMEI && (
                  <div className="row">
                    <div className="col-12">
                      <label className="periodo-label-style">Alunos EMEI</label>
                    </div>
                    <div className="col-12 substituicoes-font-style">
                      <p>
                        Alteração do tipo de Alimentação de:{" "}
                        <b className="tipos-alimentacao-style">
                          {periodo.substituicoesEMEI.tipos_alimentacao_de
                            .map(ta => ta.nome)
                            .join(", ")}
                        </b>
                      </p>
                      <p>
                        Para o tipo de Alimentação:{" "}
                        <b className="tipos-alimentacao-style">
                          {periodo.substituicoesEMEI.tipos_alimentacao_para
                            .map(ta => ta.nome)
                            .join(", ")}
                        </b>
                      </p>
                    </div>
                    <div className="col-12">
                      <table className="table faixas-etarias-cei-alteracao">
                        <thead>
                          <tr>
                            <th className="col-7">
                              <span className="ml-5">Alunos matriculados</span>
                              <b className="ml-5">
                                {
                                  matriculados.find(
                                    p => p.nome === periodo.nome
                                  ).EMEI
                                }
                              </b>
                            </th>
                            <th className="col-5">
                              <span className="ml-5">Quantidade</span>
                              <b className="ml-5">
                                {periodo.substituicoesEMEI.qtd_alunos}
                              </b>
                            </th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <div className="row mt-3">
        <div className="col-12">
          <div className="container-fluid">
            <p>Observações:</p>
            <p
              className="observacao-alteracao-cardapio-cemei"
              dangerouslySetInnerHTML={{
                __html: solicitacao.observacao
              }}
            />
          </div>
        </div>
      </div>
      <hr />
      {solicitacao && justificativaAoNegarSolicitacao(solicitacao.logs) && (
        <div className="row">
          <div className="col-12 report-label-value">
            <p>Justificativa da negação</p>
            <p
              className="value"
              dangerouslySetInnerHTML={{
                __html: justificativaAoNegarSolicitacao(solicitacao.logs)
              }}
            />
          </div>
        </div>
      )}
      <RelatorioHistoricoJustificativaEscola solicitacao={solicitacao} />
      <RelatorioHistoricoQuestionamento solicitacao={solicitacao} />
    </>
  );
};
