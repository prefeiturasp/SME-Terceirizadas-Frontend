import React from "react";
import { FluxoDeStatus } from "../../../Shareable/FluxoDeStatus";
import { stringSeparadaPorVirgulas } from "../../../../helpers/utilities";
import { formatarDiasMotivosSuspensao, MOTIVOS_SUSPENSAO } from "./helper";

export const CorpoRelatorio = props => {
  const { suspensaoAlimentacao, dadosEscola } = props;
  const diasMotivosFormatados = formatarDiasMotivosSuspensao(
    suspensaoAlimentacao.suspensoes_alimentacao
  );
  return (
    <div>
      <div className="row">
        <div className="col-2">
          <span className="badge-sme badge-secondary-sme">
            <span className="id-of-solicitation-dre">
              # {suspensaoAlimentacao.id_externo}
            </span>
            <br />{" "}
            <span className="number-of-order-label">Nº DA SOLICITAÇÂO</span>
          </span>
        </div>
        <div className="pl-2 my-auto offset-1 col-5">
          <span className="requester">Escola Solicitante</span>
          <br />
          <span className="dre-name">
            {suspensaoAlimentacao.escola && suspensaoAlimentacao.escola.nome}
          </span>
        </div>
        <div className="my-auto col-4">
          <span className="requester">Código EOL</span>
          <br />
          <span className="dre-name">
            {suspensaoAlimentacao.escola &&
              suspensaoAlimentacao.escola.codigo_eol}
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-2 report-label-value">
          <p>DRE</p>
          <p className="value-important">
            {dadosEscola && dadosEscola.diretoria_regional.nome}
          </p>
        </div>
        <div className="col-2 report-label-value">
          <p>Lote</p>
          <p className="value-important">
            {dadosEscola && dadosEscola.lote.nome}
          </p>
        </div>
        <div className="col-2 report-label-value">
          <p>Tipo de Gestão</p>
          <p className="value-important">
            {dadosEscola && dadosEscola.tipo_gestao.nome}
          </p>
        </div>
      </div>
      <hr />
      {suspensaoAlimentacao.logs && (
        <div className="row">
          <FluxoDeStatus
            listaDeStatus={suspensaoAlimentacao.logs}
            tipoDeFluxo={"informativo"}
          />
        </div>
      )}
      <hr />
      <table className="table-reasons">
        {MOTIVOS_SUSPENSAO.map(motivo => {
          return (
            diasMotivosFormatados[motivo].length > 0 && [
              <tr className="row" key={0}>
                <th className="col-2">Motivo</th>
                <th className="col-10">Dia(s) de suspensão</th>
              </tr>,
              <tr className="row" key={1}>
                <td className="col-2">{motivo}</td>
                {diasMotivosFormatados[motivo].map((dia, key) => {
                  return (
                    <td key={key} className="col-2">
                      {dia}
                    </td>
                  );
                })}
              </tr>
            ]
          );
        })}
      </table>
      <table className="table-report mt-3">
        <tr>
          <th>Período</th>
          <th>Tipos de Alimentação</th>
          <th>Nº de Alunos</th>
        </tr>
        {suspensaoAlimentacao.quantidades_por_periodo.map(
          (quantidade_por_periodo, key) => {
            return (
              <tr key={key}>
                <td>
                  {quantidade_por_periodo.periodo_escolar &&
                    quantidade_por_periodo.periodo_escolar.nome}
                </td>
                <td>
                  {stringSeparadaPorVirgulas(
                    quantidade_por_periodo.tipos_alimentacao,
                    "nome"
                  )}
                </td>
                <td>{quantidade_por_periodo.numero_alunos}</td>
              </tr>
            );
          }
        )}
      </table>
      <div className="row">
        <div className="col-12 report-label-value">
          <p>Observações</p>
          <p
            className="value"
            dangerouslySetInnerHTML={{
              __html: suspensaoAlimentacao.observacao
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CorpoRelatorio;
