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

export interface EmpenhoInterface {
  uuid?: string;
  numero: string;
  contrato: string;
  edital: string;
  tipo_empenho: string;
  status: string;
  valor_total: number;
}

export interface ResponseEmpenhosInterface {
  next: string | null;
  previous: string | null;
  count: number;
  page_size: number;
  results: EmpenhoInterface[];
}

export interface FiltrosInterface {
  numero?: string;
  contrato?: string;
  edital?: string;
}

export interface EmpenhoPayload {
  tipo_empenho?: string;
  status?: string;
  valor_total?: number;
}
