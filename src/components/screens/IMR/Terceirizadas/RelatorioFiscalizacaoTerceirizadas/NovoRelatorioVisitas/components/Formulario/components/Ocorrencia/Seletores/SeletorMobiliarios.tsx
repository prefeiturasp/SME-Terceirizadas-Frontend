import React, { useEffect, useState } from "react";
import { Field } from "react-final-form";
import Select from "components/Shareable/Select";
import HTTP_STATUS from "http-status-codes";
import { required } from "helpers/fieldValidators";
import { getMobiliarios } from "services/imr/relatorioFiscalizacaoTerceirizadas";
import { SelectOption } from "interfaces/option.interface";

type SeletorMobiliariosType = {
  titulo: string;
  name: string;
};

export const SeletorMobiliarios = ({ ...props }: SeletorMobiliariosType) => {
  const { titulo, name } = props;
  const [options, setOptions] = useState<Array<SelectOption>>([]);

  const getOptionsAsync = async () => {
    const response = await getMobiliarios();
    if (response.status === HTTP_STATUS.OK) {
      const itemsMap: Map<string, SelectOption> = new Map();

      response.data.results.forEach((item) => {
        itemsMap.set(item.nome, {
          nome: item.nome,
          uuid: item.uuid,
        });
      });

      setOptions(Array.from(itemsMap.values()));
    }
  };

  useEffect(() => {
    getOptionsAsync();
  }, []);

  return (
    <Field
      component={Select}
      naoDesabilitarPrimeiraOpcao
      options={[{ nome: "Selecione um Mobiliário", uuid: "" }, ...options]}
      label={titulo}
      name={name}
      className="seletor-imr"
      required
      validate={required}
    />
  );
};
