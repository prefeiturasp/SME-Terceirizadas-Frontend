import SolicitacoesPorStatusGenerico from "components/screens/SolicitacoesPorStatusGenerico";
import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { ESCOLA, SOLICITACOES_NEGADAS } from "configs/constants";
import { HOME } from "../constants";
import {
  CARD_TYPE_ENUM,
  ICON_CARD_TYPE_ENUM,
} from "components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { getSolicitacoesNegadasEscola } from "services/painelEscola.service";
import CardLegendas from "components/Shareable/CardLegendas";
import { PAGINACAO_DEFAULT } from "constants/shared";

const atual = {
  href: `/${ESCOLA}/${SOLICITACOES_NEGADAS}`,
  titulo: "Solicitações Negadas",
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar>
    <Breadcrumb home={HOME} atual={atual} />
    <SolicitacoesPorStatusGenerico
      tipoCard={CARD_TYPE_ENUM.NEGADO}
      icone={ICON_CARD_TYPE_ENUM.NEGADO}
      titulo={"Negadas"}
      getSolicitacoes={getSolicitacoesNegadasEscola}
      Legendas={CardLegendas}
      tipoPaginacao="OFFSET"
      limit={PAGINACAO_DEFAULT}
    />
  </Page>
);
