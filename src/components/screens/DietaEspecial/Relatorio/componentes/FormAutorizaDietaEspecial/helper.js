const CAMPOS_A_PREENCHER = ["alimento", "tipo", "substitutos"];

export const validateSubstituicao = substituicao => {
  const camposNaoPreenchidos = CAMPOS_A_PREENCHER.filter(
    campo =>
      !Object.keys(substituicao).includes(campo) ||
      (campo === "substitutos" &&
        substituicao.substitutos &&
        substituicao.substitutos.length === 0)
  );
  return camposNaoPreenchidos.length === 0
    ? undefined
    : `Falta preencher ${camposNaoPreenchidos.join(", ")}`;
};
