import { FormApi } from "final-form";

export type Args = {
  form: FormApi;
};

export type SelectOption = {
  uuid: string | number;
  nome: string;
};

export type MultiSelectOption = {
  label: string;
  value: string | number;
};

export type EscolasSimplissimaParams =
  | { diretoria_regional__uuid: string; lote__uuid: string }
  | Record<string, any>;

export type Option = {
  label: string;
  value: any;
};
