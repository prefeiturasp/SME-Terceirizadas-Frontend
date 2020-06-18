const FORMATA_STATUS = {
  "Aguardando resposta terceirizada": "CODAE_PEDIU_ANALISE_RECLAMACAO",
  "Aguardando avaliação CODAE": "ESCOLA_OU_NUTRICIONISTA_RECLAMOU"
};

export const formatarValues = values => {
  if (values.status) {
    values.status = [FORMATA_STATUS[values.status]];
  }
  return values;
};
