export const validateSubmit = (values, meusDados) => {
  values["substituicoes"] = [];
  let totalAlunos = 0;

  if (values.substituicoes_MANHA && values.substituicoes_MANHA.check) {
    totalAlunos += parseInt(values.substituicoes_MANHA.numero_de_alunos);
    values["substituicoes"].push({
      periodo_escolar: values.substituicoes_MANHA.periodo,
      tipo_alimentacao_de: values.substituicoes_MANHA.tipo_alimentacao_de,
      tipo_alimentacao_para: values.substituicoes_MANHA.tipo_alimentacao_para,
      qtd_alunos: values.substituicoes_MANHA.numero_de_alunos
    });
  }

  if (values.substituicoes_TARDE && values.substituicoes_TARDE.check) {
    totalAlunos += parseInt(values.substituicoes_TARDE.numero_de_alunos);
    values["substituicoes"].push({
      periodo_escolar: values.substituicoes_TARDE.periodo,
      tipo_alimentacao_de: values.substituicoes_TARDE.tipo_alimentacao_de,
      tipo_alimentacao_para: values.substituicoes_TARDE.tipo_alimentacao_para,
      qtd_alunos: values.substituicoes_TARDE.numero_de_alunos
    });
  }

  if (values.substituicoes_NOITE && values.substituicoes_NOITE.check) {
    totalAlunos += parseInt(values.substituicoes_NOITE.numero_de_alunos);
    values["substituicoes"].push({
      periodo_escolar: values.substituicoes_NOITE.periodo,
      tipo_alimentacao_de: values.substituicoes_NOITE.tipo_alimentacao_de,
      tipo_alimentacao_para: values.substituicoes_NOITE.tipo_alimentacao_para,
      qtd_alunos: values.substituicoes_NOITE.numero_de_alunos
    });
  }

  if (values.substituicoes_INTEGRAL && values.substituicoes_INTEGRAL.check) {
    totalAlunos += parseInt(values.substituicoes_INTEGRAL.numero_de_alunos);
    values["substituicoes"].push({
      periodo_escolar: values.substituicoes_INTEGRAL.periodo,
      tipo_alimentacao_de: values.substituicoes_INTEGRAL.tipo_alimentacao_de,
      tipo_alimentacao_para:
        values.substituicoes_INTEGRAL.tipo_alimentacao_para,
      qtd_alunos: values.substituicoes_INTEGRAL.numero_de_alunos
    });
  }

  if (temPeriodosEscolares(values)) return "Obrigatório ao menos um período";

  if (totalAlunos > meusDados.vinculo_atual.instituicao.quantidade_alunos) {
    return "Número de alunos do pedido maior que a quantidade de alunos da escola";
  } else {
    delete values["substituicoes_MANHA"];
    delete values["substituicoes_TARDE"];
    delete values["substituicoes_NOITE"];
    delete values["substituicoes_INTEGRAL"];
  }

  if (values["alterar_dia"]) {
    values["data_inicial"] = values["alterar_dia"];
    values["data_final"] = values["alterar_dia"];
  }

  if (
    !(values["alterar_dia"] || values["data_inicial"] || values["data_final"])
  )
    return "Obrigatório informar uma data ou período.";

  if (values["data_inicial"] > values["data_final"])
    return "Data inicial deve ser anterior à data final.";

  if (
    (values["data_inicial"] && !values["data_final"]) ||
    (values["data_final"] && !values["data_inicial"])
  )
    return "Informe um período completo.";

  return false;
};
function temPeriodosEscolares(values) {
  return values["substituicoes"].length === 0;
}
