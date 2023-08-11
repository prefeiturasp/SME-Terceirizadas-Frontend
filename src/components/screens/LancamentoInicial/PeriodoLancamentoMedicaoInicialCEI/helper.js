import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import HTTP_STATUS from "http-status-codes";
import { toastError } from "components/Shareable/Toast/dialogs";
import {
  getSolicitacoesAlteracoesAlimentacaoAutorizadasEscola,
  getSolicitacoesInclusoesAutorizadasEscola,
  getSolicitacoesInclusoesEtecAutorizadasEscola,
  getSolicitacoesKitLanchesAutorizadasEscola,
  getSolicitacoesSuspensoesAutorizadasEscola
} from "services/medicaoInicial/periodoLancamentoMedicao.service";

export const formatarPayloadPeriodoLancamento = (
  values,
  tabelaAlimentacaoCEIRows,
  dadosIniciaisFiltered,
  diasDaSemanaSelecionada
) => {
  if (
    values["periodo_escolar"].includes("Solicitações") ||
    values["periodo_escolar"] === "ETEC" ||
    values["periodo_escolar"] === "Programas e Projetos"
  ) {
    values["grupo"] = values["periodo_escolar"];
    delete values["periodo_escolar"];
  }
  const valuesAsArray = Object.entries(values);
  const arrayCategoriesValues = valuesAsArray.filter(([key]) =>
    key.includes("categoria")
  );
  let valoresMedicao = [];

  dadosIniciaisFiltered.forEach(([keyDado]) => {
    if (
      arrayCategoriesValues.filter(([key]) => key.includes(keyDado)).length ===
      0
    ) {
      arrayCategoriesValues.push([keyDado, -1]);
    }
  });

  arrayCategoriesValues
    .filter(([key]) => !key.includes("observacoes"))
    .map(arr => {
      const keySplitted = arr[0].split("__");
      const categoria = keySplitted.pop();
      const idCategoria = categoria.match(/\d/g).join("");
      const dia = keySplitted[2].match(/\d/g).join("");
      const nome_campo = keySplitted[0];
      const uuid_faixa_etaria = keySplitted[1].replace("faixa_", "");

      return valoresMedicao.push({
        dia: dia,
        valor: ["<p></p>\n", ""].includes(arr[1]) ? 0 : arr[1],
        nome_campo: nome_campo,
        categoria_medicao: idCategoria,
        faixa_etaria: uuid_faixa_etaria
      });
    });

  valoresMedicao = valoresMedicao.filter(valorMed => {
    return (
      !(valorMed.nome_campo === "observacoes" && valorMed.valor === 0) &&
      diasDaSemanaSelecionada.includes(valorMed.dia)
    );
  });

  Object.entries(values).forEach(([key]) => {
    return key.includes("categoria") && delete values[key];
  });

  return { ...values, valores_medicao: valoresMedicao };
};

export const formatarPayloadParaCorrecao = (
  valoresPeriodosLancamentos,
  payload
) => {
  let payloadParaCorrecao = [];
  valoresPeriodosLancamentos
    .filter(
      valor =>
        valor.habilitado_correcao &&
        !["matriculados", "dietas_autorizadas", "numero_de_alunos"].includes(
          valor.nome_campo
        )
    )
    .forEach(valor_lancamento => {
      payloadParaCorrecao.push(
        payload.valores_medicao.filter(
          valor_medicao =>
            String(valor_lancamento.categoria_medicao) ===
              valor_medicao.categoria_medicao &&
            valor_lancamento.dia === valor_medicao.dia &&
            valor_lancamento.nome_campo === valor_medicao.nome_campo
        )[0]
      );
    });

  return payloadParaCorrecao;
};

