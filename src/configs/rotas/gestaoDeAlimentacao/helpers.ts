import { TIPO_PERFIL } from "constants/shared";
import { escolaEhCei, escolaEhCEMEI } from "helpers/utilities";
import DashboardCODAEPage from "pages/CODAE/DashboardCODAEPage";
import DashboardDREPage from "pages/DRE/DashboardDREPage";
import AlteracaoDeCardapioCEIPage from "pages/Escola/AlteracaoDeCardapioCEIPage";
import AlteracaoDeCardapioCEMEIPage from "pages/Escola/AlteracaoDeCardapioCEMEIPage";
import AlteracaoDeCardapioPage from "pages/Escola/AlteracaoDeCardapioPage";
import DashboardEscolaPage from "pages/Escola/DashboardEscolaPage";
import InclusaoDeAlimentacaoCEIPage from "pages/Escola/InclusaoDeAlimentacaoCEIPage";
import InclusaoDeAlimentacaoCEMEIPage from "pages/Escola/InclusaoDeAlimentacaoCEMEIPage";
import InclusaoDeAlimentacaoPage from "pages/Escola/InclusaoDeAlimentacaoPage";
import SuspensaoDeAlimentacaoDeCEI from "pages/Escola/SuspensaoDeAlimentacaoDeCEIPage";
import SuspensaoDeAlimentacaoPage from "pages/Escola/SuspensaoDeAlimentacaoPage";
import DashboardNutricionistaGAPage from "pages/Nutricionista/DashboardNutricionistaGAPage";
import DashboardNutriManifestacaoPage from "pages/Nutricionista/DashboardNutriManifestacaoPage";
import DashboardTerceirizadaPage from "pages/Terceirizada/DashboardTerceirizadaPage";

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

export const inclusaoAlimentacao = () => {
  return escolaEhCei()
    ? InclusaoDeAlimentacaoCEIPage
    : escolaEhCEMEI()
    ? InclusaoDeAlimentacaoCEMEIPage
    : InclusaoDeAlimentacaoPage;
};

export const alteracaoCardapio = () => {
  return escolaEhCei()
    ? AlteracaoDeCardapioCEIPage
    : escolaEhCEMEI()
    ? AlteracaoDeCardapioCEMEIPage
    : AlteracaoDeCardapioPage;
};

export const suspensaoAlimentacao = () => {
  return escolaEhCei()
    ? SuspensaoDeAlimentacaoDeCEI
    : SuspensaoDeAlimentacaoPage;
};
