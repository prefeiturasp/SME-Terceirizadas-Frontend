import moment from "moment";
export const required = value =>
  value !== undefined ? undefined : "Campo obrigatório";

export const deveSerNoAnoCorrente = value => {
  const dataSelecionada = moment(value, "DD/MM/YYYY").year();
  const dataAtual = moment().year();
  return dataSelecionada === dataAtual ? undefined : "Deve ser no mesmo ano";
};

export const diasAntecedencia = value => {
  return value !== undefined ? undefined : "Campo obrigatório";
};

// XXX: Workaround for labelAndTextArea component
export const textAreaRequired = value => {
  return value !== "<p></p>\n" ? undefined : "Campo obrigatório";
};

export const requiredCheck = value =>
  value !== undefined
    ? undefined
    : "Campo obrigatório: selecione ao menos uma opção";

export const maxLength = max => value =>
  value && value.length > max
    ? `Deve ter ${max} caracteres(s) ou menos`
    : undefined;

export const minLength = min => value =>
  value && value.length < min
    ? `Deve ter ao menos ${min} caracteres(s)`
    : undefined;

export const length = size => value =>
  value && value.length !== size
    ? `Deve ter exatamente ${size} caracteres`
    : undefined;

export const semArroba = value =>
  value && value.includes("@") ? "Campo e-mail não deve conter @" : undefined;

// eslint-disable-next-line
const number = value =>
  value && isNaN(Number(value)) ? "Deve ser um número" : undefined;

export const minValue = min => value =>
  value && value < min ? `Deve ser ao menos ${min}` : undefined;

export const naoPodeSerZero = value =>
  value && value < 1 ? "Deve ser ao menos 1" : undefined;

export const maxValue = max => value =>
  value && value > max ? `Não pode ser maior que ${max}` : undefined;

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Email inválido"
    : undefined;

export const prefeituraEmail = value =>
  value && /.+@\prefeitura.sp.gov.br/.test(value)
    ? undefined
    : "Somente emails da prefeitura de São Paulo";

export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

export const numericInteger = value =>
  // value && /[^0-9 ]/i.test(value) ? "Somente números" : undefined;
  value && !/\D/.test(value) ? undefined : "Somente números";

export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? "Invalid phone number, must be 10 digits"
    : undefined;

export const tamanhoCnpj = value =>
  value.length < 14 ? "CNPJ Inválido" : undefined;

export const semCaracteresEspeciais = value =>
  value && !/^[\w&.-]+$/i.test(value)
    ? `Não permite caracteres especiais`
    : undefined;
