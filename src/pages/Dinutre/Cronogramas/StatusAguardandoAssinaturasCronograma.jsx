import React from "react";
import Page from "components/Shareable/Page/Page";
import Breadcrumb from "components/Shareable/Breadcrumb";
import { PAINEL_APROVACOES, PRE_RECEBIMENTO } from "configs/constants";
import {
  getDashboardCronograma,
  getDashboardCronogramaComFiltros,
} from "services/cronograma.service";
import { SolicitacoesCronogramaStatusGenerico } from "components/screens/SolicitacoesCronogramaStatusGenerico";
import { CARD_VISAO_CRONOGRAMA_AGUARDANDO_ASSINATURAS } from "components/screens/PreRecebimento/PainelAprovacoes/constants";

const atual = {
  href: CARD_VISAO_CRONOGRAMA_AGUARDANDO_ASSINATURAS.href,
  titulo: CARD_VISAO_CRONOGRAMA_AGUARDANDO_ASSINATURAS.titulo,
};

const limit = 10;

const paramsDefault = {
  status: CARD_VISAO_CRONOGRAMA_AGUARDANDO_ASSINATURAS.incluir_status,
  offset: 0,
  limit: limit,
};

export default () => {
  const anteriores = [
    {
      href: `#`,
      titulo: "Pré-Recebimento",
    },
    {
      href: `/${PRE_RECEBIMENTO}/${PAINEL_APROVACOES}`,
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
        icone={CARD_VISAO_CRONOGRAMA_AGUARDANDO_ASSINATURAS.icon}
        titulo={CARD_VISAO_CRONOGRAMA_AGUARDANDO_ASSINATURAS.titulo}
        cardType={CARD_VISAO_CRONOGRAMA_AGUARDANDO_ASSINATURAS.style}
        getSolicitacoes={getDashboardCronograma}
        getSolicitacoesComFiltros={getDashboardCronogramaComFiltros}
        params={paramsDefault}
        limit={limit}
      />
    </Page>
  );
};
