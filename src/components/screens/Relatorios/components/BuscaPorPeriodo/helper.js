import {
  usuarioEhDRE,
  usuarioEhCODAEGestaoAlimentacao
} from "../../../../../helpers/utilities";
import { TODOS } from "../../../../../constants/shared";

export const formataValues = values => {
  if (
    (usuarioEhDRE() || usuarioEhCODAEGestaoAlimentacao()) &&
    !values.unidade_escolar
  ) {
    values.unidade_escolar = TODOS;
  }
  if (usuarioEhCODAEGestaoAlimentacao() && !values.diretoria_regional) {
    values.diretoria_regional = TODOS;
  }
  return values;
};
