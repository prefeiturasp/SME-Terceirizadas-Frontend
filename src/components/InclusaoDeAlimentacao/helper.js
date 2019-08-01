import moment from "moment";

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
  dataFormatada.motivo = values.dias_motivos[0].motivo;
  dataFormatada.data_inicial = values.dias_motivos[0].data_inicial;
  dataFormatada.data_final = values.dias_motivos[0].data_final;
  dataFormatada.dias_semana = values.dias_motivos[0].dias_semana;
  dataFormatada.outro_motivo = values.dias_motivos[0].outro_motivo;
  dataFormatada.escola = meusDados.escolas[0].uuid;
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
