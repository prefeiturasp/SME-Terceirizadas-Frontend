import React from "react";
import AutoCompleteField from ".";
import { trocaAcentuadasPorSemAcento } from "./helpers";

export default ({ ...props }) => {
  return (
    <AutoCompleteField
      {...props}
      filterOption={(inputValue, option) => {
        const reg = new RegExp(trocaAcentuadasPorSemAcento(inputValue), "i");
        return reg.test(trocaAcentuadasPorSemAcento(option.props.children));
      }}
    />
  );
};
