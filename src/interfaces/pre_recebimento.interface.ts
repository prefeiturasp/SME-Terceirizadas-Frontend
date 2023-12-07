import { LogSolicitacoesUsuarioSimples } from "./dados_comuns.interface";
import { TerceirizadaSimplesInterface } from "./terceirizada.interface";

export interface DocumentosRecebimento {
  criado_em: string;
  nome_produto: string;
  numero_cronograma: string;
  pregao_chamada_publica: string;
  status: string;
  uuid: string;
}

export interface DocumentosRecebimentoDetalhado extends DocumentosRecebimento {
  numero_laudo: string;
  correcao_solicitada: string;
  tipos_de_documentos: TiposDocumentos[];
  logs: LogSolicitacoesUsuarioSimples[];
  log_mais_recente: {
    usuario: string;
    criado_em: string;
  };
}

export interface DocumentosRecebimentoParaAnalise
  extends DocumentosRecebimentoDetalhado {
  data_fabricacao_lote: string;
  data_final_lote: string;
  datas_fabricacao_e_prazos: DatasFabricacaoPrazos[];
  quantidade_laudo: number;
  saldo_laudo: number;
  validade_produto: string;
  numero_sei: string;
  fornecedor: string;
  unidade_medida: UnidadeMedidaSimples;
  laboratorio: LaboratorioSimples;
}

export interface DatasFabricacaoPrazos {
  data_fabricacao: string;
  prazo_maximo_recebimento: string;
  data_maxima_recebimento?: string;
  justificativa?: string;
}

export interface UnidadeMedidaSimples {
  uuid: string;
  nome: string;
  abreviacao: string;
}

export interface LaboratorioSimples {
  uuid: string;
  nome: string;
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

export type PrazoRecebimentoChoices =
  | "30"
  | "60"
  | "90"
  | "120"
  | "180"
  | "OUTRO";

export interface TiposDocumentos {
  tipo_documento: TiposDocumentoChoices;
  arquivos: Array<Arquivo>;
  descricao_documento?: string;
  uuid: string;
}

export interface CronogramaSimples {
  uuid: string;
  nome_produto: string;
  numero: string;
  pregao_chamada_publica: string;
  value?: string;
}

export interface DocumentosRecebimentoDashboard {
  log_mais_recente: string;
  nome_empresa: string;
  nome_produto: string;
  numero_cronograma: string;
  status: string;
  uuid: string;
}

export interface FiltrosDashboardDocumentos {
  nome_produto?: string;
  numero_cronograma?: string;
  nome_fornecedor?: string;
  status?: string[];
  offset?: number;
  limit?: number;
}

export interface OptionsGenerico {
  uuid: string;
  nome: string;
}

export type CategoriaChoices = "PERECIVEIS" | "NAO_PERECIVEIS";

export interface ProdutoSimples {
  uuid: string;
  nome: string;
}

export interface MarcaSimples {
  uuid: string;
  nome: string;
}

export interface FabricanteSimples {
  uuid: string;
  nome: string;
}

export interface FichaTecnica {
  uuid: string;
  numero: string;
  nome_produto: string;
  pregao_chamada_publica: string;
  criado_em: string;
  status: string;
}

export interface FichaTecnicaDetalhada {
  uuid: string;
  numero: string;
  produto: ProdutoSimples;
  pregao_chamada_publica: string;
  marca: MarcaSimples;
  categoria: string;
  status: string;
  criado_em: string;
  empresa: TerceirizadaSimplesInterface;
  fabricante: FabricanteSimples;
  cnpj_fabricante: string;
  cep_fabricante: string;
  endereco_fabricante: string;
  numero_fabricante: string;
  complemento_fabricante: string;
  bairro_fabricante: string;
  cidade_fabricante: string;
  estado_fabricante: string;
  email_fabricante: string;
  telefone_fabricante: string;
}
