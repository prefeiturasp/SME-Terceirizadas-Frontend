import DashboardDREPage from "../pages/DRE/DashboardDREPage";
import DashboardEscolaPage from "../pages/Escola/DashboardEscolaPage";
import DashboardCODAEPage from "../pages/CODAE/DashboardCODAEPage";
import DashboardTerceirizadaPage from "../pages/Terceirizada/DashboardTerceirizadaPage";
import * as PermissoesPage from "../pages/Configuracoes/PermissoesPage";
import * as RelatoriosPage from "../pages/Relatorios/RelatoriosPage";
import * as RelatoriosAlteracaoDeCardapio from "../pages/AlteracaoDeCardapio/RelatorioPage";
import * as RelatoriosInclusaoDeAlimentacao from "../pages/InclusaoDeAlimentacao/RelatorioPage";
import * as RelatoriosSolicitacaoKitLanche from "../pages/SolicitacaoDeKitLanche/RelatorioPage";
import * as RelatoriosSolicitacaoUnificada from "../pages/SolicitacaoUnificada/RelatoriosPage";
import { TIPO_PERFIL } from "../constants";

export const painelHome = () => {
  switch (localStorage.getItem("tipo_perfil")) {
    case TIPO_PERFIL.DIRETORIA_REGIONAL:
      return DashboardDREPage;
    case TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA:
      return DashboardCODAEPage;
    case TIPO_PERFIL.TERCEIRIZADA:
      return DashboardTerceirizadaPage;
    default:
      return DashboardEscolaPage;
  }
};

export const permissoes = () => {
  switch (localStorage.getItem("tipo_perfil")) {
    case TIPO_PERFIL.DIRETORIA_REGIONAL:
      return PermissoesPage.PermissoesDRE;
    case TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA:
      return PermissoesPage.PermissoesCODAEGestaoAlimentacaoTerceirizada;
    case TIPO_PERFIL.TERCEIRIZADA:
      return PermissoesPage.PermissoesTerceirizada;
    default:
      return PermissoesPage.PermissoesEscola;
  }
};

export const relatorios = () => {
  switch (localStorage.getItem("tipo_perfil")) {
    case TIPO_PERFIL.DIRETORIA_REGIONAL:
      return RelatoriosPage.RelatoriosDRE;
    case TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA:
      return RelatoriosPage.RelatoriosEscola;
    case TIPO_PERFIL.TERCEIRIZADA:
      return RelatoriosPage.RelatoriosEscola;
    default:
      return RelatoriosPage.RelatoriosEscola;
  }
};

export const relatoriosAlteracaoDeCardapio = () => {
  switch (localStorage.getItem("tipo_perfil")) {
    case TIPO_PERFIL.DIRETORIA_REGIONAL:
      return RelatoriosAlteracaoDeCardapio.RelatorioDRE;
    case TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA:
      return RelatoriosAlteracaoDeCardapio.RelatorioCODAE;
    case TIPO_PERFIL.TERCEIRIZADA:
      return RelatoriosAlteracaoDeCardapio.RelatorioTerceirizada;
    default:
      return RelatoriosAlteracaoDeCardapio.RelatorioEscola;
  }
};

export const relatoriosInclusaoDeAlimentacao = () => {
  switch (localStorage.getItem("tipo_perfil")) {
    case TIPO_PERFIL.DIRETORIA_REGIONAL:
      return RelatoriosInclusaoDeAlimentacao.RelatorioDRE;
    case TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA:
      return RelatoriosInclusaoDeAlimentacao.RelatorioCODAE;
    case TIPO_PERFIL.TERCEIRIZADA:
      return RelatoriosInclusaoDeAlimentacao.RelatorioTerceirizada;
    default:
      return RelatoriosInclusaoDeAlimentacao.RelatorioEscola;
  }
};

export const relatoriosSolicitacaoKitLanche = () => {
  switch (localStorage.getItem("tipo_perfil")) {
    case TIPO_PERFIL.DIRETORIA_REGIONAL:
      return RelatoriosSolicitacaoKitLanche.RelatorioDRE;
    case TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA:
      return RelatoriosSolicitacaoKitLanche.RelatorioCODAE;
    case TIPO_PERFIL.TERCEIRIZADA:
      return RelatoriosSolicitacaoKitLanche.RelatorioTerceirizada;
    default:
      return RelatoriosSolicitacaoKitLanche.RelatorioEscola;
  }
};

export const relatoriosSolicitacaoUnificada = () => {
  switch (localStorage.getItem("tipo_perfil")) {
    case TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA:
      return RelatoriosSolicitacaoUnificada.RelatorioCODAE;
    case TIPO_PERFIL.TERCEIRIZADA:
      return RelatoriosSolicitacaoUnificada.RelatorioTerceirizada;
    default:
      return RelatoriosSolicitacaoUnificada.RelatorioDRE;
  }
};
