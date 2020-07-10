import moment from "moment";
import { TODOS } from "../../../../../constants/shared";

export const BUSCA_TIPO_SOLICITACAO = [
  { nome: "Todos", uuid: TODOS },
  { nome: "Alteração de Cardapio", uuid: "ALT_CARDAPIO" },
  { nome: "Inversão de Cardapio", uuid: "INV_CARDAPIO" },
  { nome: "Inclusão de Alimentação", uuid: "INC_ALIMENTA" },
  { nome: "Inclusão de Alimentação Continua", uuid: "INC_ALIMENTA_CONTINUA" },
  { nome: "Kit Lanche Avulsa", uuid: "KIT_LANCHE_AVULSA" },
  { nome: "Kit Lanche Unificada", uuid: "KIT_LANCHE_UNIFICADA" },
  { nome: "Suspensão de Alimentação", uuid: "SUSP_ALIMENTACAO" }
];

export const STATUS_SOLICITACAO = [
  { nome: "Todos", uuid: TODOS },
  { nome: "Autorizados", uuid: "AUTORIZADOS" },
  { nome: "Negados", uuid: "NEGADOS" },
  { nome: "Cancelados", uuid: "CANCELADOS" },
  { nome: "Em Andamento", uuid: "EM_ANDAMENTO" }
];

export const ENTER = 13;

const dataMin = moment();
const dataMax = moment();
export const DATA_MINIMA = dataMin.subtract(365, "days")["_d"];
export const DATA_MAXIMA = dataMax.add(0, "days")["_d"];
