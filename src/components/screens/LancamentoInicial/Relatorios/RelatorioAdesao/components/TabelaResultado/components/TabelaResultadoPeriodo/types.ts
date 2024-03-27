export type TotalAlimentacao = {
  tipo_alimentacao: string;
  total_servido: number;
  total_frequencia: number;
  total_adesao: number;
};

export type Props = {
  className: string;
  periodo: string;
  dados: Array<TotalAlimentacao>;
};
