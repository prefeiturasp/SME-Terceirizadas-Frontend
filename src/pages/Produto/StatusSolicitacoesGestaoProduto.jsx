import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import { HOME } from "../../constants/config";
import StatusSolicitacoes from "../../components/screens/DashboardTerceirizada/StatusSolicitacoes";
import { CARD_TYPE_ENUM } from "../../components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { ICON_CARD_TYPE_ENUM } from "../../components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import {
  getHomologados,
  getNaoHomologados,
  getAguardandoAnaliseSensorial
} from "../../services/produto.service";
import { formataCards } from "components/screens/DashboardGestaoProduto/helper";

class StatusSolicitacoesBase extends React.Component {
  render() {
    const atual = {
      href: "#",
      titulo: "Status Solicitações"
    };

    return (
      <Page>
        <Breadcrumb home={HOME} atual={atual} />
        <StatusSolicitacoes funcaoFormatar={formataCards} {...this.props} />
      </Page>
    );
  }
}

export const AguardandoAnaliseSensorial = () => (
  <StatusSolicitacoesBase
    endpointGetSolicitacoes={getAguardandoAnaliseSensorial}
    tipoCard={CARD_TYPE_ENUM.AGUARDANDO_ANALISE_SENSORIAL}
    icone={ICON_CARD_TYPE_ENUM.AGUARDANDO_ANALISE_SENSORIAL}
    titulo="Aguardando análise sensorial"
  />
);

export const Homologados = () => (
  <StatusSolicitacoesBase
    endpointGetSolicitacoes={getHomologados}
    tipoCard={CARD_TYPE_ENUM.AUTORIZADO}
    icone={ICON_CARD_TYPE_ENUM.AUTORIZADO}
    titulo="Homologados"
  />
);

export const NaoHomologados = () => (
  <StatusSolicitacoesBase
    endpointGetSolicitacoes={getNaoHomologados}
    tipoCard={CARD_TYPE_ENUM.NEGADO}
    icone={ICON_CARD_TYPE_ENUM.NEGADO}
    titulo="Não homologados"
  />
);
