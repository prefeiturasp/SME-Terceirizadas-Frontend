export interface ProdutoLogistica {
  criado_em: string;
  nome: string;
  uuid: string;
  status: string;
}

export interface TipoNutricional {
  uuid: string;
  nome: string;
}

export interface InformacaoNutricional {
  uuid: string;
  nome: string;
  medida: string;
  eh_fixo: boolean;
  eh_dependente: boolean;
  tipo_nutricional: TipoNutricional;
}
