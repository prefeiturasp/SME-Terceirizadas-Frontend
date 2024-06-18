import { 
  usuarioEhCoordenadorNutriSupervisao, 
  usuarioEhAdmQualquerEmpresa 
} from "helpers/utilities";

import ControleRestosPage from "pages/Cadastros/ControleRestosPage";
import ControleSobrasPage from "pages/Cadastros/ControleSobrasPage";
import TiposAlimentoPage from "pages/Cadastros/TiposAlimentoPage";
import TiposRecipientePage from "pages/Cadastros/TiposRecipientePage";
import ParametrosClassificacaoPage from "pages/Cadastros/ParametrosClassificacaoPage";
import RelatorioControleRestosPage from "pages/Relatorios/RelatorioControleRestosPage";
import RelatorioControleSobrasPage from "pages/Relatorios/RelatorioControleSobrasPage";

import * as constants from "../../constants";
import { RotaInterface } from "../interfaces";

export const rotasDesperdicio: Array<RotaInterface> = [
  {
    path: `/${constants.DESPERDICIO}/${constants.CONTROLE_RESTOS}`,
    component: ControleRestosPage,
    exact: true,
    tipoUsuario: usuarioEhCoordenadorNutriSupervisao(),
  },
  {
    path: `/${constants.DESPERDICIO}/${constants.CONTROLE_SOBRAS}`,
    component: ControleSobrasPage,
    exact: true,
    tipoUsuario: usuarioEhAdmQualquerEmpresa(),
  },
  {
    path: `/${constants.DESPERDICIO}/${constants.RELATORIOS}/${constants.RELATORIO_CONTROLE_RESTOS}`,
    component: RelatorioControleRestosPage,
    exact: true,
    tipoUsuario: usuarioEhCoordenadorNutriSupervisao(),
  },
  {
    path: `/${constants.DESPERDICIO}/${constants.RELATORIOS}/${constants.RELATORIO_CONTROLE_SOBRAS}`,
    component: RelatorioControleSobrasPage,
    exact: true,
    tipoUsuario: usuarioEhAdmQualquerEmpresa(),
  },
  {
    path: `/${constants.DESPERDICIO}/${constants.CADASTROS}/${constants.TIPOS_RECIPIENTE}`,
    component: TiposRecipientePage,
    exact: true,
    tipoUsuario: usuarioEhCoordenadorNutriSupervisao(),
  },
  {
    path: `/${constants.DESPERDICIO}/${constants.CADASTROS}/${constants.TIPOS_ALIMENTO}`,
    component: TiposAlimentoPage,
    exact: true,
    tipoUsuario: usuarioEhCoordenadorNutriSupervisao(),
  },
  {
    path: `/${constants.DESPERDICIO}/${constants.CADASTROS}/${constants.PARAMETROS_CLASSIFICACAO}`,
    component: ParametrosClassificacaoPage,
    exact: true,
    tipoUsuario: usuarioEhCoordenadorNutriSupervisao(),
  },
];
