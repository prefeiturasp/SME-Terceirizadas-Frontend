import React from "react";
import Page from "components/Shareable/Page/Page";
import Breadcrumb from "components/Shareable/Breadcrumb";
import { PAINEL_APROVACOES, PRE_RECEBIMENTO } from "configs/constants";
import {
  getDashboardSolicitacoesAlteracao,
  getDashboardSolicitacoesAlteracaoComFiltros,
} from "services/cronograma.service";
import { SolicitacoesCronogramaStatusGenerico } from "components/screens/SolicitacoesCronogramaStatusGenerico";
import { CARD_SOLICITACOES_ALTERACOES_CODAE } from "components/screens/PreRecebimento/PainelAprovacoes/constants";

const atual = {
  href: CARD_SOLICITACOES_ALTERACOES_CODAE.href,
  titulo: CARD_SOLICITACOES_ALTERACOES_CODAE.titulo,
};

const limit = 10;

const paramsDefault = {
  status: CARD_SOLICITACOES_ALTERACOES_CODAE.incluir_status,
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
        icone={CARD_SOLICITACOES_ALTERACOES_CODAE.icon}
        titulo={CARD_SOLICITACOES_ALTERACOES_CODAE.titulo}
        cardType={CARD_SOLICITACOES_ALTERACOES_CODAE.style}
        getSolicitacoes={getDashboardSolicitacoesAlteracao}
        getSolicitacoesComFiltros={getDashboardSolicitacoesAlteracaoComFiltros}
        params={paramsDefault}
        limit={limit}
        alteracao={true}
      />
    </Page>
  );
};