import { validarCPF } from "../../../helpers/utilities";

export const validarValores = values => {
  let erro = false;
  if (!values.cpf || !validarCPF(values.cpf)) {
    erro = "CPF inválido";
  }
  return erro;
};
