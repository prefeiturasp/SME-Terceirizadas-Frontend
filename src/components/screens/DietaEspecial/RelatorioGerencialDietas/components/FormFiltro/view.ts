import { FormApi } from "final-form";

import { MESES } from "constants/shared";

type Args = {
  values: Record<string, any>;
  form: FormApi;
};

type MultiSelectOption = {
  label: string;
  value: number;
};

const MES_OPCOES: Array<MultiSelectOption> = MESES.map(
  (m: string, k: number) => ({
    label: m.toUpperCase(),
    value: k,
  })
);

const getAnoVigente = () => new Date().getFullYear();

export default ({ values, form }: Args) => {
  const getDataMinimaMaxima = () => {
    let dataMinima: Date, dataMaxima: Date;
    if (
      selecionouAno &&
      !selecionouMaisDeUmAno &&
      selecionouMes &&
      !selecionouMaisDeUmMes
    ) {
      dataMinima = new Date(values.ano[0], values.mes[0], 1);
      dataMaxima = new Date(values.ano[0], values.mes[0] + 1, 0);
    } else if (selecionouAno && !selecionouMaisDeUmAno) {
      dataMinima = new Date(values.ano[0], 0, 1);
      dataMaxima = new Date(values.ano[0], 12, 0);
    } else if (selecionouMes && !selecionouMaisDeUmMes) {
      dataMinima = new Date(anoVigente, values.mes[0], 1);
      dataMaxima = new Date(anoVigente, values.mes[0] + 1, 0);
    }
    return [dataMinima, dataMaxima];
  };

  const anoVigente = getAnoVigente();

  const selecionouMaisDeUmAno = values.ano?.length > 1;
  const selecionouMaisDeUmMes = values.mes?.length > 1;
  const selecionouAno = values.ano?.length > 0;
  const selecionouMes = values.mes?.length > 0;

  const anoOpcoes: Array<MultiSelectOption> = ["2024", "2023", "2022"].map(
    (a: string) => ({
      label: a,
      value: Number(a),
    })
  );

  if (!values.ano) {
    form.change("ano", [anoVigente]);
  }

  if (selecionouMaisDeUmAno) {
    form.change("mes", null);
    form.change("dia", null);
  }

  if (selecionouMaisDeUmMes) {
    form.change("dia", null);
  }

  const [dataMinima, dataMaxima] = getDataMinimaMaxima();

  return {
    anoOpcoes,
    MES_OPCOES,
    selecionouMaisDeUmAno,
    selecionouMaisDeUmMes,
    dataMinima,
    dataMaxima,
  };
};
