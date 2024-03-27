import { RelatorioAdesaoResponse } from "services/medicaoInicial/relatorio.interface";

import { Filtros } from "../../types";

export type Props = {
  params: Filtros;
  filtros: Filtros;
  resultado: RelatorioAdesaoResponse;
  exibirTitulo: boolean;
};
