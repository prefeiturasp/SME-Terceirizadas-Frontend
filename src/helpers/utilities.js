import moment from "moment";
import "moment/locale/pt-br";
import { statusEnum } from "../constants";
import { TIPO_PERFIL } from "../constants";

export const showResults = values =>
  new Promise(resolve => {
    setTimeout(() => {
      // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
      resolve();
    }, 1500);
  });

export const dateDelta = daysDelta => {
  let today = new Date();
  today.setDate(today.getDate() + daysDelta);
  return today;
};

export const checaSeDataEstaEntre2e5DiasUteis = (
  value,
  two_working_days,
  five_working_days
) => {
  const _date = value.split("/");
  if (
    two_working_days <= new Date(_date[2], _date[1] - 1, _date[0]) &&
    new Date(_date[2], _date[1] - 1, _date[0]) < five_working_days
  ) {
    return true;
  }
  return false;
};

export const dataPrioritaria = (
  data,
  proximos_dois_dias_uteis,
  proximos_cinco_dias_uteis
) => {
  const data_objeto = new Date(moment(data).format("DD/MM/YYYY"));
  return (
    proximos_dois_dias_uteis <= data_objeto &&
    data_objeto < proximos_cinco_dias_uteis
  );
};

export const agregarDefault = lista => {
  return [{ nome: "Selecione", uuid: "" }].concat(lista);
};

export const formatarParaMultiselect = lista => {
  return lista.map(element => {
    return { value: element.uuid, label: element.nome };
  });
};

export const extrairUUIDs = lista => {
  let uuids = [];
  lista.forEach(element => {
    uuids.push(element.uuid);
  });
  return uuids;
};

export const dataParaUTC = data => {
  return new Date(
    data.getUTCFullYear(),
    data.getUTCMonth(),
    data.getUTCDate(),
    data.getUTCHours(),
    data.getUTCMinutes(),
    data.getUTCSeconds()
  );
};

export const geradorUUID = () => {
  let S4 = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};

export const stringSeparadaPorVirgulas = (obj, campo) => {
  let array = [];
  obj.forEach(function(elemento) {
    array.push(elemento[campo]);
  });
  return array.join(", ");
};

export const dataAtual = () => {
  moment.locale("pt-br");
  return moment().format("LL");
};

export const dataAtualDDMMYYYY = () => {
  moment.locale("pt-br");
  return moment().format("L");
};

export const talvezPluralizar = (contador, substantivo, sufixo = "s") => {
  return `${substantivo}${contador !== 1 ? sufixo : ""}`;
};

export const getDataObj = data => {
  return moment(data, "DD/MM/YYYY")["_d"];
};

export const prazoDoPedidoMensagem = prioridade => {
  switch (prioridade) {
    case "REGULAR":
      return "Solicitação no prazo regular";
    case "LIMITE":
      return "Solicitação no prazo limite";
    case "PRIORITARIO":
      return "Solicitação próxima ao prazo de vencimento";
    default:
      return "";
  }
};

export const corDaMensagem = mensagem => {
  if (mensagem.includes("vencimento")) return "red";
  else if (mensagem.includes("limite")) return "yellow";
  else return "green";
};

export const pontuarValor = valor => {
  return parseFloat(valor).toLocaleString();
};

export const mensagemCancelamento = status => {
  switch (status) {
    case statusEnum.DRE_A_VALIDAR:
      return "Esta solicitação está aguardando validação pela DRE. ";
    case statusEnum.DRE_VALIDADO:
    case statusEnum.CODAE_A_AUTORIZAR:
      return "Esta solicitação já foi validada pela DRE. ";
    case statusEnum.TERCEIRIZADA_TOMOU_CIENCIA:
    case statusEnum.CODAE_AUTORIZADO:
      return "Esta solicitação já foi autorizada pela CODAE. ";
    default:
      return "";
  }
};

export const validarCPF = cpf => {
  cpf = cpf.replace(/[^\d]+/g, "");
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
  )
    return false;
  // Valida 1o digito
  let add = 0;
  let i, rev;
  for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return false;
  // Valida 2o digito
  add = 0;
  for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(10))) return false;
  return true;
};

