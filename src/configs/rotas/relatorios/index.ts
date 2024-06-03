import * as constants from "../../constants";
import { relatorios } from "./helpers";

export const rotasRelatorios = [
  {
    path: "/relatorios",
    component: relatorios(),
    tipoUsuario: constants.QUALQUER_USUARIO,
  },
];
