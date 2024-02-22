// eslint-disable-next-line
import { useEffect, useState } from "react";

import { FormApi } from "final-form";

import { getDiretoriaregionalSimplissima } from "services/diretoriaRegional.service";

type Args = {
  values: Record<string, any>;
  form: FormApi;
};

// eslint-disable-next-line
type MultiSelectOption = {
  label: string;
  value: number;
};

// eslint-disable-next-line
export default ({ values, form }: Args) => {
  const [diretoriasRegionaisOptions, setDiretoriasRegionaisOptions] = useState(
    []
  );

  useEffect(() => {
    getDiretoriaregionalSimplissima().then((response) => {
      setDiretoriasRegionaisOptions(
        [{ nome: "Selecione uma DRE", uuid: null }].concat(
          response.data.results
        )
      );
    });
  }, []);

  return { diretoriasRegionaisOptions };
};
