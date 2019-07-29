export const adicionarDefault = combo => {
  return [{ uuid: null, nome: "Selecionar" }].concat(combo);
};

export const formatarSubmissao = values => {
  let dataFormatada = {};
  dataFormatada.motivo = values.motivo;
  dataFormatada.lista_kit_lanche_igual = values.lista_kit_lanche_igual;
  dataFormatada.solicitacao_kit_lanche = {
    kits: [],
    data: values.data,
    descricao: values.descricao,
    tempo_passeio: values.tempo_passeio
  };
  dataFormatada.escolas_quantidades = [];
  values.escolas.forEach(function(escola) {
    if (escola.checked) {
      dataFormatada.escolas_quantidades.push({
        tempo_passeio: values.tempo_passeio,
        quantidade_alunos: escola.quantidade_alunos,
        kits: [],
        escola: escola.uuid
      })
    }
  })
  console.log(dataFormatada);
};
