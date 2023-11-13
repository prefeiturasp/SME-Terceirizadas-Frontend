import { DocumentosRecebimentoDashboard } from "interfaces/pre_recebimento.interface";

export interface CardItem {
  text: string;
  date: string;
  link: string;
  status: string;
}

export interface CardConfig {
  id: string;
  titulo: string;
  icon: string;
  style: string;
  incluir_status: string[];
  href: string;
  items?: DocumentosRecebimentoDashboard[];
}
