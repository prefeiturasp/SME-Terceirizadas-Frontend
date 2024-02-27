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

export type Option = {
  label: string;
  value: any;
};
