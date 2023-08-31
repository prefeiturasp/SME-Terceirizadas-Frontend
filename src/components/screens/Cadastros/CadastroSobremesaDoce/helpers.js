export const formataComoEventos = (diasSobremesaDoce) => {
  const eventos = [];
  diasSobremesaDoce.forEach((diaSobremesaDoce) => {
    eventos.push({
      title: diaSobremesaDoce.tipo_unidade.iniciais,
      tipo_unidade: diaSobremesaDoce.tipo_unidade,
      data: diaSobremesaDoce.data,
      start: new Date(
        parseInt(diaSobremesaDoce.data.split("/")[2]),
        parseInt(diaSobremesaDoce.data.split("/")[1]) - 1,
        parseInt(diaSobremesaDoce.data.split("/")[0]),
        0
      ),
      end: new Date(
        parseInt(diaSobremesaDoce.data.split("/")[2]),
        parseInt(diaSobremesaDoce.data.split("/")[1]) - 1,
        parseInt(diaSobremesaDoce.data.split("/")[0]),
        1
      ),
      allDay: true,
      criado_por: diaSobremesaDoce.criado_por,
      criado_em: diaSobremesaDoce.criado_em,
      uuid: diaSobremesaDoce.uuid,
    });
  });
  return eventos;
};
