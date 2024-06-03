import { usuarioEhNutricionistaSupervisao } from "helpers/utilities";
import { ListaRelatoriosFiscalizacaoTerceirizadasPage } from "pages/IMR/Terceirizadas/RelatorioFiscalizacaoTerceirizadas/ListaRelatoriosPage";
import { NovoRelatorioVisitasPage } from "pages/IMR/Terceirizadas/RelatorioFiscalizacaoTerceirizadas/NovoRelatorioVisitasPage";
import * as constants from "../../constants";
import { RotaInterface } from "../interfaces";

export const rotasSupervisao: Array<RotaInterface> = [
  {
    path: `/${constants.SUPERVISAO}/${constants.TERCEIRIZADAS}/${constants.RELATORIO_FISCALIZACAO_TERCEIRIZADAS}`,
    component: ListaRelatoriosFiscalizacaoTerceirizadasPage,
    tipoUsuario: usuarioEhNutricionistaSupervisao(),
  },
  {
    path: `/${constants.SUPERVISAO}/${constants.TERCEIRIZADAS}/${constants.RELATORIO_FISCALIZACAO_TERCEIRIZADAS}/${constants.NOVO_RELATORIO_VISITAS}`,
    component: NovoRelatorioVisitasPage,
    tipoUsuario: usuarioEhNutricionistaSupervisao(),
  },
];
