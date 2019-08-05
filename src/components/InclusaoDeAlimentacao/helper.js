export const formatarTiposDeAlimentacao = tiposAlimentacao => {
  return tiposAlimentacao.map(element => {
    return { value: element.uuid, label: element.nome };
  });
};

export const formatarPeriodos = periodos => {
  periodos.forEach(periodo => {
    periodo["checked"] = false;
    periodo["tipos_alimentacao_selecionados"] = [];
    periodo["numero_alunos"] = null;
  });
  return periodos;
};

export const agregarDefault = lista => {
  return [{ nome: "Selecione", uuid: null }].concat(lista);
};

export const extrairTiposALimentacao = tiposAlimentacao => {
  let uuidsTiposAlimentacao = [];
  tiposAlimentacao.forEach(tipoAlimentacao => {
    uuidsTiposAlimentacao.push(tipoAlimentacao.uuid);
  });
  return uuidsTiposAlimentacao;
};

export const formatarDiasSemana = diasSemana => {
  let paraStringDiasSemana = [];
  diasSemana.forEach(diaSemana => {
    paraStringDiasSemana.push(diaSemana.toString());
  });
  return paraStringDiasSemana;
};

export const GeradorUUID = () => {
  var S4 = function() {
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

export const formatarSubmissaoSolicitacaoContinua = (values, meusDados) => {
  let dataFormatada = {};
  dataFormatada.escola = meusDados.escolas[0].uuid;
  dataFormatada.motivo = values.inclusoes[0].motivo;
  dataFormatada.data_inicial = values.inclusoes[0].data_inicial;
  dataFormatada.data_final = values.inclusoes[0].data_final;
  dataFormatada.dias_semana = values.inclusoes[0].dias_semana;
  dataFormatada.outro_motivo = values.inclusoes[0].outro_motivo;
  let quantidades_periodo = [];
  values.quantidades_periodo.forEach(quantidade_periodo => {
    if (quantidade_periodo.checked) {
      let quantidade_periodo_formatado = {};
      quantidade_periodo_formatado["numero_alunos"] =
        quantidade_periodo.numero_alunos;
      quantidade_periodo_formatado["periodo_escolar"] = quantidade_periodo.uuid;
      quantidade_periodo_formatado["tipos_alimentacao"] =
        quantidade_periodo.tipos_alimentacao_selecionados;
      quantidades_periodo.push(quantidade_periodo_formatado);
    }
  });
  dataFormatada.quantidades_periodo = quantidades_periodo;
  dataFormatada.descricao = values.descricao;
  return dataFormatada;
};

export const formatarSubmissaoSolicitacaoNormal = (values, meusDados) => {
  let dataFormatada = {};
  dataFormatada.escola = meusDados.escolas[0].uuid;
  let inclusoes = [];
  values.inclusoes.forEach(inclusao => {
    let inclusao_formatada = {};
    inclusao_formatada["data"] = inclusao.data;
    inclusao_formatada["motivo"] = inclusao.motivo;
    inclusao_formatada["outro_motivo"] = inclusao.outro_motivo;
    inclusoes.push(inclusao_formatada);
  });
  dataFormatada.inclusoes = inclusoes;
  let quantidades_periodo = [];
  values.quantidades_periodo.forEach(quantidade_periodo => {
    if (quantidade_periodo.checked) {
      let quantidade_periodo_formatado = {};
      quantidade_periodo_formatado["numero_alunos"] =
        quantidade_periodo.numero_alunos;
      quantidade_periodo_formatado["periodo_escolar"] = quantidade_periodo.uuid;
      quantidade_periodo_formatado["tipos_alimentacao"] =
        quantidade_periodo.tipos_alimentacao_selecionados;
      quantidades_periodo.push(quantidade_periodo_formatado);
    }
  });
  dataFormatada.quantidades_periodo = quantidades_periodo;
  dataFormatada.descricao = values.descricao;
  return dataFormatada;
};
