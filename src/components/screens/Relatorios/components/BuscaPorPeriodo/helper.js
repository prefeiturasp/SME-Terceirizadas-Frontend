import { usuarioDiretoriaRegional } from "../../../../../helpers/utilities";

export const formataValues = values => {
  if (usuarioDiretoriaRegional() && !values.unidade_escolar) {
    values.unidade_escolar = "TODOS";
  }
  return values;
};
