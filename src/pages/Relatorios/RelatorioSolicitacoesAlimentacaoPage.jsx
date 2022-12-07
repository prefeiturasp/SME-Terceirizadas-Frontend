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
  filtrarSolicitacoesAlimentacaoDRE,
  gerarExcelRelatorioSolicitacoesAlimentacaoCODAE,
  gerarExcelRelatorioSolicitacoesAlimentacaoDRE
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
  } else if (usuarioEhCODAEGestaoAlimentacao()) {
    return filtrarSolicitacoesAlimentacaoCODAE;
  } else {
    return "PERFIL_INVALIDO";
  }
};

const endpointGerarExcel = () => {
  if (usuarioEhDRE()) {
    return gerarExcelRelatorioSolicitacoesAlimentacaoDRE;
  } else if (usuarioEhCODAEGestaoAlimentacao()) {
    return gerarExcelRelatorioSolicitacoesAlimentacaoCODAE;
  } else {
    return "PERFIL_INVALIDO";
  }
};

export default props => (
  <Page
    titulo="Relatório de Solicitações de Alimentação"
    botaoVoltar
    {...props}
  >
    <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
    <RelatorioSolicitacoesAlimentacao
      endpoint={endpointPorPerfil()}
      endpointGerarExcel={endpointGerarExcel()}
      {...props}
    />
  </Page>
);
