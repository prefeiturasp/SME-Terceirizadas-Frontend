import React, { useContext } from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { HOME } from "../constants";
import { DRE, SOLICITACOES_CANCELADAS } from "configs/constants";
import SolicitacoesPorStatusGenerico from "components/screens/SolicitacoesPorStatusGenerico";
import {
  CARD_TYPE_ENUM,
  ICON_CARD_TYPE_ENUM,
} from "components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { getSolicitacoesCanceladasDRE } from "services/painelDRE.service";
import CardLegendas from "components/Shareable/CardLegendas";
import { PAGINACAO_DEFAULT } from "constants/shared";
import { formatarLotesParaVisao } from "helpers/utilities";
import MeusDadosContext from "context/MeusDadosContext";

const atual = {
  href: `/${DRE}/${SOLICITACOES_CANCELADAS}`,
  titulo: "Solicitações Canceladas",
};

export default () => {
  const { meusDados } = useContext(MeusDadosContext);

  return (
    <Page titulo={atual.titulo} botaoVoltar>
      <Breadcrumb home={HOME} atual={atual} />
      <SolicitacoesPorStatusGenerico
        tipoCard={CARD_TYPE_ENUM.CANCELADO}
        icone={ICON_CARD_TYPE_ENUM.CANCELADO}
        titulo={"Canceladas"}
        getSolicitacoes={getSolicitacoesCanceladasDRE}
        Legendas={CardLegendas}
        tipoPaginacao="OFFSET"
        limit={PAGINACAO_DEFAULT}
        lotes={formatarLotesParaVisao(
          meusDados.vinculo_atual.instituicao.lotes
        )}
      />
    </Page>
  );
};
