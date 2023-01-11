const buscaOPeriodoAtual = (periodo, vinculosTPAlimentacaoResponse) => {
  let tpAlimentacao = null;
  vinculosTPAlimentacaoResponse.forEach(alimentacao => {
    if (alimentacao.periodo_escolar.uuid === periodo.uuid) {
      tpAlimentacao = alimentacao;
    }
  });
  return tpAlimentacao;
};

const buscaCombosDoPeriodoIntegral = vinculosTPAlimentacaoResponse => {
  let tpAlimentacao = null;
  vinculosTPAlimentacaoResponse.forEach(alimentacao => {
    if (alimentacao.periodo_escolar.nome === "INTEGRAL") {
      tpAlimentacao = alimentacao;
    }
  });
  return tpAlimentacao;
};

export const montatiposAlimentacaoPorPeriodo = (
  vinculosTPAlimentacaoResponse,
  periodos
) => {
  periodos.forEach(periodo => {
    if (periodo.nome !== "PARCIAL") {
      const periodoAtual = buscaOPeriodoAtual(
        periodo,
        vinculosTPAlimentacaoResponse
      );
      periodo.tipos_alimentacao = periodoAtual.tipos_alimentacao;
    } else {
      const periodoIntegral = buscaCombosDoPeriodoIntegral(
        vinculosTPAlimentacaoResponse
      );
      periodo.tipos_alimentacao = periodoIntegral.tipos_alimentacao;
    }
  });
  return periodos;
};

export const montaNomeCombosAlimentacao = tiposAlimentacao => {
  tiposAlimentacao.forEach(tpAlimentacao => {
    tpAlimentacao.tipos_alimentacao.forEach(tipo_alimentacao => {
      tipo_alimentacao["nome"] = tipo_alimentacao.label;
    });
  });
  return tiposAlimentacao;
};

const retornaUuidPeriodoIntegral = periodosEscolares => {
  let uuid = null;
  periodosEscolares.forEach(periodo => {
    if (periodo.periodo_escolar.nome === "INTEGRAL") {
      uuid = periodo.uuid;
    }
  });
  return uuid;
};

export const retornaUuidEscolaPeriodoEscolar = (periodo, periodosEscolares) => {
  let uuidPeriodo = null;
  periodosEscolares.forEach(item => {
    if (item.periodo_escolar.nome === periodo.nome) {
      uuidPeriodo = item.uuid;
    } else if (periodo.nome === "PARCIAL") {
      uuidPeriodo = retornaUuidPeriodoIntegral(periodosEscolares);
    }
  });
  return uuidPeriodo;
};

export const renderizarLabelTipoAlimentacao = (selected, options) => {
  if (selected.length === 0) {
    return "Selecione";
  }
  if (selected.length === options.length) {
    return "Todos os itens estão selecionados";
  }
  if (selected.length === 1) {
    return `${selected.length} tipo de alimentação selecionado`;
  }
  return `${selected.length} tipos de alimentações selecionados`;
};

export const backgroundLabelPeriodo = periodos => {
  const periodosComStyles = periodos.map(periodo => {
    switch (periodo.nome) {
      case "MANHA":
        periodo["background"] = "#fff7cb";
        periodo["borderColor"] = "#ffd79b";
        break;

      case "TARDE":
        periodo["background"] = "#ffeed6";
        periodo["borderColor"] = "#ffbb8a";
        break;

      case "NOITE":
        periodo["background"] = "#e4f1ff";
        periodo["borderColor"] = "#82b7e8";
        break;

      case "INTEGRAL":
        periodo["background"] = "#ebedff";
        periodo["borderColor"] = "#b2baff";
        break;

      default:
        periodo["background"] = "#eaffe3";
        periodo["borderColor"] = "#79cf91";
        break;
    }
    return periodo;
  });
  return periodosComStyles;
};

export const formataPayload = values => {
  let payload = {};
  payload["escola"] = values.escola;
  if (values.uuid) {
    payload["uuid"] = values.uuid;
  }
  let faixas = [];
  values.inclusoes
    .filter(i => i.checked === true)
    .forEach(inclusao => {
      inclusao.faixas_etarias
        .filter(f => f.quantidade_alunos)
        .forEach(f => {
          faixas.push({
            periodo: inclusao.periodo_uuid,
            quantidade_alunos: f.quantidade_alunos,
            faixa_etaria: f.faixa_etaria_uuid,
            matriculados_quando_criado: f.matriculados_quando_criado
          });
        });
    });
  payload["quantidade_alunos_por_faixas_etarias"] = faixas;
  payload["dias_motivos_da_inclusao_cei"] = values.dias_motivos_da_inclusao_cei;
  return payload;
};

export const validarForm = values => {
  let erro = "";
  if (!values.quantidade_alunos_por_faixas_etarias.length) {
    erro =
      "Necessário selecionar ao menos período e preencher uma faixa etária";
  }
  return erro;
};
