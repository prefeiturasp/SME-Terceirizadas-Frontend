import React, { Component } from "react";
import { FluxoDeStatus } from "../../../Shareable/FluxoDeStatus";
import {
  corDaMensagem,
  stringSeparadaPorVirgulas
} from "../../../../helpers/utilities";
import Botao from "../../../Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "../../../Shareable/Botao/constants";
import { formatarDiasMotivos, MOTIVOS } from "./helper";
import "./style.scss";

export class CorpoRelatorio extends Component {
  renderParteAvulsa() {
    const { inclusaoDeAlimentacao } = this.props;
    const diasMotivosFormatados = formatarDiasMotivos(
      inclusaoDeAlimentacao.inclusoes
    );
    return (
      <table className="table-reasons">
        {MOTIVOS.map(motivo => {
          return (
            diasMotivosFormatados[motivo].length > 0 && [
              <tr className="row" key={0}>
                <th className="col-2">Motivo</th>
                <th className="col-10">Dia(s) de inclusão</th>
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
    );
  }

  renderParteContinua() {
    const { inclusaoDeAlimentacao } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-4 report-label-value">
            <p>Período</p>
            <p className="value">
              {`${inclusaoDeAlimentacao.data_inicial} - ${
                inclusaoDeAlimentacao.data_final
              }`}
            </p>
          </div>
          <div className="col-4 report-label-value">
            <p>Motivo</p>
            <p className="value">{inclusaoDeAlimentacao.motivo.nome}</p>
          </div>
          <div className="col-4 report-label-value">
            <p>Dias da Semana</p>
            <p className="value">
              {inclusaoDeAlimentacao.dias_semana_explicacao}
            </p>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {
      ehInclusaoContinua,
      inclusaoDeAlimentacao,
      prazoDoPedidoMensagem
    } = this.props;
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
              titulo="imprimir"
              style={BUTTON_STYLE.BLUE}
              icon={BUTTON_ICON.PRINT}
              className="float-right"
            />
          </p>
          <div className="col-2">
            <span className="badge-sme badge-secondary-sme">
              <span className="id-of-solicitation-dre">
                # {inclusaoDeAlimentacao.id_externo}
              </span>
              <br />{" "}
              <span className="number-of-order-label">Nº DA SOLICITAÇÃO</span>
            </span>
          </div>
          <div className="pl-2 my-auto offset-1 col-5">
            <span className="requester">Escola Solicitante</span>
            <br />
            <span className="dre-name">
              {inclusaoDeAlimentacao.escola &&
                inclusaoDeAlimentacao.escola.nome}
            </span>
          </div>
          <div className="my-auto col-4">
            <span className="requester">Código EOL</span>
            <br />
            <span className="dre-name">
              {inclusaoDeAlimentacao.escola &&
                inclusaoDeAlimentacao.escola.codigo_eol}
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-2 report-label-value">
            <p>DRE</p>
            <p className="value-important">
              {inclusaoDeAlimentacao.escola.diretoria_regional.nome}
            </p>
          </div>
          <div className="col-2 report-label-value">
            <p>Lote</p>
            <p className="value-important">
              {inclusaoDeAlimentacao.escola &&
                inclusaoDeAlimentacao.escola.lote &&
                inclusaoDeAlimentacao.escola.lote.nome}
            </p>
          </div>
          <div className="col-2 report-label-value">
            <p>Tipo de Gestão</p>
            <p className="value-important">
              {inclusaoDeAlimentacao.escola &&
                inclusaoDeAlimentacao.escola.tipo_gestao &&
                inclusaoDeAlimentacao.escola.tipo_gestao.nome}
            </p>
          </div>
        </div>
        <hr />
        {inclusaoDeAlimentacao.logs && (
          <div className="row">
            <FluxoDeStatus listaDeStatus={inclusaoDeAlimentacao.logs} />
          </div>
        )}
        <hr />
        {ehInclusaoContinua
          ? this.renderParteContinua()
          : this.renderParteAvulsa()}
        <table className="table-report mt-3">
          <tr>
            <th>Período</th>
            <th>Tipos de Alimentação</th>
            <th>Nº de Alunos</th>
          </tr>
          {inclusaoDeAlimentacao.quantidades_periodo.map(
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
                __html: inclusaoDeAlimentacao.descricao
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CorpoRelatorio;
