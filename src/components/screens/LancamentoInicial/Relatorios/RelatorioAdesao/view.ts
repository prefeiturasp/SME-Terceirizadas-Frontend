import { useState } from "react";

import { toastError } from "components/Shareable/Toast/dialogs";

import RelatorioService from "services/medicaoInicial/relatorio.service";
import { RelatorioAdesaoResponse } from "services/medicaoInicial/relatorio.interface";

import { Filtros } from "./types";

export default () => {
  const [loading, setLoading] = useState(false);

  const [filtros, setFiltros] = useState<Filtros | null>(null);
  const [resultado, setResultado] = useState<RelatorioAdesaoResponse>(null);

  const filtrar = async (values: Filtros) => {
    setLoading(true);

    try {
      const dados = await RelatorioService.getRelatorioAdesao({
        mes_ano: values.mes,
        diretoria_regional: values.dre,
        lotes: values.lotes,
        escola: values.unidade_educacional,
        periodos_escolares: values.periodos,
        tipos_alimentacao: values.tipos_alimentacao,
      });

      setResultado(dados);
    } catch (e) {
      toastError("Não foi possível obter os resultados");
    }

    setLoading(false);
  };

  const limparFiltro = () => {
    setFiltros(null);
    setResultado(null);
  };

  const atualizaFiltros = (values: Filtros) => {
    setFiltros((prev) => {
      if (prev) return { ...prev, ...values };
      return values;
    });
  };

  return {
    loading,
    filtros,
    resultado,
    filtrar,
    limparFiltro,
    atualizaFiltros,
  };
};
