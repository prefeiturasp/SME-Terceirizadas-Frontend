export interface ValuesFormInclusaoDeAlimentacaoInterface {
  inclusoes: Array<InclusoesDeAlimentacaoInterface>;
}

export interface InclusoesDeAlimentacaoInterface {
  motivo: string;
  data: string;
}

export interface MotivoSimplesInterface {
  nome: string;
  uuid: string;
}
