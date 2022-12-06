import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { HOME } from "../constants";
import { DRE, SOLICITACOES_AGUARDADAS } from "configs/constants";
import { SolicitacoesPorStatusGenerico } from "components/screens/SolicitacoesPorStatusGenerico";
import {
  CARD_TYPE_ENUM,
  ICON_CARD_TYPE_ENUM
} from "components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { getSolicitacoesAguardandoCODAE } from "services/painelDRE.service";
import CardLegendas from "components/Shareable/CardLegendas";
import { PAGINACAO_DEFAULT } from "constants/shared";

const atual = {
  href: `/${DRE}/${SOLICITACOES_AGUARDADAS}`,
  titulo: "Solicitações Aguardando CODAE"
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={HOME}>
    <Breadcrumb home={HOME} atual={atual} />
    <SolicitacoesPorStatusGenerico
      tipoCard={CARD_TYPE_ENUM.AGUARDANDO_CODAE}
      icone={ICON_CARD_TYPE_ENUM.AGUARDANDO_ANALISE_RECLAMACAO}
      titulo={"Aguardando"}
      getSolicitacoes={getSolicitacoesAguardandoCODAE}
      Legendas={CardLegendas}
      tipoPaginacao="OFFSET"
      limit={PAGINACAO_DEFAULT}
    />
  </Page>
);
