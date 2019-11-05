import { validarCPF } from "../../helpers/utilities";

export const validarForm = values => {
  let erro = false;
  /*if (values.email.includes("@")) {
    erro = "Campo e-mail não deve conter @";
  } else*/ if (
    values.registro_funcional.length !== 7
  ) {
    erro = "Campo registro funcional deve conter 7 números";
  } else if (!validarCPF(values.cpf)) {
    erro = "CPF inválido";
  } else if (values.password !== values.confirmar_password) {
    erro = "Campos senha e confirmar senha divergem";
  }
  return erro;
};
