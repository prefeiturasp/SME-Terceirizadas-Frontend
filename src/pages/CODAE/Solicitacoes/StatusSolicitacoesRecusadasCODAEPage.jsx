import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import { HOME } from "../constants";
import { CODAE, SOLICITACOES_NEGADAS } from "../../../configs/constants";
import { SolicitacoesPorStatusGenerico } from "components/screens/SolicitacoesPorStatusGenerico";
import {
  CARD_TYPE_ENUM,
  ICON_CARD_TYPE_ENUM
} from "components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { getSolicitacoesNegadasCodae } from "services/painelCODAE.service";
import CardLegendas from "components/Shareable/CardLegendas";
import { PAGINACAO_DEFAULT } from "constants/shared";

const atual = {
  href: `/${CODAE}/${SOLICITACOES_NEGADAS}`,
  titulo: "Solicitações Negadas"
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={HOME}>
    <Breadcrumb home={HOME} atual={atual} />
    <SolicitacoesPorStatusGenerico
      tipoCard={CARD_TYPE_ENUM.NEGADO}
      icone={ICON_CARD_TYPE_ENUM.NEGADO}
      titulo={"Negadas"}
      getSolicitacoes={getSolicitacoesNegadasCodae}
      Legendas={CardLegendas}
      tipoPaginacao="OFFSET"
      limit={PAGINACAO_DEFAULT}
    />
  </Page>
);
