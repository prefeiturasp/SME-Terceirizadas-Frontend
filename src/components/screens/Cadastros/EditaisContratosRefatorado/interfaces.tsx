export interface FormCadastroEditaisContratosVigenciaInterface {
  data_inicial: string;
  data_final: string;
}

export interface FormCadastroEditaisContratosContratoInterface {
  processo: string;
  data_proposta: string;
  numero: string;
  vigencias: Array<FormCadastroEditaisContratosVigenciaInterface>;
}

export interface FormCadastroEditaisContratosInterface {
  tipo_contratacao: string;
  numero: string;
  processo: string;
  objeto: string;
  contratos: Array<FormCadastroEditaisContratosContratoInterface>;
  lotes: Array<string>;
  diretorias_regionais: Array<string>;
  empresa: string;
}
