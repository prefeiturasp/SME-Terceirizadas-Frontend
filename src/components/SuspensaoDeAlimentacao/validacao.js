export const validateSubmit = (values, meusDados) => {
  values["suspensoes"] = [];
  let totalAlunos = 0;

  if (values.suspensoes_MANHA && values.suspensoes_MANHA.check) {
    totalAlunos += parseInt(values.suspensoes_MANHA.numero_de_alunos);
    values["suspensoes"].push({
      periodo_escolar: values.suspensoes_MANHA.periodo,
      tipos_alimentacao: values.suspensoes_MANHA.tipo_de_refeicao,
      numero_alunos: values.suspensoes_MANHA.numero_de_alunos
    });
  }

  if (values.suspensoes_TARDE && values.suspensoes_TARDE.check) {
    totalAlunos += parseInt(values.suspensoes_TARDE.numero_de_alunos);
    values["suspensoes"].push({
      periodo_escolar: values.suspensoes_TARDE.periodo,
      tipos_alimentacao: values.suspensoes_TARDE.tipo_de_refeicao,
      numero_alunos: values.suspensoes_TARDE.numero_de_alunos
    });
  }

  if (values.suspensoes_NOITE && values.suspensoes_NOITE.check) {
    totalAlunos += parseInt(values.suspensoes_NOITE.numero_de_alunos);
    values["suspensoes"].push({
      periodo_escolar: values.suspensoes_NOITE.periodo,
      tipos_alimentacao: values.suspensoes_NOITE.tipo_de_refeicao,
      numero_alunos: values.suspensoes_NOITE.numero_de_alunos
    });
  }

  if (values.suspensoes_INTEGRAL && values.suspensoes_INTEGRAL.check) {
    totalAlunos += parseInt(values.suspensoes_INTEGRAL.numero_de_alunos);
    values["suspensoes"].push({
      periodo_escolar: values.suspensoes_INTEGRAL.periodo,
      tipos_alimentacao: values.suspensoes_INTEGRAL.tipo_de_refeicao,
      numero_alunos: values.suspensoes_INTEGRAL.numero_de_alunos
    });
  }

  if (
    meusDados &&
    meusDados.escolas.length &&
    totalAlunos > meusDados.escolas[0].quantidade_alunos
  ) {
    return "Número de alunos do pedido maior que a quantidade de alunos da escola";
  } else {
    delete values["substituicoes_MANHA"];
    delete values["substituicoes_TARDE"];
    delete values["substituicoes_NOITE"];
    delete values["substituicoes_INTEGRAL"];
  }

  if (values["suspensoes"].length === 0)
    return "Obrigatório ao menos um período";
  return false;
};
