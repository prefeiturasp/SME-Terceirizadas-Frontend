import React, { useContext } from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { SOLICITACOES_NEGADAS, TERCEIRIZADA } from "configs/constants";
import { HOME } from "../constants";
import { CARD_TYPE_ENUM } from "components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { getSolicitacoesNegadasTerceirizada } from "services/painelTerceirizada.service";
import { ICON_CARD_TYPE_ENUM } from "components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import CardLegendas from "components/Shareable/CardLegendas";
import { PAGINACAO_DEFAULT } from "constants/shared";
import { formatarLotesParaVisao } from "helpers/utilities";
import SolicitacoesPorStatusGenerico from "components/screens/SolicitacoesPorStatusGenerico";
import MeusDadosContext from "context/MeusDadosContext";

const atual = {
  href: `/${TERCEIRIZADA}/${SOLICITACOES_NEGADAS}`,
  titulo: "Solicitações Negadas",
};

export const StatusSolicitacoesNegadasTerceirizadaPage = () => {
  const { meusDados } = useContext(MeusDadosContext);

  return (
    <Page titulo={atual.titulo} botaoVoltar>
      <Breadcrumb home={HOME} atual={atual} />
      {meusDados && (
        <SolicitacoesPorStatusGenerico
          tipoCard={CARD_TYPE_ENUM.NEGADO}
          icone={ICON_CARD_TYPE_ENUM.NEGADO}
          titulo="Negadas"
          getSolicitacoes={getSolicitacoesNegadasTerceirizada}
          Legendas={CardLegendas}
          tipoPaginacao="OFFSET"
          limit={PAGINACAO_DEFAULT}
          lotes={formatarLotesParaVisao(
            meusDados.vinculo_atual.instituicao.lotes
          )}
        />
      )}
    </Page>
  );
};
