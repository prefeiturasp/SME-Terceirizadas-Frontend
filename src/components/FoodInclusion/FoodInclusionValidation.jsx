export const validateSubmit = (values, state) => {
  if (values.description_first_period && !values.description_first_period.check)
    delete values["description_first_period"];
  if (
    values.description_second_period &&
    !values.description_second_period.check
  )
    delete values["description_second_period"];
  if (values.description_third_period && !values.description_third_period.check)
    delete values["description_third_period"];
  if (
    values.description_fourth_period &&
    !values.description_fourth_period.check
  )
    delete values["description_fourth_period"];
  if (values.description_integrate && !values.description_integrate.check)
    delete values["description_integrate"];

  if (values.date) {
    const _date = values.date.split("/");
    const _two_working_days = state.two_working_days.split("/");
    if (
      new Date(_date[2], _date[1] - 1, _date[0]) <
      new Date(
        _two_working_days[2],
        _two_working_days[1] - 1,
        _two_working_days[0]
      )
    ) {
      return "Necessário ao menos 2 dias úteis para o pedido";
    }
  }
  return false;
};