export const deveExistirObservacao = (
  categoria,
  values,
  calendarioMesConsiderado
) => {
  let diasNaoLetivos = [];
  const objDiasNaoLetivos = calendarioMesConsiderado.filter(
    obj => !obj.dia_letivo
  );
  objDiasNaoLetivos.map(obj => diasNaoLetivos.push(obj.dia));

  const valuesAsArray = Object.entries(values);
  const arrayCategoriesValuesDiasNaoletivos = valuesAsArray.filter(
    ([key, value]) =>
      key.includes("categoria") &&
      !key.includes("matriculados") &&
      !key.includes("dietas_autorizadas") &&
      !key.includes("frequencia") &&
      !key.includes("observacoes") &&
      !["Mês anterior", "Mês posterior", null].includes(value) &&
      diasNaoLetivos.some(dia => key.includes(dia))
  );
  let dias = [];
  arrayCategoriesValuesDiasNaoletivos.forEach(arr => {
    const keySplitted = arr[0].split("__");
    const dia = keySplitted[1].match(/\d/g).join("");
    dias.push(dia);
  });

  return !dias.every(
    dia =>
      values[`observacoes__dia_${dia}__categoria_${categoria}`] !== undefined
  );
};

export const desabilitarField = (
  dia,
  rowName,
  categoria,
  nomeCategoria,
  values,
  mesAnoConsiderado,
  mesAnoDefault,
  dadosValoresInclusoesAutorizadasState,
  validacaoDiaLetivo,
  validacaoSemana,
  location,
  grupoLocation,
  valoresPeriodosLancamentos,
  feriadosNoMes,
  uuidFaixaEtaria
) => {
  const valorField = valoresPeriodosLancamentos
    .filter(valor => valor.nome_campo === rowName)
    .filter(valor => String(valor.dia) === String(dia))
    .filter(valor => String(valor.categoria_medicao) === String(categoria))
    .filter(valor => valor.habilitado_correcao === true)[0];
  if (
    location.state &&
    (location.state.status_periodo === "MEDICAO_APROVADA_PELA_DRE" ||
      location.state.status_periodo === "MEDICAO_APROVADA_PELA_CODAE" ||
      location.state.status_periodo === "MEDICAO_ENVIADA_PELA_UE" ||
      ([
        "MEDICAO_CORRECAO_SOLICITADA",
        "MEDICAO_CORRECAO_SOLICITADA_CODAE",
        "MEDICAO_CORRIGIDA_PELA_UE",
        "MEDICAO_CORRIGIDA_PARA_CODAE"
      ].includes(location.state.status_periodo) &&
        !valorField))
  ) {
    return true;
  }

  const mesConsiderado = format(mesAnoConsiderado, "LLLL", {
    locale: ptBR
  }).toString();
  const mesAtual = format(mesAnoDefault, "LLLL", {
    locale: ptBR
  }).toString();

  if (
    ["Mês anterior", "Mês posterior"].includes(
      values[
        `${rowName}__faixa_${uuidFaixaEtaria}__dia_${dia}__categoria_${categoria}`
      ]
    ) ||
    (mesConsiderado === mesAtual &&
      Number(dia) >= format(mesAnoDefault, "dd")) ||
    !validacaoDiaLetivo(dia)
  ) {
    return true;
  }

  if (nomeCategoria === "ALIMENTAÇÃO") {
    if (
      rowName === "matriculados" ||
      !values[
        `matriculados__faixa_${uuidFaixaEtaria}__dia_${dia}__categoria_${categoria}`
      ]
    ) {
      return true;
    }
    if (rowName === "frequencia") {
      return false;
    }
  }
};

export const getSolicitacoesInclusaoAutorizadasAsync = async (
  escolaUuuid,
  mes,
  ano,
  periodos_escolares,
  location
) => {
  const params = {};
  params["escola_uuid"] = escolaUuuid;
  params["tipo_solicitacao"] = "Inclusão de";
  params["mes"] = mes;
  params["ano"] = ano;
  params["periodos_escolares"] = periodos_escolares;
  if (
    location.state.grupo &&
    location.state.grupo.includes("Programas e Projetos")
  ) {
    params["tipo_doc"] = "INC_ALIMENTA_CONTINUA";
  } else {
    params["excluir_inclusoes_continuas"] = true;
  }
  const responseInclusoesAutorizadas = await getSolicitacoesInclusoesAutorizadasEscola(
    params
  );
  if (responseInclusoesAutorizadas.status === HTTP_STATUS.OK) {
    return responseInclusoesAutorizadas.data.results;
  } else {
    toastError("Erro ao carregar Inclusões Autorizadas");
    return [];
  }
};

