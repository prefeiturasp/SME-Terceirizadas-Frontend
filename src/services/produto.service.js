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

export const getNovaReclamacaoNomesProdutos = async () =>
  await axios.get("/produtos/lista-nomes-nova-reclamacao/");

export const getNovaReclamacaoNomesMarcas = async () =>
  await axios.get("/marcas/lista-nomes-nova-reclamacao/");

export const getNovaReclamacaoNomesFabricantes = async () =>
  await axios.get("/fabricantes/lista-nomes-nova-reclamacao/");

export const getAvaliarReclamacaoNomesProdutos = async () =>
  await axios.get("/produtos/lista-nomes-avaliar-reclamacao/");

export const getAvaliarReclamacaoNomesMarcas = async () =>
  await axios.get("/marcas/lista-nomes-avaliar-reclamacao/");

export const getAvaliarReclamacaoNomesFabricantes = async () =>
  await axios.get("/fabricantes/lista-nomes-avaliar-reclamacao/");

export const getResponderReclamacaoNomesProdutos = async () =>
  await axios.get("/produtos/lista-nomes-responder-reclamacao/");

export const getResponderReclamacaoNomesMarcas = async () =>
  await axios.get("/marcas/lista-nomes-responder-reclamacao/");

export const getResponderReclamacaoNomesFabricantes = async () =>
  await axios.get("/fabricantes/lista-nomes-responder-reclamacao/");

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

export const getProdutosPorParametros = async (parametros, page, pageSize) => {
  console.log("getProdutosPorParametros", { page, parametros });
  return await axios.post(
    `/produtos/filtro-homologados-por-parametros/`,
    parametros,
    { params: { page, page_size: pageSize } }
  );
};

export const getReclamacoesTerceirizadaPorFiltro = async params => {
  return await axios.get(`/produtos/filtro-reclamacoes-terceirizada/`, {
    params
  });
};

export const getProdutosPorFiltro = async filtro => {
  return await axios.post(`/produtos/filtro-por-parametros/`, filtro);
};

export const getProdutosRelatorioSituacao = async params => {
  return await axios.get(`/produtos/filtro-relatorio-situacao-produto/`, {
    params
  });
};

export const getProdutosRelatorioAnaliseSensorial = async params => {
  return await axios.get(`/produtos/filtro-relatorio-em-analise-sensorial/`, {
    params
  });
};

export const getProdutosRelatorioSuspenso = async params => {
  return await axios.get(`/produtos/filtro-relatorio-produto-suspenso/`, {
    params
  });
};

export const getProtocolosDietaEspecial = async () => {
  return await axios.get(`/protocolo-dieta-especial/lista-nomes/`);
};

export const getMarcasProdutos = async () => {
  return await axios.get(`/marcas/`);
};

export const getNomeDeProdutosEdital = async () => {
  return await axios.get(`/nome-de-produtos-edital/`);
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

export const getProdutosAgrupadosNomeMarcas = async filtro => {
  return await axios.post(
    `/produtos/filtro-por-parametros-agrupado-nome-marcas/`,
    filtro
  );
};

export const getRelatorioProdutosHomologados = async params => {
  const { data } = await axios.get(
    "/produtos/relatorio-por-parametros-agrupado-terceirizada/",
    {
      params,
      responseType: "blob"
    }
  );
  saveAs(data, "relatorio_produtos_homologados.pdf");
};

export const getProdutosSuspensos = async payload => {
  return await axios.post(
    `/homologacoes-produtos/homologacoes_suspensas/`,
    payload
  );
};

export const getPdfRelatorioSituacaoProduto = async params => {
  const { data } = await axios.get("/produtos/relatorio-situacao-produto/", {
    params,
    responseType: "blob"
  });
  saveAs(data, "relatorio_situacao_produto.pdf");
};

export const getProdutosListagem = async params => {
  return await axios.get(`/produtos/`, {
    params: params
  });
};

export const solicitarCadastroProdutoDieta = async payload => {
  return await axios.post(`/solicitacao-cadastro-produto-dieta/`, payload);
};

export const getNomeProdutosHomologados = async () => {
  return await axios.get(`/produtos/lista-nomes-homologados/`);
};

export const getSubstitutos = async () => {
  return await axios.get(`/produtos/lista-substitutos/`);
};

export const getNomesProdutosSolicitacaoInclusao = async () =>
  await axios.get("/solicitacao-cadastro-produto-dieta/nomes-produtos/");

export const getSolicitacoesCadastroProdutoDieta = async params =>
  await axios.get("/solicitacao-cadastro-produto-dieta/", { params });

export const updateSolicitacaoCadastroProdutoDieta = async (uuid, params) =>
  await axios.patch(
    `/solicitacao-cadastro-produto-dieta/${uuid}/confirma-previsao/`,
    params
  );

export const getProdutosReclamacoes = async params =>
  await axios.get("/produtos/filtro-reclamacoes/", { params });

export const getProdutosAvaliacaoReclamacao = async params =>
  await axios.get("/produtos/filtro-avaliar-reclamacoes/", { params });

export const produtoJaExiste = async params =>
  await axios.get("/produtos/ja-existe/", { params });
