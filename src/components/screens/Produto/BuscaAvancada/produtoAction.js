import {
  getTodosOsProdutos,
  getNomesProdutos,
  getNomesMarcas,
  getNomesFabricantes
} from "../../../../services/produto.service";

export const buscaProdutos = async () => {
  const response = await getTodosOsProdutos();
  return {
    type: "PRODUTOS_SEARCH",
    payload: response
  };
};

export const buscaNomesProduto = async () => {
  const response = await getNomesProdutos();
  return {
    type: "NOMES_PRODUTOS",
    payload: response
  };
};

export const buscaNomesMarcas = async () => {
  const response = await getNomesMarcas();
  return {
    type: "NOMES_MARCAS",
    payload: response
  };
};

export const buscaNomesFabricantes = async () => {
  const response = await getNomesFabricantes();
  return {
    type: "NOMES_FABRICANTES",
    payload: response
  };
};
