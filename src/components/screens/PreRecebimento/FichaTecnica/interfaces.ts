import {
  CategoriaChoices,
  MecanismoControleChoices,
} from "interfaces/pre_recebimento.interface";

export interface OptionsCategoria {
  uuid: CategoriaChoices;
  nome: string;
}

// boolean | string -> tratado como string no form, enviado como boolean pro backend
export interface FichaTecnicaPayload {
  produto?: string;
  marca?: string;
  categoria?: CategoriaChoices;
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
  prazo_validade?: string;
  numero_registro?: string;
  agroecologico?: boolean | string;
  organico?: boolean | string;
  mecanismo_controle?: MecanismoControleChoices;
  componentes_produto?: string;
  alergenicos?: boolean | string;
  ingredientes_alergenicos?: string;
  gluten?: boolean | string;
  lactose?: boolean | string;
  lactose_detalhe?: string;
}

export interface FiltrosFichaTecnica {
  numero_ficha?: string;
  nome_produto?: string;
  pregao_chamada_publica?: string;
  status?: string;
  data_cadastro?: string;
}
