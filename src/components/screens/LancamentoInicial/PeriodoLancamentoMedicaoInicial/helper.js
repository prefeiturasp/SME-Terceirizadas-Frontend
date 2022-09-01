export const formatarPayloadPeriodoLancamento = (
  values,
  tableAlimentacaoRows,
  dadosIniciaisFiltered
) => {
  const valuesAsArray = Object.entries(values);
  const arrayCategoriesValues = valuesAsArray.filter(([key]) =>
    key.includes("categoria")
  );
  const valoresMedicao = [];

  dadosIniciaisFiltered.forEach(([keyDado]) => {
    if (
      arrayCategoriesValues.filter(([key]) => key.includes(keyDado)).length ===
      0
    ) {
      arrayCategoriesValues.push([keyDado, 0]);
    }
  });

  arrayCategoriesValues.map(arr => {
    const keySplitted = arr[0].split("__");
    const categoria = keySplitted.pop();
    const idCategoria = categoria.match(/\d/g).join("");
    const dia = keySplitted[1].match(/\d/g).join("");
    const nome_campo = keySplitted[0];
    const uuidTipoAlimentacao = tableAlimentacaoRows.find(
      alimentacao => alimentacao.name === nome_campo
    ).uuid;

    return valoresMedicao.push({
      dia: dia,
      valor: ["<p></p>\n", ""].includes(arr[1]) ? 0 : arr[1],
      nome_campo: nome_campo,
      categoria_medicao: idCategoria,
      tipo_alimentacao: uuidTipoAlimentacao || ""
    });
  });

  Object.entries(values).forEach(([key]) => {
    return key.includes("categoria") && delete values[key];
  });

  return { ...values, valores_medicao: valoresMedicao };
};
