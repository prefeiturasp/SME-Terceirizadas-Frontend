import React from "react";
import { FluxoDeStatus } from "../../../Shareable/FluxoDeStatus";
import { corDaMensagem } from "../../../../helpers/utilities";
import Botao from "../../../Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "../../../Shareable/Botao/constants";
import { stringSeparadaPorVirgulas } from "../../../../helpers/utilities";
import { getDetalheKitLancheAvulso } from "../../../../services/relatorios";
import { fluxoPartindoEscola } from "../../../Shareable/FluxoDeStatus/helper";

export const CorpoRelatorio = props => {
  const { solicitacaoKitLanche, prazoDoPedidoMensagem } = props;
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
            style={BUTTON_STYLE.BLUE}
            icon={BUTTON_ICON.PRINT}
            className="float-right"
            onClick={() => {
              getDetalheKitLancheAvulso(solicitacaoKitLanche.uuid);
            }}
          />
        </p>
        <div className="col-2">
          <span className="badge-sme badge-secondary-sme">
            <span className="id-of-solicitation-dre">
              # {solicitacaoKitLanche.id_externo}
            </span>
            <br />{" "}
            <span className="number-of-order-label">Nº DA SOLICITAÇÃO</span>
          </span>
        </div>
        <div className="pl-2 my-auto offset-1 col-5">
          <span className="requester">Escola Solicitante</span>
          <br />
          <span className="dre-name">
            {solicitacaoKitLanche.escola && solicitacaoKitLanche.escola.nome}
          </span>
        </div>
        <div className="my-auto col-4">
          <span className="requester">Código EOL</span>
          <br />
          <span className="dre-name">
            {solicitacaoKitLanche.escola &&
              solicitacaoKitLanche.escola.codigo_eol}
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-2 report-label-value">
          <p>DRE</p>
          <p className="value-important">
            {solicitacaoKitLanche.escola &&
              solicitacaoKitLanche.escola.diretoria_regional &&
              solicitacaoKitLanche.escola.diretoria_regional.nome}
          </p>
        </div>
        <div className="col-2 report-label-value">
          <p>Lote</p>
          <p className="value-important">
            {solicitacaoKitLanche.escola &&
              solicitacaoKitLanche.escola.lote &&
              solicitacaoKitLanche.escola.lote.nome}
          </p>
        </div>
        <div className="col-2 report-label-value">
          <p>Tipo de Gestão</p>
          <p className="value-important">
            {solicitacaoKitLanche.escola &&
              solicitacaoKitLanche.escola.tipo_gestao &&
              solicitacaoKitLanche.escola.tipo_gestao.nome}
          </p>
        </div>
      </div>
      <hr />
      <div className="row">
        <FluxoDeStatus
          listaDeStatus={solicitacaoKitLanche.logs}
          fluxo={fluxoPartindoEscola}
        />
      </div>
      <hr />
      <div className="row">
        <div className="col-4 report-label-value">
          <p>Data do evento</p>
          <p className="value">
            {solicitacaoKitLanche.solicitacao_kit_lanche &&
              solicitacaoKitLanche.solicitacao_kit_lanche.data}
          </p>
        </div>
        <div className="col-8 report-label-value">
          <p>Local do passeio</p>
          <p className="value">{solicitacaoKitLanche.local}</p>
        </div>
      </div>
      <table className="table-report">
        <tr>
          <th>Nº de Alunos</th>
          <th>Tempo Previsto de Passeio</th>
          <th>Opção Desejada</th>
          <th>Nº Total de Kits</th>
        </tr>
        <tr>
          <td>{solicitacaoKitLanche.quantidade_alunos}</td>
          <td>
            {
              solicitacaoKitLanche.solicitacao_kit_lanche
                .tempo_passeio_explicacao
            }
          </td>
          <td>
            {stringSeparadaPorVirgulas(
              solicitacaoKitLanche.solicitacao_kit_lanche.kits,
              "nome"
            )}
          </td>
          <td>
            {solicitacaoKitLanche.solicitacao_kit_lanche.kits.length *
              solicitacaoKitLanche.quantidade_alunos}
          </td>
        </tr>
      </table>
      <div className="row">
        <div className="col-12 report-label-value">
          <p>Observações</p>
          <p
            className="value"
            dangerouslySetInnerHTML={{
              __html:
                solicitacaoKitLanche.solicitacao_kit_lanche &&
                solicitacaoKitLanche.solicitacao_kit_lanche.descricao
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CorpoRelatorio;
