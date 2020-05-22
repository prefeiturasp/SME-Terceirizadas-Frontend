import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { HOME } from "constants/config";
import StatusSolicitacoes from "components/screens/DashboardTerceirizada/StatusSolicitacoes";
import { CARD_TYPE_ENUM } from "components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { ICON_CARD_TYPE_ENUM } from "components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { getHomologacoesDeProdutoPorStatus } from "services/produto.service";
import { formataCards } from "components/screens/DashboardGestaoProduto/helper";
import { GESTAO_PRODUTO_CARDS } from "configs/constants";
import { ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS } from "constants/shared";

import { escolheStatusPendenteHomologacao } from "./helpers";

class StatusSolicitacoesBase extends React.Component {
  render() {
    const atual = {
      href: "#",
      titulo: "Status Solicitações"
    };

    return (
      <Page>
        <Breadcrumb home={HOME} atual={atual} />
        <StatusSolicitacoes
          formatarDadosSolicitacao={formataCards}
          endpointGetSolicitacoes={getHomologacoesDeProdutoPorStatus}
          {...this.props}
        />
      </Page>
    );
  }
}

export const ReclamacaoDeProduto = () => (
  <StatusSolicitacoesBase
    status={ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS.CODAE_PEDIU_ANALISE_RECLAMACAO}
    tipoCard={CARD_TYPE_ENUM.RECLAMACAO}
    icone={ICON_CARD_TYPE_ENUM.RECLAMACAO}
    titulo={GESTAO_PRODUTO_CARDS.RECLAMACAO_DE_PRODUTO}
  />
);

export const ProdutosSuspensos = () => (
  <StatusSolicitacoesBase
    status={ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS.CODAE_SUSPENDEU}
    tipoCard={CARD_TYPE_ENUM.CANCELADO}
    icone={ICON_CARD_TYPE_ENUM.SUSPENSO}
    titulo={GESTAO_PRODUTO_CARDS.PRODUTOS_SUSPENSOS}
  />
);

export const CorrecaoDeProduto = () => (
  <StatusSolicitacoesBase
    status={ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS.CODAE_AUTORIZOU_RECLAMACAO}
    tipoCard={CARD_TYPE_ENUM.CORRECAO}
    icone={ICON_CARD_TYPE_ENUM.CORRECAO}
    titulo={GESTAO_PRODUTO_CARDS.CORRECAO_DE_PRODUTO}
  />
);

export const AguardandoAnaliseReclamacao = () => (
  <StatusSolicitacoesBase
    status={ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS.CODAE_QUESTIONADO}
    tipoCard={CARD_TYPE_ENUM.AGUARDANDO_ANALISE_RECLAMACAO}
    icone={ICON_CARD_TYPE_ENUM.AGUARDANDO_ANALISE_RECLAMACAO}
    titulo={GESTAO_PRODUTO_CARDS.AGUARDANDO_ANALISE_RECLAMACAO}
  />
);

export const AguardandoAnaliseSensorial = () => (
  <StatusSolicitacoesBase
    status={ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS.CODAE_PEDIU_ANALISE_SENSORIAL}
    tipoCard={CARD_TYPE_ENUM.AGUARDANDO_ANALISE_SENSORIAL}
    icone={ICON_CARD_TYPE_ENUM.AGUARDANDO_ANALISE_SENSORIAL}
    titulo={GESTAO_PRODUTO_CARDS.AGUARDANDO_ANALISE_SENSORIAL}
  />
);

export const PendenteHomologacao = () => (
  <StatusSolicitacoesBase
    status={escolheStatusPendenteHomologacao()}
    tipoCard={CARD_TYPE_ENUM.PENDENTE}
    icone={ICON_CARD_TYPE_ENUM.PENDENTE}
    titulo={GESTAO_PRODUTO_CARDS.PENDENTE_HOMOLOGACAO}
  />
);

export const Homologados = () => (
  <StatusSolicitacoesBase
    status={ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS.CODAE_HOMOLOGADO}
    tipoCard={CARD_TYPE_ENUM.AUTORIZADO}
    icone={ICON_CARD_TYPE_ENUM.AUTORIZADO}
    titulo={GESTAO_PRODUTO_CARDS.HOMOLOGADOS}
  />
);

export const NaoHomologados = () => (
  <StatusSolicitacoesBase
    status={ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS.CODAE_NAO_HOMOLOGADO}
    tipoCard={CARD_TYPE_ENUM.NEGADO}
    icone={ICON_CARD_TYPE_ENUM.NEGADO}
    titulo={GESTAO_PRODUTO_CARDS.NAO_HOMOLOGADOS}
  />
);
