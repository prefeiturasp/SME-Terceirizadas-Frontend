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
        // eslint-disable-next-line no-console
        console.log({
          reg,
          "trocaAcentuadasPorSemAcento(inputValue)": trocaAcentuadasPorSemAcento(
            inputValue
          ),
          "trocaAcentuadasPorSemAcento(option.props.children)": trocaAcentuadasPorSemAcento(
            option.props.children
          ),
          "reg.test(trocaAcentuadasPorSemAcento(option.props.children))": reg.test(
            trocaAcentuadasPorSemAcento(option.props.children)
          )
        });
        return reg.test(trocaAcentuadasPorSemAcento(option.props.children));
      }}
    />
  );
};
