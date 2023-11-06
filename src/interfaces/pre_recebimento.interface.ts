export interface DocumentosRecebimento {
  criado_em: string;
  nome_produto: string;
  numero_cronograma: string;
  pregao_chamada_publica: string;
  status: string;
  uuid: string;
}

export interface Arquivo {
  nome: string;
  arquivo: string;
}

export type TiposDocumentoChoices =
  | "LAUDO"
  | "DECLARACAO_LEI_1512010"
  | "CERTIFICADO_CONF_ORGANICA"
  | "RASTREABILIDADE"
  | "DECLARACAO_MATERIA_ORGANICA"
  | "OUTROS";

export interface TiposDocumentos {
  tipo_documento: TiposDocumentoChoices;
  arquivos: Array<Arquivo>;
  descricao_documento?: string;
  uuid: string;
}

export interface DocumentosRecebimentoDetalhado extends DocumentosRecebimento {
  numero_laudo: string;
  tipos_de_documentos: Array<TiposDocumentos>;
}

export interface CronogramaSimples {
  uuid: string;
  nome_produto: string;
  numero: string;
  pregao_chamada_publica: string;
  value?: string;
}
