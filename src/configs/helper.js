import DashboardDREPage from "../pages/DRE/DashboardDREPage";
import DashboardEscolaPage from "../pages/Escola/DashboardEscolaPage";
import DashboardCODAEPage from "../pages/CODAE/DashboardCODAEPage";
import DashboardTerceirizadaPage from "../pages/Terceirizada/DashboardTerceirizadaPage";
import * as PermissoesPage from "../pages/Configuracoes/PermissoesPage";
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
      return PermissoesPage.PermissoesEscola;
    default:
      return PermissoesPage.PermissoesEscola;
  }
};
