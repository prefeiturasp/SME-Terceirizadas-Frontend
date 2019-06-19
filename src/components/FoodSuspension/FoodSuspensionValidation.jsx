export const validateSubmit = (values, state) => {
  values["descricoes"] = [];
  if (values.descricoes_first_period && values.descricoes_first_period.check) {
    values["descricoes"].push(values.descricoes_first_period);
  }
  delete values["descricoes_first_period"];
  if (
    values.descricoes_second_period &&
    values.descricoes_second_period.check
  ) {
    values["descricoes"].push(values.descricoes_second_period);
  }
  delete values["descricoes_second_period"];
  if (values.descricoes_third_period && values.descricoes_third_period.check) {
    values["descricoes"].push(values.descricoes_third_period);
  }
  delete values["descricoes_third_period"];
  if (
    values.descricoes_fourth_period &&
    values.descricoes_fourth_period.check
  ) {
    values["descricoes"].push(values.descricoes_fourth_period);
  }
  delete values["descricoes_fourth_period"];
  if (values.descricoes_integrate && values.descricoes_integrate.check) {
    values["descricoes"].push(values.descricoes_integrate);
  }
  delete values["descricoes_integrate"];
  if (values.dias_razoes[0].razao.includes("Programa Contínuo")) {
    delete values.dias_razoes[0]["date"];
  }
  return false;
};
