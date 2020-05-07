import React from "react";
import StatusSolicitacoes from "../../../components/screens/DashboardTerceirizada/StatusSolicitacoes";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import {
  SOLICITACOES_CANCELADAS,
  TERCEIRIZADA
} from "../../../configs/constants";
import { HOME } from "../constants";
import { CARD_TYPE_ENUM } from "components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { ICON_CARD_TYPE_ENUM } from "components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { getSolicitacoesCanceladasTerceirizada } from "services/painelTerceirizada.service";
import { ajustarFormatoLog } from "components/screens/helper";

const atual = {
  href: `/${TERCEIRIZADA}/${SOLICITACOES_CANCELADAS}`,
  titulo: "Solicitações Canceladas"
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={HOME}>
    <Breadcrumb home={HOME} atual={atual} />
    <StatusSolicitacoes
      endpointGetSolicitacoes={getSolicitacoesCanceladasTerceirizada}
      tipoCard={CARD_TYPE_ENUM.CANCELADO}
      icone={ICON_CARD_TYPE_ENUM.CANCELADO}
      titulo="Canceladas"
      formatarDadosSolicitacao={ajustarFormatoLog}
    />
  </Page>
);
