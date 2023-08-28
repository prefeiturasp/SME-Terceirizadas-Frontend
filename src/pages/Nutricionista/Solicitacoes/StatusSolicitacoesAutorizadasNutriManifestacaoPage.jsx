import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { HOME } from "../constants";
import { NUTRIMANIFESTACAO, SOLICITACOES_AUTORIZADAS } from "configs/constants";
import SolicitacoesPorStatusGenerico from "components/screens/SolicitacoesPorStatusGenerico";
import {
  CARD_TYPE_ENUM,
  ICON_CARD_TYPE_ENUM,
} from "components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { getSolicitacoesAutorizadasNutrimanifestacao } from "services/painelNutricionista.service";
import CardLegendas from "components/Shareable/CardLegendas";
import { PAGINACAO_DEFAULT } from "constants/shared";

const atual = {
  href: `/${NUTRIMANIFESTACAO}/${SOLICITACOES_AUTORIZADAS}`,
  titulo: "Solicitações Autorizadas",
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar>
    <Breadcrumb home={HOME} atual={atual} />
    <SolicitacoesPorStatusGenerico
      tipoCard={CARD_TYPE_ENUM.AUTORIZADO}
      icone={ICON_CARD_TYPE_ENUM.AUTORIZADO}
      titulo={"Autorizadas"}
      getSolicitacoes={getSolicitacoesAutorizadasNutrimanifestacao}
      Legendas={CardLegendas}
      tipoPaginacao="OFFSET"
      limit={PAGINACAO_DEFAULT}
    />
  </Page>
);
