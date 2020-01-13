import React from "react";
import { FluxoDeStatus } from "../../../Shareable/FluxoDeStatus";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "../../../Shareable/Botao/constants";
import Botao from "../../../Shareable/Botao";
import { TabelaKits } from "./TabelaKits";
import { corDaMensagem } from "../../../../helpers/utilities";
import { getDetalheKitLancheUnificado } from "../../../../services/relatorios";

export const CorpoRelatorio = props => {
  const { solicitacaoUnificada, prazoDoPedidoMensagem } = props;
  return (
    <div>
      <div className="container-detail">
        <div className="row">
          <p
            className={`col-12 title-message ${corDaMensagem(
              prazoDoPedidoMensagem
            )}`}
          >
            {prazoDoPedidoMensagem}
            <a href={getDetalheKitLancheUnificado(solicitacaoUnificada.uuid)}>
              <Botao
                type={BUTTON_TYPE.BUTTON}
                style={BUTTON_STYLE.BLUE}
                icon={BUTTON_ICON.PRINT}
                className="float-right"
              />
            </a>
          </p>
          <div className="col-2">
            <span className="badge-sme badge-secondary-sme">
              <span className="id-of-solicitation-dre">
                # {solicitacaoUnificada.id_externo}
              </span>
              <br /> <span className="number-of-order-label">ID DO PEDIDO</span>
            </span>
          </div>
          <div className="my-auto col-6 pl-5">
            <span className="requester">Diretoria Regional Solicitante</span>
            <br />
            <span className="dre-name">
              {solicitacaoUnificada.diretoria_regional.nome}
            </span>
          </div>
          <div className="my-auto col-4">
            <span className="requester">Lote</span>
            <br />
            <span className="dre-name">{solicitacaoUnificada.lote_nome}</span>
          </div>
        </div>

        <hr />
        <FluxoDeStatus
          tipoDeFluxo="partindoDRE"
          listaDeStatus={solicitacaoUnificada.logs}
        />
        <hr />

        <div className="descricao-evento">
          <div className="direita">
            <div className="descricao-container">
              <div className="descricao-titulo">Local do passeio</div>
              <div className="descricao-texto">
                {solicitacaoUnificada.local}
              </div>
            </div>
          </div>
          <div className="esquerda">
            <div className="descricao-container">
              <div className="descricao-titulo">Data do evento</div>
              <div className="descricao-observacao">
                {solicitacaoUnificada.solicitacao_kit_lanche.data}
              </div>
            </div>
          </div>
        </div>

        <div className="tabela-escolas header-tabela">
          <div>Código</div>
          <div>Unidade Escolar</div>
          <div>N° de alunos participantes</div>
          <div>Tempo de passeio</div>
          <div>Opção desejada</div>
          <div>N° Total de Kits</div>
        </div>

        <div>
          {solicitacaoUnificada.escolas_quantidades.map(
            (escola_quantidade, key) => {
              return (
                <TabelaKits
                  key={key}
                  escola_quantidade={escola_quantidade}
                  solicitacaoUnificada={solicitacaoUnificada}
                />
              );
            }
          )}
        </div>

        <div className="observacoes-solicitacao">
          <div className="div-topo">
            <div>
              <div className="descricao-titulo">
                N° total de Unidade Escolares beneficiadas
              </div>
              <div className="descricao-texto">{`${
                solicitacaoUnificada.escolas_quantidades.length
              } Unidades Escolares`}</div>
            </div>
            <div className="kits">
              <div>
                <div className="descricao-titulo">N° total de Kits</div>
                <div className="descricao-texto">
                  {solicitacaoUnificada.total_kit_lanche} Kits
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="descricao-titulo">Observações</div>
            <div
              className="descricao-texto"
              dangerouslySetInnerHTML={{
                __html: solicitacaoUnificada.solicitacao_kit_lanche.descricao
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorpoRelatorio;
