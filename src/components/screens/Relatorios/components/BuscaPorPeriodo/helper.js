import {
  checarSeUsuarioEhDiretoriaRegional,
  checarSeUsuarioEhCODAEGestaoAlimentacao
} from "../../../../../helpers/utilities";
import { TODOS } from "../../../../../constants/shared";

export const formataValues = values => {
  if (
    (checarSeUsuarioEhDiretoriaRegional() ||
      checarSeUsuarioEhCODAEGestaoAlimentacao()) &&
    !values.unidade_escolar
  ) {
    values.unidade_escolar = TODOS;
  }
  if (checarSeUsuarioEhCODAEGestaoAlimentacao() && !values.diretoria_regional) {
    values.diretoria_regional = TODOS;
  }
  return values;
};
