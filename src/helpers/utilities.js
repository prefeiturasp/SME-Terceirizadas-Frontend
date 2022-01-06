import moment from "moment";
import { createTextMask } from "redux-form-input-masks";
import "moment/locale/pt-br";
import { statusEnum, TIPO_SOLICITACAO } from "constants/shared";
import { PERFIL, TIPO_PERFIL, TIPO_GESTAO } from "../constants/shared";
import { RELATORIO } from "../configs/constants";
import { ENVIRONMENT } from "constants/config";

// TODO: Quebrar esse arquivo, tem muitos helpers de diferentes tipo num único arquivo
//       Dá pra separar por tipo de helper:
//         - manupular data
//         - lidar com tipo de usuário ou perfil
//       Os que não tiverem categoria definida podem ficar aqui

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
    case statusEnum.ESCOLA_CANCELOU:
    case statusEnum.DRE_CANCELOU:
      return [TIPO_PERFIL.TERCEIRIZADA].includes(tipoPerfil);
    default:
      return false;
  }
};

export const visualizaBotoesDoFluxoSolicitacaoUnificada = solicitacao => {
  const tipoPerfil = localStorage.getItem("tipo_perfil");
  switch (solicitacao.status) {
    case statusEnum.CODAE_A_AUTORIZAR:
    case statusEnum.TERCEIRIZADA_RESPONDEU_QUESTIONAMENTO:
      return [
        TIPO_PERFIL.DIRETORIA_REGIONAL,
        TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA,
        TIPO_PERFIL.DIETA_ESPECIAL
      ].includes(tipoPerfil);
    case statusEnum.CODAE_AUTORIZADO:
    case statusEnum.CODAE_QUESTIONADO:
      return [TIPO_PERFIL.TERCEIRIZADA].includes(tipoPerfil);
    case statusEnum.ESCOLA_CANCELOU:
    case statusEnum.DRE_CANCELOU:
      return [TIPO_PERFIL.TERCEIRIZADA].includes(tipoPerfil);
    case statusEnum.TERCEIRIZADA_TOMOU_CIENCIA:
      return [TIPO_PERFIL.DIRETORIA_REGIONAL].includes(tipoPerfil);
    default:
      return false;
  }
};

