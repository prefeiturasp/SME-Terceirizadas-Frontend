import { formataMotivosDias } from "components/InclusaoDeAlimentacao/Relatorio/componentes/helper";
import { tiposAlimentacaoPorPeriodoETipoUnidade } from "components/InclusaoDeAlimentacaoCEMEI/helpers";
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
import {
  corDaMensagem,
  justificativaAoNegarSolicitacao,
  prazoDoPedidoMensagem
} from "helpers/utilities";
import React from "react";
import {
  inclusaoPossuiCEInestePeriodo,
  inclusaoPossuiEMEInestePeriodo,
  periodosDaInclusao
} from "../../helpers";
import "./style.scss";

export const CorpoRelatorio = ({ solicitacao, vinculos }) => {
  const justificativaNegacao =
    solicitacao && justificativaAoNegarSolicitacao(solicitacao.logs);

  return (
    <div className="relatorio-inclusao-cemei">
      <div className="row">
        <p
          className={`col-12 title-message ${corDaMensagem(
            prazoDoPedidoMensagem(solicitacao.prioridade)
          )}`}
        >
          {prazoDoPedidoMensagem(solicitacao.prioridade)}
          <Botao
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.GREEN}
            icon={BUTTON_ICON.PRINT}
            className="float-right"
            onClick={() => {}}
          />
        </p>
        <div className="col-2">
          <span className="badge-sme badge-secondary-sme">
            <span className="id-of-solicitation-dre">
              # {solicitacao.id_externo}
            </span>
            <br />{" "}
            <span className="number-of-order-label">Nº DA SOLICITAÇÃO</span>
          </span>
        </div>
        <div className="pl-2 my-auto offset-1 col-5">
          <span className="requester">Escola Solicitante</span>
          <br />
          <span className="dre-name">
            {solicitacao.escola && solicitacao.escola.nome}
          </span>
        </div>
        <div className="my-auto col-4">
          <span className="requester">Código EOL</span>
          <br />
          <span className="dre-name">
            {solicitacao.escola && solicitacao.escola.codigo_eol}
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-3 report-label-value">
          <p>DRE</p>
          <p className="value-important">
            {solicitacao.escola.diretoria_regional.nome}
          </p>
        </div>
        <div className="col-3 report-label-value">
          <p>Lote</p>
          <p className="value-important">
            {solicitacao.escola &&
              solicitacao.escola.lote &&
              solicitacao.escola.lote.nome}
          </p>
        </div>
        <div className="col-3 report-label-value">
          <p>Tipo de Gestão</p>
          <p className="value-important">
            {solicitacao.escola &&
              solicitacao.escola.tipo_gestao &&
              solicitacao.escola.tipo_gestao.nome}
          </p>
        </div>
        <div className="col-3 report-label-value">
          <p>Empresa</p>
          <p className="value-important">
            {solicitacao.rastro_terceirizada &&
              solicitacao.rastro_terceirizada.nome_fantasia}
          </p>
        </div>
      </div>
      <hr />
      {solicitacao.logs && (
        <div className="row">
          <FluxoDeStatus
            listaDeStatus={solicitacao.logs}
            fluxo={fluxoPartindoEscola}
            eh_gestao_alimentacao={true}
          />
        </div>
      )}
      <hr />
      <p>
        <strong>Solicitação de Inclusão de Alimentação</strong>
      </p>
      <table className="table-reasons">
        <tbody>
          {Object.entries(
            formataMotivosDias(solicitacao.dias_motivos_da_inclusao_cemei)
          ).map((dadosMotivo, key) => {
            const [motivo, datas] = dadosMotivo;
            return (
              <div key={key}>
                <tr className="row">
                  <th className="col-2">Motivo</th>
                  <th className="col-10">Dia(s) de inclusão</th>
                </tr>
                <tr className="row">
                  <td className="col-2">{motivo}</td>
                  {datas.map((dia, key) => {
                    return (
                      <td
                        key={key}
                        className={`col-2 ${
                          solicitacao.dias_motivos_da_inclusao_cemei.find(
                            i => i.data === dia
                          ).cancelado
                            ? `red`
                            : ""
                        }`}
                      >
                        {dia}
                      </td>
                    );
                  })}
                </tr>
              </div>
            );
          })}
        </tbody>
      </table>
      {periodosDaInclusao(solicitacao).map((periodo, key) => {
        let totalMatriculados = 0;
        let totalQuantidadeAlunos = 0;

        return (
          <div key={key}>
            <div className={`period-quantity number-${key}`}>{periodo}</div>
            <div className="pl-3 pr-3 pb-3">
              {inclusaoPossuiCEInestePeriodo(solicitacao, periodo) && (
                <>
                  <div className="alunos-label mt-3">Alunos CEI</div>
                  <div className="tipos-alimentacao mt-3 mb-3">
                    Tipos de inclusão de alimentação:{" "}
                    <span>
                      {tiposAlimentacaoPorPeriodoETipoUnidade(
                        vinculos,
                        periodo,
                        "CEI"
                      )}
                    </span>
                  </div>
                  <table className="faixas-etarias-cei">
                    <thead>
                      <tr className="row">
                        <th className="col-8">Faixa Etária</th>
                        <th className="col-2 text-center">
                          Alunos matriculados
                        </th>
                        <th className="col-2 text-center">Quantidade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {solicitacao.quantidade_alunos_cei_da_inclusao_cemei
                        .filter(q => q.periodo_escolar.nome === periodo)
                        .map((faixa, key) => {
                          return (
                            <tr key={key} className="row">
                              <td className="col-8">
                                {faixa.faixa_etaria.__str__}
                              </td>
                              <td className="col-2 text-center">
                                {faixa.matriculados_quando_criado}
                              </td>
                              <td className="col-2 text-center">
                                {" "}
                                {faixa.quantidade_alunos}
                              </td>
                            </tr>
                          );
                        })}
                      <tr className="row">
                        <td className="col-8 font-weight-bold">Total</td>
                        <td className="col-2 text-center">
                          {solicitacao.quantidade_alunos_cei_da_inclusao_cemei
                            .filter(q => q.periodo_escolar.nome === periodo)
                            .reduce(function(total, faixa) {
                              return total + faixa.matriculados_quando_criado;
                            }, totalMatriculados)}
                        </td>
                        <td className="col-2 text-center">
                          {solicitacao.quantidade_alunos_cei_da_inclusao_cemei
                            .filter(q => q.periodo_escolar.nome === periodo)
                            .reduce(function(total, faixa) {
                              return total + faixa.quantidade_alunos;
                            }, totalQuantidadeAlunos)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </>
              )}
              {inclusaoPossuiEMEInestePeriodo(solicitacao, periodo) && (
                <>
                  <div className="alunos-label mt-3">Alunos EMEI</div>
                  <div className="tipos-alimentacao mt-3 mb-3">
                    Tipos de inclusão de alimentação:{" "}
                    <span>
                      {tiposAlimentacaoPorPeriodoETipoUnidade(
                        vinculos,
                        periodo,
                        "EMEI"
                      )}
                    </span>
                  </div>
                  <table className="faixas-etarias-cei">
                    <thead>
                      <tr className="row">
                        <th className="col-8 my-auto">
                          Alunos matriculados:{" "}
                          <span className="font-weight-normal">
                            {
                              solicitacao.quantidade_alunos_emei_da_inclusao_cemei.find(
                                q => q.periodo_escolar.nome === periodo
                              ).matriculados_quando_criado
                            }
                          </span>
                        </th>
                        <th className="col-4 d-flex justify-content-center">
                          Quantidade:{" "}
                          {
                            solicitacao.quantidade_alunos_emei_da_inclusao_cemei.find(
                              q => q.periodo_escolar.nome === periodo
                            ).quantidade_alunos
                          }
                        </th>
                      </tr>
                    </thead>
                  </table>
                </>
              )}
              {solicitacao.dias_motivos_da_inclusao_cemei.find(
                inclusao => inclusao.cancelado
              ) && (
                <>
                  <hr />
                  <p>
                    <strong>Histórico de cancelamento parcial</strong>
                    {solicitacao.dias_motivos_da_inclusao_cemei
                      .filter(inclusao => inclusao.cancelado)
                      .map((inclusao, key) => {
                        return (
                          <div key={key}>
                            {inclusao.data}
                            {" - "}
                            {inclusao.cancelado_justificativa}
                          </div>
                        );
                      })}
                  </p>
                </>
              )}
              {justificativaNegacao && (
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p>Justificativa da negação</p>
                    <p
                      className="value"
                      dangerouslySetInnerHTML={{
                        __html: justificativaNegacao
                      }}
                    />
                  </div>
                </div>
              )}
              <RelatorioHistoricoJustificativaEscola
                solicitacao={solicitacao}
              />
              <RelatorioHistoricoQuestionamento solicitacao={solicitacao} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
