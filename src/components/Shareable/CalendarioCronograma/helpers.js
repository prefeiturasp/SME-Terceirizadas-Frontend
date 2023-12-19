export const formataComoEventos = (diasSobremesaDoce) => {
  const eventos = [];
  diasSobremesaDoce.forEach((diaSobremesaDoce) => {
    eventos.push({
      title: diaSobremesaDoce.nome_produto,
      data: diaSobremesaDoce.data_programada,
      start: new Date(
        parseInt(diaSobremesaDoce.data_programada.split("/")[2]),
        parseInt(diaSobremesaDoce.data_programada.split("/")[1]) - 1,
        parseInt(diaSobremesaDoce.data_programada.split("/")[0]),
        0
      ),
      end: new Date(
        parseInt(diaSobremesaDoce.data_programada.split("/")[2]),
        parseInt(diaSobremesaDoce.data_programada.split("/")[1]) - 1,
        parseInt(diaSobremesaDoce.data_programada.split("/")[0]),
        1
      ),
      allDay: true,
      // criado_por: diaSobremesaDoce.criado_por,
      // criado_em: diaSobremesaDoce.criado_em,
      uuid: diaSobremesaDoce.uuid,
    });
  });
  return eventos;
};
