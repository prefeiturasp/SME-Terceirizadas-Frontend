import moment from "moment";

export const MIN_DATE = moment("01/01/2020", "DD/MM/YYYY")["_d"];

export const formataData = data => {
  const dataSplit = data.split("/");
  const dataFormatada = `${dataSplit[2]}-${dataSplit[1]}-${dataSplit[0]}`;
  return dataFormatada;
};
