export const lotesToOptions = lotes => {
  return lotes.map(lote => ({
    label: `${lote.diretoria_regional.iniciais} - ${lote.nome}`,
    value: lote.uuid
  }));
};
