import React from "react";
import { Field } from "react-final-form";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import { required } from "helpers/fieldValidators";

type CampoTextoLongoType = {
  titulo: string;
  name: string;
  somenteLeitura: boolean;
};

export const CampoTextoLongo = ({ ...props }: CampoTextoLongoType) => {
  const { titulo, name, somenteLeitura } = props;

  return (
    <Field
      component={TextArea}
      label={titulo}
      name={name}
      height="100"
      required
      validate={required}
      disabled={somenteLeitura}
    />
  );
};
