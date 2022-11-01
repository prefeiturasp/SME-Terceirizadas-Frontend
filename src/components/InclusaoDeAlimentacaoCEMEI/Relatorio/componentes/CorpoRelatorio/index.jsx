import { formataMotivosDias } from "components/InclusaoDeAlimentacao/Relatorio/componentes/helper";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { FluxoDeStatus } from "components/Shareable/FluxoDeStatus";
import { fluxoPartindoEscola } from "components/Shareable/FluxoDeStatus/helper";
import { corDaMensagem, prazoDoPedidoMensagem } from "helpers/utilities";
import React from "react";

export const CorpoRelatorio = ({ solicitacao }) => {
  return (
    <div>
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
    </div>
  );
};
