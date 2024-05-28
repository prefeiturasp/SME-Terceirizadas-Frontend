import React from "react";
import { Field } from "react-final-form";
import { InputText } from "components/Shareable/Input/InputText";
import { required } from "helpers/fieldValidators";

type CampodeTextoSimplesType = {
  titulo: string;
  name: string;
};

export const CampodeTextoSimples = ({ ...props }: CampodeTextoSimplesType) => {
  const { titulo, name } = props;

  return (
    <Field
      component={InputText}
      label={titulo}
      name={name}
      required
      validate={required}
    />
  );
};
