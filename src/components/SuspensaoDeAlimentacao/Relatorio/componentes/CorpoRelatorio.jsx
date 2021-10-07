import React from "react";
import { FluxoDeStatus } from "../../../Shareable/FluxoDeStatus";
import { stringSeparadaPorVirgulas } from "../../../../helpers/utilities";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "../../../Shareable/Botao/constants";
import { imprimeRelatorioSuspensaoAlimentacao } from "../../../../services/relatorios";
import Botao from "../../../Shareable/Botao";
import { fluxoInformativoPartindoEscola } from "../../../Shareable/FluxoDeStatus/helper";

export const CorpoRelatorio = props => {
  const { suspensaoAlimentacao, dadosEscola } = props;
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
        <div className="my-auto col-2">
          <span className="requester">Código EOL</span>
          <br />
          <span className="dre-name">
            {suspensaoAlimentacao.escola &&
              suspensaoAlimentacao.escola.codigo_eol}
          </span>
        </div>
        <p className={`col-2 title-message`}>
          <Botao
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.BLUE}
            icon={BUTTON_ICON.PRINT}
            className="float-right"
            onClick={() =>
              imprimeRelatorioSuspensaoAlimentacao(suspensaoAlimentacao.uuid)
            }
          />
        </p>
      </div>
      <div className="row">
        <div className="col-3 report-label-value">
          <p>DRE</p>
          <p className="value-important">
            {dadosEscola && dadosEscola.diretoria_regional.nome}
          </p>
        </div>
        <div className="col-3 report-label-value">
          <p>Lote</p>
          <p className="value-important">
            {dadosEscola && dadosEscola.lote.nome}
          </p>
        </div>
        <div className="col-3 report-label-value">
          <p>Tipo de Gestão</p>
          <p className="value-important">
            {dadosEscola && dadosEscola.tipo_gestao.nome}
          </p>
        </div>
        <div className="col-3 report-label-value">
          <p>Empresa</p>
          <p className="value-important">
            {suspensaoAlimentacao.rastro_terceirizada &&
              suspensaoAlimentacao.rastro_terceirizada.nome_fantasia}
          </p>
        </div>
      </div>
      <hr />
      {suspensaoAlimentacao.logs && (
        <div className="row">
          <FluxoDeStatus
            listaDeStatus={suspensaoAlimentacao.logs}
            fluxo={fluxoInformativoPartindoEscola}
          />
        </div>
      )}
      <hr />
      <table className="table-reasons">
        <tr className="row">
          <th className="col-8">Motivo</th>
          <th className="col-4">Dia(s) de suspensão</th>
        </tr>
        {suspensaoAlimentacao.suspensoes_alimentacao.map((suspensao, index) => (
          <tr className="row" key={index}>
            <td className="col-8">
              {suspensao.motivo.nome === "Outro"
                ? `${suspensao.motivo.nome} - ${suspensao.outro_motivo}`
                : suspensao.motivo.nome}
            </td>
            <td className="col-4">{suspensao.data}</td>
          </tr>
        ))}
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
                    "label"
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
