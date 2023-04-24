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
import { tiposAlimentacaoETEC } from "helpers/utilities";

export const formatarPayloadPeriodoLancamento = (
  values,
  tabelaAlimentacaoRows,
  tabelaDietaEnteralRows,
  dadosIniciaisFiltered,
  diasDaSemanaSelecionada,
  ehGrupoSolicitacoesDeAlimentacaoUrlParam,
  ehGrupoETECUrlParam,
  grupoLocation
) => {
  if (values["periodo_escolar"].includes(" - ")) {
    values["grupo"] = values["periodo_escolar"].split(" - ")[0];
    values["periodo_escolar"] = values["periodo_escolar"].split(" - ")[1];
  }
  if (
    values["periodo_escolar"].includes("Solicitações") ||
    values["periodo_escolar"] === "ETEC"
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

  arrayCategoriesValues.map(arr => {
    const keySplitted = arr[0].split("__");
    const categoria = keySplitted.pop();
    const idCategoria = categoria.match(/\d/g).join("");
    const dia = keySplitted[1].match(/\d/g).join("");
    const nome_campo = keySplitted[0];
    let tipoAlimentacao = tabelaAlimentacaoRows.find(
      alimentacao => alimentacao.name === nome_campo
    );

    if (!tipoAlimentacao) {
      tipoAlimentacao = tabelaDietaEnteralRows.find(
        row => row.name === nome_campo
      );
    }

    return valoresMedicao.push({
      dia: dia,
      valor: ["<p></p>\n", ""].includes(arr[1]) ? 0 : arr[1],
      nome_campo: nome_campo,
      categoria_medicao: idCategoria,
      tipo_alimentacao:
        !ehGrupoSolicitacoesDeAlimentacaoUrlParam &&
        !ehGrupoETECUrlParam &&
        grupoLocation !== "Programas e Projetos"
          ? tipoAlimentacao.uuid
          : ""
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

export const valorZeroFrequencia = (
  value,
  rowName,
  categoria,
  dia,
  form,
  tabelaAlimentacaoRows,
  tabelaDietaRows,
  tabelaDietaEnteralRows,
  dadosValoresInclusoesAutorizadasState,
  validacaoDiaLetivo
) => {
  if (rowName === "frequencia" && value && Number(value) === 0) {
    let linhasDaTabela = null;
    if (categoria.nome.includes("ENTERAL")) {
      linhasDaTabela = tabelaDietaEnteralRows;
    } else if (categoria.nome.includes("DIETA")) {
      linhasDaTabela = tabelaDietaRows;
    } else {
      linhasDaTabela = tabelaAlimentacaoRows;
      if (
        Object.keys(dadosValoresInclusoesAutorizadasState).some(key =>
          String(key).includes(`__dia_${dia}__categoria_${categoria.id}`)
        ) &&
        !validacaoDiaLetivo(dia)
      ) {
        linhasDaTabela = linhasDaTabela.filter(linha =>
          Object.keys(
            Object.fromEntries(
              Object.entries(dadosValoresInclusoesAutorizadasState).filter(
                ([key]) => key.includes(dia)
              )
            )
          ).some(key => key.includes(linha.name))
        );
      }
    }

    linhasDaTabela.forEach(linha => {
      ![
        "matriculados",
        "frequencia",
        "observacoes",
        "dietas_autorizadas"
      ].includes(linha.name) &&
        form.change(
          `${linha.name}__dia_${dia}__categoria_${categoria.id}`,
          "0"
        );
    });
    return true;
  }
  return;
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
  ehGrupoETECUrlParam = false,
  dadosValoresInclusoesEtecAutorizadasState = null,
  inclusoesEtecAutorizadas = null,
  grupoLocation = null
) => {
  const mesConsiderado = format(mesAnoConsiderado, "LLLL", {
    locale: ptBR
  }).toString();
  const mesAtual = format(mesAnoDefault, "LLLL", {
    locale: ptBR
  }).toString();

  if (nomeCategoria.includes("SOLICITAÇÕES")) {
    return (
      !validacaoDiaLetivo(dia) ||
      validacaoSemana(dia) ||
      (mesConsiderado === mesAtual &&
        Number(dia) >= format(mesAnoDefault, "dd"))
    );
  }
  if (ehGrupoETECUrlParam && nomeCategoria === "ALIMENTAÇÃO") {
    const inclusao = inclusoesEtecAutorizadas.filter(
      inclusao => Number(inclusao.dia) === Number(dia)
    );
    if (
      rowName === "frequencia" &&
      validacaoDiaLetivo(dia) &&
      !validacaoSemana(dia) &&
      !["Mês anterior", "Mês posterior"].includes(
        values[`frequencia__dia_${dia}__categoria_${categoria}`]
      ) &&
      Object.keys(dadosValoresInclusoesEtecAutorizadasState).some(key =>
        String(key).includes(`__dia_${dia}__categoria_${categoria}`)
      )
    ) {
      return false;
    } else if (
      rowName === "repeticao_refeicao" &&
      validacaoDiaLetivo(dia) &&
      !validacaoSemana(dia) &&
      (inclusao.length && inclusao[0].alimentacoes.includes("refeicao"))
    ) {
      return false;
    } else if (
      rowName === "repeticao_sobremesa" &&
      validacaoDiaLetivo(dia) &&
      !validacaoSemana(dia) &&
      (inclusao.length && inclusao[0].alimentacoes.includes("sobremesa"))
    ) {
      return false;
    } else {
      return (
        !validacaoDiaLetivo(dia) ||
        validacaoSemana(dia) ||
        rowName === "numero_de_alunos" ||
        !Object.keys(dadosValoresInclusoesEtecAutorizadasState).some(key =>
          String(key).includes(`__dia_${dia}__categoria_${categoria}`)
        ) ||
        (inclusao.length && !inclusao[0].alimentacoes.includes(rowName)) ||
        (mesConsiderado === mesAtual &&
          Number(dia) >= format(mesAnoDefault, "dd"))
      );
    }
  }
  if (
    grupoLocation === "Programas e Projetos" &&
    dadosValoresInclusoesAutorizadasState
  ) {
    if (nomeCategoria === "ALIMENTAÇÃO") {
      if (rowName === "numero_de_alunos") {
        return true;
      } else if (validacaoSemana(dia)) {
        return true;
      } else if (
        !validacaoDiaLetivo(dia) &&
        ((rowName !== "frequencia" &&
          !Object.keys(dadosValoresInclusoesAutorizadasState).some(key =>
            key.includes(`${rowName}__dia_${dia}__categoria_${categoria}`)
          )) ||
          (rowName === "frequencia" &&
            !Object.keys(dadosValoresInclusoesAutorizadasState).some(key =>
              String(key).includes(`__dia_${dia}__categoria_${categoria}`)
            )))
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      if (rowName === "dietas_autorizadas") {
        return true;
      } else if (!validacaoDiaLetivo(dia) || validacaoSemana(dia)) {
        return true;
      } else {
        return false;
      }
    }
  }
  if (!values[`matriculados__dia_${dia}__categoria_${categoria}`]) {
    return true;
  }
  if (
    `${rowName}__dia_${dia}__categoria_${categoria}` in
      dadosValoresInclusoesAutorizadasState &&
    !["Mês anterior", "Mês posterior"].includes(
      values[`${rowName}__dia_${dia}__categoria_${categoria}`]
    )
  ) {
    return false;
  } else if (
    `${rowName}__dia_${dia}__categoria_${categoria}` ===
      `frequencia__dia_${dia}__categoria_${categoria}` &&
    Object.keys(dadosValoresInclusoesAutorizadasState).some(key =>
      String(key).includes(`__dia_${dia}__categoria_${categoria}`)
    ) &&
    !["Mês anterior", "Mês posterior"].includes(
      values[`${rowName}__dia_${dia}__categoria_${categoria}`]
    )
  ) {
    return false;
  } else {
    return (
      !validacaoDiaLetivo(dia) ||
      validacaoSemana(dia) ||
      rowName === "matriculados" ||
      rowName === "numero_de_alunos" ||
      rowName === "dietas_autorizadas" ||
      !values[`matriculados__dia_${dia}__categoria_${categoria}`] ||
      Number(
        values[`dietas_autorizadas__dia_${dia}__categoria_${categoria}`]
      ) === 0 ||
      (mesConsiderado === mesAtual &&
        Number(dia) >= format(mesAnoDefault, "dd"))
    );
  }
};

export const getSolicitacoesInclusaoAutorizadasAsync = async (
  escolaUuuid,
  mes,
  ano,
  nome_periodo_escolar,
  location
) => {
  const params = {};
  params["escola_uuid"] = escolaUuuid;
  params["tipo_solicitacao"] = "Inclusão de";
  params["mes"] = mes;
  params["ano"] = ano;
  params["nome_periodo_escolar"] = nome_periodo_escolar;
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
  const tiposAlimentacaoFormatadas = tipos_alimentacao.map(alimentacao => {
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
      nome: "Repet. Refeição",
      name: "repeticao_refeicao",
      uuid: null
    });
  }

  const indexSobremesa = tiposAlimentacaoFormatadas.findIndex(
    ali => ali.nome === "Sobremesa"
  );
  if (indexSobremesa !== -1) {
    tiposAlimentacaoFormatadas[indexSobremesa].nome = "Sobremesa 1ª Ofe.";
    tiposAlimentacaoFormatadas.splice(indexSobremesa + 1, 0, {
      nome: "Repet. Sobremesa",
      name: "repeticao_sobremesa",
      uuid: null
    });
  }

  const indexLancheEmergencial = tiposAlimentacaoFormatadas.findIndex(
    ali => ali.nome === "Lanche Emergencial"
  );
  if (indexLancheEmergencial !== -1) {
    tiposAlimentacaoFormatadas[indexLancheEmergencial].nome =
      "Lanche Emergenc.";
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

export const formatarLinhasTabelaSolicitacoesAlimentacao = () => {
  const linhasTabelaSolicitacoesAlimentacao = [];
  linhasTabelaSolicitacoesAlimentacao.push(
    {
      nome: "Lanche Emergenc.",
      name: "lanche_emergencial",
      uuid: null
    },
    {
      nome: "Kit Lanche",
      name: "kit_lanche",
      uuid: null
    },
    {
      nome: "Observações",
      name: "observacoes",
      uuid: null
    }
  );

  return linhasTabelaSolicitacoesAlimentacao;
};

export const formatarLinhasTabelaEtecAlimentacao = () => {
  const tiposAlimentacaoEtec = tiposAlimentacaoETEC();
  const tiposAlimentacaoEtecFormatadas = tiposAlimentacaoEtec.map(
    alimentacao => {
      return {
        nome: alimentacao,
        name: alimentacao
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .replaceAll(/ /g, "_"),
        uuid: null
      };
    }
  );

  const indexRefeicaoEtec = tiposAlimentacaoEtecFormatadas.findIndex(
    ali => ali.nome === "Refeição"
  );
  if (indexRefeicaoEtec !== -1) {
    tiposAlimentacaoEtecFormatadas[indexRefeicaoEtec].nome =
      "Refeição 1ª Oferta";
    tiposAlimentacaoEtecFormatadas.splice(indexRefeicaoEtec + 1, 0, {
      nome: "Repet. Refeição",
      name: "repeticao_refeicao",
      uuid: null
    });
  }

  const indexSobremesaEtec = tiposAlimentacaoEtecFormatadas.findIndex(
    ali => ali.nome === "Sobremesa"
  );
  if (indexSobremesaEtec !== -1) {
    tiposAlimentacaoEtecFormatadas[indexSobremesaEtec].nome =
      "Sobremesa 1ª Ofe.";
    tiposAlimentacaoEtecFormatadas.splice(indexSobremesaEtec + 1, 0, {
      nome: "Repet. Sobremesa",
      name: "repeticao_sobremesa",
      uuid: null
    });
  }

  const indexLancheEmergencialEtec = tiposAlimentacaoEtecFormatadas.findIndex(
    ali => ali.nome === "Lanche Emergencial"
  );
  if (indexLancheEmergencialEtec !== -1) {
    tiposAlimentacaoEtecFormatadas[indexLancheEmergencialEtec].nome =
      "Lanche Emergenc.";
  }

  tiposAlimentacaoEtecFormatadas.unshift(
    {
      nome: "Número de Alunos",
      name: "numero_de_alunos",
      uuid: null
    },
    {
      nome: "Frequência",
      name: "frequencia",
      uuid: null
    }
  );

  tiposAlimentacaoEtecFormatadas.push({
    nome: "Observações",
    name: "observacoes",
    uuid: null
  });

  return tiposAlimentacaoEtecFormatadas;
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
