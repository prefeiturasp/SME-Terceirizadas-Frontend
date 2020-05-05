import React from "react";
import StatusSolicitacoes from "../../../components/screens/DashboardTerceirizada/StatusSolicitacoes";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import { SOLICITACOES_NEGADAS, TERCEIRIZADA } from "../../../configs/constants";
import { HOME } from "../constants";
import { CARD_TYPE_ENUM } from "components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { getSolicitacoesNegadasTerceirizada } from "services/painelTerceirizada.service";
import { ICON_CARD_TYPE_ENUM } from "components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { ajustarFormatoLog } from "components/screens/helper";

const atual = {
  href: `/${TERCEIRIZADA}/${SOLICITACOES_NEGADAS}`,
  titulo: "Solicitações Negadas"
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={HOME}>
    <Breadcrumb home={HOME} atual={atual} />
    <StatusSolicitacoes
      endpointGetSolicitacoes={getSolicitacoesNegadasTerceirizada}
      tipoCard={CARD_TYPE_ENUM.NEGADO}
      icone={ICON_CARD_TYPE_ENUM.NEGADO}
      titulo="Negadas"
      funcaoFormatar={ajustarFormatoLog}
    />
  </Page>
);
