import { TIPO_PERFIL } from "constants/shared";
import * as RelatoriosPage from "pages/Relatorios/RelatoriosPage";

export const relatorios = () => {
  switch (localStorage.getItem("tipo_perfil")) {
    case TIPO_PERFIL.DIRETORIA_REGIONAL:
      return RelatoriosPage.RelatoriosDRE;
    case TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA:
      return RelatoriosPage.RelatoriosCODAE;
    case TIPO_PERFIL.TERCEIRIZADA:
      return RelatoriosPage.RelatoriosEscola;
    default:
      return RelatoriosPage.RelatoriosEscola;
  }
};
