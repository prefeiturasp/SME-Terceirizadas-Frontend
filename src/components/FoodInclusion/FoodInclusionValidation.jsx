export const validateSubmit = (values) => {
  if (
    values.description_first_period &&
    !values.description_first_period.check
  )
    delete values["description_first_period"];
  if (
    values.description_second_period &&
    !values.description_second_period.check
  )
    delete values["description_second_period"];
  if (
    values.description_third_period &&
    !values.description_third_period.check
  )
    delete values["description_third_period"];
  if (
    values.description_fourth_period &&
    !values.description_fourth_period.check
  )
    delete values["description_fourth_period"];
  if (values.description_integrate && !values.description_integrate.check)
    delete values["description_integrate"];
};
