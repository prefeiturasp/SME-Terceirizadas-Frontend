import DashboardDREPage from "../pages/DRE/DashboardDREPage";
import DashboardEscolaPage from "../pages/Escola/DashboardEscolaPage";
import DashboardCODAEPage from "../pages/CODAE/DashboardCODAEPage";
import DashboardTerceirizadaPage from "../pages/Terceirizada/DashboardTerceirizadaPage";
import * as PermissoesPage from "../pages/Configuracoes/PermissoesPage";

export const painelHome = () => {
  switch (localStorage.getItem("tipo_perfil")) {
    case `"diretoria_regional"`:
      return DashboardDREPage;
    case `"codae"`:
      return DashboardCODAEPage;
    case `"terceirizada"`:
      return DashboardTerceirizadaPage;
    default:
      return DashboardEscolaPage;
  }
};

export const permissoes = () => {
  switch (localStorage.getItem("tipo_perfil")) {
    case `"diretoria_regional"`:
      return PermissoesPage.PermissoesEscola;
    case `"codae"`:
      return PermissoesPage.PermissoesEscola;
    case `"terceirizada"`:
      return PermissoesPage.PermissoesEscola;
    default:
      return PermissoesPage.PermissoesEscola;
  }
};
