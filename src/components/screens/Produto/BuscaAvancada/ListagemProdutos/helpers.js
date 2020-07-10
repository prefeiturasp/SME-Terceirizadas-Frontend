import moment from "moment";

export const retornaStatusFormatado = status => {
  switch (status) {
    case "CODAE_AUTORIZOU_RECLAMACAO":
      return "Reclamação de produto";
    case "CODAE_SUSPENDEU":
      return "Produtos Suspensos";
    case "CODAE_QUESTIONADO":
      return "Correção de produto";
    case "CODAE_PEDIU_ANALISE_RECLAMACAO":
      return "Aguardando análise de reclamação";
    case "CODAE_PEDIU_ANALISE_SENSORIAL":
      return "Aguardando análise sensorial";
    case "CODAE_PENDENTE_HOMOLOGACAO":
      return "Pendente de homologação";
    case "CODAE_HOMOLOGADO":
      return "Homologado";
    case "CODAE_NAO_HOMOLOGADO":
      return "Não homologado";
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
