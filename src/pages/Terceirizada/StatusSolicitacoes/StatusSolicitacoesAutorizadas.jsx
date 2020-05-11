import React from "react";
import StatusSolicitacoes from "../../../components/screens/DashboardTerceirizada/StatusSolicitacoes";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import {
  SOLICITACOES_AUTORIZADAS,
  TERCEIRIZADA
} from "../../../configs/constants";
import { HOME } from "../constants";
import { ICON_CARD_TYPE_ENUM } from "components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { getSolicitacoesAutorizadasTerceirizada } from "services/painelTerceirizada.service";
import { CARD_TYPE_ENUM } from "components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { ajustarFormatoLog } from "components/screens/helper";

const atual = {
  href: `/${TERCEIRIZADA}/${SOLICITACOES_AUTORIZADAS}`,
  titulo: "Solicitações Autorizadas"
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={HOME}>
    <Breadcrumb home={HOME} atual={atual} />
    <StatusSolicitacoes
      endpointGetSolicitacoes={getSolicitacoesAutorizadasTerceirizada}
      tipoCard={CARD_TYPE_ENUM.AUTORIZADO}
      icone={ICON_CARD_TYPE_ENUM.AUTORIZADO}
      titulo="Autorizadas"
      formatarDadosSolicitacao={ajustarFormatoLog}
    />
  </Page>
);
