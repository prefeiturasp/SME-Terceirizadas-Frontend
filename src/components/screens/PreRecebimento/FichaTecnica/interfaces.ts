import { CategoriaChoices } from "interfaces/pre_recebimento.interface";

export interface OptionsCategoria {
  uuid: CategoriaChoices;
  nome: string;
}

export interface FichaTecnicaPayload {
  produto?: string;
  marca?: string;
  categoria?: string;
  empresa?: string;
  pregao_chamada_publica?: string;
  fabricante?: string;
  cnpj_fabricante?: string;
  cep_fabricante?: string;
  endereco_fabricante?: string;
  numero_fabricante?: string;
  complemento_fabricante?: string;
  bairro_fabricante?: string;
  cidade_fabricante?: string;
  estado_fabricante?: string;
  email_fabricante?: string;
  telefone_fabricante?: string;
}

export interface FiltrosFichaTecnica {
  numero_ficha?: string;
  nome_produto?: string;
  pregao_chamada_publica?: string;
  status?: string;
  data_cadastro?: string;
}
