import React from "react";

import CollapseFiltros from "components/Shareable/CollapseFiltros";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";

import FormFiltro from "./components/FormFiltro";
import CardResultado from "./components/CardResultado";

export default () => {
  const filtrar = () => {};
  const limparFiltro = () => {};
  const exportarPDF = () => {};

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
        <div className="d-flex gap-2 mt-4">
          <CardResultado
            titulo="Total de Solicitações"
            classeCor="azul-escuro"
            total={1253}
          />
          <CardResultado
            titulo="Autorizadas"
            classeCor="verde-claro"
            total={1000}
          />
          <CardResultado titulo="Negadas" classeCor="laranja" total={53} />
          <CardResultado titulo="Canceladas" classeCor="vermelho" total={100} />
        </div>
        <div className="d-flex justify-content-end mt-5">
          <Botao
            texto="Baixar PDF"
            style={BUTTON_STYLE.GREEN_OUTLINE}
            icon={BUTTON_ICON.FILE_PDF}
            type={BUTTON_TYPE.BUTTON}
            onClick={() => exportarPDF()}
          />
        </div>
      </div>
    </div>
  );
};
