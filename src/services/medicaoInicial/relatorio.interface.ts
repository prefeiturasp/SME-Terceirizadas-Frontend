type RelatorioAdesaoTotalPeriodo = {
  tipo_alimentacao: string;
  total_servido: number;
  total_frequencia: number;
  total_adesao: number;
};

type RelatorioAdesaoPeriodo = {
  [key: string]: Array<RelatorioAdesaoTotalPeriodo>;
};

export interface RelatorioAdesaoParams {
  mes_ano: string;
  diretoria_regional: string;
  lotes: Array<string>;
  escola: string;
  periodos_escolares: Array<string>;
  tipos_alimentacao: Array<string>;
}

export interface RelatorioAdesaoResponse extends RelatorioAdesaoPeriodo {}
