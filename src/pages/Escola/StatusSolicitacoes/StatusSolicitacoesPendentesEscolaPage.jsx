import SolicitacoesPorStatusGenerico from "components/screens/SolicitacoesPorStatusGenerico";
import CardLegendas from "components/Shareable/CardLegendas";
import {
  CARD_TYPE_ENUM,
  ICON_CARD_TYPE_ENUM,
} from "components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { PAGINACAO_DEFAULT } from "constants/shared";
import React from "react";
import { getSolicitacoesPendentesEscola } from "services/painelEscola.service";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import { ESCOLA, SOLICITACOES_PENDENTES } from "../../../configs/constants";
import { HOME } from "../constants";

const atual = {
  href: `/${ESCOLA}/${SOLICITACOES_PENDENTES}`,
  titulo: "Solicitações Pendentes",
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar>
    <Breadcrumb home={HOME} atual={atual} />
    <SolicitacoesPorStatusGenerico
      tipoCard={CARD_TYPE_ENUM.PENDENTE}
      icone={ICON_CARD_TYPE_ENUM.PENDENTE}
      titulo={"Pendentes"}
      getSolicitacoes={getSolicitacoesPendentesEscola}
      Legendas={CardLegendas}
      tipoPaginacao="OFFSET"
      limit={PAGINACAO_DEFAULT}
    />
  </Page>
);
