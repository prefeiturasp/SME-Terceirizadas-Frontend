interface EditalInterface {
  uuid: string;
  numero: string;
}

export interface ClausulaInterface {
  uuid: string;
  edital: EditalInterface;
  numero_clausula: string;
  item_clausula: string;
  porcentagem_desconto: number;
  descricao: string;
}

export interface FiltrosInterface {
  edital?: string;
  numero_clausula?: string;
  porcentagem_desconto?: number;
}

export interface ResponseClausulasInterface {
  next: string | null;
  previous: string | null;
  count: number;
  page_size: number;
  results: ClausulaInterface[];
}

export interface ClausulaPayload {
  edital: string;
  numero_clausula: string;
  item_clausula: string;
  porcentagem_desconto: number;
  descricao: string;
}
