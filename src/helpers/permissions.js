import {
  usuarioEhCODAEDietaEspecial,
  usuarioEhNutricionistaSupervisao,
  usuarioEhDRE,
  usuarioEhEscolaTerceirizadaDiretor,
  usuarioEhEscolaTerceirizada,
} from "./utilities";

export const podeAcessarRelatorioQuantSolicDietaEsp =
  usuarioEhCODAEDietaEspecial() ||
  usuarioEhNutricionistaSupervisao() ||
  usuarioEhDRE() ||
  usuarioEhEscolaTerceirizada() ||
  usuarioEhEscolaTerceirizadaDiretor();
