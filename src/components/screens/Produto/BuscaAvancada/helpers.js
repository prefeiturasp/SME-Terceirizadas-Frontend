import { TIPO_PERFIL } from "../../../../constants/shared";
import moment from "moment";

export const MIN_DATE = moment("01/01/1960", "DD/MM/YYYY")["_d"];

const retornaTodosOsLogs = homologacoes => {
  let logs = [];
  homologacoes.forEach(hom => {
    hom.logs.forEach(log => {
      log["ativo"] = false;
      log["empresa"] = hom.rastro_terceirizada.nome_fantasia;
      logs.push(log);
    });
  });

  return logs;
};

export const retornaProdutosComUltimaHomolagacao = response => {
  const produtos = response.data.results.map(produto => {
    let homologacoes = [];
    produto.homologacoes.forEach(homolog => {
      homologacoes.push(homolog);
    });

    produto["status"] = homologacoes[homologacoes.length - 1]["status"];

    produto["todos_logs"] = retornaTodosOsLogs(homologacoes);

    return produto;
  });
  return produtos;
};

const retornaStatusBackend = status => {
  switch (status) {
    case "Homologado":
      return "CODAE_HOMOLOGADO";
    case "Não homologado":
      return "CODAE_NAO_HOMOLOGADO";
    case "Aguardando análise sensorial":
      return "CODAE_PEDIU_ANALISE_SENSORIAL";
    case "Pendente de homologação":
      return "CODAE_PENDENTE_HOMOLOGACAO";
    case "Suspenso":
      return "TERCEIRIZADA_CANCELOU";
    case "Correção":
      return "CODAE_QUESTIONADO";
    default:
      return "TODOS";
  }
};

export const retornaArrayDeAcordoComPerfil = () => {
  const tipoPerfil = localStorage.getItem("tipo_perfil");
  if (tipoPerfil === TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA) {
    return [
      "Todos",
      "Homologado",
      "Não homologado",
      "Aguardando análise sensorial",
      "Pendente de homologação",
      "Suspenso",
      "Correção"
    ];
  } else if (tipoPerfil === TIPO_PERFIL.TERCEIRIZADA) {
    return [
      "Todos",
      "Homologado",
      "Não homologado",
      "Aguardando análise sensorial",
      "Pendente de homologação",
      "Suspenso",
      "Correção"
    ];
  } else {
    return ["Todos", "Homologado", "Suspenso", "Correção"];
  }
};

export const tranformaEmobjetoDeBusca = statusHomolog => {
  let arrayStatusBackend = [];
  statusHomolog.forEach(status => {
    arrayStatusBackend.push(retornaStatusBackend(status));
  });
  if (statusHomolog.length === 0) {
    return ["TODOS"];
  } else {
    return arrayStatusBackend;
  }
};

const verificaPesquisaComumOuDietaEspecial = ({
  check_comum,
  check_dieta_especial
}) => {
  if (check_comum && check_dieta_especial) {
    return "todos";
  } else if (check_comum && !check_dieta_especial) {
    return false;
  } else if (!check_comum && check_dieta_especial) {
    return true;
  } else {
    return "todos";
  }
};

const normalizaTextoOuString = conteudoTextual => {
  return conteudoTextual
    .normalize("NFD")
    .replace(/[^a-zA-Zs]/g, "")
    .toLowerCase();
};

const retirarVirgulasDePalavras = palavra => {
  const palavraNormalizada = normalizaTextoOuString(palavra);
  if (palavraNormalizada.includes(",")) {
    return palavraNormalizada.replace(",", "");
  } else {
    return palavraNormalizada;
  }
};

const retornaArrayComPalavrasDeBusca = arrayDePalavras => {
  return arrayDePalavras.map(palavra => {
    return retirarVirgulasDePalavras(palavra);
  });
};

const achouPalavrasNoTexto = (palavras, texto) => {
  let achou = false;
  palavras.forEach(palavra => {
    if (texto.includes(palavra)) {
      achou = true;
    }
  });
  return achou;
};

const retornaArrayComAdtivosFiltrados = (produtos, string) => {
  let arrayFiltrada = [];
  produtos.forEach(produto => {
    const texto = normalizaTextoOuString(produto.aditivos);
    const arrayDePalavras = string.split(" ");
    const palavras = retornaArrayComPalavrasDeBusca(arrayDePalavras);
    if (achouPalavrasNoTexto(palavras, texto)) {
      arrayFiltrada.push(produto);
    }
  });

  return arrayFiltrada;
};

const retornaArraySemFiltroDeAditivos = produtos => {
  let arrayProdutos = [];
  produtos.forEach(produto => {
    if (produto.tem_aditivos_alergenicos) {
      arrayProdutos.push(produto);
    }
  });
  return arrayProdutos;
};

const buscaAlergenicosEmAdtivos = (produtos, string) => {
  if (string === undefined) {
    return retornaArraySemFiltroDeAditivos(produtos);
  } else {
    return retornaArrayComAdtivosFiltrados(
      retornaArraySemFiltroDeAditivos(produtos),
      string
    );
  }
};

const buscaProdutosSemAlergenicos = produtos => {
  let arrayProdutos = [];

  produtos.forEach(produto => {
    if (!produto.tem_aditivos_alergenicos) {
      arrayProdutos.push(produto);
    }
  });

  return arrayProdutos;
};

