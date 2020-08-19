import moment from "moment";

const ordenaProdutosPorDataCadastro = produtos => {
  produtos.sort(function(a, b) {
    const dataA = moment(a.criado_em, "DD/MM/YYYY");
    const dataB = moment(b.criado_em, "DD/MM/YYYY");
    if (dataA < dataB) {
      return -1;
    }
    if (dataA > dataB) {
      return 1;
    }
    return 0;
  });
  return produtos;
};

const ordenaProdutosPorNome = produtos => {
  produtos.sort(function(a, b) {
    if (a.nome < b.nome) {
      return -1;
    }
    if (a.nome > b.nome) {
      return 1;
    }
    return 0;
  });
  return produtos;
};

export const ordenaProdutos = produtos => {
  produtos = ordenaProdutosPorNome(produtos);
  produtos = ordenaProdutosPorDataCadastro(produtos);
  return produtos;
};
