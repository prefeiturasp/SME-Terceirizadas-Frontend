import {
  usuarioEhCODAEDietaEspecial,
  usuarioEhNutricionistaSupervisao,
  usuarioEhDRE,
  usuarioEhEscola
} from "./utilities";

export const podeAcessarRelatorioQuantSolicDietaEsp =
  usuarioEhCODAEDietaEspecial() ||
  usuarioEhNutricionistaSupervisao() ||
  usuarioEhDRE() ||
  usuarioEhEscola();
