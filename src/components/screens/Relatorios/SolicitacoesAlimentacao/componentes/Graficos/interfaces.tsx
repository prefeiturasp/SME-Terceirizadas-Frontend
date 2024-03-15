import { ChartData } from "components/Shareable/Graficos/interfaces";
import { ResponseInterface } from "interfaces/responses.interface";

export interface ResponseDatasetsGraficosRelatorioSolicitacoesAlimentacaoInterface
  extends ResponseInterface {
  data: Array<ChartData>;
}
