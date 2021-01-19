import React, { useState } from "react";
import AutoCompleteField from ".";
import { trocaAcentuadasPorSemAcento } from "./helpers";

export default ({ dataSource, ...props }) => {
  const [resultadoFiltrado, setResultadoFiltrado] = useState(dataSource);
  return (
    <AutoCompleteField
      {...props}
      dataSource={resultadoFiltrado}
      onSearch={valor => {
        // eslint-disable-next-line no-console
        console.log("onSearch.valor", valor);
        if (!valor.length) {
          setResultadoFiltrado(dataSource);
        }
        const reg = new RegExp(trocaAcentuadasPorSemAcento(valor), "i");
        setResultadoFiltrado(
          dataSource.filter(el => {
            // eslint-disable-next-line no-console
            console.log({
              el,
              "trocaAcentuadasPorSemAcento(el)": trocaAcentuadasPorSemAcento(el)
            });
            return reg.test(trocaAcentuadasPorSemAcento(el));
          })
        );
      }}
    />
  );
};
