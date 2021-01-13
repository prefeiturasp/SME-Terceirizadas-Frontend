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
        if (!valor.length) {
          setResultadoFiltrado(dataSource);
        }
        const reg = new RegExp(trocaAcentuadasPorSemAcento(valor), "i");
        setResultadoFiltrado(
          dataSource.filter(el => reg.test(trocaAcentuadasPorSemAcento(el)))
        );
      }}
    />
  );
};
