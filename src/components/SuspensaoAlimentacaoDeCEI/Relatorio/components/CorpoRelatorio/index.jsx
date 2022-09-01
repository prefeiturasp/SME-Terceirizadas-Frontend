import React from "react";
import { fluxoInformativoPartindoEscola } from "components/Shareable/FluxoDeStatus/helper";
import { FluxoDeStatus } from "components/Shareable/FluxoDeStatus";

export default ({ solicitacaoSuspensao }) => {
  return (
    <>
      <div className="row">
        <div className="col-3 my-auto">
          <div className="badge-sme badge-secondary-sme">
            <span className="id-of-solicitation-dre">
              {solicitacaoSuspensao.id_externo}
            </span>
            <br />{" "}
            <span className="number-of-order-label">Nº DA SOLICITAÇÂO</span>
          </div>
        </div>
        <div className="col-5 my-auto">
          <span className="requester">Escola Solicitante</span>
          <br />
          <span className="dre-name">{solicitacaoSuspensao.escola.nome}</span>
        </div>
        <div className="col-2 my-auto">
          <span className="requester">Código EOL</span>
          <br />
          <span className="dre-name">
            {solicitacaoSuspensao.escola.codigo_eol}
          </span>
        </div>
        <div className="col-2 my-auto" />
      </div>
      <div className="row">
        <div className="col-3 report-label-value">
          <p>DRE</p>
          <p className="value-important">
            {solicitacaoSuspensao.escola.diretoria_regional.nome}
          </p>
        </div>
        <div className="col-3 report-label-value">
          <p>Lote</p>
          <p className="value-important">
            {solicitacaoSuspensao.escola.lote.nome}
          </p>
        </div>
        <div className="col-3 report-label-value">
          <p>Tipo de Gestão</p>
          <p className="value-important">
            {solicitacaoSuspensao.escola.tipo_gestao.nome}
          </p>
        </div>
        <div className="col-3 report-label-value">
          <p>Empresa</p>
          <p className="value-important">
            {solicitacaoSuspensao.rastro_terceirizada.nome_fantasia}
          </p>
        </div>
      </div>
      <hr />
      <div className="row">
        <FluxoDeStatus
          listaDeStatus={solicitacaoSuspensao.logs}
          fluxo={fluxoInformativoPartindoEscola}
          eh_gestao_alimentacao={true}
        />
      </div>
      <hr />
      <table className="table-reasons">
        <tr className="row">
          <th className="col-8">Motivo</th>
          <th className="col-4">Dia(s) de suspensão</th>
        </tr>
        <tr className="row">
          <td className="col-8">
            {solicitacaoSuspensao.motivo.nome === "Outro"
              ? solicitacaoSuspensao.outro_motivo
              : solicitacaoSuspensao.motivo.nome}
          </td>
          <td className="col-4">{solicitacaoSuspensao.data}</td>
        </tr>
      </table>
      <table className="table-report mt-3">
        <tr>
          <th>Período</th>
        </tr>
        {solicitacaoSuspensao.periodos_escolares.map((periodo, key) => {
          return (
            <tr key={key}>
              <td>{periodo.nome}</td>
            </tr>
          );
        })}
      </table>
      <div className="row">
        <div className="col-12 report-label-value" />
      </div>
    </>
  );
};
