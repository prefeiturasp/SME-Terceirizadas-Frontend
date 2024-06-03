import PainelInicialPage from "../pages/PainelInicial/PainelInicialPage";

export const painelInicial = () => {
  return PainelInicialPage;
};

export const getDDMMYYYfromDate = (date) => {
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
};

export const getYYYYMMDDfromDate = (date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};
