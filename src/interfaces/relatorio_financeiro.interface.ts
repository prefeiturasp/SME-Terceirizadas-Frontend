export interface FiltrosInterface {
  lote?: string[] | string;
  grupo_unidade_escolar?: string;
  mes_ano?: string;
}

export interface RelatorioFinanceiroInterface {
  uuid?: string;
  status: string;
  mes: string;
  ano: string;
  lote: Lote;
  grupo_unidade_escolar: GrupoUnidadeEscolar;
}

export interface RelatorioFinanceiroResponse {
  next: string | null;
  previous: string | null;
  count: number;
  page_size: number;
  results: RelatorioFinanceiroInterface[];
}

export interface RelatorioFinanceiroConsolidado {
  uuid: string;
  edital: Edital;
  dre: string;
  lote: string;
  tipos_unidades: TipoUnidade[];
  legenda: string;
  tabelas: Tabela[];
  grupo_unidade_escolar: string;
  mes_ano: string;
}

type Tabela = {
  nome: string;
  valores: [];
};

type Edital = {
  uuid: string;
  numero: string;
};

type Lote = {
  uuid: string;
  nome: string;
  diretoria_regional: DiretoriaRegional;
};

type DiretoriaRegional = {
  uuid: string;
  nome: string;
};

type GrupoUnidadeEscolar = {
  uuid: string;
  nome: string;
  tipos_unidades: TipoUnidade[];
};

type TipoUnidade = {
  uuid: string;
  iniciais: string;
};
