import { usuarioEhNutricionistaSupervisao } from "helpers/utilities";
import { ListaRelatoriosFiscalizacaoTerceirizadasPage } from "pages/IMR/Terceirizadas/RelatorioFiscalizacaoTerceirizadas/ListaRelatoriosPage";
import { NovoRelatorioFiscalizacaoPage } from "pages/IMR/Terceirizadas/RelatorioFiscalizacaoTerceirizadas/NovoRelatorioFiscalizacaoPage";
import { RelatorioFiscalizacaoPage } from "pages/IMR/Terceirizadas/RelatorioFiscalizacaoTerceirizadas/RelatorioFiscalizacaoPage";
import { PainelRelatoriosPage } from "pages/IMR/Terceirizadas/RelatorioFiscalizacaoTerceirizadas/PainelRelatoriosPage";
import * as constants from "../../constants";
import { RotaInterface } from "../interfaces";

export const rotasSupervisao: Array<RotaInterface> = [
  {
    path: `/${constants.SUPERVISAO}/${constants.TERCEIRIZADAS}/${constants.PAINEL_RELATORIOS_FISCALIZACAO}`,
    component: PainelRelatoriosPage,
    tipoUsuario: usuarioEhNutricionistaSupervisao(),
  },
  {
    path: `/${constants.SUPERVISAO}/${constants.TERCEIRIZADAS}/${constants.RELATORIO_FISCALIZACAO_TERCEIRIZADAS}`,
    component: ListaRelatoriosFiscalizacaoTerceirizadasPage,
    tipoUsuario: usuarioEhNutricionistaSupervisao(),
  },
  {
    path: `/${constants.SUPERVISAO}/${constants.TERCEIRIZADAS}/${constants.RELATORIO_FISCALIZACAO_TERCEIRIZADAS}/${constants.RELATORIO_FISCALIZACAO}`,
    component: NovoRelatorioFiscalizacaoPage,
    tipoUsuario: usuarioEhNutricionistaSupervisao(),
  },
  {
    path: `/${constants.SUPERVISAO}/${constants.TERCEIRIZADAS}/${constants.RELATORIO_FISCALIZACAO_TERCEIRIZADAS}/${constants.RELATORIO_FISCALIZACAO}/:uuid/${constants.EDITAR}`,
    component: RelatorioFiscalizacaoPage,
    tipoUsuario: usuarioEhNutricionistaSupervisao(),
  },
];
