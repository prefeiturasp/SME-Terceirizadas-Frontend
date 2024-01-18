import React, { useState } from "react";

import CollapseFiltros from "components/Shareable/CollapseFiltros";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";

import FormFiltro from "./components/FormFiltro";
import CardResultado from "./components/CardResultado";

import { buscaTotaisRelatorioGerencialDietas } from "services/dietaEspecial.service";

type Totais = {
  total_solicitacoes: number;
  total_autorizadas: number;
  total_negadas: number;
  total_canceladas: number;
};

export default () => {
  const [totais, setTotais] = useState<Totais | Record<string, number>>({});

  const filtrar = async () => {
    const data = await buscaTotaisRelatorioGerencialDietas();
    setTotais(data);
  };

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
            total={totais.total_solicitacoes ?? 0}
          />
          <CardResultado
            titulo="Autorizadas"
            classeCor="verde-claro"
            total={totais.total_autorizadas ?? 0}
          />
          <CardResultado
            titulo="Negadas"
            classeCor="laranja"
            total={totais.total_negadas ?? 0}
          />
          <CardResultado
            titulo="Canceladas"
            classeCor="vermelho"
            total={totais.total_canceladas ?? 0}
          />
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
