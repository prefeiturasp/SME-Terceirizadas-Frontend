import React, { useState } from "react";

import CollapseFiltros from "components/Shareable/CollapseFiltros";
import { SigpaeLogoLoader } from "components/Shareable/SigpaeLogoLoader";

import FormFiltro from "./components/FormFiltro";
import TabelaResultado from "./components/TabelaResultado";

import { Filtros } from "./types";

export default () => {
  const [loading, setLoading] = useState(false);

  const [filtros, setFiltros] = useState<Filtros | null>(null);

  const filtrar = async (values: Filtros) => {
    setLoading(true);
    setFiltros(values);
    setLoading(false);
  };

  const limparFiltro = () => {
    setFiltros(null);
  };

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
          <div className="d-flex gap-2 mt-4">
            <TabelaResultado filtros={filtros} />
          </div>
        )}
      </div>
    </div>
  );
};
