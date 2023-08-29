import React from "react";
import Page from "components/Shareable/Page/Page";
import Breadcrumb from "components/Shareable/Breadcrumb";
import {
  DINUTRE,
  PAINEL_APROVACOES,
  PRE_RECEBIMENTO,
  ASSINADO_CODAE,
} from "configs/constants";
import {
  getDashboardCronograma,
  getDashboardCronogramaComFiltros,
} from "services/cronograma.service";
import { SolicitacoesCronogramaStatusGenerico } from "components/screens/SolicitacoesCronogramaStatusGenerico";
import { CARD_CRONOGRAMAS_ASSINADOS } from "components/screens/PreRecebimento/PainelAprovacoes/constants";

const atual = {
  href: `/${DINUTRE}/${ASSINADO_CODAE}`,
  titulo: "Cronogramas Assinados",
};

const limit = 10;

const paramsDefault = { status: "ASSINADO_CODAE", offset: 0, limit: limit };

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
        icone={CARD_CRONOGRAMAS_ASSINADOS.icon}
        titulo={CARD_CRONOGRAMAS_ASSINADOS.titulo}
        cardType={CARD_CRONOGRAMAS_ASSINADOS.style}
        getSolicitacoes={getDashboardCronograma}
        getSolicitacoesComFiltros={getDashboardCronogramaComFiltros}
        params={paramsDefault}
        limit={limit}
      />
    </Page>
  );
};
