import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { RELATORIO_SOLICITACOES_ALIMENTACAO } from "../../configs/constants";
import { RelatorioSolicitacoesAlimentacao } from "components/screens/Relatorios/SolicitacoesAlimentacao";
import {
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhDRE
} from "helpers/utilities";
import {
  filtrarSolicitacoesAlimentacaoCODAE,
  filtrarSolicitacoesAlimentacaoDRE
} from "services/relatorios.service";

const atual = {
  href: `/${RELATORIO_SOLICITACOES_ALIMENTACAO}`,
  titulo: "Solicitações de Alimentações"
};

const anteriores = [
  {
    href: `/painel-gestao-alimentacao`,
    titulo: "Gestão de Alimentação"
  },
  {
    href: `/`,
    titulo: "Relatórios"
  }
];

const endpointPorPerfil = () => {
  if (usuarioEhDRE()) {
    return filtrarSolicitacoesAlimentacaoDRE;
  }
  if (usuarioEhCODAEGestaoAlimentacao()) {
    return filtrarSolicitacoesAlimentacaoCODAE;
  }
};

const endpoint = endpointPorPerfil();

export default props => (
  <Page
    titulo="Relatório de Solicitações de Alimentação"
    botaoVoltar
    {...props}
  >
    <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
    <RelatorioSolicitacoesAlimentacao endpoint={endpoint} {...props} />
  </Page>
);