export const getSolicitacoesInclusoesEtecAutorizadasAsync = async (
  escolaUuuid,
  mes,
  ano
) => {
  const params = {};
  params["escola_uuid"] = escolaUuuid;
  params["tipo_solicitacao"] = "Inclusão de";
  params["mes"] = mes;
  params["ano"] = ano;
  const responseInclusoesAutorizadas = await getSolicitacoesInclusoesEtecAutorizadasEscola(
    params
  );
  if (responseInclusoesAutorizadas.status === HTTP_STATUS.OK) {
    return responseInclusoesAutorizadas.data.results;
  } else {
    toastError("Erro ao carregar Inclusões ETEC Autorizadas");
    return [];
  }
};

export const getSolicitacoesSuspensoesAutorizadasAsync = async (
  escolaUuuid,
  mes,
  ano,
  nome_periodo_escolar
) => {
  const params = {};
  params["escola_uuid"] = escolaUuuid;
  params["tipo_solicitacao"] = "Suspensão";
  params["mes"] = mes;
  params["ano"] = ano;
  params["nome_periodo_escolar"] = nome_periodo_escolar;
  const responseSuspensoesAutorizadas = await getSolicitacoesSuspensoesAutorizadasEscola(
    params
  );
  if (responseSuspensoesAutorizadas.status === HTTP_STATUS.OK) {
    return responseSuspensoesAutorizadas.data.results;
  } else {
    toastError("Erro ao carregar Suspensões Autorizadas");
    return [];
  }
};

export const getSolicitacoesAlteracoesAlimentacaoAutorizadasAsync = async (
  escolaUuuid,
  mes,
  ano,
  nomePeriodoEscolar,
  ehLancheEmergencial = false
) => {
  const params = {};
  params["escola_uuid"] = escolaUuuid;
  params["tipo_solicitacao"] = "Alteração";
  params["mes"] = mes;
  params["ano"] = ano;
  params["eh_lanche_emergencial"] = ehLancheEmergencial;
  if (!ehLancheEmergencial) {
    params["nome_periodo_escolar"] = nomePeriodoEscolar;
  }
  const responseAlteracoesAlimentacaoAutorizadas = await getSolicitacoesAlteracoesAlimentacaoAutorizadasEscola(
    params
  );
  if (responseAlteracoesAlimentacaoAutorizadas.status === HTTP_STATUS.OK) {
    return responseAlteracoesAlimentacaoAutorizadas.data.results;
  } else {
    toastError("Erro ao carregar Alterações de Alimentação Autorizadas");
    return [];
  }
};

export const getSolicitacoesKitLanchesAutorizadasAsync = async (
  escolaUuuid,
  mes,
  ano
) => {
  const params = {};
  params["escola_uuid"] = escolaUuuid;
  params["tipo_solicitacao"] = "Kit Lanche";
  params["mes"] = mes;
  params["ano"] = ano;
  const responseKitLanchesAutorizadas = await getSolicitacoesKitLanchesAutorizadasEscola(
    params
  );
  if (responseKitLanchesAutorizadas.status === HTTP_STATUS.OK) {
    return responseKitLanchesAutorizadas.data.results;
  } else {
    toastError("Erro ao carregar Kit Lanches Autorizadas");
    return [];
  }
};

