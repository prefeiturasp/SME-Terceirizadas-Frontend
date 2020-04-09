export const validarSubmissao = (values, meusDados) => {
  let aoMenosUmPeriodo = false;

  let totalAlunos = 0;

  values.quantidades_periodo.forEach(quantidade_periodo => {
    if (quantidade_periodo.checked) {
      aoMenosUmPeriodo = true;
      totalAlunos += parseInt(quantidade_periodo.numero_alunos);
    }
  });

  if (
    values.quantidades_periodo_MANHA &&
    values.quantidades_periodo_MANHA.check
  ) {
    if (
      !values.quantidades_periodo_MANHA.tipos_alimentacao ||
      values.quantidades_periodo_MANHA.tipos_alimentacao.length === 0
    ) {
      return "Favor selecione o tipo de alimentação do periodo da manhã";
    }
  }

  if (
    values.quantidades_periodo_TARDE &&
    values.quantidades_periodo_TARDE.check
  ) {
    if (
      !values.quantidades_periodo_TARDE.tipos_alimentacao ||
      values.quantidades_periodo_TARDE.tipos_alimentacao.length === 0
    ) {
      return "Favor selecione o tipo de alimentação do periodo da tarde";
    }
  }

  if (
    values.quantidades_periodo_INTEGRAL &&
    values.quantidades_periodo_INTEGRAL.check
  ) {
    if (
      !values.quantidades_periodo_INTEGRAL.tipos_alimentacao ||
      values.quantidades_periodo_INTEGRAL.tipos_alimentacao.length === 0
    ) {
      return "Favor selecione o tipo de alimentação do periodo integral";
    }
  }

  if (!aoMenosUmPeriodo) return "Necessário selecionar ao menos um período";

  if (meusDados.vinculo_atual.instituicao.quantidade_alunos < totalAlunos)
    return "Número total de alunos do pedido ultrapassa quantidade de alunos da escola";

  return false;
};