export const vizualizaBotoesDietaEspecial = solicitacao => {
  switch (solicitacao.status_solicitacao) {
    case statusEnum.CODAE_A_AUTORIZAR:
      return usuarioEhEscola() || usuarioEhCODAEDietaEspecial();
    case statusEnum.ESCOLA_SOLICITOU_INATIVACAO:
      return usuarioEhCODAEDietaEspecial();
    case statusEnum.CODAE_AUTORIZADO:
    case statusEnum.CODAE_AUTORIZOU_INATIVACAO:
      return usuarioEhTerceirizada();
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

export const usuarioEhCoordenadorEscola = () => {
  return localStorage.getItem("perfil") === PERFIL.COORDENADOR_ESCOLA;
};

export const usuarioEhCoordenadorGpCODAE = () => {
  return localStorage.getItem("perfil") === PERFIL.COORDENADOR_GESTAO_PRODUTO;
};

export const usuarioEhAdministradorGpCODAE = () => {
  return localStorage.getItem("perfil") === PERFIL.ADMINISTRADOR_GESTAO_PRODUTO;
};

export const usuarioEhCoordenadorNutriCODAE = () => {
  return localStorage.getItem("perfil") === PERFIL.COORDENADOR_DIETA_ESPECIAL;
};

export const usuarioEhAdministradorNutriCODAE = () => {
  return localStorage.getItem("perfil") === PERFIL.ADMINISTRADOR_DIETA_ESPECIAL;
};

export const usuarioEhCoordenadorNutriSupervisao = () => {
  return (
    localStorage.getItem("perfil") === PERFIL.COORDENADOR_SUPERVISAO_NUTRICAO
  );
};

export const usuarioEhAdministradorNutriSupervisao = () => {
  return (
    localStorage.getItem("perfil") === PERFIL.ADMINISTRADOR_SUPERVISAO_NUTRICAO
  );
};

export const usuarioEhEscola = () => {
  return [
    PERFIL.ADMINISTRADOR_ESCOLA,
    PERFIL.DIRETOR,
    PERFIL.DIRETOR_CEI
  ].includes(localStorage.getItem("perfil"));
};

export const usuarioEscolaEhGestaoMistaParceira = () => {
  return [TIPO_GESTAO.MISTA, TIPO_GESTAO.PARCEIRA].includes(
    localStorage.getItem("tipo_gestao")
  );
};

export const usuarioEhEscolaAbastecimento = () => {
  return [
    PERFIL.ADMINISTRADOR_ESCOLA_ABASTECIMENTO,
    PERFIL.ADMINISTRADOR_UE_DIRETA,
    PERFIL.ADMINISTRADOR_UE_MISTA,
    PERFIL.ADMINISTRADOR_UE_PARCEIRA
  ].includes(localStorage.getItem("perfil"));
};

export const usuarioComAcessoTelaEntregasDilog = () => {
  return [
    PERFIL.COORDENADOR_LOGISTICA,
    PERFIL.COORDENADOR_CODAE_DILOG_LOGISTICA,
    PERFIL.ADMINISTRADOR_CODAE_GABINETE,
    PERFIL.ADMINISTRADOR_CODAE_DILOG_CONTABIL,
    PERFIL.ADMINISTRADOR_CODAE_DILOG_JURIDICO
  ].includes(localStorage.getItem("perfil"));
};

export const usuarioEhLogistica = () => {
  return [
    PERFIL.COORDENADOR_LOGISTICA,
    PERFIL.COORDENADOR_CODAE_DILOG_LOGISTICA
  ].includes(localStorage.getItem("perfil"));
};

export const usuarioEhDistribuidora = () => {
  return [PERFIL.ADMINISTRADOR_DISTRIBUIDORA].includes(
    localStorage.getItem("perfil")
  );
};

export const escolaEhCei = () => {
  return /^"?cei|\scei\s|\scei$/i.test(
    localStorage.getItem("nome_instituicao")
  );
};

export const nomeInstituicao = () => {
  return localStorage.getItem("nome_instituicao");
};

export const usuarioEhDRE = () => {
  return localStorage.getItem("tipo_perfil") === TIPO_PERFIL.DIRETORIA_REGIONAL;
};

export const usuarioEhCoordenadorDRE = () => {
  return localStorage.getItem("perfil") === PERFIL.COORDENADOR_DRE;
};

export const usuarioEhAdministradorDRE = () => {
  return localStorage.getItem("perfil") === PERFIL.ADMINISTRADOR_DRE;
};

export const usuarioEhCODAEGestaoAlimentacao = () => {
  /*
   * TODO: aqui foi adicionado o recurso de verificação de usuario DILOG em 12/11/2020.
   * Para se adaptar ao perfil da CODAE. (Segundo o Fabricio)
   * Inicialmente a regra é que o perfil DILOG tenha os mesmo acessos de CODAE.
   * Quando esta regra mudar, favor, modularizar essa função para validar apenas perfil de CODAE.
   */
  const tipoPerfil = localStorage.getItem("tipo_perfil");
  return tipoPerfil === TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA;
};

export const usuarioEhCoordenadorCODAE = () => {
  return (
    localStorage.getItem("perfil") ===
    PERFIL.COORDENADOR_GESTAO_ALIMENTACAO_TERCEIRIZADA
  );
};

export const usuarioEhAdministradorCODAE = () => {
  return (
    localStorage.getItem("perfil") ===
    PERFIL.ADMINISTRADOR_GESTAO_ALIMENTACAO_TERCEIRIZADA
  );
};

export const usuarioEhCODAEDietaEspecial = () => {
  return localStorage.getItem("tipo_perfil") === TIPO_PERFIL.DIETA_ESPECIAL;
};

export const usuarioEhNutricionistaSupervisao = () => {
  return (
    localStorage.getItem("tipo_perfil") === TIPO_PERFIL.SUPERVISAO_NUTRICAO
  );
};

export const usuarioEhCODAEGestaoProduto = () => {
  return localStorage.getItem("tipo_perfil") === TIPO_PERFIL.GESTAO_PRODUTO;
};

export const usuarioEhQualquerCODAE = () => {
  return (
    usuarioEhCODAEGestaoAlimentacao() ||
    usuarioEhCODAEDietaEspecial() ||
    usuarioEhCODAEGestaoProduto()
  );
};

export const usuarioEhTerceirizada = () => {
  return (
    localStorage.getItem("tipo_perfil") === TIPO_PERFIL.TERCEIRIZADA &&
    localStorage.getItem("perfil") !== PERFIL.ADMINISTRADOR_DISTRIBUIDORA
  );
};

export const converterDDMMYYYYparaYYYYMMDD = data => {
  return moment(data, "DD/MM/YYYY").format("YYYY-MM-DD");
};

export const obtemIdentificacaoNutricionista = () =>
  `Elaborado por ${localStorage.getItem("nome")} - CRN ${localStorage.getItem(
    "crn_numero"
  )}`.replace(/[^\w\s-]/g, "");

export const obtemIdentificacaoNutricionistaDieta = usuario =>
  `Elaborado por ${usuario.nome} - CRN ${usuario.crn_numero}`.replace(
    /[^\w\s-]/g,
    ""
  );

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

export const formatarLotesParaVisao = lotes => {
  lotes.forEach(lote => {
    lote["titulo"] = lote["nome"];
    lote["link"] = lote["uuid"];
  });
  return lotes;
};

export const ehInclusaoContinua = tipoSolicitacao => {
  return tipoSolicitacao === TIPO_SOLICITACAO.SOLICITACAO_CONTINUA;
};
export const ehInclusaoAvulsa = tipoSolicitacao => {
  return tipoSolicitacao !== TIPO_SOLICITACAO.SOLICITACAO_CONTINUA;
};

export const ehInclusaoCei = tipoSolicitacao => {
  return tipoSolicitacao === TIPO_SOLICITACAO.SOLICITACAO_CEI;
};

export const ehEscolaTipoCEI = escola => {
  const nome = (escola && escola.nome) || "";
  return nome.startsWith("CEI") || nome.startsWith("CCI");
};

export const tipoSolicitacaoComoQuery = obj => {
  return `tipoSolicitacao=${comoTipo(obj)}`;
};

export const comoTipo = obj => {
  if (ehEscolaTipoCEI(obj.escola)) {
    return TIPO_SOLICITACAO.SOLICITACAO_CEI;
  }
  return obj.data_inicial && obj.data_inicial !== obj.data_final
    ? TIPO_SOLICITACAO.SOLICITACAO_CONTINUA
    : TIPO_SOLICITACAO.SOLICITACAO_NORMAL;
};

export const parseRelatorioURLParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return [urlParams.get("uuid"), urlParams.get("tipoSolicitacao")];
};

