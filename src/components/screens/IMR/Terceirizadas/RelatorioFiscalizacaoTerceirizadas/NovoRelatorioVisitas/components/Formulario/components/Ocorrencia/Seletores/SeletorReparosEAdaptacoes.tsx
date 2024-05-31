import React, { useEffect, useState } from "react";
import { Field } from "react-final-form";
import Select from "components/Shareable/Select";
import HTTP_STATUS from "http-status-codes";
import { required } from "helpers/fieldValidators";
import { getReparosEAdaptacoes } from "services/imr/relatorioFiscalizacaoTerceirizadas";
import { SelectOption } from "interfaces/option.interface";

type SeletorReparosEAdaptacoesType = {
  titulo: string;
  name: string;
};

export const SeletorReparosEAdaptacoes = ({
  ...props
}: SeletorReparosEAdaptacoesType) => {
  const { titulo, name } = props;
  const [options, setOptions] = useState<Array<SelectOption>>([]);

  const getOptionsAsync = async () => {
    const response = await getReparosEAdaptacoes();
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
      options={[
        { nome: "Selecione um Reparo e Adaptação", uuid: "" },
        ...options,
      ]}
      label={titulo}
      name={name}
      className="seletor-tipo-alimentacao"
      required
      validate={required}
    />
  );
};
