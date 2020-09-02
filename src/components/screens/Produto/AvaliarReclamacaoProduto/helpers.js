const FORMATA_STATUS = {
  "Aguardando resposta terceirizada": "CODAE_PEDIU_ANALISE_RECLAMACAO",
  "Aguardando avaliação CODAE": "ESCOLA_OU_NUTRICIONISTA_RECLAMOU",
  "Respondido terceirizada": "TERCEIRIZADA_RESPONDEU_RECLAMACAO"
};

export const formatarValues = values => {
  if (values.status) {
    values.status = [FORMATA_STATUS[values.status]];
  } else {
    values.status = [
      "CODAE_PEDIU_ANALISE_RECLAMACAO",
      "ESCOLA_OU_NUTRICIONISTA_RECLAMOU",
      "TERCEIRIZADA_RESPONDEU_RECLAMACAO",
      "CODAE_AUTORIZOU_RECLAMACAO"
    ];
  }
  values.status_reclamacao = [
    "AGUARDANDO_AVALIACAO",
    "RESPONDIDO_TERCEIRIZADA"
  ];
  return values;
};
