import { TIPO_PERFIL } from "constants/shared";
import DashboardDREPage from "pages/DRE/DashboardDREPage";
import DashboardEscolaPage from "pages/Escola/DashboardEscolaPage";
import DashboardCODAEPage from "pages/CODAE/DashboardCODAEPage";
import DashboardTerceirizadaPage from "pages/Terceirizada/DashboardTerceirizadaPage";
import DashboardNutricionistaGAPage from "pages/Nutricionista/DashboardNutricionistaGAPage";
import DashboardNutriManifestacaoPage from "pages/Nutricionista/DashboardNutriManifestacaoPage";

export const painelGestaoAlimentacao = () => {
  switch (localStorage.getItem("tipo_perfil")) {
    case TIPO_PERFIL.DIRETORIA_REGIONAL:
      return DashboardDREPage;
    case TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA:
      return DashboardCODAEPage;
    case TIPO_PERFIL.TERCEIRIZADA:
      return DashboardTerceirizadaPage;
    case TIPO_PERFIL.SUPERVISAO_NUTRICAO:
      return DashboardNutricionistaGAPage;
    case TIPO_PERFIL.NUTRICAO_MANIFESTACAO:
    case TIPO_PERFIL.MEDICAO:
    case TIPO_PERFIL.CODAE_GABINETE:
      return DashboardNutriManifestacaoPage;
    default:
      return DashboardEscolaPage;
  }
};
