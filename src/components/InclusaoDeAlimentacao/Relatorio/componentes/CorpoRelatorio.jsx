import React, { Component, Fragment } from "react";
import { FluxoDeStatus } from "../../../Shareable/FluxoDeStatus";
import {
  corDaMensagem,
  stringSeparadaPorVirgulas,
  ehInclusaoContinua,
  ehInclusaoCei,
  justificativaAoNegarSolicitacao
} from "helpers/utilities";
import Botao from "../../../Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "../../../Shareable/Botao/constants";
import { formataMotivosDias } from "./helper";
import { fluxoPartindoEscola } from "../../../Shareable/FluxoDeStatus/helper";
import TabelaFaixaEtaria from "../../../Shareable/TabelaFaixaEtaria";
import { getRelatorioInclusaoAlimentacao } from "services/relatorios";
import { WEEK } from "configs/constants";
import InclusoesCEI from "./InclusoesCEI";

export class CorpoRelatorio extends Component {
  renderParteAvulsa(inclusoes) {
    const diasMotivosFormatados = formataMotivosDias(inclusoes);

    const getDia = dia => {
      return inclusaoDeAlimentacao[
        !ehInclusaoCei(tipoSolicitacao)
          ? "inclusoes"
          : "dias_motivos_da_inclusao_cei"
      ].find(i => i.data === dia);
    };

    const { inclusaoDeAlimentacao, tipoSolicitacao } = this.props;

    return (
      <>
        <table className="table-reasons">
          <tbody>
            {Object.entries(diasMotivosFormatados).map((dadosMotivo, key) => {
              const [motivo, datas] = dadosMotivo;
              return (
                <Fragment key={key}>
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
                            getDia(dia).cancelado ||
                            inclusaoDeAlimentacao.status === "ESCOLA_CANCELOU"
                              ? `cancelado`
                              : ""
                          }`}
                        >
                          <span>{dia}</span>
                          {(getDia(dia).cancelado ||
                            inclusaoDeAlimentacao.status ===
                              "ESCOLA_CANCELOU") && (
                            <div className="cancelado-justificativa">
                              <strong>justificativa:</strong>{" "}
                              {getDia(dia).cancelado_justificativa ||
                                inclusaoDeAlimentacao.logs[
                                  inclusaoDeAlimentacao.logs.length - 1
                                ].justificativa}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }

  renderParteContinua() {
    const {
      inclusaoDeAlimentacao: { data_final, data_inicial, motivo }
    } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-4 report-label-value">
            <p>Motivo</p>
            <p className="value">{motivo.nome}</p>
          </div>
          <div className="col-2 report-label-value">
            <p>De</p>
            <p className="value">{data_inicial}</p>
          </div>
          <div className="col-2 report-label-value">
            <p>Até</p>
            <p className="value">{data_final}</p>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {
      tipoSolicitacao,
      prazoDoPedidoMensagem,
      inclusaoDeAlimentacao: {
        uuid,
        id_externo,
        escola = { diretoria_regional: { nome: "" } },
        rastro_terceirizada,
        logs,
        quantidades_periodo,
        quantidade_alunos_por_faixas_etarias,
        dias_motivos_da_inclusao_cei,
        inclusoes,
        data,
        motivo,
        outro_motivo,
        status
      }
    } = this.props;

    const exibirNovoComponeneteCEI =
      !this.props.inclusaoDeAlimentacao.periodo_escolar &&
      ehInclusaoCei(tipoSolicitacao);

    const justificativaNegacao = justificativaAoNegarSolicitacao(
      this.props.inclusaoDeAlimentacao.logs
    );
    return (
      <div>
        <div className="row">
          <p
            className={`col-12 title-message ${corDaMensagem(
              prazoDoPedidoMensagem
            )}`}
          >
            {prazoDoPedidoMensagem}
            <Botao
              type={BUTTON_TYPE.BUTTON}
              style={BUTTON_STYLE.GREEN}
              icon={BUTTON_ICON.PRINT}
              className="float-right"
              onClick={() => {
                getRelatorioInclusaoAlimentacao(uuid, tipoSolicitacao);
              }}
            />
          </p>
          <div className="col-2">
            <span className="badge-sme badge-secondary-sme">
              <span className="id-of-solicitation-dre"># {id_externo}</span>
              <br />{" "}
              <span className="number-of-order-label">Nº DA SOLICITAÇÃO</span>
            </span>
          </div>
          <div className="pl-2 my-auto offset-1 col-5">
            <span className="requester">Escola Solicitante</span>
            <br />
            <span className="dre-name">{escola && escola.nome}</span>
          </div>
          <div className="my-auto col-4">
            <span className="requester">Código EOL</span>
            <br />
            <span className="dre-name">{escola && escola.codigo_eol}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-3 report-label-value">
            <p>DRE</p>
            <p className="value-important">{escola.diretoria_regional.nome}</p>
          </div>
          <div className="col-3 report-label-value">
            <p>Lote</p>
            <p className="value-important">
              {escola && escola.lote && escola.lote.nome}
            </p>
          </div>
          <div className="col-3 report-label-value">
            <p>Tipo de Gestão</p>
            <p className="value-important">
              {escola && escola.tipo_gestao && escola.tipo_gestao.nome}
            </p>
          </div>
          <div className="col-3 report-label-value">
            <p>Empresa</p>
            <p className="value-important">
              {rastro_terceirizada && rastro_terceirizada.nome_fantasia}
            </p>
          </div>
        </div>
        <hr />
        {logs && (
          <div className="row">
            <FluxoDeStatus
              listaDeStatus={logs}
              fluxo={fluxoPartindoEscola}
              eh_gestao_alimentacao={true}
            />
          </div>
        )}
        <hr />
        {ehInclusaoContinua(tipoSolicitacao)
          ? this.renderParteContinua()
          : this.renderParteAvulsa(
              inclusoes ||
                dias_motivos_da_inclusao_cei || [
                  {
                    data,
                    motivo,
                    outro_motivo
                  }
                ]
            )}
        {exibirNovoComponeneteCEI ? (
          <InclusoesCEI
            inclusaoDeAlimentacao={this.props.inclusaoDeAlimentacao}
          />
        ) : (
          <>
            <table className="table-report inclusoes mt-3">
              <tbody>
                <tr>
                  {ehInclusaoContinua(tipoSolicitacao) &&
                    motivo.nome !== "ETEC" && <th>Repetir</th>}
                  <th>Período</th>
                  <th>Tipos de Alimentação</th>
                  <th>Nº de Alunos</th>
                </tr>
                {!ehInclusaoCei(tipoSolicitacao) ? (
                  quantidades_periodo.map((quantidade_por_periodo, key) => {
                    return [
                      <tr
                        className={
                          quantidade_por_periodo.cancelado ||
                          status === "ESCOLA_CANCELOU"
                            ? "cancelado"
                            : ""
                        }
                        key={key}
                      >
                        {ehInclusaoContinua(tipoSolicitacao) &&
                          motivo.nome !== "ETEC" && (
                            <td className="weekly">
                              {WEEK.map((day, key) => {
                                return (
                                  <span
                                    key={key}
                                    className={
                                      quantidade_por_periodo.dias_semana
                                        .map(String)
                                        .includes(day.value)
                                        ? "week-circle-clicked green"
                                        : "week-circle"
                                    }
                                    data-cy={`dia-${key}`}
                                    value={day.value}
                                  >
                                    {day.label}
                                  </span>
                                );
                              })}
                            </td>
                          )}
                        <td>
                          <p>
                            {quantidade_por_periodo.periodo_escolar &&
                              quantidade_por_periodo.periodo_escolar.nome}
                          </p>
                        </td>
                        <td>
                          <p>
                            {stringSeparadaPorVirgulas(
                              quantidade_por_periodo.tipos_alimentacao,
                              "nome"
                            )}
                          </p>
                        </td>
                        <td>
                          <p>{quantidade_por_periodo.numero_alunos}</p>
                        </td>
                      </tr>,
                      ehInclusaoContinua(tipoSolicitacao) && (
                        <tr
                          key={key}
                          className={
                            quantidade_por_periodo.cancelado ||
                            status === "ESCOLA_CANCELOU"
                              ? "cancelado"
                              : ""
                          }
                        >
                          <td colSpan="4">
                            <p>
                              <strong>Observações: </strong>
                              {!["<p></p>", "", null].includes(
                                quantidade_por_periodo.observacao
                              ) ? (
                                <p
                                  className="value"
                                  dangerouslySetInnerHTML={{
                                    __html: quantidade_por_periodo.observacao
                                  }}
                                />
                              ) : (
                                "sem observações por parte da escola"
                              )}
                            </p>

                            {(quantidade_por_periodo.cancelado ||
                              status === "ESCOLA_CANCELOU") && (
                              <p className="justificativa-cancelamento">
                                <span className="font-weight-bold">
                                  PERÍODO CANCELADO - JUSTIFICATIVA:{" "}
                                </span>
                                {quantidade_por_periodo.cancelado_justificativa ||
                                  logs.find(
                                    log =>
                                      log.status_evento_explicacao ===
                                      "Escola cancelou"
                                  ).justificativa}
                              </p>
                            )}
                          </td>
                        </tr>
                      )
                    ];
                  })
                ) : (
                  <tr>
                    <td>
                      {this.props.inclusaoDeAlimentacao.periodo_escolar &&
                        this.props.inclusaoDeAlimentacao.periodo_escolar.nome}
                    </td>
                    <td>
                      {stringSeparadaPorVirgulas(
                        this.props.inclusaoDeAlimentacao.tipos_alimentacao,
                        "nome"
                      )}
                    </td>
                    <td>
                      {quantidade_alunos_por_faixas_etarias.reduce(function(
                        acc,
                        v
                      ) {
                        return acc + (v.quantidade || v.quantidade_alunos);
                      },
                      0)}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {ehInclusaoCei(tipoSolicitacao) && (
              <TabelaFaixaEtaria
                faixas={quantidade_alunos_por_faixas_etarias}
              />
            )}
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
      </div>
    );
  }
}

export default CorpoRelatorio;
