export const convertTempoPasseio = tempo_passeio => {
  switch (tempo_passeio) {
    case 0:
      return "4 horas";
    case 1:
      return "5 a 7 horas";
    case 2:
      return "8 horas";
    default:
      return null;
  }
};

export const retornaTempoPasseio = tempo_passeio => {
  if (tempo_passeio === 0 || tempo_passeio === "4h") {
    return "0";
  }
  if (tempo_passeio === 1 || tempo_passeio === "5_7h") {
    return "1";
  } 
  if (tempo_passeio === 2 || tempo_passeio === "8h") {
    return "2"
  }
  else {
    return "";
  }
};


export const retornaInputPasseio = tempo_passeio => {
  if (tempo_passeio === 0 || tempo_passeio === "4h") {
      return "4h";
  }
  if (tempo_passeio === 1 || tempo_passeio === "5_7h") {
      return "5_7h";
  } 
  if (tempo_passeio === 2 || tempo_passeio === "8h") {
    return "8h";
  }
  else {
    return "";
  }
}; 


export const statusSubmit = status => {
  if (status === "Salvar") {
    return "SALVAR";
  } else {
    return "ATUALIZAR";
  }
}


export const montaObjetoRequisicao = values => {
  let kit_lanche_avulso = {
    solicitacao_kit_lanche: {
      kits: values.kit_lanche,
      observacao: values.observacao,
      data: values.evento_data,
      tempo_passeio: retornaTempoPasseio(values.tempo_passeio)
    },
    escola: this.state.escola.uuid,
    local: values.local,
    quantidade_alunos: values.quantidade_alunos
  }
  return kit_lanche_avulso
}