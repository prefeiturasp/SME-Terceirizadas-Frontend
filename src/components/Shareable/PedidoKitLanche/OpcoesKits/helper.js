export const extrairKitsLanche = kits => {
  let listaKits = [];
  kits.forEach(element => {
    listaKits.push(element.uuid);
  });
  return listaKits;
};
