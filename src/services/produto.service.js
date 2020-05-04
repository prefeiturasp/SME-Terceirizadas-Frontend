import { API_URL } from "../constants/config";
import authService from "./auth";
import axios from "./_base";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

const retornoBase = async url => {
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  try {
    const result = await fetch(url, OBJ_REQUEST);
    const status = result.status;
    const json = await result.json();
    return { results: json.results, status };
  } catch (error) {
    console.log(error);
  }
};

export const getProduto = uuid => {
  const url = `${API_URL}/produtos/${uuid}/`;
  let status = 0;
  return fetch(url, {
    method: "GET",
    headers: authToken
  })
    .then(res => {
      status = res.status;
      return res.json();
    })
    .then(data => {
      return { data: data, status: status };
    })
    .catch(error => {
      return error.json();
    });
};

export const getInformacoesNutricionais = () => {
  const url = `${API_URL}/informacoes-nutricionais/agrupadas/`;
  let status = 0;
  return fetch(url, {
    method: "GET",
    headers: authToken
  })
    .then(res => {
      status = res.status;
      return res.json();
    })
    .then(data => {
      return { data: data, status: status };
    })
    .catch(error => {
      return error.json();
    });
};

export const getInformacoesGrupo = async () => {
  return await axios.get(`/informacoes-nutricionais/agrupadas/`);
};

export const getNomesProdutos = async () => {
  return await axios.get(`/produtos/lista-nomes/`);
};

export const getNomesMarcas = async () => {
  return await axios.get(`/marcas/lista-nomes/`);
};

export const getNomesFabricantes = async () => {
  return await axios.get(`/fabricantes/lista-nomes/`);
};

export const getProdutosPorNome = async nomeProduto => {
  return await axios.get(`/produtos/filtro-por-nome/${nomeProduto}/`);
};

export const getProdutosPorMarca = async nomeMarca => {
  return await axios.get(`/produtos/filtro-por-marca/${nomeMarca}/`);
};

export const getProdutosPorFabricante = async nomeFabricante => {
  return await axios.get(`/produtos/filtro-por-fabricante/${nomeFabricante}/`);
};

export const getProtocolosDietaEspecial = async () => {
  return await axios.get(`/protocolo-dieta-especial/lista-nomes/`);
};

export const getMarcasProdutos = async () => {
  return await axios.get(`/marcas/`);
};

export const getFabricantesProdutos = async () => {
  return await axios.get(`/fabricantes/`);
};

export const criarMarcaProduto = async data => {
  return await axios.post(`/marcas/`, data);
};

export const submitProduto = async payload => {
  return await axios.post(`/produtos/`, payload);
};

export const criarFabricanteProduto = async data => {
  return await axios.post(`/fabricantes/`, data);
};

export const getHomologacaoProduto = uuid => {
  const url = `${API_URL}/homologacoes-produtos/${uuid}/`;
  let status = 0;
  return fetch(url, {
    method: "GET",
    headers: authToken
  })
    .then(res => {
      status = res.status;
      return res.json();
    })
    .then(data => {
      return { data: data, status: status };
    })
    .catch(error => {
      return error.json();
    });
};

export const CODAEHomologaProduto = uuid => {
  const url = `${API_URL}/homologacoes-produtos/${uuid}/codae-homologa/`;
  let status = 0;
  return fetch(url, {
    method: "PATCH",
    headers: authToken
  })
    .then(res => {
      status = res.status;
      return res.json();
    })
    .then(data => {
      return { data: data, status: status };
    })
    .catch(error => {
      return error.json();
    });
};

export const CODAEPedeAnaliseSensorialProduto = (uuid, justificativa) => {
  const url = `${API_URL}/homologacoes-produtos/${uuid}/codae-pede-analise-sensorial/`;
  let status = 0;
  return fetch(url, {
    method: "PATCH",
    headers: authToken,
    body: JSON.stringify({ justificativa })
  })
    .then(res => {
      status = res.status;
      return res.json();
    })
    .then(data => {
      return { data: data, status: status };
    })
    .catch(error => {
      return error.json();
    });
};

export const CODAENaoHomologaProduto = (uuid, justificativa) => {
  const url = `${API_URL}/homologacoes-produtos/${uuid}/codae-nao-homologa/`;
  let status = 0;
  return fetch(url, {
    method: "PATCH",
    headers: authToken,
    body: JSON.stringify({ justificativa })
  })
    .then(res => {
      status = res.status;
      return res.json();
    })
    .then(data => {
      return { data: data, status: status };
    })
    .catch(error => {
      return error.json();
    });
};

export const CODAEPedeCorrecao = (uuid, justificativa) => {
  const url = `${API_URL}/homologacoes-produtos/${uuid}/codae-questiona-pedido/`;
  let status = 0;
  return fetch(url, {
    method: "PATCH",
    headers: authToken,
    body: JSON.stringify({ justificativa })
  })
    .then(res => {
      status = res.status;
      return res.json();
    })
    .then(data => {
      return { data: data, status: status };
    })
    .catch(error => {
      return error.json();
    });
};

export const getDashboardGestaoProdutos = () => {
  const url = `${API_URL}/painel-gerencial-homologacoes-produtos/dashboard/`;
  let status = 0;
  return fetch(url, {
    method: "GET",
    headers: authToken
  })
    .then(res => {
      status = res.status;
      return res.json();
    })
    .then(data => {
      return { data: data, status: status };
    })
    .catch(error => {
      return error;
    });
};

export const getReclamacaoDeProduto = () => {
  const url = `${API_URL}/painel-gerencial-homologacoes-produtos/reclamacao-de-produto/`;
  return retornoBase(url);
};

export const getProdutosSuspensos = () => {
  const url = `${API_URL}/painel-gerencial-homologacoes-produtos/produtos-suspensos/`;
  return retornoBase(url);
};

export const getCorrecaoDeProduto = () => {
  const url = `${API_URL}/painel-gerencial-homologacoes-produtos/correcao-de-produto/`;
  return retornoBase(url);
};

export const getAguardandoAnaliseReclamacao = () => {
  const url = `${API_URL}/painel-gerencial-homologacoes-produtos/aguardando-analise-reclamacao/`;
  return retornoBase(url);
};

export const getAguardandoAnaliseSensorial = () => {
  const url = `${API_URL}/painel-gerencial-homologacoes-produtos/aguardando-analise-sensorial/`;
  return retornoBase(url);
};

export const getPendenteHomologacao = () => {
  const url = `${API_URL}/painel-gerencial-homologacoes-produtos/pendente-homologacao/`;
  return retornoBase(url);
};

export const getHomologados = () => {
  const url = `${API_URL}/painel-gerencial-homologacoes-produtos/homologados/`;
  return retornoBase(url);
};

export const getNaoHomologados = () => {
  const url = `${API_URL}/painel-gerencial-homologacoes-produtos/nao-homologados/`;
  return retornoBase(url);
};
