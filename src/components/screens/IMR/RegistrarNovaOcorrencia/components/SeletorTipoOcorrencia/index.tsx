import { Select } from "components/Shareable/Select";
import { required } from "helpers/fieldValidators";
import { TipoOcorrenciaInterface } from "interfaces/imr.interface";
import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Field } from "react-final-form";
import { RegistrarNovaOcorrenciaFormInterface } from "../../interfaces";

type SeletorTipoOcorrenciaType = {
  setTipoOcorrencia: Dispatch<SetStateAction<TipoOcorrenciaInterface>>;
  tiposOcorrencia: Array<TipoOcorrenciaInterface>;
  tiposOcorrenciaDaCategoria: Array<TipoOcorrenciaInterface>;
  values: RegistrarNovaOcorrenciaFormInterface;
};

export const SeletorTipoOcorrencia = ({
  ...props
}: SeletorTipoOcorrenciaType) => {
  const {
    setTipoOcorrencia,
    tiposOcorrenciaDaCategoria,
    tiposOcorrencia,
    values,
  } = props;

  return (
    <Field
      component={Select}
      name="tipo_ocorrencia"
      label="Tipos de Ocorrência"
      options={[
        {
          nome: "Selecione um tipo de ocorrência",
          uuid: "",
        },
        ...tiposOcorrenciaDaCategoria,
      ]}
      required
      validate={required}
      disabled={!values.categoria}
      naoDesabilitarPrimeiraOpcao
      onChangeEffect={(e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTipoOcorrencia(
          tiposOcorrencia.find(
            (tipoOcorrencia) => tipoOcorrencia.uuid === value
          )
        );
      }}
    />
  );
};
