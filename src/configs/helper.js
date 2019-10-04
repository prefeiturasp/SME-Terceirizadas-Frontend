import DashboardDREPage from "../pages/DRE/DashboardDREPage";
import DashboardEscolaPage from "../pages/Escola/DashboardEscolaPage";
import DashboardCODAEPage from "../pages/CODAE/DashboardCODAEPage";
import DashboardTerceirizadaPage from "../pages/Terceirizada/DashboardTerceirizadaPage";

export const painelHome = () => {
  switch (sessionStorage.getItem("tipo_perfil")) {
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
