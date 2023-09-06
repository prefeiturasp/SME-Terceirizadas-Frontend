export const getListaFiltradaAutoCompleteSelect = (
  lista,
  valorFiltro = "",
  regex = "iu"
) => {
  if (valorFiltro) {
    const reg = new RegExp(valorFiltro, regex);
    const listaUnica = Array.from(new Set(lista)).map((e) => {
      return { value: e };
    });
    return listaUnica.filter((e) => reg.test(e.value));
  }

  return [];
};
