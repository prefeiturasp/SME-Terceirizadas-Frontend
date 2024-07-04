import React from "react";
import { Field } from "react-final-form";
import { InputText } from "components/Shareable/Input/InputText";
import { required } from "helpers/fieldValidators";

type CampoNumericoType = {
  titulo: string;
  name: string;
  somenteLeitura: boolean;
};

export const CampoNumerico = ({ ...props }: CampoNumericoType) => {
  const { titulo, name, somenteLeitura } = props;

  return (
    <Field
      component={InputText}
      label={titulo}
      name={name}
      type="number"
      min={0}
      required
      validate={required}
      disabled={somenteLeitura}
    />
  );
};
