import { FormApi } from "final-form";

import { Filtros } from "../../types";

export type Args = {
  form: FormApi;
  // eslint-disable-next-line
  onChange: (values: Filtros) => void;
};

export type SelectOption = {
  uuid: string | number;
  nome: string;
};

export type MultiSelectOption = {
  label: string;
  value: string | number;
};

export type Option = {
  label: string;
  value: any;
};