const datadoProdutoEstaNoRange = ({ data_inicio, data_fim }, { criado_em }) => {
  const dataCriacao = moment(criado_em, "DD/MM/YYYY");
  if (dataCriacao <= data_fim && dataCriacao >= data_inicio) {
    return true;
  } else {
    return false;
  }
};

const buscarDataDe = payload => {
  if (payload.hasOwnProperty("data-de")) {
    if (payload["data-de"] === null) {
      return moment("01/01/1960", "DD/MM/YYYY");
    } else {
      return moment(payload["data-de"], "DD/MM/YYYY");
    }
  } else {
    return moment("01/01/1960", "DD/MM/YYYY");
  }
};

const buscarDataAte = payload => {
  if (payload.hasOwnProperty("data-ate")) {
    if (payload["data-ate"] === null) {
      return moment();
    } else {
      return moment(payload["data-ate"], "DD/MM/YYYY");
    }
  } else {
    return moment();
  }
};

const retornaProdutosDentroDoRange = (objetoDeBusca, arrayProdutos) => {
  let arrayFiltrados = [];
  arrayProdutos.forEach(produto => {
    if (datadoProdutoEstaNoRange(objetoDeBusca, produto)) {
      arrayFiltrados.push(produto);
    }
  });
  return arrayFiltrados;
};

const retornaProdutosDentroDosStatus = ({ status }, arrayFiltradoPorData) => {
  let arrayFiltrados = [];
  arrayFiltradoPorData.forEach(produto => {
    if (status.includes(produto["status"])) {
      arrayFiltrados.push(produto);
    }
  });
  return arrayFiltrados;
};

const retornaProdutosPorDieta = (
  { eh_para_alunos_com_dieta },
  arrayFiltradoPorData
) => {
  let arrayFiltrados = [];
  if (eh_para_alunos_com_dieta !== "todos") {
    arrayFiltradoPorData.forEach(produto => {
      if (eh_para_alunos_com_dieta === produto["eh_para_alunos_com_dieta"]) {
        arrayFiltrados.push(produto);
      }
    });
    return arrayFiltrados;
  } else {
    return arrayFiltradoPorData;
  }
};

const buscaProdutosPorNome = (produtos, { nome }) => {
  let produtosRetorno = [];
  produtos.map(produto => {
    const nomeProduto = produto["nome"].toLowerCase();
    if (nomeProduto.includes(nome.toLowerCase())) {
      produtosRetorno.push(produto);
    }
  });
  return produtosRetorno;
};

const buscaProdutosPorMarca = (produtos, { marca }) => {
  let produtosRetorno = [];
  produtos.map(produto => {
    const nomeMarca = produto["marca"]["nome"].toLowerCase();
    if (nomeMarca.includes(marca.toLowerCase())) {
      produtosRetorno.push(produto);
    }
  });
  return produtosRetorno;
};

const buscaProdutosPorFabricante = (produtos, { fabricante }) => {
  let produtosRetorno = [];
  produtos.map(produto => {
    const nomeFabricante = produto["fabricante"]["nome"].toLowerCase();
    if (nomeFabricante.includes(fabricante.toLowerCase())) {
      produtosRetorno.push(produto);
    }
  });
  return produtosRetorno;
};

export const filtrarProdutosNaListagem = (payload, arrayProdutos) => {
  let objetoDeBusca = {};
  let produtos = [];
  const tiposDieta = verificaPesquisaComumOuDietaEspecial(payload);

  if (payload["produtos_alergenicos"] !== undefined) {
    objetoDeBusca["tem_aditivos_alergenicos"] = payload["produtos_alergenicos"];
  } else {
    objetoDeBusca["tem_aditivos_alergenicos"] = false;
  }

  objetoDeBusca["eh_para_alunos_com_dieta"] = tiposDieta;
  objetoDeBusca["data_inicio"] = buscarDataDe(payload)._d;
  objetoDeBusca["data_fim"] = buscarDataAte(payload)._d;
  objetoDeBusca["status"] =
    payload["status"][0] === "TODOS"
      ? tranformaEmobjetoDeBusca(retornaArrayDeAcordoComPerfil())
      : payload["status"];

  const arrayFiltradoPorData = retornaProdutosDentroDoRange(
    objetoDeBusca,
    arrayProdutos
  );

  const arrayFiltradoPorStatus = retornaProdutosDentroDosStatus(
    objetoDeBusca,
    arrayFiltradoPorData
  );

  const arrayFiltroDieta = retornaProdutosPorDieta(
    objetoDeBusca,
    arrayFiltradoPorStatus
  );

  if (objetoDeBusca["tem_aditivos_alergenicos"]) {
    if (payload["aditivos"] === null) {
      payload["aditivos"] = undefined;
    }
    const stringBusca = payload["aditivos"];
    produtos = buscaAlergenicosEmAdtivos(arrayFiltroDieta, stringBusca);
  } else {
    produtos = buscaProdutosSemAlergenicos(arrayFiltroDieta);
  }

  if (payload["nome"] === null) {
    delete payload["nome"];
  }

  if (payload["marca"] === null) {
    delete payload["marca"];
  }

  if (payload["fabricante"] === null) {
    delete payload["fabricante"];
  }

  if (payload["nome"] !== undefined) {
    produtos = buscaProdutosPorNome(produtos, payload);
  }

  if (payload["marca"] !== undefined) {
    produtos = buscaProdutosPorMarca(produtos, payload);
  }

  if (payload["fabricante"] !== undefined) {
    produtos = buscaProdutosPorFabricante(produtos, payload);
  }

  return produtos;
};
