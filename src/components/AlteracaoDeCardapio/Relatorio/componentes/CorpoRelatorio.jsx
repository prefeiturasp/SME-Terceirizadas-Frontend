import React from "react";
import { FluxoDeStatus } from "../../../Shareable/FluxoDeStatus";
import { corDaMensagem } from "../../../../helpers/utilities";

export const CorpoRelatorio = props => {
  const { alteracaoDeCardapio, prazoDoPedidoMensagem } = props;
  return (
    <div>
      <div className="row">
        <p
          className={`col-12 title-message ${corDaMensagem(
            prazoDoPedidoMensagem
          )}`}
        >
          {prazoDoPedidoMensagem}
        </p>
        <div className="col-2">
          <span className="badge-sme badge-secondary-sme">
            <span className="id-of-solicitation-dre">
              # {alteracaoDeCardapio.id_externo}
            </span>
            <br />{" "}
            <span className="number-of-order-label">Nº DA SOLICITAÇÃO</span>
          </span>
        </div>
        <div className="pl-2 my-auto offset-1 col-5">
          <span className="requester">Escola Solicitante</span>
          <br />
          <span className="dre-name">
            {alteracaoDeCardapio.escola && alteracaoDeCardapio.escola.nome}
          </span>
        </div>
        <div className="my-auto col-4">
          <span className="requester">Código EOL</span>
          <br />
          <span className="dre-name">
            {alteracaoDeCardapio.escola &&
              alteracaoDeCardapio.escola.codigo_eol}
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-2 report-label-value">
          <p>DRE</p>
          <p className="value-important">
            {alteracaoDeCardapio.escola &&
              alteracaoDeCardapio.escola.diretoria_regional &&
              alteracaoDeCardapio.escola.diretoria_regional.nome}
          </p>
        </div>
        <div className="col-2 report-label-value">
          <p>Lote</p>
          <p className="value-important">
            {alteracaoDeCardapio.escola &&
              alteracaoDeCardapio.escola.lote &&
              alteracaoDeCardapio.escola.lote.nome}
          </p>
        </div>
        <div className="col-2 report-label-value">
          <p>Tipo de Gestão</p>
          <p className="value-important">
            {alteracaoDeCardapio.escola &&
              alteracaoDeCardapio.escola.tipo_gestao &&
              alteracaoDeCardapio.escola.tipo_gestao.nome}
          </p>
        </div>
      </div>
      <hr />
      {alteracaoDeCardapio.logs && (
        <div className="row">
          <FluxoDeStatus listaDeStatus={alteracaoDeCardapio.logs} />
        </div>
      )}
      <hr />
      <table className="table-periods">
        <tr>
          <th>Motivo</th>
          {alteracaoDeCardapio.data_inicial ===
          alteracaoDeCardapio.data_final ? (
            <th>Alterar dia</th>
          ) : (
            [<th key={0}>Alterar de</th>, <th key={1}>Até</th>]
          )}
        </tr>
        <tr>
          <td>{alteracaoDeCardapio.motivo.nome}</td>
          {alteracaoDeCardapio.data_inicial ===
          alteracaoDeCardapio.data_final ? (
            <td>{alteracaoDeCardapio.data_inicial}</td>
          ) : (
            [
              <td key={0}>{alteracaoDeCardapio.data_inicial}</td>,
              <td key={1}>{alteracaoDeCardapio.data_final}</td>
            ]
          )}
        </tr>
      </table>
      <table className="table-report mt-4">
        <tr>
          <th>Período</th>
          <th>Alteração alimentação de:</th>
          <th>Alteração alimentação para:</th>
        </tr>
        {alteracaoDeCardapio.substituicoes.map(
          (quantidade_por_periodo, key) => {
            return (
              <tr key={key}>
                <td>
                  {quantidade_por_periodo.periodo_escolar &&
                    quantidade_por_periodo.periodo_escolar.nome}
                </td>
                <td>{quantidade_por_periodo.tipo_alimentacao_de.nome}</td>
                <td>{quantidade_por_periodo.tipo_alimentacao_para.nome}</td>
              </tr>
            );
          }
        )}
      </table>
      <table className="table-periods">
        <tr>
          <th>Observações</th>
        </tr>
        <tr>
          <td>
            <p
              className="value"
              dangerouslySetInnerHTML={{
                __html: alteracaoDeCardapio.observacao
              }}
            />
          </td>
        </tr>
      </table>
    </div>
  );
};

export default CorpoRelatorio;
