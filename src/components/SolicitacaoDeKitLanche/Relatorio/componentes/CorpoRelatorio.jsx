import React from "react";
import { FluxoDeStatus } from "../../../Shareable/FluxoDeStatus";
import { corDaMensagem } from "../../../../helpers/utilities";
import Botao from "../../../Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "../../../Shareable/Botao/constants";

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
          />
        </p>
        <div className="col-2">
          <span className="badge-sme badge-secondary-sme">
            <span className="id-of-solicitation-dre">
              # {solicitacaoKitLanche.id_externo}
            </span>
            <br /> <span className="number-of-order-label">ID DO PEDIDO</span>
          </span>
        </div>
        <div className="report-div-beside-order my-auto col-8">
          <span className="requester">Escola Solicitante</span>
          <br />
          <span className="dre-name">
            {solicitacaoKitLanche.escola && solicitacaoKitLanche.escola.nome}
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
        <FluxoDeStatus listaDeStatus={solicitacaoKitLanche.logs} />
      </div>
      <hr />
      <div className="row">
        <div className="report-students-div col-3">
          <span>Nº de alunos matriculados total</span>
          <span>
            {solicitacaoKitLanche.escola &&
              solicitacaoKitLanche.escola.alunos_total}
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-12 report-label-value">
          <p className="value">Descrição da Solicitação</p>
        </div>
      </div>
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
      <div className="row">
        <div className="col-4 report-label-value">
          <p>Nº de alunos participantes</p>
          <p className="value">
            {solicitacaoKitLanche.quantidade_alunos} alunos
          </p>
        </div>
        <div className="col-8 report-label-value">
          <p>Tempo previsto do passeio</p>
          <p className="value">
            {solicitacaoKitLanche.solicitacao_kit_lanche &&
              solicitacaoKitLanche.solicitacao_kit_lanche
                .tempo_passeio_explicacao}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 float-right report-label-value">
          <p>Opção desejada</p>
          {solicitacaoKitLanche.solicitacao_kit_lanche &&
            solicitacaoKitLanche.solicitacao_kit_lanche.kits.map((kit, key) => {
              return (
                <p key={key} className="value">
                  Modelo {kit.nome}
                </p>
              );
            })}
        </div>
      </div>
      {solicitacaoKitLanche.solicitacao_kit_lanche &&
        solicitacaoKitLanche.solicitacao_kit_lanche.kits && (
          <div className="row">
            <div className="col-12 float-right report-label-value">
              <p>Nº total de kits</p>
              <p className="value">
                {solicitacaoKitLanche.solicitacao_kit_lanche.kits.length *
                  solicitacaoKitLanche.quantidade_alunos}{" "}
                kits
              </p>
            </div>
          </div>
        )}
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
