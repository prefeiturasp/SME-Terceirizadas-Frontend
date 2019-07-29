
export const convertTempoPasseio = (tempo_passeio) => {
    switch(tempo_passeio) {
        case 0:
            return '4 horas';
        case 1:
            return '5 a 7 horas';
        case 2:
            return '8 horas';
        default:
            return null;    

    }
}

export const retornaTempoPasseio = (tempo_passeio) => {
    if (tempo_passeio === "4h") {
        return "0"
      }
      if (tempo_passeio === "5_7h") {
        return "1"
      } 
      else {
        return "2"
      } 
}