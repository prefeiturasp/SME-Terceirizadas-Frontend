export const normalizaLabelValueDRE = response => {
  let dres = response.results.map(elemento => {
    return {
      label: elemento.nome,
      value: elemento.uuid,
      uuid: elemento.uuid
    };
  });
  return dres;
};

export const normalizaLabelValueLote = response => {
  let lotes = response.map(elemento => {
    return {
      label: elemento.nome,
      value: elemento.uuid,
      uuid: elemento.uuid
    };
  });
  return lotes;
};

export const renderizarLabelLote = (selected, options) => {
  if (selected.length === 0) {
    return "Selecione um ou mais lotes...";
  }
  if (selected.length === options.length) {
    return "Todos os lotes foram selecionados";
  }
  if (selected.length === 1) {
    return `${selected.length} lote selecionado`;
  }
  return `${selected.length} lotes selecionados`;
};

export const renderizarLabelDiretoria = (selected, options) => {
  if (selected.length === 0) {
    return "Selecione uma ou mais diretorias ...";
  }
  if (selected.length === options.length) {
    return "Todas as diretorias foram selecionadas";
  }
  if (selected.length === 1) {
    return `${selected.length} diretoria selecionada`;
  }
  return `${selected.length} diretorias selecionadas`;
};

export const renderizarLabelEmpresa = (selected, options) => {
  if (selected.length === 0) {
    return "Selecione uma ou mais empresas ...";
  }
  if (selected.length === options.length) {
    return "Todas as empresas foram selecionadas";
  }
  if (selected.length === 1) {
    return `${selected.length} empresa selecionada`;
  }
  return `${selected.length} empresas selecionadas`;
};
