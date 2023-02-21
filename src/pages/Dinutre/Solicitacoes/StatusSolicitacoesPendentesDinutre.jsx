import React from "react";
import Page from "components/Shareable/Page/Page";
import Breadcrumb from "components/Shareable/Breadcrumb";
import {
  DINUTRE,
  PAINEL_APROVACOES,
  PRE_RECEBIMENTO,
  SOLICITACOES_PENDENTES
} from "configs/constants";
import { getDashboardCronograma } from "services/cronograma.service";
import { Solicitacoes } from "./Solicitacoes";
import { CARD_PENDENTES_ASSINATURA } from "components/screens/PreRecebimento/PainelAprovacoes/constants";

const atual = {
  href: `/${DINUTRE}/${SOLICITACOES_PENDENTES}`,
  titulo: "Cronogramas Pendentes de Assinatura"
};

const limit = 10;

const paramsDefault = {
  status: "ASSINADO_CRONOGRAMA",
  offset: 0,
  limit: limit
};

export default () => {
  return (
    <Page
      titulo={atual.titulo}
      botaoVoltar
      voltarPara={`/${PRE_RECEBIMENTO}/${PAINEL_APROVACOES}`}
    >
      <Breadcrumb home="/" atual={atual} />
      <Solicitacoes
        icone={CARD_PENDENTES_ASSINATURA.icon}
        titulo={CARD_PENDENTES_ASSINATURA.titulo}
        cardType={CARD_PENDENTES_ASSINATURA.style}
        getSolicitacoes={getDashboardCronograma}
        params={paramsDefault}
        limit={limit}
      />
    </Page>
  );
};
