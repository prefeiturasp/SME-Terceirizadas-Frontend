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

export const tranformaEmobjetoDeBusca = statusHomolog => {
  let arrayStatusBackend = [];
  statusHomolog.forEach(status => {
    arrayStatusBackend.push(retornaStatusBackend(status));
  });
  return arrayStatusBackend;
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

export const filtrarProdutosNaListagem = (payload, arrayProdutos) => {
  let objetoDeBusca = {};
  let produtos = [];
  const tiposDieta = verificaPesquisaComumOuDietaEspecial(payload);

  if (tiposDieta !== "todos") {
    objetoDeBusca["eh_para_alunos_com_dieta"] = tiposDieta;
  }

  if (payload["produtos_alergenicos"] !== undefined) {
    objetoDeBusca["tem_aditivos_alergenicos"] = payload["produtos_alergenicos"];
  } else {
    objetoDeBusca["tem_aditivos_alergenicos"] = false;
  }

  if (objetoDeBusca["tem_aditivos_alergenicos"]) {
    const stringBusca = payload["aditivos"];
    produtos = buscaAlergenicosEmAdtivos(arrayProdutos, stringBusca);
  } else {
    produtos = buscaProdutosSemAlergenicos(arrayProdutos);
  }

  return produtos;
};
