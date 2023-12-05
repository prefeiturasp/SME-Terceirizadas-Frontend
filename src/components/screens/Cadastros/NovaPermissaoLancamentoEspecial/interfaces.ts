export interface NovaPermissaoInterface {
  uuid: string | null;
  diretoria_regional: string | null;
  escola: string | null;
  periodo_escolar: string | null;
  data_inicial: string | Date | null;
  data_final: string | Date | null;
  alimentacoes_lancamento_especial: Array<string>;
}
