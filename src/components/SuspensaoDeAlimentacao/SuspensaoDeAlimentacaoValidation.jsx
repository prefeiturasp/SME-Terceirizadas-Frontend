export const validateSubmit = (values, state) => {
  values["suspensoes"] = [];

  if (values.suspensoes_MANHA && values.suspensoes_MANHA.check) {
    values["suspensoes"].push({
      periodo_escolar: values.suspensoes_MANHA.periodo,
      tipos_alimentacao: values.suspensoes_MANHA.tipo_de_refeicao,
      numero_alunos: values.suspensoes_MANHA.numero_de_alunos
    });
  }
  delete values["suspensoes_MANHA"];


  if (values.suspensoes_TARDE && values.suspensoes_TARDE.check) {
    values["suspensoes"].push({
      periodo_escolar: values.suspensoes_TARDE.periodo,
      tipos_alimentacao: values.suspensoes_TARDE.tipo_de_refeicao,
      numero_alunos: values.suspensoes_TARDE.numero_de_alunos
    });
  }
  delete values["suspensoes_TARDE"];

  if (values.suspensoes_NOITE && values.suspensoes_NOITE.check) {
    values["suspensoes"].push({
      periodo_escolar: values.suspensoes_NOITE.periodo,
      tipos_alimentacao: values.suspensoes_NOITE.tipo_de_refeicao,
      numero_alunos: values.suspensoes_NOITE.numero_de_alunos
    });
  }
  delete values["suspensoes_NOITE"];


  if (values.suspensoes_INTEGRAL && values.suspensoes_INTEGRAL.check) {
    values["suspensoes"].push({
      periodo_escolar: values.suspensoes_INTEGRAL.periodo,
      tipos_alimentacao: values.suspensoes_INTEGRAL.tipo_de_refeicao,
      numero_alunos: values.suspensoes_INTEGRAL.numero_de_alunos
    });
  }
  delete values["suspensoes_INTEGRAL"];

  if (values['suspensoes'].length === 0) return "Obrigatório ao menos um período"
  return false;
};
