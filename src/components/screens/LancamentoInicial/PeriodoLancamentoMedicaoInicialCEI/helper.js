import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import HTTP_STATUS from "http-status-codes";
import { toastError } from "components/Shareable/Toast/dialogs";
import {
  getSolicitacoesAlteracoesAlimentacaoAutorizadasEscola,
  getSolicitacoesInclusoesAutorizadasEscola,
  getSolicitacoesInclusoesEtecAutorizadasEscola,
  getSolicitacoesKitLanchesAutorizadasEscola,
  getSolicitacoesSuspensoesAutorizadasEscola,
} from "services/medicaoInicial/periodoLancamentoMedicao.service";
import { deepCopy } from "../../../../helpers/utilities";

export const formatarPayloadPeriodoLancamentoCeiCemei = (
  values,
  tabelaAlimentacaoCEIRows,
  dadosIniciaisFiltered,
  diasDaSemanaSelecionada,
  ehEmeiDaCemeiLocation,
  ehSolicitacoesAlimentacaoLocation,
  ehProgramasEProjetosLocation
) => {
  if (
    (ehEmeiDaCemeiLocation &&
      values["periodo_escolar"] &&
      values["periodo_escolar"].includes("Infantil")) ||
    (values["periodo_escolar"] &&
      values["periodo_escolar"].includes("Solicitações")) ||
    values["periodo_escolar"] === "ETEC" ||
    values["periodo_escolar"] === "Programas e Projetos"
  ) {
    values["grupo"] = values["periodo_escolar"];
    if (values["grupo"] && values["grupo"].includes("Solicitações")) {
      values["grupo"] = "Solicitações de Alimentação";
    }
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
    .map((arr) => {
      const keySplitted = arr[0].split("__");
      const categoria = keySplitted.pop();
      const idCategoria = categoria.match(/\d/g).join("");
      let dia = null;
      const nome_campo = keySplitted[0];

      if (
        ehEmeiDaCemeiLocation ||
        ehSolicitacoesAlimentacaoLocation ||
        ehProgramasEProjetosLocation
      ) {
        dia = keySplitted[1].match(/\d/g).join("");
        return valoresMedicao.push({
          dia: dia,
          valor: ["<p></p>\n", ""].includes(arr[1]) ? 0 : arr[1],
          nome_campo: nome_campo,
          categoria_medicao: idCategoria,
        });
      } else {
        dia = keySplitted[2].match(/\d/g).join("");
        const uuid_faixa_etaria = keySplitted[1].replace("faixa_", "");
        return valoresMedicao.push({
          dia: dia,
          valor: ["<p></p>\n", ""].includes(arr[1]) ? 0 : arr[1],
          nome_campo: nome_campo,
          categoria_medicao: idCategoria,
          faixa_etaria: uuid_faixa_etaria,
        });
      }
    });

  valoresMedicao = valoresMedicao.filter((valorMed) => {
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

export const formatarPayloadParaCorrecao = (payload) => {
  let payloadParaCorrecao = payload.valores_medicao.filter(
    (valor) =>
      !["matriculados", "dietas_autorizadas", "numero_de_alunos"].includes(
        valor.nome_campo
      )
  );
  return payloadParaCorrecao;
};

export const deveExistirObservacao = (
  categoria,
  values,
  calendarioMesConsiderado
) => {
  let diasNaoLetivos = [];
  const objDiasNaoLetivos = calendarioMesConsiderado.filter(
    (obj) => !obj.dia_letivo
  );
  objDiasNaoLetivos.map((obj) => diasNaoLetivos.push(obj.dia));

  const valuesAsArray = Object.entries(values);
  const arrayCategoriesValuesDiasNaoletivos = valuesAsArray.filter(
    ([key, value]) =>
      key.includes("categoria") &&
      !key.includes("matriculados") &&
      !key.includes("dietas_autorizadas") &&
      !key.includes("frequencia") &&
      !key.includes("observacoes") &&
      !["Mês anterior", "Mês posterior", null].includes(value) &&
      diasNaoLetivos.some((dia) => key.includes(dia))
  );
  let dias = [];
  arrayCategoriesValuesDiasNaoletivos.forEach((arr) => {
    const keySplitted = arr[0].split("__");
    const dia = keySplitted[1].match(/\d/g).join("");
    dias.push(dia);
  });

  return !dias.every(
    (dia) =>
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
  inclusoesAutorizadas,
  validacaoDiaLetivo,
  validacaoSemana,
  location,
  grupoLocation,
  valoresPeriodosLancamentos,
  feriadosNoMes,
  uuidFaixaEtaria,
  diasParaCorrecao,
  ehEmeiDaCemeiLocation,
  ehSolicitacoesAlimentacaoLocation
) => {
  if (!ehEmeiDaCemeiLocation) {
    if (nomeCategoria === "ALIMENTAÇÃO") {
      const resultado = inclusoesAutorizadas.some(
        (inclusao) =>
          parseInt(dia) === parseInt(inclusao.dia) &&
          rowName === "frequencia" &&
          !["Mês anterior", "Mês posterior"].includes(
            values[
              `${rowName}__faixa_${uuidFaixaEtaria}__dia_${dia}__categoria_${categoria}`
            ]
          ) &&
          inclusao.faixas_etarias.includes(uuidFaixaEtaria)
      );
      if (
        resultado &&
        values[
          `matriculados__faixa_${uuidFaixaEtaria}__dia_${dia}__categoria_${categoria}`
        ]
      ) {
        return false;
      }
    } else {
      const resultado =
        !validacaoDiaLetivo(dia) &&
        inclusoesAutorizadas.some(
          (inclusao) =>
            parseInt(dia) === parseInt(inclusao.dia) &&
            rowName === "frequencia" &&
            !["Mês anterior", "Mês posterior"].includes(
              values[
                `${rowName}__faixa_${uuidFaixaEtaria}__dia_${dia}__categoria_${categoria}`
              ]
            )
        );
      if (resultado)
        return (
          !values[
            `dietas_autorizadas__faixa_${uuidFaixaEtaria}__dia_${dia}__categoria_${categoria}`
          ] ||
          Number(
            values[
              `dietas_autorizadas__faixa_${uuidFaixaEtaria}__dia_${dia}__categoria_${categoria}`
            ]
          ) === 0
        );
    }
  } else {
    const resultado = inclusoesAutorizadas.some(
      (inclusao) =>
        dia === String(inclusao.dia) &&
        (inclusao.alimentacoes.includes(
          rowName.includes("repeticao") ? rowName.split("_")[1] : rowName
        ) ||
          rowName === "frequencia")
    );
    if (nomeCategoria !== "ALIMENTAÇÃO") {
      if (resultado)
        return (
          Number(
            values[`dietas_autorizadas__dia_${dia}__categoria_${categoria}`]
          ) === 0
        );
    } else {
      if (resultado) return false;
    }
  }

  if (
    ehDiaParaCorrigir(dia, categoria, diasParaCorrecao) &&
    !["Mês anterior", "Mês posterior"].includes(
      values[`${rowName}__dia_${dia}__categoria_${categoria}`]
    ) &&
    location.state &&
    [
      "MEDICAO_CORRECAO_SOLICITADA",
      "MEDICAO_CORRECAO_SOLICITADA_CODAE",
      "MEDICAO_CORRIGIDA_PELA_UE",
      "MEDICAO_CORRIGIDA_PARA_CODAE",
    ].includes(location.state.status_periodo) &&
    !["matriculados", "dietas_autorizadas"].includes(rowName)
  ) {
    return false;
  }

  if (
    (location.state &&
      (location.state.status_periodo === "MEDICAO_APROVADA_PELA_DRE" ||
        location.state.status_periodo === "MEDICAO_APROVADA_PELA_CODAE" ||
        location.state.status_periodo === "MEDICAO_ENVIADA_PELA_UE" ||
        ([
          "MEDICAO_CORRECAO_SOLICITADA",
          "MEDICAO_CORRECAO_SOLICITADA_CODAE",
          "MEDICAO_CORRIGIDA_PELA_UE",
          "MEDICAO_CORRIGIDA_PARA_CODAE",
        ].includes(location.state.status_periodo) &&
          !ehDiaParaCorrigir(dia, categoria, diasParaCorrecao)))) ||
    ["matriculados", "dietas_autorizadas"].includes(rowName)
  ) {
    return true;
  }

  const mesConsiderado = format(mesAnoConsiderado, "LLLL", {
    locale: ptBR,
  }).toString();
  const mesAtual = format(mesAnoDefault, "LLLL", {
    locale: ptBR,
  }).toString();

  if (
    (location && location.state && location.state.ehEmeiDaCemei) ||
    ehSolicitacoesAlimentacaoLocation
  ) {
    if (
      ["Mês anterior", "Mês posterior"].includes(
        values[`${rowName}__dia_${dia}__categoria_${categoria}`]
      ) ||
      (mesConsiderado === mesAtual &&
        Number(dia) >= format(mesAnoDefault, "dd")) ||
      !validacaoDiaLetivo(dia)
    ) {
      return true;
    } else if (
      (nomeCategoria === "ALIMENTAÇÃO" &&
        (rowName === "matriculados" ||
          !values[`matriculados__dia_${dia}__categoria_${categoria}`])) ||
      (nomeCategoria.includes("DIETA") &&
        (rowName === "dietas_autorizadas" ||
          !values[`dietas_autorizadas__dia_${dia}__categoria_${categoria}`])) ||
      Number(
        values[`dietas_autorizadas__dia_${dia}__categoria_${categoria}`]
      ) === 0 ||
      Number(values[`matriculados__dia_${dia}__categoria_${categoria}`]) === 0
    ) {
      return true;
    } else if (rowName === "frequencia") {
      return false;
    }
  } else {
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
    } else if (
      (nomeCategoria === "ALIMENTAÇÃO" &&
        (rowName === "matriculados" ||
          !values[
            `matriculados__faixa_${uuidFaixaEtaria}__dia_${dia}__categoria_${categoria}`
          ])) ||
      (nomeCategoria.includes("DIETA") &&
        (rowName === "dietas_autorizadas" ||
          !values[
            `dietas_autorizadas__faixa_${uuidFaixaEtaria}__dia_${dia}__categoria_${categoria}`
          ])) ||
      Number(
        values[
          `dietas_autorizadas__faixa_${uuidFaixaEtaria}__dia_${dia}__categoria_${categoria}`
        ]
      ) === 0 ||
      Number(
        values[
          `matriculados__faixa_${uuidFaixaEtaria}__dia_${dia}__categoria_${categoria}`
        ]
      ) === 0
    ) {
      return true;
    } else if (rowName === "frequencia") {
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
  const responseInclusoesAutorizadas =
    await getSolicitacoesInclusoesAutorizadasEscola(params);
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
  const responseInclusoesAutorizadas =
    await getSolicitacoesInclusoesEtecAutorizadasEscola(params);
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
  const responseSuspensoesAutorizadas =
    await getSolicitacoesSuspensoesAutorizadasEscola(params);
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
  const responseAlteracoesAlimentacaoAutorizadas =
    await getSolicitacoesAlteracoesAlimentacaoAutorizadasEscola(params);
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
  params["tipo_solicitacao"] = "Kit Lanche Passeio de CEMEI";
  params["mes"] = mes;
  params["ano"] = ano;
  const responseKitLanchesAutorizadas =
    await getSolicitacoesKitLanchesAutorizadasEscola(params);
  if (responseKitLanchesAutorizadas.status === HTTP_STATUS.OK) {
    return responseKitLanchesAutorizadas.data.results;
  } else {
    toastError("Erro ao carregar Kit Lanches CEMEI Autorizadas");
    return [];
  }
};

export const formatarLinhasTabelaAlimentacaoCEI = (
  response_log_matriculados_por_faixa_etaria_dia,
  periodoGrupo,
  valores_medicao = null
) => {
  let faixas_etarias_alimentacao = [];
  let faixas_etarias_objs_alimentacao = [];
  let linhasTabelaAlimentacaoCEI = [];

  const formataFaixasPeriodoManhaTarde = () => {
    if (["MANHA", "TARDE"].includes(periodoGrupo)) {
      faixas_etarias_alimentacao = faixas_etarias_alimentacao.filter(
        (faixa) => faixa === "04 anos a 06 anos"
      );
    }
  };

  if (valores_medicao) {
    valores_medicao.forEach((valor) => {
      valor.faixa_etaria_str &&
        !faixas_etarias_alimentacao.find(
          (faixa) => faixa === valor.faixa_etaria_str
        ) &&
        faixas_etarias_alimentacao.push(valor.faixa_etaria_str);
    });

    formataFaixasPeriodoManhaTarde();

    faixas_etarias_alimentacao.forEach((faixa) => {
      const valorMedicao = valores_medicao.find(
        (valor) => valor.faixa_etaria_str === faixa
      );
      valorMedicao &&
        faixas_etarias_objs_alimentacao.push({
          inicio: valorMedicao.faixa_etaria_inicio,
          __str__: valorMedicao.faixa_etaria_str,
          uuid: valorMedicao.faixa_etaria,
        });
    });
  } else {
    response_log_matriculados_por_faixa_etaria_dia.data.forEach((log) => {
      !faixas_etarias_alimentacao.find(
        (faixa) => faixa === log.faixa_etaria.__str__
      ) && faixas_etarias_alimentacao.push(log.faixa_etaria.__str__);
    });

    formataFaixasPeriodoManhaTarde();

    faixas_etarias_alimentacao.forEach((faixa) => {
      const log = response_log_matriculados_por_faixa_etaria_dia.data.find(
        (log) => log.faixa_etaria.__str__ === faixa
      );
      log &&
        faixas_etarias_objs_alimentacao.push({
          inicio: log.faixa_etaria.inicio,
          __str__: log.faixa_etaria.__str__,
          uuid: log.faixa_etaria.uuid,
        });
    });
  }

  faixas_etarias_objs_alimentacao
    .sort((a, b) => a.inicio - b.inicio)
    .forEach((faixa_obj) => {
      linhasTabelaAlimentacaoCEI.push(
        {
          nome: "Matriculados",
          name: "matriculados",
          uuid: faixa_obj.uuid,
          faixa_etaria: faixa_obj.__str__,
        },
        {
          nome: "Frequência",
          name: "frequencia",
          uuid: faixa_obj.uuid,
          faixa_etaria: faixa_obj.__str__,
        }
      );
    });
  linhasTabelaAlimentacaoCEI.push({
    nome: "Observações",
    name: "observacoes",
    uuid: null,
    faixa_etaria: null,
  });

  return linhasTabelaAlimentacaoCEI;
};

export const formatarLinhasTabelaAlimentacaoEmeiDaCemei = (
  tiposAlimentacao,
  ehSolicitacoesAlimentacaoLocation
) => {
  const tiposAlimentacaoFormatadas = tiposAlimentacao.map((alimentacao) => {
    return {
      ...alimentacao,
      name: alimentacao.nome
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replaceAll(/ /g, "_"),
    };
  });

  if (ehSolicitacoesAlimentacaoLocation) {
    const rowsSolicitacoesAlimentacao = [];
    rowsSolicitacoesAlimentacao.push(
      {
        nome: "Lanche Emergencial",
        name: "lanche_emergencial",
        uuid: null,
      },
      {
        nome: "Kit Lanche",
        name: "kit_lanche",
        uuid: null,
      },
      {
        nome: "Observações",
        name: "observacoes",
        uuid: null,
      }
    );

    return rowsSolicitacoesAlimentacao;
  }

  const indexRefeicao = tiposAlimentacaoFormatadas.findIndex(
    (ali) => ali.nome === "Refeição"
  );
  if (indexRefeicao !== -1) {
    tiposAlimentacaoFormatadas[indexRefeicao].nome = "Refeição 1ª Oferta";
    tiposAlimentacaoFormatadas.splice(indexRefeicao + 1, 0, {
      nome: "Repetição Refeição",
      name: "repeticao_refeicao",
      uuid: null,
    });
  }

  const indexSobremesa = tiposAlimentacaoFormatadas.findIndex(
    (ali) => ali.nome === "Sobremesa"
  );
  if (indexSobremesa !== -1) {
    tiposAlimentacaoFormatadas[indexSobremesa].nome = "Sobremesa 1º Oferta";
    tiposAlimentacaoFormatadas.splice(indexSobremesa + 1, 0, {
      nome: "Repetição Sobremesa",
      name: "repeticao_sobremesa",
      uuid: null,
    });
  }

  tiposAlimentacaoFormatadas.unshift(
    {
      nome: "Matriculados",
      name: "matriculados",
      uuid: null,
    },
    {
      nome: "Frequência",
      name: "frequencia",
      uuid: null,
    }
  );

  tiposAlimentacaoFormatadas.push({
    nome: "Observações",
    name: "observacoes",
    uuid: null,
  });

  return tiposAlimentacaoFormatadas;
};

export const formatarLinhasTabelasDietasCEI = (
  response_log_dietas_autorizadas_cei,
  periodoGrupo,
  valores_medicao = null
) => {
  let faixas_etarias_dieta = [];
  let faixas_etarias_objs_dieta = [];
  let linhasTabelasDietasCEI = [];

  const formataFaixasPeriodoManhaTarde = () => {
    if (["MANHA", "TARDE"].includes(periodoGrupo)) {
      faixas_etarias_dieta = faixas_etarias_dieta.filter(
        (faixa) => faixa === "04 anos a 06 anos"
      );
    }
  };

  if (valores_medicao) {
    valores_medicao.forEach((valor) => {
      valor.faixa_etaria_str &&
        !faixas_etarias_dieta.find(
          (faixa) => faixa === valor.faixa_etaria_str
        ) &&
        faixas_etarias_dieta.push(valor.faixa_etaria_str);
    });

    formataFaixasPeriodoManhaTarde();

    faixas_etarias_dieta.forEach((faixa) => {
      const valorMedicao = valores_medicao.find(
        (valor) => valor.faixa_etaria_str === faixa
      );
      valorMedicao &&
        faixas_etarias_objs_dieta.push({
          inicio: valorMedicao.faixa_etaria_inicio,
          __str__: valorMedicao.faixa_etaria_str,
          uuid: valorMedicao.faixa_etaria,
        });
    });
  } else {
    response_log_dietas_autorizadas_cei.data.forEach((log) => {
      !faixas_etarias_dieta.find(
        (faixa) => faixa === log.faixa_etaria.__str__
      ) && faixas_etarias_dieta.push(log.faixa_etaria.__str__);
    });

    formataFaixasPeriodoManhaTarde();

    faixas_etarias_dieta.forEach((faixa) => {
      const log = response_log_dietas_autorizadas_cei.data.find(
        (log) => log.faixa_etaria.__str__ === faixa
      );
      log &&
        faixas_etarias_objs_dieta.push({
          inicio: log.faixa_etaria.inicio,
          __str__: log.faixa_etaria.__str__,
          uuid: log.faixa_etaria.uuid,
        });
    });
  }

  faixas_etarias_objs_dieta
    .sort((a, b) => a.inicio - b.inicio)
    .forEach((faixa_obj) => {
      linhasTabelasDietasCEI.push(
        {
          nome: "Dietas Autorizadas",
          name: "dietas_autorizadas",
          uuid: faixa_obj.uuid,
          faixa_etaria: faixa_obj.__str__,
        },
        {
          nome: "Frequência",
          name: "frequencia",
          uuid: faixa_obj.uuid,
          faixa_etaria: faixa_obj.__str__,
        }
      );
    });
  linhasTabelasDietasCEI.push({
    nome: "Observações",
    name: "observacoes",
    uuid: null,
    faixa_etaria: null,
  });

  return linhasTabelasDietasCEI;
};

export const formatarLinhasTabelasDietasEmeiDaCemei = (tiposAlimentacao) => {
  const linhasTabelasDietas = [];
  linhasTabelasDietas.push(
    {
      nome: "Dietas Autorizadas",
      name: "dietas_autorizadas",
      uuid: null,
    },
    {
      nome: "Frequência",
      name: "frequencia",
      uuid: null,
    }
  );

  const indexLanche4h = tiposAlimentacao.findIndex((ali) =>
    ali.nome.includes("4h")
  );
  if (indexLanche4h !== -1) {
    linhasTabelasDietas.push({
      nome: tiposAlimentacao[indexLanche4h].nome,
      name: tiposAlimentacao[indexLanche4h].nome
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replaceAll(/ /g, "_"),
      uuid: tiposAlimentacao[indexLanche4h].uuid,
    });
  }

  const indexLanche = tiposAlimentacao.findIndex(
    (ali) => ali.nome === "Lanche"
  );
  if (indexLanche !== -1) {
    linhasTabelasDietas.push({
      nome: "Lanche",
      name: "Lanche"
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replaceAll(/ /g, "_"),
      uuid: tiposAlimentacao[indexLanche].uuid,
    });
  }

  linhasTabelasDietas.push({
    nome: "Observações",
    name: "observacoes",
    uuid: null,
  });

  return linhasTabelasDietas;
};

export const formatarLinhasTabelaDietaEnteral = (
  tipos_alimentacao,
  linhasTabelasDietas
) => {
  const linhasTabelaDietaEnteral = deepCopy(linhasTabelasDietas);
  const indexRefeicaoDieta = tipos_alimentacao.findIndex(
    (ali) => ali.nome === "Refeição"
  );
  linhasTabelaDietaEnteral.splice(linhasTabelaDietaEnteral.length - 1, 0, {
    nome: "Refeição",
    name: "refeicao",
    uuid: tipos_alimentacao[indexRefeicaoDieta].uuid,
  });

  return linhasTabelaDietaEnteral;
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
    (valor) =>
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

export const ehDiaParaCorrigir = (dia, categoria, diasParaCorrecao) => {
  return (
    diasParaCorrecao &&
    diasParaCorrecao.find(
      (diaParaCorrecao) =>
        String(diaParaCorrecao.dia) === String(dia) &&
        String(diaParaCorrecao.categoria_medicao) === String(categoria) &&
        diaParaCorrecao.habilitado_correcao === true
    )
  );
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
      (valor) =>
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
  dia,
  diasParaCorrecao
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
        "MEDICAO_CORRIGIDA_PARA_CODAE",
      ].includes(location.state.status_periodo) &&
        !valoresPeriodosLancamentos
          .filter((valor) => valor.nome_campo === "observacoes")
          .filter((valor) => String(valor.dia) === String(column.dia))
          .filter(
            (valor) => String(valor.categoria_medicao) === String(categoria.id)
          )[0])) &&
      botaoEhAdicionar &&
      !ehDiaParaCorrigir(column.dia, categoria.id, diasParaCorrecao)) ||
      (["MEDICAO_APROVADA_PELA_DRE", "MEDICAO_APROVADA_PELA_CODAE"].includes(
        location.state.status_periodo
      ) &&
        botaoEhAdicionar) ||
      ([
        "MEDICAO_CORRECAO_SOLICITADA",
        "MEDICAO_CORRECAO_SOLICITADA_CODAE",
        "MEDICAO_CORRIGIDA_PELA_UE",
        "MEDICAO_CORRIGIDA_PARA_CODAE",
      ].includes(location.state.status_periodo) &&
        !ehDiaParaCorrigir(column.dia, categoria.id, diasParaCorrecao)))
  );
};

export const categoriasParaExibir = (
  ehEmeiDaCemeiLocation,
  response_categorias_medicao,
  response_log_dietas_autorizadas_cei,
  ehSolicitacoesAlimentacaoLocation
) => {
  if (ehEmeiDaCemeiLocation) {
    response_categorias_medicao = response_categorias_medicao.data.filter(
      (categoria) => {
        return !categoria.nome.includes("SOLICITAÇÕES");
      }
    );
    return response_categorias_medicao;
  } else if (ehSolicitacoesAlimentacaoLocation) {
    response_categorias_medicao = response_categorias_medicao.data.filter(
      (categoria) => {
        return categoria.nome.includes("SOLICITAÇÕES");
      }
    );
    return response_categorias_medicao;
  } else {
    response_categorias_medicao = response_categorias_medicao.data.filter(
      (categoria) => {
        return (
          !categoria.nome.includes("SOLICITAÇÕES") &&
          !categoria.nome.includes("ENTERAL")
        );
      }
    );
    let categoriasDietasParaDeletar = [];
    if (!response_log_dietas_autorizadas_cei.data?.length) {
      categoriasDietasParaDeletar.push("DIETA ESPECIAL - TIPO A");
      categoriasDietasParaDeletar.push("DIETA ESPECIAL - TIPO B");
    } else if (response_log_dietas_autorizadas_cei.data?.length) {
      for (const categoria of response_categorias_medicao) {
        if (
          categoria.nome === "DIETA ESPECIAL - TIPO A" &&
          (!response_log_dietas_autorizadas_cei.data.filter((dieta) =>
            dieta.classificacao.toUpperCase().includes("TIPO A")
          ).length ||
            !response_log_dietas_autorizadas_cei.data.filter(
              (dieta) =>
                dieta.classificacao.toUpperCase().includes("TIPO A") &&
                Number(dieta.quantidade) !== 0
            ).length)
        ) {
          categoriasDietasParaDeletar.push("DIETA ESPECIAL - TIPO A");
        } else if (
          categoria.nome === "DIETA ESPECIAL - TIPO B" &&
          (!response_log_dietas_autorizadas_cei.data.filter((dieta) =>
            dieta.classificacao.toUpperCase().includes("TIPO B")
          ).length ||
            !response_log_dietas_autorizadas_cei.data.filter(
              (dieta) =>
                dieta.classificacao.toUpperCase().includes("TIPO B") &&
                Number(dieta.quantidade) !== 0
            ).length)
        ) {
          categoriasDietasParaDeletar.push("DIETA ESPECIAL - TIPO B");
        }
      }
    }
    return response_categorias_medicao.filter((categoria) => {
      return !categoriasDietasParaDeletar.includes(categoria.nome);
    });
  }
};

export const formataNomeCategoriaSolAlimentacoesInfantil = (nomeCategoria) => {
  if (nomeCategoria.includes("SOLICITAÇÕES")) {
    return "SOLICITAÇÕES DE ALIMENTAÇÃO - INFANTIL";
  } else {
    return nomeCategoria;
  }
};
