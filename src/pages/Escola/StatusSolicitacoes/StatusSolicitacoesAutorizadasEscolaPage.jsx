import React from "react";
import { ESCOLA, SOLICITACOES_AUTORIZADAS } from "configs/constants";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { HOME } from "../constants";
import SolicitacoesPorStatusGenerico from "components/screens/SolicitacoesPorStatusGenerico";
import {
  CARD_TYPE_ENUM,
  ICON_CARD_TYPE_ENUM,
} from "components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import CardLegendas from "components/Shareable/CardLegendas";
import { getSolicitacoesAutorizadasEscola } from "services/painelEscola.service";
import { PAGINACAO_DEFAULT } from "constants/shared";

const atual = {
  href: `/${ESCOLA}/${SOLICITACOES_AUTORIZADAS}`,
  titulo: "Solicitações Autorizadas",
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar>
    <Breadcrumb home={HOME} atual={atual} />
    <SolicitacoesPorStatusGenerico
      tipoCard={CARD_TYPE_ENUM.AUTORIZADO}
      icone={ICON_CARD_TYPE_ENUM.AUTORIZADO}
      titulo={"Autorizadas"}
      getSolicitacoes={getSolicitacoesAutorizadasEscola}
      Legendas={CardLegendas}
      tipoPaginacao="OFFSET"
      limit={PAGINACAO_DEFAULT}
    />
  </Page>
);
