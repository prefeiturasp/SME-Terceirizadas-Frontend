import React from "react";
import AutoCompleteField from ".";
import { trocaAcentuadasPorSemAcento } from "./helpers";

export default ({ ...props }) => {
  return (
    <AutoCompleteField
      {...props}
      filterOption={(inputValue, option) => {
        // eslint-disable-next-line no-console
        console.log({ inputValue, option });
        const reg = new RegExp(trocaAcentuadasPorSemAcento(inputValue), "i");
        return reg.test(trocaAcentuadasPorSemAcento(option.key));
      }}
    />
  );
};
