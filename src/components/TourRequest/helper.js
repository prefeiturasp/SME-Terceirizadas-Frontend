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
  if (tempo_passeio === "4h") {
    return "0";
  }
  if (tempo_passeio === "5_7h") {
    return "1";
  } else {
    return "2";
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