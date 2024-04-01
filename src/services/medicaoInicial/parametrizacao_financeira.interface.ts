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
