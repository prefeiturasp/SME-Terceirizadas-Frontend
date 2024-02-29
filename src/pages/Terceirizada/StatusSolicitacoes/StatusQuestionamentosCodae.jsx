import React, { useContext } from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import {
  SOLICITACOES_COM_QUESTIONAMENTO,
  TERCEIRIZADA,
} from "configs/constants";
import { HOME } from "../constants";
import { ICON_CARD_TYPE_ENUM } from "components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { getSolicitacoesComQuestionamento } from "services/painelTerceirizada.service";
import { CARD_TYPE_ENUM } from "components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import SolicitacoesPorStatusGenerico from "components/screens/SolicitacoesPorStatusGenerico";
import CardLegendas from "components/Shareable/CardLegendas";
import { PAGINACAO_DEFAULT } from "constants/shared";
import MeusDadosContext from "context/MeusDadosContext";
import { formatarLotesParaVisao } from "helpers/utilities";

const atual = {
  href: `/${TERCEIRIZADA}/${SOLICITACOES_COM_QUESTIONAMENTO}`,
  titulo: "Solicitações com questionamentos da CODAE",
};

export const StatusQuestionamentosCodae = () => {
  const { meusDados } = useContext(MeusDadosContext);

  return (
    <Page titulo={atual.titulo} botaoVoltar>
      <Breadcrumb home={HOME} atual={atual} />
      {meusDados && (
        <SolicitacoesPorStatusGenerico
          tipoCard={CARD_TYPE_ENUM.PENDENTE}
          icone={ICON_CARD_TYPE_ENUM.PENDENTE}
          titulo="Questionamentos da CODAE"
          getSolicitacoes={getSolicitacoesComQuestionamento}
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
