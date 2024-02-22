import { ChangeEvent, useEffect, useState } from "react";

import { FormApi } from "final-form";

import { formatarOpcoesLote } from "helpers/utilities";

import { getDiretoriaregionalSimplissima } from "services/diretoriaRegional.service";
import { getLotesSimples } from "services/lote.service";

type Args = {
  values: Record<string, any>;
  form: FormApi;
};

type SelectOption = {
  uuid: string | number;
  nome: string;
};

type MultiSelectOption = {
  label: string;
  value: number;
};

// eslint-disable-next-line
export default ({ values, form }: Args) => {
  const [diretoriasRegionaisOpcoes, setDiretoriasRegionaisOpcoes] = useState<
    Array<SelectOption>
  >([]);
  const [lotesOpcoes, setLotesOpcoes] = useState<Array<MultiSelectOption>>([]);

  useEffect(() => {
    getDiretoriaregionalSimplissima().then((response) => {
      setDiretoriasRegionaisOpcoes(
        [{ nome: "Selecione uma DRE", uuid: null }].concat(
          response.data.results
        )
      );
    });
  }, []);

  const onChangeDRE = (e: ChangeEvent<HTMLInputElement>) => {
    getLotesSimples({ diretoria_regional__uuid: e.target.value }).then(
      (response) => {
        setLotesOpcoes(formatarOpcoesLote(response.data.results));
      }
    );
  };

  return { diretoriasRegionaisOpcoes, lotesOpcoes, onChangeDRE };
};
