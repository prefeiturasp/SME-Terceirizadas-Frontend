import Breadcrumb from "components/Shareable/Breadcrumb";
import CardLegendas from "components/Shareable/CardLegendas";
import {
  CARD_TYPE_ENUM,
  ICON_CARD_TYPE_ENUM,
} from "components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import Page from "components/Shareable/Page/Page";
import SolicitacoesPorStatusGenerico from "components/screens/SolicitacoesPorStatusGenerico";
import { ESCOLA, SOLICITACOES_PENDENTES } from "configs/constants";
import { PAGINACAO_DEFAULT } from "constants/shared";
import React from "react";
import { getSolicitacoesCanceladasEscola } from "services/painelEscola.service";
import { HOME } from "../constants";

const atual = {
  href: `/${ESCOLA}/${SOLICITACOES_PENDENTES}`,
  titulo: "Solicitações Canceladas",
};

export const StatusSolicitacoesCanceladasEscolaPage = () => (
  <Page titulo={atual.titulo} botaoVoltar>
    <Breadcrumb home={HOME} atual={atual} />
    <SolicitacoesPorStatusGenerico
      tipoCard={CARD_TYPE_ENUM.CANCELADO}
      icone={ICON_CARD_TYPE_ENUM.CANCELADO}
      titulo={"Canceladas"}
      getSolicitacoes={getSolicitacoesCanceladasEscola}
      Legendas={CardLegendas}
      tipoPaginacao="OFFSET"
      limit={PAGINACAO_DEFAULT}
    />
  </Page>
);
