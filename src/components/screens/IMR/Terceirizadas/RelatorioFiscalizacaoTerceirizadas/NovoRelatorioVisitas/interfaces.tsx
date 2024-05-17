export interface NovoRelatorioVisitasFormInterface {
  uuid?: number;
  diretoria_regional: string;
  escola: string;
  data: string;
  lote: string;
  terceirizada: string;
  periodo_visita?: string;
  acompanhou_visita?: string;
  nome_nutricionista_empresa?: string;
  total_matriculados_por_data: number;
  maior_frequencia_no_periodo: number;
}

export interface EscolaLabelInterface {
  label: string;
  value: string;
  lote_nome: string;
  terceirizada: string;
  edital: string;
  uuid: string;
}
