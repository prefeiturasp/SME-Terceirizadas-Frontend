export const validarSubmissao = (values, meusDados) => {
  let aoMenosUmPeriodo = false;
  let totalAlunos = 0;
  values.quantidades_periodo.forEach(quantidade_periodo => {
    if (quantidade_periodo.checked) {
      aoMenosUmPeriodo = true;
      totalAlunos += parseInt(quantidade_periodo.numero_alunos);
    }
  });
  if (!aoMenosUmPeriodo) return "Necessário ao selecionar ao menos um período";
  if (meusDados.vinculo_atual.instituicao.quantidade_alunos < totalAlunos)
    return "Número total de alunos do pedido ultrapassa quantidade de alunos da escola";
  return false;
};
