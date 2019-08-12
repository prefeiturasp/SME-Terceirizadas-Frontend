export const validateSubmit = (values, state) => {
  values["substituicoes"] = [];

  if (values.substituicoes_MANHA && values.substituicoes_MANHA.check) {
    values["substituicoes"].push({
      periodo_escolar: values.substituicoes_MANHA.periodo,
      tipos_alimentacao: values.substituicoes_MANHA.tipo_de_refeicao,
      qtd_alunos: values.substituicoes_MANHA.numero_de_alunos
    });
  }
  delete values["substituicoes_MANHA"];

  if (values.substituicoes_TARDE && values.substituicoes_TARDE.check) {
    values["substituicoes"].push({
      periodo_escolar: values.substituicoes_TARDE.periodo,
      tipos_alimentacao: values.substituicoes_TARDE.tipo_de_refeicao,
      qtd_alunos: values.substituicoes_TARDE.numero_de_alunos
    });
  }
  delete values["substituicoes_TARDE"];

  if (values.substituicoes_NOITE && values.substituicoes_NOITE.check) {
    values["substituicoes"].push({
      periodo_escolar: values.substituicoes_NOITE.periodo,
      tipos_alimentacao: values.substituicoes_NOITE.tipo_de_refeicao,
      qtd_alunos: values.substituicoes_NOITE.numero_de_alunos
    });
  }
  delete values["substituicoes_NOITE"];

  if (values.substituicoes_INTEGRAL && values.substituicoes_INTEGRAL.check) {
    values["substituicoes"].push({
      periodo_escolar: values.substituicoes_INTEGRAL.periodo,
      tipos_alimentacao: values.substituicoes_INTEGRAL.tipo_de_refeicao,
      qtd_alunos: values.substituicoes_INTEGRAL.numero_de_alunos
    });
  }
  delete values["substituicoes_INTEGRAL"];

  if (temPeriodosEscolares(values)) return "Obrigatório ao menos um período";

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