export const formatarLinhasTabelaAlimentacao = (
  tipos_alimentacao,
  periodoGrupo
) => {
  const tiposAlimentacaoFormatadas = tipos_alimentacao
    .filter(alimentacao => alimentacao.nome !== "Lanche Emergencial")
    .map(alimentacao => {
      return {
        ...alimentacao,
        name: alimentacao.nome
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .replaceAll(/ /g, "_")
      };
    });
  const indexRefeicao = tiposAlimentacaoFormatadas.findIndex(
    ali => ali.nome === "Refeição"
  );
  if (indexRefeicao !== -1) {
    tiposAlimentacaoFormatadas[indexRefeicao].nome = "Refeição 1ª Oferta";
    tiposAlimentacaoFormatadas.splice(indexRefeicao + 1, 0, {
      nome: "Repetição Refeição",
      name: "repeticao_refeicao",
      uuid: null
    });
  }

  const indexSobremesa = tiposAlimentacaoFormatadas.findIndex(
    ali => ali.nome === "Sobremesa"
  );
  if (indexSobremesa !== -1) {
    tiposAlimentacaoFormatadas[indexSobremesa].nome = "Sobremesa 1º Oferta";
    tiposAlimentacaoFormatadas.splice(indexSobremesa + 1, 0, {
      nome: "Repetição Sobremesa",
      name: "repeticao_sobremesa",
      uuid: null
    });
  }

  const matriculadosOuNumeroDeAlunos = () => {
    return periodoGrupo.grupo === "Programas e Projetos"
      ? {
          nome: "Número de Alunos",
          name: "numero_de_alunos",
          uuid: null
        }
      : {
          nome: "Matriculados",
          name: "matriculados",
          uuid: null
        };
  };

  tiposAlimentacaoFormatadas.unshift(matriculadosOuNumeroDeAlunos(), {
    nome: "Frequência",
    name: "frequencia",
    uuid: null
  });

  tiposAlimentacaoFormatadas.push({
    nome: "Observações",
    name: "observacoes",
    uuid: null
  });

  return tiposAlimentacaoFormatadas;
};

export const formatarLinhasTabelasDietas = tipos_alimentacao => {
  const linhasTabelasDietas = [];
  linhasTabelasDietas.push(
    {
      nome: "Dietas Autorizadas",
      name: "dietas_autorizadas",
      uuid: null
    },
    {
      nome: "Frequência",
      name: "frequencia",
      uuid: null
    }
  );

  const indexLanche4h = tipos_alimentacao.findIndex(ali =>
    ali.nome.includes("4h")
  );
  if (indexLanche4h !== -1) {
    linhasTabelasDietas.push({
      nome: tipos_alimentacao[indexLanche4h].nome,
      name: tipos_alimentacao[indexLanche4h].nome
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replaceAll(/ /g, "_"),
      uuid: tipos_alimentacao[indexLanche4h].uuid
    });
  }

  const indexLanche = tipos_alimentacao.findIndex(ali => ali.nome === "Lanche");
  if (indexLanche !== -1) {
    linhasTabelasDietas.push({
      nome: "Lanche",
      name: "Lanche"
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replaceAll(/ /g, "_"),
      uuid: tipos_alimentacao[indexLanche].uuid
    });
  }

  linhasTabelasDietas.push({
    nome: "Observações",
    name: "observacoes",
    uuid: null
  });

  return linhasTabelasDietas;
};

export const formatarLinhasTabelaDietaEnteral = (
  tipos_alimentacao,
  linhasTabelasDietas
) => {
  const indexRefeicaoDieta = tipos_alimentacao.findIndex(
    ali => ali.nome === "Refeição"
  );
  linhasTabelasDietas.splice(linhasTabelasDietas.length - 1, 0, {
    nome: "Refeição",
    name: "refeicao",
    uuid: tipos_alimentacao[indexRefeicaoDieta].uuid
  });

  return linhasTabelasDietas;
};

export const validacaoSemana = (dia, semanaSelecionada) => {
  return (
    (Number(semanaSelecionada) === 1 && Number(dia) > 20) ||
    ([4, 5, 6].includes(Number(semanaSelecionada)) && Number(dia) < 10)
  );
};

