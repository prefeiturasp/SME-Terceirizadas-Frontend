import { EtapaFicha } from "components/screens/Recebimento/FichaRecebimento/interfaces";

export interface FiltrosRelatorioCronograma {
  nome_produto?: string;
  numero_cronograma?: string;
  status?: string;
  data_criacao?: string;
}

export interface EmpresaFiltros {
  uuid: string;
  nome_fantasia: string;
}

export interface CronogramaRelatorio {
  armazem: string;
  custo_unitario_produto: number;
  empresa: string;
  etapas: EtapaFicha[];
  marca: string;
  numero: string;
  produto: string;
  qtd_total_programada: number;
  status: string;
  uuid: string;
}
