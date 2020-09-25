export const getConfigCabecario = filtros => {
  const qtde_filtros = Object.keys(filtros).length;

  let config = {};

  if (qtde_filtros === 2) {
    if (filtros.data_suspensao_final || filtros.data_suspensao_inicial) {
      config.cabecario_tipo = "CABECARIO_POR_DATA";
      return config;
    }
  }
  if (filtros.data_suspensao_inicial && filtros.data_suspensao_final) {
    config.cabecario_tipo = "CABECARIO_POR_DATA";
    return config;
  } else {
    config.cabecario_tipo = "CABECARIO_REDUZIDO";
    return config;
  }
};
