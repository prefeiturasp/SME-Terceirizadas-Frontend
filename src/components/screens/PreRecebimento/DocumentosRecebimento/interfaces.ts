export interface CronogramaSimples {
  uuid: string;
  nome_produto: string;
  numero: string;
  pregao_chamada_publica: string;
  value?: string;
}

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

export interface TiposDocumentosPayload {
  tipo_documento: string;
  arquivos_do_tipo_de_documento: Array<ArquivoPayload>;
  descricao_documento?: string;
}

export interface DocumentosRecebimentoPayload {
  cronograma: string;
  numero_laudo: string;
  tipos_de_documentos: Array<TiposDocumentosPayload>;
}
