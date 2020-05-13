import moment from "moment";

export const retornaStatusFormatado = status => {
  switch (status) {
    case "CODAE_NAO_HOMOLOGADO":
      return "Não homologado";
    case "CODAE_HOMOLOGADO":
      return "Homologado";
    case "Não CODAE_PEDIU_ANALISE_SENSORIAL":
      return "Aguardando análise sensorial";
    case "CODAE_PENDENTE_HOMOLOGACAO":
      return "Pendente de homologação";
    case "TERCEIRIZADA_CANCELOU":
      return "Suspenso";
    case "CODAE_QUESTIONADO":
      return "Correção";
    default:
      return "TODOS";
  }
};

const verificaData = (hom1, hom2) => {
  if (
    moment(hom1["criado_em"], "DD/MM/YYYY") <
    moment(hom2["criado_em"], "DD/MM/YYYY")
  ) {
    return true;
  } else {
    return false;
  }
};

const ordenaHomologacoesPorData = homologacoes => {
  homologacoes.forEach((homologI, i) => {
    homologacoes.forEach((homologJ, j) => {
      if (verificaData(homologI, homologJ)) {
        let tmp = homologI;
        homologacoes[i] = homologJ;
        homologacoes[j] = tmp;
      }
    });
  });
  return homologacoes;
};

export const retornaProdutosComHomologacoesOrdenadas = produtos => {
  produtos.forEach(produto => {
    produto["homologacoes"] = ordenaHomologacoesPorData(
      produto["homologacoes"]
    );
    produto["ultima_homologacao"] = produto["homologacoes"][0];
  });
  return produtos;
};

export const retornaArrayDeProdutosParaPaginacao = produtos => {
  let listagemProdutos = [];
  let itensDeListagem = [];
  for (let i = 1; i <= produtos.length; i++) {
    if (i % 10 === 0) {
      itensDeListagem.push(produtos[i - 1]);
      listagemProdutos.push(itensDeListagem);
      itensDeListagem = [];
    } else {
      itensDeListagem.push(produtos[i - 1]);
    }
  }
  listagemProdutos.push(itensDeListagem);
  return listagemProdutos;
};
