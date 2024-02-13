import React from "react";
import Page from "components/Shareable/Page/Page";
import Breadcrumb from "components/Shareable/Breadcrumb";
import { PAINEL_FICHAS_TECNICAS, PRE_RECEBIMENTO } from "configs/constants";
import { CARD_ENVIADOS_PARA_CORRECAO } from "components/screens/PreRecebimento/PainelFichasTecnicas/constants";
import { getDashboardFichasTecnicasPorStatus } from "services/fichaTecnica.service";
import { SolicitacoesFichaTecnicaStatusGenerico } from "components/screens/SolicitacoesFichaTecnicaStatusGenerico";

const atual = {
  href: CARD_ENVIADOS_PARA_CORRECAO.href,
  titulo: CARD_ENVIADOS_PARA_CORRECAO.titulo,
};

const limit = 10;

const paramsDefault = {
  status: CARD_ENVIADOS_PARA_CORRECAO.incluir_status,
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
      href: `/${PRE_RECEBIMENTO}/${PAINEL_FICHAS_TECNICAS}`,
      titulo: "Fichas Técnicas",
    },
  ];

  return (
    <Page
      titulo={atual.titulo}
      botaoVoltar
      voltarPara={`/${PRE_RECEBIMENTO}/${PAINEL_FICHAS_TECNICAS}`}
    >
      <Breadcrumb home="/" atual={atual} anteriores={anteriores} />
      <SolicitacoesFichaTecnicaStatusGenerico
        icone={CARD_ENVIADOS_PARA_CORRECAO.icon}
        titulo={CARD_ENVIADOS_PARA_CORRECAO.titulo}
        cardType={CARD_ENVIADOS_PARA_CORRECAO.style}
        getSolicitacoes={getDashboardFichasTecnicasPorStatus}
        params={paramsDefault}
        limit={limit}
        urlBaseItem={`#`}
      />
    </Page>
  );
};
