import {
  usuarioEhNutricionistaSupervisao,
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhCODAENutriManifestacao,
} from "helpers/utilities";
import { ListaRelatoriosFiscalizacaoTerceirizadasPage } from "pages/IMR/Terceirizadas/RelatorioFiscalizacaoTerceirizadas/ListaRelatoriosPage";
import { NovoRelatorioFiscalizacaoPage } from "pages/IMR/Terceirizadas/RelatorioFiscalizacaoTerceirizadas/NovoRelatorioFiscalizacaoPage";
import { PainelRelatoriosPage } from "pages/IMR/Terceirizadas/RelatorioFiscalizacaoTerceirizadas/PainelRelatoriosPage";
import * as constants from "../../constants";
import { RotaInterface } from "../interfaces";
import { DetalharRelatorioFiscalizacaoPage } from "pages/IMR/Terceirizadas/RelatorioFiscalizacaoTerceirizadas/DetalharRelatorioFiscalizacaoPage";
import { EditarRelatorioFiscalizacaoPage } from "pages/IMR/Terceirizadas/RelatorioFiscalizacaoTerceirizadas/EditarRelatorioFiscalizacaoPage";

export const rotasSupervisao: Array<RotaInterface> = [
  {
    path: `/${constants.SUPERVISAO}/${constants.TERCEIRIZADAS}/${constants.PAINEL_RELATORIOS_FISCALIZACAO}`,
    component: PainelRelatoriosPage,
    tipoUsuario:
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao(),
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
    path: `/${constants.SUPERVISAO}/${constants.TERCEIRIZADAS}/${constants.RELATORIO_FISCALIZACAO_TERCEIRIZADAS}/${constants.EDITAR_RELATORIO_FISCALIZACAO}`,
    component: EditarRelatorioFiscalizacaoPage,
    tipoUsuario: usuarioEhNutricionistaSupervisao(),
  },
  {
    path: `/${constants.SUPERVISAO}/${constants.TERCEIRIZADAS}/${constants.RELATORIO_FISCALIZACAO_TERCEIRIZADAS}/${constants.DETALHAR_RELATORIO_FISCALIZACAO}`,
    component: DetalharRelatorioFiscalizacaoPage,
    tipoUsuario: usuarioEhNutricionistaSupervisao(),
  },
];
