import React from "react";
import Page from "components/Shareable/Page/Page";
import Breadcrumb from "components/Shareable/Breadcrumb";
import {
  PAINEL_DOCUMENTOS_RECEBIMENTO,
  PRE_RECEBIMENTO,
  ANALISAR_DOCUMENTO_RECEBIMENTO,
} from "configs/constants";
import { getDashboardDocumentosRecebimentoPorStatus } from "services/documentosRecebimento.service";
import { SolicitacoesDocumentoStatusGenerico } from "components/screens/SolicitacoesDocumentoStatusGenerico";
import { CARD_PENDENTES_APROVACAO } from "../../../components/screens/PreRecebimento/PainelDocumentosRecebimento/constants";

const atual = {
  href: CARD_PENDENTES_APROVACAO.href,
  titulo: CARD_PENDENTES_APROVACAO.titulo,
};

const limit = 10;

const paramsDefault = {
  status: CARD_PENDENTES_APROVACAO.incluir_status,
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
      href: `/${PRE_RECEBIMENTO}/${PAINEL_DOCUMENTOS_RECEBIMENTO}`,
      titulo: "Documentos de Recebimento",
    },
  ];

  return (
    <Page
      titulo={atual.titulo}
      botaoVoltar
      voltarPara={`/${PRE_RECEBIMENTO}/${PAINEL_DOCUMENTOS_RECEBIMENTO}`}
    >
      <Breadcrumb home="/" atual={atual} anteriores={anteriores} />
      <SolicitacoesDocumentoStatusGenerico
        icone={CARD_PENDENTES_APROVACAO.icon}
        titulo={CARD_PENDENTES_APROVACAO.titulo}
        cardType={CARD_PENDENTES_APROVACAO.style}
        getSolicitacoes={getDashboardDocumentosRecebimentoPorStatus}
        params={paramsDefault}
        limit={limit}
        urlBaseItem={`/${PRE_RECEBIMENTO}/${ANALISAR_DOCUMENTO_RECEBIMENTO}`}
      />
    </Page>
  );
};
