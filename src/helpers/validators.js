export const required = value =>
  value !== undefined ? undefined : "Campo obrigatório";

export const requiredCheck = value =>
  value !== undefined
    ? undefined
    : "Campo obrigatório: selecione ao menos uma opção";

const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const maxLength15 = maxLength(15);
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const minLength2 = minLength(2);
const number = value =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
const minValue13 = minValue(13);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
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
  value && /[^0-9 ]/i.test(value) ? "Somente números" : undefined;

export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? "Invalid phone number, must be 10 digits"
    : undefined;
