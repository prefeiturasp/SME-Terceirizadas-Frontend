export interface ContratoInterface {
  uuid: string;
  numero: string;
  edital?: {
    uuid: string;
    numero: string;
  };
}

export interface ResponseContratosVigentesInterface {
  results: ContratoInterface[];
}

export interface NovoEmpenhoPayload {
  numero: string;
  contrato: string;
  edital: string;
  tipo_empenho: string;
  tipo_reajuste?: string;
  status: string;
  valor_total: number;
}
