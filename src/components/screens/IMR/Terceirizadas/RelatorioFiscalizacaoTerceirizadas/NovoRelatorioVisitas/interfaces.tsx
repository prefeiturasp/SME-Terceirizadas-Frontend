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
}

export interface EscolaLabelInterface {
  label: string;
  value: string;
  lote_nome: string;
  terceirizada: string;
  uuid: string;
}
