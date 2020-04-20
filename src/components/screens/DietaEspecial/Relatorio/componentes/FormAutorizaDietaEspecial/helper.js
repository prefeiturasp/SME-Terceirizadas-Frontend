const CAMPOS_A_PREENCHER = ['alimento', 'tipo', 'substitutos']

export const validateSubstituicao = substituicao => {
  const chaves = Object.keys(substituicao)
  const camposNaoPreenchidos = []
  CAMPOS_A_PREENCHER.forEach(campo => {
    if (!chaves.includes(campo)) {
      camposNaoPreenchidos.push(campo)
    }
    if (campo === "substitutos" && substituicao.substitutos && substituicao.substitutos.length === 0) {
      camposNaoPreenchidos.push(campo)
    }
  })
  if (camposNaoPreenchidos.length === 0) {
    return undefined
  }
  return `Falta preencher ${camposNaoPreenchidos.join(', ')}`
}
