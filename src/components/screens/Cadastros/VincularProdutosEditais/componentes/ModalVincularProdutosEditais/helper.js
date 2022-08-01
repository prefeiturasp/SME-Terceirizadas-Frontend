export const formataEditais = editais => {
  let editais_string = "";
  for (let index = 0; index < editais.length; index++) {
    if (index !== 0) {
      editais_string = `${editais_string};${editais[index]}`;
    } else {
      editais_string = editais[index];
    }
  }
  return editais_string;
};
