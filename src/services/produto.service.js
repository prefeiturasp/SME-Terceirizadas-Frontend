import { saveAs } from "file-saver";

import { API_URL } from "../constants/config";
import authService from "./auth";
import axios from "./_base";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
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
      return error;
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
      return error;
    });
};

export const getInformacoesGrupo = async () => {
  return await axios.get(`/informacoes-nutricionais/agrupadas/`);
};

export const getNomesProdutos = async queryparams => {
  let url = `/produtos/lista-nomes/`;
  if (queryparams) url += queryparams + "/";
  return await axios.get(url);
};

export const getNomesMarcas = async queryparams => {
  let url = `/marcas/lista-nomes/`;
  if (queryparams) url += queryparams + "/";
  return await axios.get(url);
};

export const getNomesFabricantes = async queryparams => {
  let url = `/fabricantes/lista-nomes/`;
  if (queryparams) url += queryparams + "/";
  return await axios.get(url);
};

export const getNomesTerceirizadas = async () => {
  return await axios.get(`/terceirizadas/lista-nomes/`);
};

export const getProdutosPorNome = async nomeProduto => {
  return await axios.get(`/produtos/filtro-por-nome/${nomeProduto}/`);
};

export const getProdutosPorMarca = async nomeMarca => {
  return await axios.get(`/produtos/filtro-por-marca/${nomeMarca}/`);
};

export const getHomologacao = async uuid => {
  return await axios.get(`/homologacoes-produtos/${uuid}/`);
};

export const getProdutosPorFabricante = async nomeFabricante => {
  return await axios.get(`/produtos/filtro-por-fabricante/${nomeFabricante}/`);
};

export const getProdutosPorParametros = async parametros => {
  return await axios.post(
    `/produtos/filtro-homologados-por-parametros/`,
    parametros
  );
};

export const getReclamacoesTerceirizadaPorFiltro = async filtros => {
  return await axios.post(
    `/produtos/filtro-reclamacoes-terceirizada/`,
    filtros
  );
};

export const getProdutosPorFiltro = async filtro => {
  return await axios.post(`/produtos/filtro-por-parametros/`, filtro);
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
  const url = `${API_URL}/produtos/`;
  let status = 0;
  return fetch(url, {
    method: "POST",
    headers: authToken,
    body: JSON.stringify(payload)
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

export const updateProduto = async payload => {
  const url = `${API_URL}/produtos/${payload.uuid}/`;
  let status = 0;
  return fetch(url, {
    method: "PATCH",
    headers: authToken,
    body: JSON.stringify(payload)
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

export const respostaAnaliseSensorial = payload => {
  const url = `${API_URL}/analise-sensorial/terceirizada-responde-analise-sensorial/`;
  let status = 0;
  return fetch(url, {
    method: "POST",
    headers: authToken,
    body: JSON.stringify(payload)
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
      return error;
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
      return error;
    });
};

export const CODAEPedeAnaliseReclamacao = (uuid, payload) => {
  const url = `${API_URL}/homologacoes-produtos/${uuid}/codae-pede-analise-reclamacao/`;
  let status = 0;
  return fetch(url, {
    method: "PATCH",
    headers: authToken,
    body: JSON.stringify(payload)
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

export const CODAERecusaReclamacao = (uuid, payload) => {
  const url = `${API_URL}/homologacoes-produtos/${uuid}/codae-recusa-reclamacao/`;
  let status = 0;
  return fetch(url, {
    method: "PATCH",
    headers: authToken,
    body: JSON.stringify(payload)
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

export const CODAEAceitaReclamacao = (uuid, payload) => {
  const url = `${API_URL}/homologacoes-produtos/${uuid}/codae-aceita-reclamacao/`;
  let status = 0;
  return fetch(url, {
    method: "PATCH",
    headers: authToken,
    body: JSON.stringify(payload)
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
      return error;
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
      return error;
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
      return error;
    });
};

export const getRascunhosDeProduto = async () => {
  return await axios.get(
    `/painel-gerencial-homologacoes-produtos/filtro-por-status/rascunho/`
  );
};

export const excluirRascunhoDeProduto = async uuid => {
  return await axios.delete(`/homologacoes-produtos/${uuid}/`);
};

export const getDashboardGestaoProdutos = async () => {
  return await axios.get(`/painel-gerencial-homologacoes-produtos/dashboard/`);
};

export const getHomologacoesDeProdutoPorStatus = async status => {
  return await axios.get(
    `/painel-gerencial-homologacoes-produtos/filtro-por-status/${status}/`
  );
};

export const getTodosOsProdutos = async () => {
  return await axios.get(`/produtos/todos-produtos/`);
};

export const excluirImagemDoProduto = async uuid => {
  return await axios.delete(`/produto-imagens/${uuid}/`);
};

export const escolaOuNutriReclamaDoProduto = async (uuid, payload) => {
  return await axios.patch(
    `/homologacoes-produtos/${uuid}/escola-ou-nutri-reclama/`,
    payload
  );
};

export const ativarProduto = async (uuid, payload) => {
  return await axios.patch(`/homologacoes-produtos/${uuid}/ativar/`, payload);
};

export const suspenderProduto = async (uuid, payload) => {
  return await axios.patch(
    `/homologacoes-produtos/${uuid}/suspender/`,
    payload
  );
};

export const getNumeroProtocoloAnaliseSensorial = async () => {
  return await axios.get(`/homologacoes-produtos/numero_protocolo/`);
};

export const getReclamacaoDeProduto = async uuid => {
  return await axios.get(`/homologacoes-produtos/${uuid}/reclamacao/`);
};

export const getHomologacoesDeProdutoAnaliseSensorial = async () => {
  return await axios.get(
    `/homologacoes-produtos/aguardando-analise-sensorial/`
  );
};

export const responderReclamacaoProduto = async (uuid, payload) => {
  return await axios.patch(
    `/reclamacoes-produtos/${uuid}/terceirizada-responde/`,
    payload
  );
};

export const getReclamacao = async uuid => {
  return await axios.get(`/reclamacoes-produtos/${uuid}/`);
};

export const flegarHomologacaoPDF = async uuid => {
  return await axios.post(`/homologacoes-produtos/${uuid}/gerar-pdf/`);
};

export const getProdutosPorTerceirizada = async filtro => {
  return await axios.post(
    `/produtos/filtro-por-parametros-agrupado-terceirizada/`,
    filtro
  );
};

export const getRelatorioProdutosHomologados = filtros => {
  let url = `${API_URL}/produtos/relatorio-por-parametros-agrupado-terceirizada/`;
  const entries = Object.entries(filtros);
  if (entries.length) {
    const urlParams = new URLSearchParams();
    for (let [key, value] of entries) {
      urlParams.append(key, value);
    }
    return `${url}?${urlParams.toString()}`;
  }
  return url;
};

export const getProdutosSuspensos = async payload => {
  return await axios.post(
    `/homologacoes-produtos/homologacoes_suspensas/`,
    payload
  );
};

export const getPdfRelatorioSituacaoProduto = async params => {
  const { data } = await axios.get("/produtos/relatorio-situacao-produto/", {
    responseType: "blob",
    params
  });
  saveAs(data, "relatorio_situacao_produto.pdf");
};
