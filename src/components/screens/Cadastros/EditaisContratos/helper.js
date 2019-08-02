export const buscaDadosDRE = response => {
  let dres = response.results.map(elemento => {
    return {
      label: elemento.nome,
      value: elemento.nome,
      uuid: elemento.uuid
    };
  });
  return dres;
};

export const buscaDadosLote = response => {
  let lotes = response.map(elemento => {
    return {
      label: elemento.nome,
      value: elemento.nome,
      uuid: elemento.uuid
    };
  });
  return lotes;
};
