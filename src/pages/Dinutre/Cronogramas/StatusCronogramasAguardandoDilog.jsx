import React from "react";
import Page from "components/Shareable/Page/Page";
import Breadcrumb from "components/Shareable/Breadcrumb";
import {
  DINUTRE,
  PAINEL_APROVACOES,
  PRE_RECEBIMENTO,
  AGUARDANDO_DILOG,
} from "configs/constants";
import {
  getDashboardCronograma,
  getDashboardCronogramaComFiltros,
} from "services/cronograma.service";
import { SolicitacoesCronogramaStatusGenerico } from "components/screens/SolicitacoesCronogramaStatusGenerico";
import { CARD_AGUARDANDO_ASSINATURA } from "components/screens/PreRecebimento/PainelAprovacoes/constants";

const atual = {
  href: `/${DINUTRE}/${AGUARDANDO_DILOG}`,
  titulo: "Aguardando Assinatura de DILOG",
};

const limit = 10;

const paramsDefault = { status: "ASSINADO_DINUTRE", offset: 0, limit: limit };

export default () => {
  const anteriores = [
    {
      href: `#`,
      titulo: "Pré-Recebimento",
    },
    {
      href: `/pre-recebimento/painel-aprovacoes`,
      titulo: "Painel de Aprovações",
    },
  ];

  return (
    <Page
      titulo={atual.titulo}
      botaoVoltar
      voltarPara={`/${PRE_RECEBIMENTO}/${PAINEL_APROVACOES}`}
    >
      <Breadcrumb home="/" atual={atual} anteriores={anteriores} />
      <SolicitacoesCronogramaStatusGenerico
        icone={CARD_AGUARDANDO_ASSINATURA.icon}
        titulo={CARD_AGUARDANDO_ASSINATURA.titulo}
        cardType={CARD_AGUARDANDO_ASSINATURA.style}
        getSolicitacoes={getDashboardCronograma}
        getSolicitacoesComFiltros={getDashboardCronogramaComFiltros}
        params={paramsDefault}
        limit={limit}
      />
    </Page>
  );
};
