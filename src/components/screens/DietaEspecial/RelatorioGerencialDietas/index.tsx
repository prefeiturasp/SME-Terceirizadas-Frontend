import React, { useState } from "react";

import CollapseFiltros from "components/Shareable/CollapseFiltros";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import { SigpaeLogoLoader } from "components/Shareable/SigpaeLogoLoader";

import FormFiltro from "./components/FormFiltro";
import CardResultado from "./components/CardResultado";

import { buscaTotaisRelatorioGerencialDietas } from "services/painelNutricionista.service";

type Totais = {
  total_solicitacoes: number;
  total_autorizadas: number;
  total_negadas: number;
  total_canceladas: number;
};

const getAnoVigente = () => new Date().getFullYear();

export default () => {
  const [loading, setLoading] = useState(true);
  const [totais, setTotais] = useState<Totais | Record<string, number>>({});

  const filtrar = async (values: Record<string, any>) => {
    setLoading(true);
    const params = {
      anos: Array.isArray(values.anos) ? values.anos.join() : null,
      meses: Array.isArray(values.meses) ? values.meses.join() : null,
      dia: values.dia || null,
    };
    const data = await buscaTotaisRelatorioGerencialDietas(params);
    setTotais(data);
    setLoading(false);
  };

  const limparFiltro = () => {
    filtrar({
      anos: [getAnoVigente()],
    });
  };

  const exportarPDF = () => {};

  return (
    <div className="card mt-3">
      <div className="card-body">
        <CollapseFiltros
          onSubmit={filtrar}
          onClear={limparFiltro}
          titulo="Filtrar Resultados"
        >
          {(values, form) => (
            <FormFiltro
              values={values}
              form={form}
              anoVigente={getAnoVigente()}
            />
          )}
        </CollapseFiltros>

        {loading ? (
          <SigpaeLogoLoader />
        ) : (
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
        )}

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
