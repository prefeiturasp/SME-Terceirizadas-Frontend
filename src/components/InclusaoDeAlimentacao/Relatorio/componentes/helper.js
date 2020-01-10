export const MOTIVOS = ["Reposição de aula", "Dia da família", "Outro"];

export const formatarDiasMotivos = inclusoes => {
  let diasMotivosFormatado = {
    "Reposição de aula": [],
    "Dia da família": [],
    Outro: []
  };
  inclusoes.forEach(inclusao => {
    diasMotivosFormatado[inclusao.motivo.nome].push(inclusao.data);
  });
  return diasMotivosFormatado;
};
