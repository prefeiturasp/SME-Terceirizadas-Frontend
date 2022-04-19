import {
  usuarioEhCODAEDietaEspecial,
  usuarioEhNutricionistaSupervisao,
  usuarioEhDRE,
  usuarioEhEscola,
  usuarioEscolaEhGestaoDireta
} from "./utilities";

export const podeAcessarRelatorioQuantSolicDietaEsp =
  usuarioEhCODAEDietaEspecial() ||
  usuarioEhNutricionistaSupervisao() ||
  usuarioEhDRE() ||
  (usuarioEhEscola() && !usuarioEscolaEhGestaoDireta());
