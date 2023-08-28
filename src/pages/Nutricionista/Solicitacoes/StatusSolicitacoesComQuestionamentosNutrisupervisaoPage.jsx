import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { HOME } from "../constants";
import {
  NUTRISUPERVISAO,
  SOLICITACOES_COM_QUESTIONAMENTO,
} from "configs/constants";
import {
  CARD_TYPE_ENUM,
  ICON_CARD_TYPE_ENUM,
} from "components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import CardLegendas from "components/Shareable/CardLegendas";
import SolicitacoesPorStatusGenerico from "components/screens/SolicitacoesPorStatusGenerico";
import { getSolicitacoesComQuestionamentoNutrisupervisao } from "services/painelNutricionista.service";
import { PAGINACAO_DEFAULT } from "constants/shared";

const atual = {
  href: `/${NUTRISUPERVISAO}/${SOLICITACOES_COM_QUESTIONAMENTO}`,
  titulo: "Solicitações com Questionamentos",
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar>
    <Breadcrumb home={HOME} atual={atual} />
    <SolicitacoesPorStatusGenerico
      tipoCard={CARD_TYPE_ENUM.PENDENTE}
      icone={ICON_CARD_TYPE_ENUM.PENDENTE}
      titulo={"Solicitações com Questionamentos"}
      getSolicitacoes={getSolicitacoesComQuestionamentoNutrisupervisao}
      Legendas={CardLegendas}
      tipoPaginacao="OFFSET"
      limit={PAGINACAO_DEFAULT}
    />
  </Page>
);
