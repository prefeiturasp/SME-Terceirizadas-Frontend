import {
  usuarioDiretoriaRegional,
  usuarioCODAEGestaoAlimentacao
} from "../../../../../helpers/utilities";
import { TODOS } from "../../../../../constants/shared";

export const formataValues = values => {
  if (
    (usuarioDiretoriaRegional() || usuarioCODAEGestaoAlimentacao()) &&
    !values.unidade_escolar
  ) {
    values.unidade_escolar = TODOS;
  }
  if (usuarioCODAEGestaoAlimentacao() && !values.diretoria_regional) {
    values.diretoria_regional = TODOS;
  }
  return values;
};