export const gerarLinkRelatorio = (path, solicitacao) => {
  return `/${path}/${RELATORIO}?uuid=${
    solicitacao.uuid
  }&${tipoSolicitacaoComoQuery(solicitacao)}`;
};

export const safeConcatOn = (propName, a, b, c) => {
  if (!a || !a[propName] || !Array.isArray(a[propName])) {
    // eslint-disable-next-line no-console
    console.error("Invalid array concatenation on value: ", a);
    return [];
  }
  if (!b || !b[propName] || !Array.isArray(b[propName])) {
    // eslint-disable-next-line no-console
    console.error("Invalid array concatenation on value: ", b);
    return a[propName];
  }
  if (!c || !c[propName] || !Array.isArray(c[propName])) {
    return a[propName].concat(b[propName]);
  }
  return a[propName].concat(b[propName], c[propName]);
};

export const comparaObjetosMoment = (a, b) => {
  if (a.isBefore(b)) {
    return -1;
  }
  if (b.isBefore(a)) {
    return 1;
  }
  return 0;
};

export const parseDataHoraBrToMoment = dataHoraString => {
  const formats = ["DD/MM/YYYY", "DD/MM/YYYY HH:mm"];
  return moment(dataHoraString, formats);
};

export const gerarParametrosConsulta = data => {
  const params = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      for (const item of value) params.append(key, item);
    } else {
      params.append(key, value);
    }
  });
  return params;
};

export const cpfMask = createTextMask({
  pattern: "999.999.999-99",
  allowEmpty: false,
  guide: false
});

export const cepMask = createTextMask({
  pattern: "99999-999",
  allowEmpty: false,
  guide: true
});

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

export const transformaNullsEmUndefined = objeto => {
  for (let chave of Object.keys(objeto)) {
    if (objeto[chave] === null) objeto[chave] = undefined;
  }
};

export const corrigeLinkAnexo = url => {
  if (
    window.location.href.startsWith("https://") &&
    url.startsWith("http://")
  ) {
    return url.replace(/^http:\/\//, "https://");
  }
  return url;
};

export const trocaAcentuadasPorSemAcento = texto =>
  texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const retornaDuplicadasArray = arr =>
  arr.filter((item, index) => arr.indexOf(item) !== index);

export const exibirGA = () => {
  switch (ENVIRONMENT) {
    case "treinamento":
      return false;
    case "production":
      return false;
    default:
      return true;
  }
};

export const justificativaAoNegarSolicitacao = logs => {
  let justificativa = null;
  if (logs.length) {
    justificativa = logs.filter(log =>
      ["DRE não validou", "CODAE negou"].includes(log.status_evento_explicacao)
    );
    justificativa = justificativa.length
      ? justificativa[0].justificativa
      : null;
  }
  return justificativa;
};
