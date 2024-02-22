// eslint-disable-next-line
import { useEffect, useState } from "react";

import { FormApi } from "final-form";

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
  useEffect(() => {}, []);

  return {};
};
