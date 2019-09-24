export const extrairKitsLanche = kits => {
  let listaKits = [];
  kits.forEach(element => {
    listaKits.push(element.uuid);
  });
  return listaKits;
};

export const formatarSubmissao = values => {
  let dataFormatada = {};
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
      ? values.tempo_passeio
      : null
  };
  dataFormatada.escolas_quantidades = [];
  values.escolas.forEach(function(escola) {
    if (escola.checked) {
      dataFormatada.escolas_quantidades.push({
        tempo_passeio: values.lista_kit_lanche_igual
          ? null
          : escola.tempo_passeio,
        quantidade_alunos: values.lista_kit_lanche_igual
          ? escola.quantidade_alunos
          : escola.nro_alunos,
        kits: values.lista_kit_lanche_igual ? [] : escola.kitsChecked,
        escola: escola.uuid
      });
    }
  });
  return dataFormatada;
};
