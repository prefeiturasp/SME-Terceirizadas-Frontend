export const montaTipoUnidadeEscolar = tiposUnidades => {
  let unidadesEscolares = [{ nome: "Selecione a unidade", uuid: "" }];

  tiposUnidades &&
    tiposUnidades.forEach(tipoUnidade => {
      unidadesEscolares.push({
        nome: tipoUnidade.iniciais,
        uuid: tipoUnidade.uuid
      });
    });

  return unidadesEscolares;
};
