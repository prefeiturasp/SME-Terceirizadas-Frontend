import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import { FluxoDeStatus } from "components/Shareable/FluxoDeStatus";
import { fluxoPartindoEscola } from "components/Shareable/FluxoDeStatus/helper";
import RelatorioHistoricoJustificativaEscola from "components/Shareable/RelatorioHistoricoJustificativaEscola";
import RelatorioHistoricoQuestionamento from "components/Shareable/RelatorioHistoricoQuestionamento";
import { existeLogDeQuestionamentoDaCODAE } from "components/Shareable/RelatorioHistoricoQuestionamento/helper";
import { toastError } from "components/Shareable/Toast/dialogs";
import { TIPO_SOLICITACAO } from "constants/shared";
import {
  corDaMensagem,
  justificativaAoAprovarSolicitacao,
  justificativaAoNegarSolicitacao,
  prazoDoPedidoMensagem,
} from "helpers/utilities";
import React, { useState } from "react";
import { getRelatorioAlteracaoTipoAlimentacao } from "services/relatorios";

export const CorpoRelatorio = ({ ...props }) => {
  let totalMatriculados = 0;
  let totalQuantidadeAlunos = 0;
  const [imprimindo, setImprimindo] = useState(false);
  const { dadosTabela, solicitacao } = props;
  const EXIBIR_HISTORICO =
    solicitacao.prioridade !== "REGULAR" &&
    existeLogDeQuestionamentoDaCODAE(solicitacao.logs);

  const imprimirRelatorio = async () => {
    setImprimindo(true);
    try {
      await getRelatorioAlteracaoTipoAlimentacao(
        solicitacao.uuid,
        TIPO_SOLICITACAO.SOLICITACAO_CEMEI
      );
    } catch (e) {
      toastError("Houve um erro ao imprimir o relatório");
    }
    setImprimindo(false);
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
                  height: "40px",
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
                            .map((ta) => ta.nome)
                            .join(", ")}
                        </b>
                      </p>
                      <p>
                        Para o tipo de Alimentação:{" "}
                        <b className="tipos-alimentacao-style">
                          {periodo.substituicoesCEI.tipos_alimentacao_para
                            .map((ta) => ta.nome)
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
                          {solicitacao.substituicoes_cemei_cei_periodo_escolar
                            .filter(
                              (q) => q.periodo_escolar.nome === periodo.nome
                            )
                            .map((faixa, key) =>
                              faixa.faixas_etarias.map((f) => {
                                return (
                                  <tr key={key}>
                                    <td className="col-7">
                                      {f.faixa_etaria.__str__}
                                    </td>
                                    <td className="col-3 text-center">
                                      {f.matriculados_quando_criado
                                        ? f.matriculados_quando_criado
                                        : "teste"}
                                    </td>
                                    <td className="col-2 text-center">
                                      {f.quantidade}
                                    </td>
                                  </tr>
                                );
                              })
                            )}
                        </tbody>
                        <thead>
                          <tr>
                            <th className="col-7">Total</th>
                            <th className="col-3 text-center">
                              {solicitacao.substituicoes_cemei_cei_periodo_escolar
                                .filter(
                                  (q) => q.periodo_escolar.nome === periodo.nome
                                )
                                .map((faixa) =>
                                  faixa.faixas_etarias.reduce(function (
                                    total,
                                    f
                                  ) {
                                    return total + f.matriculados_quando_criado;
                                  },
                                  totalMatriculados)
                                )}
                            </th>
                            <th className="col-2 text-center">
                              {solicitacao.substituicoes_cemei_cei_periodo_escolar
                                .filter(
                                  (q) => q.periodo_escolar.nome === periodo.nome
                                )
                                .map((faixa) =>
                                  faixa.faixas_etarias.reduce(function (
                                    total,
                                    f
                                  ) {
                                    return total + f.quantidade;
                                  },
                                  totalQuantidadeAlunos)
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
                            .map((ta) => ta.nome)
                            .join(", ")}
                        </b>
                      </p>
                      <p>
                        Para o tipo de Alimentação:{" "}
                        <b className="tipos-alimentacao-style">
                          {periodo.substituicoesEMEI.tipos_alimentacao_para
                            .map((ta) => ta.nome)
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
                                  periodo.substituicoesEMEI
                                    .matriculados_quando_criado
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
      <hr />
      {solicitacao && solicitacao.observacao && (
        <div className="row mt-3">
          <div className="col-12">
            <p>Observações:</p>
            <p
              className="observacao-alteracao-cardapio-cemei"
              dangerouslySetInnerHTML={{
                __html: solicitacao.observacao,
              }}
            />
          </div>
        </div>
      )}
      {solicitacao && justificativaAoNegarSolicitacao(solicitacao.logs) && (
        <div className="row">
          <div className="col-12 report-label-value">
            <p>Justificativa da negação</p>
            <p
              className="value"
              dangerouslySetInnerHTML={{
                __html: justificativaAoNegarSolicitacao(solicitacao.logs),
              }}
            />
          </div>
        </div>
      )}
      {solicitacao &&
        justificativaAoAprovarSolicitacao(solicitacao.logs) &&
        !EXIBIR_HISTORICO && (
          <div className="row">
            <div className="col-12 report-label-value">
              <p>
                <b>Autorizou</b>
              </p>
              <p>{`${
                solicitacao.logs.find(
                  (log) => log.status_evento_explicacao === "CODAE autorizou"
                ).criado_em
              } - Informações da CODAE`}</p>
              <p
                className="value"
                dangerouslySetInnerHTML={{
                  __html: justificativaAoAprovarSolicitacao(solicitacao.logs),
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
