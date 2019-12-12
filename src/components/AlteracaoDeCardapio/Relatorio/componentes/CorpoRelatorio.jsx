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
            <br /> <span className="number-of-order-label">ID DO PEDIDO</span>
          </span>
        </div>
        <div className="report-div-beside-order my-auto col-8">
          <span className="requester">Escola Solicitante</span>
          <br />
          <span className="dre-name">
            {alteracaoDeCardapio.escola && alteracaoDeCardapio.escola.nome}
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
      <div className="row">
        <div className="report-students-div col-3">
          <span>Nº de alunos matriculados total</span>
          <span>{alteracaoDeCardapio.escola.quantidade_alunos}</span>
        </div>
      </div>
      <div className="row">
        <div className="col-12 report-label-value">
          <p className="value">Descrição da Alteração de Cardápio</p>
        </div>
      </div>
      <table className="table-periods">
        <tr>
          <th>Data Inicial</th>
          <th>Data Final</th>
        </tr>
        <tr>
          <td>{alteracaoDeCardapio.data_inicial}</td>
          <td>{alteracaoDeCardapio.data_final}</td>
        </tr>
      </table>
      <table className="table-periods">
        <tr>
          <th>Período</th>
          <th>Tipos de Alimentação de</th>
          <th>Tipos de Alimentação para</th>
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
          <th>Motivo</th>
        </tr>
        <tr>
          <td>{alteracaoDeCardapio.motivo.nome}</td>
        </tr>
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
