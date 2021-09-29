import React from "react";
import StatusSolicitacoes from "../../../components/screens/DashboardTerceirizada/StatusSolicitacoes";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import {
  SOLICITACOES_COM_QUESTIONAMENTO,
  TERCEIRIZADA
} from "../../../configs/constants";
import { HOME } from "../constants";
import { ICON_CARD_TYPE_ENUM } from "components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { getSolicitacoesComQuestionamento } from "services/painelTerceirizada.service";
import { CARD_TYPE_ENUM } from "components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { ajustarFormatoLog } from "components/screens/helper";

const atual = {
  href: `/${TERCEIRIZADA}/${SOLICITACOES_COM_QUESTIONAMENTO}`,
  titulo: "Solicitações com questionamentos da CODAE"
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={HOME}>
    <Breadcrumb home={HOME} atual={atual} />
    <StatusSolicitacoes
      endpointGetSolicitacoes={getSolicitacoesComQuestionamento}
      tipoCard={CARD_TYPE_ENUM.PENDENTE}
      icone={ICON_CARD_TYPE_ENUM.PENDENTE}
      titulo="Questionamentos da CODAE"
      formatarDadosSolicitacao={ajustarFormatoLog}
    />
  </Page>
);
