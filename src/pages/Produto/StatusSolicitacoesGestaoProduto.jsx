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
  getPendenteHomologacao,
  getAguardandoAnaliseSensorial,
  getAguardandoAnaliseReclamacao,
  getProdutosSuspensos,
  getReclamacaoDeProduto,
  getCorrecaoDeProduto
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

export const ReclamacaoDeProduto = () => (
  <StatusSolicitacoesBase
    endpointGetSolicitacoes={getReclamacaoDeProduto}
    tipoCard={CARD_TYPE_ENUM.RECLAMACAO}
    icone={ICON_CARD_TYPE_ENUM.RECLAMACAO}
    titulo="Reclamação de produto"
  />
);

export const ProdutosSuspensos = () => (
  <StatusSolicitacoesBase
    endpointGetSolicitacoes={getProdutosSuspensos}
    tipoCard={CARD_TYPE_ENUM.CANCELADO}
    icone={ICON_CARD_TYPE_ENUM.SUSPENSO}
    titulo="Produtos suspensos"
  />
);

export const CorrecaoDeProduto = () => (
  <StatusSolicitacoesBase
    endpointGetSolicitacoes={getCorrecaoDeProduto}
    tipoCard={CARD_TYPE_ENUM.CORRECAO}
    icone={ICON_CARD_TYPE_ENUM.CORRECAO}
    titulo="Correção de produto"
  />
);

export const AguardandoAnaliseReclamacao = () => (
  <StatusSolicitacoesBase
    endpointGetSolicitacoes={getAguardandoAnaliseReclamacao}
    tipoCard={CARD_TYPE_ENUM.AGUARDANDO_ANALISE_RECLAMACAO}
    icone={ICON_CARD_TYPE_ENUM.AGUARDANDO_ANALISE_RECLAMACAO}
    titulo="Aguardando análise de reclamação"
  />
);

export const AguardandoAnaliseSensorial = () => (
  <StatusSolicitacoesBase
    endpointGetSolicitacoes={getAguardandoAnaliseSensorial}
    tipoCard={CARD_TYPE_ENUM.AGUARDANDO_ANALISE_SENSORIAL}
    icone={ICON_CARD_TYPE_ENUM.AGUARDANDO_ANALISE_SENSORIAL}
    titulo="Aguardando análise sensorial"
  />
);

export const PendenteHomologacao = () => (
  <StatusSolicitacoesBase
    endpointGetSolicitacoes={getPendenteHomologacao}
    tipoCard={CARD_TYPE_ENUM.PENDENTE}
    icone={ICON_CARD_TYPE_ENUM.PENDENTE}
    titulo="Pendente homologação"
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
