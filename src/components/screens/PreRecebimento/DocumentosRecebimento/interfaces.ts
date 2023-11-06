export interface Arquivo {
  nome: string;
  base64: string;
}

export interface ArquivoPayload {
  nome: string;
  arquivo: string;
}

export interface OptionMultiselect {
  value: string;
  label: string;
}

export type TiposDocumento =
  | "LAUDO"
  | "DECLARACAO_LEI_1512010"
  | "CERTIFICADO_CONF_ORGANICA"
  | "RASTREABILIDADE"
  | "DECLARACAO_MATERIA_ORGANICA"
  | "OUTROS";

export interface TiposDocumentosPayload {
  tipo_documento: TiposDocumento;
  arquivos_do_tipo_de_documento: Array<ArquivoPayload>;
  descricao_documento?: string;
}

export interface DocumentosRecebimentoPayload {
  cronograma: string;
  numero_laudo: string;
  tipos_de_documentos: Array<TiposDocumentosPayload>;
}

export interface DocumentosState {
  [key: string]: Array<ArquivoPayload>;
}

export interface FiltrosDocumentosRecebimento {
  nome_produto?: string;
  numero_cronograma?: string;
  status?: string;
  data_criacao?: string;
}
