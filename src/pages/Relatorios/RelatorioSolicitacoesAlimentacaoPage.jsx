import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { RELATORIO_SOLICITACOES_ALIMENTACAO } from "configs/constants";
import { RelatorioSolicitacoesAlimentacao } from "components/screens/Relatorios/SolicitacoesAlimentacao";
import {
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhDRE,
  usuarioEhMedicao,
  usuarioEhEmpresaTerceirizada,
  usuarioEhCODAEGabinete,
  usuarioEhCODAENutriManifestacao,
  usuarioEhEscolaTerceirizada,
  usuarioEhEscolaTerceirizadaDiretor,
  ehUsuarioRelatorios,
} from "helpers/utilities";
import {
  filtrarSolicitacoesAlimentacaoCODAE,
  filtrarSolicitacoesAlimentacaoDRE,
  filtrarSolicitacoesAlimentacaoTerceirizadas,
  gerarExcelRelatorioSolicitacoesAlimentacaoCODAE,
  gerarExcelRelatorioSolicitacoesAlimentacaoDRE,
  gerarExcelRelatorioSolicitacoesAlimentacaoTerceirizadas,
  gerarPDFRelatorioSolicitacoesAlimentacaoDRE,
  gerarPDFRelatorioSolicitacoesAlimentacaoCODAE,
  gerarPDFRelatorioSolicitacoesAlimentacaoTerceirizadas,
  filtrarSolicitacoesAlimentacaoEscola,
  gerarExcelRelatorioSolicitacoesAlimentacaoEscola,
  gerarPDFRelatorioSolicitacoesAlimentacaoEscola,
} from "services/relatorios.service";

const atual = {
  href: `/${RELATORIO_SOLICITACOES_ALIMENTACAO}`,
  titulo: "Solicitações de Alimentações",
};

const anteriores = [
  {
    href: `/painel-gestao-alimentacao`,
    titulo: "Gestão de Alimentação",
  },
  {
    href: `/`,
    titulo: "Relatórios",
  },
];

const endpointPorPerfil = () => {
  if (usuarioEhDRE()) {
    return filtrarSolicitacoesAlimentacaoDRE;
  } else if (
    usuarioEhCODAEGestaoAlimentacao() ||
    usuarioEhMedicao() ||
    usuarioEhCODAENutriManifestacao() ||
    usuarioEhCODAEGabinete() ||
    ehUsuarioRelatorios()
  ) {
    return filtrarSolicitacoesAlimentacaoCODAE;
  } else if (
    usuarioEhEscolaTerceirizada() ||
    usuarioEhEscolaTerceirizadaDiretor()
  ) {
    return filtrarSolicitacoesAlimentacaoEscola;
  } else if (usuarioEhEmpresaTerceirizada()) {
    return filtrarSolicitacoesAlimentacaoTerceirizadas;
  } else {
    return "PERFIL_INVALIDO";
  }
};

const endpointGerarExcel = () => {
  if (usuarioEhDRE()) {
    return gerarExcelRelatorioSolicitacoesAlimentacaoDRE;
  } else if (
    usuarioEhEscolaTerceirizada() ||
    usuarioEhEscolaTerceirizadaDiretor()
  ) {
    return gerarExcelRelatorioSolicitacoesAlimentacaoEscola;
  } else if (
    usuarioEhCODAEGestaoAlimentacao() ||
    usuarioEhMedicao() ||
    usuarioEhCODAENutriManifestacao() ||
    usuarioEhCODAEGabinete() ||
    ehUsuarioRelatorios()
  ) {
    return gerarExcelRelatorioSolicitacoesAlimentacaoCODAE;
  } else if (usuarioEhEmpresaTerceirizada()) {
    return gerarExcelRelatorioSolicitacoesAlimentacaoTerceirizadas;
  } else {
    return "PERFIL_INVALIDO";
  }
};

const endpointGerarPDF = () => {
  if (usuarioEhDRE()) {
    return gerarPDFRelatorioSolicitacoesAlimentacaoDRE;
  } else if (
    usuarioEhEscolaTerceirizada() ||
    usuarioEhEscolaTerceirizadaDiretor()
  ) {
    return gerarPDFRelatorioSolicitacoesAlimentacaoEscola;
  } else if (
    usuarioEhCODAEGestaoAlimentacao() ||
    usuarioEhMedicao() ||
    usuarioEhCODAENutriManifestacao() ||
    usuarioEhCODAEGabinete() ||
    ehUsuarioRelatorios()
  ) {
    return gerarPDFRelatorioSolicitacoesAlimentacaoCODAE;
  } else if (usuarioEhEmpresaTerceirizada()) {
    return gerarPDFRelatorioSolicitacoesAlimentacaoTerceirizadas;
  } else {
    return "PERFIL_INVALIDO";
  }
};

export default (props) => (
  <Page
    titulo="Relatório de Solicitações de Alimentação"
    botaoVoltar
    {...props}
  >
    <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
    <RelatorioSolicitacoesAlimentacao
      endpoint={endpointPorPerfil()}
      endpointGerarExcel={endpointGerarExcel()}
      endpointGerarPDF={endpointGerarPDF()}
      {...props}
    />
  </Page>
);
