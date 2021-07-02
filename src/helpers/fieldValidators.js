import moment from "moment";
import strip_tags from "locutus/php/strings/strip_tags";

export const required = value =>
  value !== undefined ? undefined : "Campo obrigatório";

export const requiredMultiselect = array =>
  array !== [] ? undefined : "Campo obrigatório";

export const requiredMultiselectKhan = array =>
  (array === undefined || array.length === 0) && "Campo obrigatório";

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

export const peloMenosUmCaractere = value => {
  let valorLimpo = strip_tags(value);
  valorLimpo = valorLimpo.replace(/&nbsp;/g, "");
  return /[a-zA-Z0-9]/i.test(valorLimpo)
    ? undefined
    : "Pelo menos um caractere deve ser digitado";
};

export const textAreaRequiredAndAtLeastOneCharacter = value => {
  let result = textAreaRequired(value);
  if (result !== undefined) {
    return result;
  }
  return peloMenosUmCaractere(value);
};

export const requiredCheck = value =>
  value !== undefined
    ? undefined
    : "Campo obrigatório: selecione ao menos uma opção";

export const maxLength = max => value =>
  value && value.length > max
    ? `Deve ter ${max} caracteres(s) ou menos`
    : undefined;

export const maxLengthProduto = max => value =>
  value && value.length > max
    ? `Limite máximo de ${max} caracteres`
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

export const cep = value =>
  value && /^[\d]{5}-[\d]{3}/.test(value) ? undefined : "Cep inválido";

export const prefeituraEmail = value =>
  value && /.+@\prefeitura.sp.gov.br/.test(value)
    ? undefined
    : "Somente emails da prefeitura de São Paulo";

export const peloMenosUmNumeroEUmaLetra = value =>
  value && /^(?=.*[0-9])(?=.*[a-zA-Z])/i.test(value)
    ? undefined
    : "Precisa conter letras e números";

export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9]/i.test(value) ? "Apenas letras e números" : undefined;

export const apenasLetras = value =>
  value && /[^a-zA-Zà-úÀ-Ú ]/i.test(value)
    ? "Não digite números ou caracteres especiais"
    : undefined;

export const numericInteger = value =>
  // value && /[^0-9 ]/i.test(value) ? "Somente números" : undefined;
  value && !/\D/.test(value) ? undefined : "Somente números";

export const nonRequiredNumericInteger = value => {
  if (value !== undefined && !/^[0-9]+$/.test(value)) {
    return "Somente números";
  }
};

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

export const numeroDecimal = value => {
  const er = new RegExp("[0-9],[0-9]");
  return value ? (er.test(value) ? undefined : "Deve ser um decimal") : [];
};

export const inteiroOuDecimal = value => {
  return value && !/^[0-9]+([,.][0-9]+)?$/g.test(value)
    ? "Somente números inteiros ou decimais"
    : undefined;
};

export const numeroInteiro = value =>
  value ? (!/\D/.test(value) ? undefined : "Somente números") : [];

export const validaCPF = value => {
  if (value === undefined) {
    return undefined;
  }
  let cpf = value.replace(/[^\d]+/g, "");

  if (cpf === "") return false;
  // Elimina CPFs invalidos conhecidos
  if (
    cpf.length !== 11 ||
    cpf === "00000000000" ||
    cpf === "11111111111" ||
    cpf === "22222222222" ||
    cpf === "33333333333" ||
    cpf === "44444444444" ||
    cpf === "55555555555" ||
    cpf === "66666666666" ||
    cpf === "77777777777" ||
    cpf === "88888888888" ||
    cpf === "99999999999"
  ) {
    return "CPF informado inválido";
  }

  // Valida 1o digito
  let add = 0;
  let i, rev;
  for (i = 0; i < 9; i++) {
    add += parseInt(cpf.charAt(i)) * (10 - i);
  }
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) {
    rev = 0;
  }
  if (rev !== parseInt(cpf.charAt(9))) {
    return "CPF informado inválido";
  }
  // Valida 2o digito
  add = 0;
  for (i = 0; i < 10; i++) {
    add += parseInt(cpf.charAt(i)) * (11 - i);
  }
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) {
    rev = 0;
  }
  if (rev !== parseInt(cpf.charAt(10))) {
    return "CPF informado inválido";
  }

  return undefined;
};
