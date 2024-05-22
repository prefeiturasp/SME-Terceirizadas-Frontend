export interface PeriodoDeVisitaInterface {
  alterado_em: string;
  criado_em: string;
  nome: string;
  uuid: string;
}

export interface CategoriaTipoOcorrenciaInterface {
  nome: string;
  posicao: number;
  gera_notificacao: boolean;
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

export interface PenalidadeInterface {
  descricao: string;
  numero_clausula: string;
  obrigacoes: Array<string>;
}

export interface TipoOcorrenciaInterface {
  categoria: CategoriaTipoOcorrenciaInterface;
  descricao: string;
  parametrizacoes: Array<ParametrizacoesInterface>;
  penalidade: PenalidadeInterface;
  posicao: number;
  titulo: string;
  uuid: string;
}
