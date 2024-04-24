export interface FichaRecebimentoPayload {
  etapa: string;
  data_entrega: string;
}

export interface EtapaFicha {
  data_programada: string;
  desvinculada_recebimento: boolean;
  etapa: string;
  numero_empenho: string;
  parte: string;
  qtd_total_empenho: string;
  quantidade: string;
  total_embalagens: string;
  uuid: string;
}

export interface CronogramaFicha {
  ata: string;
  contrato: boolean;
  embalagem_primaria: string;
  embalagem_secundaria: boolean;
  etapas: EtapaFicha[];
  fornecedor: string;
  marca: string;
  peso_liquido_embalagem_primaria: string;
  peso_liquido_embalagem_secundaria: string;
  pregao_chamada_publica: string;
  produto: string;
  qtd_total_programada: string;
  uuid: string;
}
