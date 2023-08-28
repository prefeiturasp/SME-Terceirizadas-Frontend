import {
  EscolaRascunhosInterface,
  PeriodoEscolarRascunhosInterface,
  TipoAlimentacaoRascunhoInterface
} from "interfaces/rascunhos.interface";

export interface ValuesFormInclusaoDeAlimentacaoInterface {
  inclusoes: Array<InclusoesDeAlimentacaoInterface>;
}

export interface InclusoesDeAlimentacaoInterface {
  motivo: string;
  data: string;
}

export interface MotivoInterface {
  nome: string;
  uuid: string;
}

export interface MotivoSimplesInterface extends MotivoInterface {
  nome: "Evento Específico" | "Outro" | "Dia da família" | "Reposição de aula";
}

export interface MotivoContinuoInterface extends MotivoInterface {
  nome:
    | "Programas/Projetos Específicos"
    | "ETEC"
    | "Programas/Projetos Contínuos";
}

export interface MotivoETECInterface extends MotivoInterface {
  nome: "ETEC";
}

export interface QuantidadesPeriodoInclusaoRascunhosInterface {
  cancelado: boolean;
  cancelado_em: string | null;
  cancelado_justificativa: string;
  cancelado_por: number | null;
  numero_alunos: number;
  observacao: string;
  periodo_escolar: Array<PeriodoEscolarRascunhosInterface>;
  tipos_alimentacao: Array<TipoAlimentacaoRascunhoInterface>;
  uuid: string;
}

export interface QuantidadesPeriodoInclusaoNormalRascunhosInterface
  extends QuantidadesPeriodoInclusaoRascunhosInterface {
  dias_semana: [];
  grupo_inclusao_normal: number;
  inclusao_alimentacao_continua: null;
}

export interface QuantidadesPeriodoInclusaoContinuaRascunhosInterface
  extends QuantidadesPeriodoInclusaoRascunhosInterface {
  dias_semana: Array<number>;
  grupo_inclusao_normal: null;
  inclusao_alimentacao_continua: number;
}

export interface RascunhosInclusaoDeAlimentacaoInterface {
  criado_em: string;
  criado_por: number;
  datas: string;
  descricao: string;
  escola: EscolaRascunhosInterface;
  foi_solicitado_fora_do_prazo: boolean;
  id_externo: string;
  logs: Array<any>;
  prioridade: string;
  quantidades_periodo: Array<
    | QuantidadesPeriodoInclusaoNormalRascunhosInterface
    | QuantidadesPeriodoInclusaoContinuaRascunhosInterface
  >;
  inclusoes: undefined | Array<InclusoesDeAlimentacaoInterface>;
  rastro_dre: null;
  rastro_escola: null;
  rastro_lote: null;
  rastro_terceirizada: null;
  status: "RASCUNHO";
  terceirizada_conferiu_gestao: false;
  uuid: string;
}

export interface RascunhosInclusaoDeAlimentacaoNormalInterface
  extends RascunhosInclusaoDeAlimentacaoInterface {
  inclusoes: Array<InclusoesDeAlimentacaoInterface>;
  quantidades_periodo: Array<
    QuantidadesPeriodoInclusaoNormalRascunhosInterface
  >;
}

export interface RascunhosInclusaoDeAlimentacaoContinuaInterface
  extends RascunhosInclusaoDeAlimentacaoInterface {
  quantidades_periodo: Array<
    QuantidadesPeriodoInclusaoContinuaRascunhosInterface
  >;
}
