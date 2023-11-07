import {
  TiposDocumentoChoices,
  Arquivo,
} from "interfaces/pre_recebimento.interface";

export interface ArquivoForm {
  nome: string;
  base64: string;
}

export interface OptionMultiselect {
  value: TiposDocumentoChoices;
  label: string;
}

export interface TiposDocumentosPayload {
  tipo_documento: TiposDocumentoChoices;
  arquivos_do_tipo_de_documento: Array<Arquivo>;
  descricao_documento?: string;
}

export interface DocumentosRecebimentoPayload {
  cronograma: string;
  numero_laudo: string;
  tipos_de_documentos: Array<TiposDocumentosPayload>;
}

export interface DocumentosState {
  [key: string]: Array<Arquivo>;
}

export interface FiltrosDocumentosRecebimento {
  nome_produto?: string;
  numero_cronograma?: string;
  status?: string;
  data_criacao?: string;
}
