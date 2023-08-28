export interface DiretoriaRegionalRascunhosInterface {
  acesso_modulo_medicao_inicial: boolean;
  codigo_eol: number;
  iniciais: string;
  nome: string;
  uuid: string;
}

export interface ContatoTerceirizadaRascunhosInterface {
  celular: string;
  crn_numero: string;
  eh_nutricionista: boolean;
  email: string;
  nome: string;
  telefone: string;
  telefone2: string;
}

export interface EditalRascunhosInterface {
  numero: string;
  objeto: string;
  processo: string;
  tipo_contratacao: string;
  uuid: string;
}

export interface VigenciaContratoRascunhosInterface {
  data_final: string;
  data_inicial: string;
  uuid: string;
}

export interface ContratoTerceirizadaRascunhosInterface {
  ata_chamada_publica: string;
  data_hora_encerramento: string | null;
  data_proposta: string;
  edital: EditalRascunhosInterface | null;
  encerrado: boolean;
  numero: string;
  pregao: string;
  processo: string;
  uuid: string;
  vigencias: Array<VigenciaContratoRascunhosInterface>;
}

export interface TerceirizadaRascunhosInterface {
  cnpj: string;
  contatos: Array<ContatoTerceirizadaRascunhosInterface>;
  contratos: Array<ContratoTerceirizadaRascunhosInterface>;
  nome_fantasia: string;
  uuid: string;
}

export interface LoteRascunhosInterface {
  diretoria_regional: DiretoriaRegionalRascunhosInterface;
  nome: string;
  terceirizada: TerceirizadaRascunhosInterface;
  tipo_gestao: string | null;
  uuid: string;
}

export interface TipoAlimentacaoRascunhoInterface {
  nome: string;
  uuid: string;
  posicao: number;
}

export interface PeriodoEscolarRascunhosInterface {
  nome: string;
  posicao: number;
  possui_alunos_regulares: boolean | null;
  tipo_turno: number;
  tipos_alimentacao: Array<TipoAlimentacaoRascunhoInterface>;
}

export interface TipoGestaoRascunhosInterface {
  nome: string;
  uuid: string;
}

export interface TipoUnidadeRascunhosInterface {
  ativo: boolean;
  iniciais: string;
  periodos_escolares: Array<PeriodoEscolarRascunhosInterface>;
  pertence_relatorio_solicitacoes_alimentacao: boolean;
  tem_somente_integral_e_parcial: boolean;
  uuid: string;
}

export interface EscolaRascunhosInterface {
  codigo_eol: number;
  diretoria_regional: DiretoriaRegionalRascunhosInterface;
  lote: LoteRascunhosInterface;
  nome: string;
  periodos_escolares: Array<PeriodoEscolarRascunhosInterface>;
  quantidade_alunos: number;
  quantidade_alunos_cei_da_cemei: number | null;
  quantidade_alunos_emei_da_cemei: number | null;
  tipo_gestao: TipoGestaoRascunhosInterface;
  tipo_unidade: TipoUnidadeRascunhosInterface;
  tipos_contagem: Array<any>;
  uuid: string;
}