export const defaultValue = (
  column,
  row,
  semanaSelecionada,
  valoresLancamentos,
  categoria
) => {
  let result = null;

  const valorLancamento = valoresLancamentos.find(
    valor =>
      Number(valor.categoria_medicao) === Number(categoria.id) &&
      Number(valor.dia) === Number(column.dia) &&
      valor.nome_campo === row.name
  );

  if (valorLancamento) {
    result = valorLancamento.valor;
  }
  if (Number(semanaSelecionada) === 1 && Number(column.dia) > 20) {
    result = "Mês anterior";
  }
  if (
    [4, 5, 6].includes(Number(semanaSelecionada)) &&
    Number(column.dia) < 10
  ) {
    result = "Mês posterior";
  }

  return result;
};

export const ehDiaParaCorrigir = (
  dia,
  categoria,
  valoresPeriodosLancamentos
) => {
  const existeAlgumCampoParaCorrigir = valoresPeriodosLancamentos
    .filter(
      valor =>
        !["matriculados", "dietas_autorizadas", "numero_de_alunos"].includes(
          valor.nome_campo
        )
    )
    .filter(valor => String(valor.dia) === String(dia))
    .filter(valor => String(valor.categoria_medicao) === String(categoria))
    .filter(valor => valor.habilitado_correcao === true)[0];

  return existeAlgumCampoParaCorrigir;
};

export const textoBotaoObservacao = (
  value,
  valoresObservacoes,
  dia,
  categoria
) => {
  let text = "Adicionar";
  if (value && !["<p></p>", "<p></p>\n", null, "", undefined].includes(value)) {
    text = "Visualizar";
  } else if (
    valoresObservacoes &&
    valoresObservacoes.find(
      valor =>
        String(valor.dia) === String(dia) &&
        String(valor.categoria_medicao) === String(categoria)
    )
  ) {
    text = "Visualizar";
  }
  return text;
};

export const desabilitarBotaoColunaObservacoes = (
  location,
  valoresPeriodosLancamentos,
  column,
  categoria,
  formValuesAtualizados,
  row,
  valoresObservacoes,
  dia
) => {
  const botaoEhAdicionar =
    textoBotaoObservacao(
      formValuesAtualizados[
        `${row.name}__dia_${column.dia}__categoria_${categoria.id}`
      ],
      valoresObservacoes,
      dia,
      categoria.id
    ) === "Adicionar";

  return (
    location.state &&
    (((location.state.status_periodo === "MEDICAO_APROVADA_PELA_DRE" ||
      location.state.status_periodo === "MEDICAO_APROVADA_PELA_CODAE" ||
      location.state.status_periodo === "MEDICAO_ENVIADA_PELA_UE" ||
      ([
        "MEDICAO_CORRECAO_SOLICITADA",
        "MEDICAO_CORRECAO_SOLICITADA_CODAE",
        "MEDICAO_CORRIGIDA_PELA_UE",
        "MEDICAO_CORRIGIDA_PARA_CODAE"
      ].includes(location.state.status_periodo) &&
        !valoresPeriodosLancamentos
          .filter(valor => valor.nome_campo === "observacoes")
          .filter(valor => String(valor.dia) === String(column.dia))
          .filter(
            valor => String(valor.categoria_medicao) === String(categoria.id)
          )[0])) &&
      botaoEhAdicionar &&
      !ehDiaParaCorrigir(
        column.dia,
        categoria.id,
        valoresPeriodosLancamentos
      )) ||
      (["MEDICAO_APROVADA_PELA_DRE", "MEDICAO_APROVADA_PELA_CODAE"].includes(
        location.state.status_periodo
      ) &&
        botaoEhAdicionar) ||
      ([
        "MEDICAO_CORRECAO_SOLICITADA",
        "MEDICAO_CORRECAO_SOLICITADA_CODAE",
        "MEDICAO_CORRIGIDA_PELA_UE",
        "MEDICAO_CORRIGIDA_PARA_CODAE"
      ].includes(location.state.status_periodo) &&
        !ehDiaParaCorrigir(
          column.dia,
          categoria.id,
          valoresPeriodosLancamentos
        )))
  );
};
