export interface PeriodoDeVisitaInterface {
  alterado_em: string;
  criado_em: string;
  nome: string;
  uuid: string;
}

export interface CategoriaTipoOcorrenciaInterface {
  nome: string;
  posicao: number;
  uuid: string;
}

export interface TipoPerguntaInterface {
  nome: string;
  uuid: string;
}

export interface ParametrizacoesInterface {
  uuid: string;
  posicao: number;
  titulo: string;
  tipo_pergunta: TipoPerguntaInterface;
}

export interface TipoOcorrenciaInterface {
  categoria: CategoriaTipoOcorrenciaInterface;
  descricao: string;
  parametrizacoes: Array<ParametrizacoesInterface>;
  posicao: number;
  titulo: string;
  uuid: string;
}
