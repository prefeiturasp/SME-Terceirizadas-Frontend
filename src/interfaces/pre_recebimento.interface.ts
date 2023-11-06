export interface DocumentosRecebimento {
  criado_em: string;
  nome_produto: string;
  numero_cronograma: string;
  pregao_chamada_publica: string;
  status: string;
  uuid: string;
}

export interface CronogramaSimples {
  uuid: string;
  nome_produto: string;
  numero: string;
  pregao_chamada_publica: string;
  value?: string;
}
