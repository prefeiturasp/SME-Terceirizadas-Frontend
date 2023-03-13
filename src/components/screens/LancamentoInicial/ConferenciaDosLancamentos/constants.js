export const MEDICAO_STATUS_DE_PROGRESSO = {
  MEDICAO_ENVIADA_PELA_UE: {
    nome: "Recebido para análise"
  },
  MEDICAO_CORRECAO_SOLICITADA: {
    nome: "Devolvido para ajustes"
  },
  MEDICAO_CORRIGIDA_PELA_UE: {
    nome: "Corrigido para DRE"
  },
  MEDICAO_CORRIGIDA_PARA_CODAE: {
    nome: "Corrigido para CODAE"
  },
  MEDICAO_APROVADA_PELA_DRE: {
    nome: "Aprovado pela DRE"
  },
  MEDICAO_APROVADA_PELA_CODAE: {
    nome: "Aprovado pela CODAE"
  }
};

export const initialStateWeekColumns = [
  { position: 0, dia: "29" },
  { position: 1, dia: "30" },
  { position: 2, dia: "01" },
  { position: 3, dia: "02" },
  { position: 4, dia: "03" },
  { position: 5, dia: "04" },
  { position: 6, dia: "05" }
];
