export const formatarTempoPasseio = value => {
  switch (value) {
    case "8h":
    case 2:
      return 2;
    case "5_7h":
    case 1:
      return 1;
    default:
      return 0;
  }
};

export const extrairKitsLanche = kits => {
  let listaKits = [];
  kits.forEach(element => {
    listaKits.push(element.uuid);
  });
  return listaKits;
};

export const extrairTempoPasseio = tempoPasseio => {
  switch (tempoPasseio) {
    case 2:
      return "8h";
    case 1:
      return "5_7h";
    default:
      return "4h";
  }
};

export const formatarSubmissao = values => {
  let dataFormatada = {};
  dataFormatada.motivo = values.motivo;
  dataFormatada.outro_motivo = values.outro_motivo;
  dataFormatada.local = values.local;
  dataFormatada.diretoria_regional = values.diretoria_regional;
  dataFormatada.lista_kit_lanche_igual = values.lista_kit_lanche_igual || false;
  dataFormatada.quantidade_max_alunos_por_escola = dataFormatada.lista_kit_lanche_igual
    ? values.quantidade_max_alunos_por_escola
    : null;
  dataFormatada.solicitacao_kit_lanche = {
    kits: dataFormatada.lista_kit_lanche_igual ? values.kit_lanche : [],
    data: values.data,
    descricao: values.descricao,
    tempo_passeio: dataFormatada.lista_kit_lanche_igual
      ? formatarTempoPasseio(values.tempo_passeio)
      : null
  };
  dataFormatada.escolas_quantidades = [];
  values.escolas.forEach(function(escola) {
    if (escola.checked) {
      dataFormatada.escolas_quantidades.push({
        tempo_passeio: values.lista_kit_lanche_igual
          ? null
          : formatarTempoPasseio(escola.tempo_passeio),
        quantidade_alunos: values.lista_kit_lanche_igual
          ? escola.quantidade_alunos
          : escola.nro_alunos,
        kits: values.lista_kit_lanche_igual ? [] : escola.kit_lanche,
        escola: escola.uuid
      });
    }
  });
  return dataFormatada;
};
