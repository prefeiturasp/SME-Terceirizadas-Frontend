export interface PermissaoLancamentosEspeciaisInterface {
  alimentacoes_lancamento_especial: string;
  alterado_em: string;
  ativo: boolean;
  criado_em: string;
  criado_por: number;
  data_final: string | null;
  data_inicial: string | null;
  diretoria_regional: number;
  escola: string;
  id: number;
  periodo_escolar: string;
  uuid: string;
}

export interface EscolasComPermissoesLancamentosEspeciaisInterface {
  escola: string;
  uuid: string;
}
