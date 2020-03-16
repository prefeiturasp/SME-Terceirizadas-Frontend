export const MOTIVOS = ["Reposição de aula", "Dia da família", "Outro"];

export const formataMotivosDias = inclusoes => {
  const motivosDias = {};
  inclusoes.forEach(inclusao => {
    const motivo =
      inclusao.motivo.nome === "Outro"
        ? inclusao.outro_motivo
        : inclusao.motivo.nome;
    if (motivosDias[motivo]) {
      motivosDias[motivo].push(inclusao.data);
    } else {
      motivosDias[motivo] = [inclusao.data];
    }
  });
  return motivosDias;
};
