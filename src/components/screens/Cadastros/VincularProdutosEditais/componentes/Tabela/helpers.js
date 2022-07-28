export const formatarEditais = editais => {
  if (editais.length === 0) {
    return "Nenhum edital vinculado";
  }
  let editais_string = "";
  for (let index = 0; index < editais.length; index++) {
    if (editais_string.length > 0) {
      editais_string = `${editais_string}, ${editais[index].numero}`;
    } else {
      editais_string = editais[index].numero;
    }
  }
  return editais_string;
};
