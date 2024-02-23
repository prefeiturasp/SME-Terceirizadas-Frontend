import React, { useState } from "react";

import CollapseFiltros from "components/Shareable/CollapseFiltros";
import { SigpaeLogoLoader } from "components/Shareable/SigpaeLogoLoader";

import FormFiltro from "./components/FormFiltro";

export default () => {
  const [loading, setLoading] = useState(false);

  const filtrar = async (values: Record<string, any>) => {
    // eslint-disable-next-line
    console.log(values);

    setLoading(true);
    setLoading(false);
  };

  const limparFiltro = () => {};

  return (
    <div className="card mt-3">
      <div className="card-body">
        <CollapseFiltros
          onSubmit={filtrar}
          onClear={limparFiltro}
          titulo="Filtrar Resultados"
        >
          {(_, form) => <FormFiltro form={form} />}
        </CollapseFiltros>

        {loading ? (
          <SigpaeLogoLoader />
        ) : (
          <div className="d-flex gap-2 mt-4"></div>
        )}
      </div>
    </div>
  );
};
