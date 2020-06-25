export const formataData = data => {
  const dataSplit = data.split("/");
  const dataFormatada = `${dataSplit[2]}-${dataSplit[1]}-${dataSplit[0]}`;
  return dataFormatada;
};
