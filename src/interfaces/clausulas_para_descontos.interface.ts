export interface ClausulaParaDescontoInterface {
  uuid?: string;
  edital: string;
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
  results: ClausulaParaDescontoInterface[];
}
