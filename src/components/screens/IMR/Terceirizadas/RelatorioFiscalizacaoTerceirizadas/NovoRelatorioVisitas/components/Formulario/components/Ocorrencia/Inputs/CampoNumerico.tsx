import React from "react";
import { Field } from "react-final-form";
import { InputText } from "components/Shareable/Input/InputText";
import { required } from "helpers/fieldValidators";

type CampoNumericoType = {
  titulo: string;
  name: string;
};

export const CampoNumerico = ({ ...props }: CampoNumericoType) => {
  const { titulo, name } = props;

  return (
    <Field
      component={InputText}
      label={titulo}
      name={name}
      type="number"
      required
      validate={required}
    />
  );
};
