import React from "react";

import CollapseFiltros from "components/Shareable/CollapseFiltros";

import FormFiltro from "./components/FormFiltro";

export default () => {
  const filtrar = () => {};
  const limparFiltro = () => {};

  return (
    <div className="card mt-3">
      <div className="card-body">
        <CollapseFiltros
          onSubmit={filtrar}
          onClear={limparFiltro}
          titulo="Filtrar Resultados"
        >
          {(values, form) => <FormFiltro values={values} form={form} />}
        </CollapseFiltros>
      </div>
    </div>
  );
};
