export interface FormCadastroEditaisContratosVigenciaInterface {
  data_inicial: string;
  data_final: string;
}

export interface FormCadastroEditaisContratosContratoInterface {
  processo: string;
  data_proposta: string;
  numero: string;
  vigencias: Array<FormCadastroEditaisContratosVigenciaInterface>;
  lotes: Array<string>;
  diretorias_regionais: Array<string>;
  terceirizada: string;
}

export interface FormCadastroEditaisContratosInterface {
  tipo_contratacao: string;
  numero: string;
  processo: string;
  objeto: string;
  contratos: Array<FormCadastroEditaisContratosContratoInterface>;
}