export const formataCPF = cpf => {
  cpf = cpf.replace(/[^\d]/g, "");
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const truncarString = (str, numeroMaximoChars) => {
  if (str.length > numeroMaximoChars) {
    return str.slice(0, numeroMaximoChars) + "...";
  } else {
    return str;
  }
};

export const deepCopy = obj => {
  return JSON.parse(JSON.stringify(obj));
};

export const visualizaBotoesDoFluxo = solicitacao => {
  const tipoPerfil = localStorage.getItem("tipo_perfil");
  switch (solicitacao.status) {
    case statusEnum.DRE_A_VALIDAR:
      return [TIPO_PERFIL.DIRETORIA_REGIONAL, TIPO_PERFIL.ESCOLA].includes(
        tipoPerfil
      );
    case statusEnum.DRE_VALIDADO:
    case statusEnum.CODAE_A_AUTORIZAR:
    case statusEnum.TERCEIRIZADA_RESPONDEU_QUESTIONAMENTO:
      return [
        TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA,
        TIPO_PERFIL.DIETA_ESPECIAL,
        TIPO_PERFIL.ESCOLA
      ].includes(tipoPerfil);
    case statusEnum.CODAE_AUTORIZADO:
    case statusEnum.CODAE_QUESTIONADO:
      return [TIPO_PERFIL.TERCEIRIZADA, TIPO_PERFIL.ESCOLA].includes(
        tipoPerfil
      );
    case statusEnum.TERCEIRIZADA_TOMOU_CIENCIA:
      return [TIPO_PERFIL.DIRETORIA_REGIONAL, TIPO_PERFIL.ESCOLA].includes(
        tipoPerfil
      );
    default:
      return false;
  }
};

export const vizualizaBotoesDietaEspecial = solicitacao => {
  switch (solicitacao.status_solicitacao) {
    case statusEnum.CODAE_A_AUTORIZAR:
      return usuarioEscola() || usuarioCODAEDietaEspecial();
    case statusEnum.ESCOLA_SOLICITOU_INATIVACAO:
      return usuarioCODAEDietaEspecial();
    case statusEnum.CODAE_AUTORIZADO:
    case statusEnum.CODAE_AUTORIZOU_INATIVACAO:
      return usuarioTerceirizada();
    default:
      return false;
  }
};

export const formatarCPFouCNPJ = value => {
  const cnpjCpf = value.replace(/\D/g, "");
  if (cnpjCpf.length === 11) {
    return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
  }
  return cnpjCpf.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
    "$1.$2.$3/$4-$5"
  );
};

export const usuarioEscola = () => {
  return localStorage.getItem("tipo_perfil") === TIPO_PERFIL.ESCOLA;
};

export const usuarioDiretoriaRegional = () => {
  return localStorage.getItem("tipo_perfil") === TIPO_PERFIL.DIRETORIA_REGIONAL;
};

export const usuarioCODAEGestaoAlimentacao = () => {
  return (
    localStorage.getItem("tipo_perfil") ===
    TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA
  );
};

export const usuarioCODAEDietaEspecial = () => {
  return localStorage.getItem("tipo_perfil") === TIPO_PERFIL.DIETA_ESPECIAL;
};

export const usuarioTerceirizada = () => {
  return localStorage.getItem("tipo_perfil") === TIPO_PERFIL.TERCEIRIZADA;
};

export const converterDDMMYYYYparaYYYYMMDD = data => {
  return moment(data, "DD/MM/YYYY").format("YYYY-MM-DD");
};

export const obtemIdentificacaoNutricionista = () =>
  `Elaborado por ${localStorage.getItem("nome")} - CRN ${localStorage.getItem(
    "crn_numero"
  )}`.replace(/[^\w\s-]/g, "");

export const getKey = obj => {
  return Object.keys(obj)[0];
};

export const getError = obj => {
  let result = "Erro";
  if (!obj[getKey(obj)]) {
    return "Erro";
  } else if (
    (obj[getKey(obj)][0] !== undefined &&
      typeof obj[getKey(obj)][0] !== "string") ||
    typeof obj[getKey(obj)] !== "string"
  ) {
    result = getError(obj[getKey(obj)]);
  } else {
    if (typeof obj[getKey(obj)] === "string") return obj[getKey(obj)];
    else return obj[getKey(obj)][0];
  }
  return result;
};
