interface ParametrizacaoFinanceiraTabelaValor {
  tipo_alimentacao: string;
  grupo: string;
  valor_colunas: Record<string, any>;
}

interface ParametrizacaoFinanceiraTabela {
  nome: string;
  valores: Array<ParametrizacaoFinanceiraTabelaValor>;
}

export interface ParametrizacaoFinanceiraPayload {
  edital: string;
  lote: string;
  tipos_unidades: Array<string>;
  tabelas: Array<ParametrizacaoFinanceiraTabela>;
  legenda: string;
}

export interface ParametrizacaoFinanceiraParams {
  edital?: string;
  lote?: string;
  tipos_unidades?: Array<string>;
}

export interface ParametrizacaoFinanceiraResponse {
  next: string | null;
  previous: string | null;
  count: number;
  page_size: number;
  results: ParametrizacaoFinanceiraInterface[];
}

export interface ParametrizacaoFinanceiraInterface {
  uuid: string;
  edital: Edital;
  dre: string;
  lote: Lote;
  tipos_unidades: TipoUnidade[];
  legenda: string;
}

type Edital = {
  uuid: string;
  numero: string;
};

type Lote = {
  uuid: string;
  nome: string;
};

export type TipoUnidade = {
  uuid: string;
  iniciais: string;
};
