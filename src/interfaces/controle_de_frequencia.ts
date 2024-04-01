export interface FiltrosInterface {
  data_inicial?: string;
  data_final?: string;
  periodos?: string;
}

export interface ResponseTotalAlunosMatriculados {
  periodos: Record<string, number>;
  total_matriculados: number;
}

export interface RelatorioControleFrequenciaResponse {
  detail: string;
}
