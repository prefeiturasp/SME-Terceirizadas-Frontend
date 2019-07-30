export const formatarTiposDeAlimentacao = tiposAlimentacao => {
  let listaTiposDeAlimentacao = [];
  tiposAlimentacao.forEach(element => {
    listaTiposDeAlimentacao.push({ value: element.uuid, label: element.nome });
  });
  return listaTiposDeAlimentacao;
};

export const formatarPeriodos = periodos => {
  periodos.forEach(periodo => {
    periodo["check"] = false;
    periodo["tipos_alimentacao_selecionados"] = [];
    periodo["numero_alunos"] = null;
  });
  return periodos;
};
