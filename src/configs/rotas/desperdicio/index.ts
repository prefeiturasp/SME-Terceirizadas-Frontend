import { usuarioEhCoordenadorNutriSupervisao } from "helpers/utilities";

import TiposAlimentoPage from "pages/Cadastros/TiposAlimentoPage";
import TiposRecipientePage from "pages/Cadastros/TiposRecipientePage";

import * as constants from "../../constants";
import { RotaInterface } from "../interfaces";

export const rotasDesperdicio: Array<RotaInterface> = [
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
];
