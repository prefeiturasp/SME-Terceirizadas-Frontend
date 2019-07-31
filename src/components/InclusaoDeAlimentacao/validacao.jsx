export const validarSubmissao = values => {
  let aoMenosUmPeriodo = false;
  values.quantidades_periodo.forEach(quantidade_periodo => {
    if (quantidade_periodo.checked)
      aoMenosUmPeriodo = true;
  })
  if (!aoMenosUmPeriodo) return "Necessário ao selecionar ao menos um período"
  return false;
}
