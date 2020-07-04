import { getRelatorioQuantitativo } from "services/terceirizada.service";

// Por algum motivo não consegui usar as constantes de status como chave do objeto
const MAPEAMENTO_STATUS_LABEL = {
  CODAE_AUTORIZOU_RECLAMACAO: "Reclamação de produto",
  CODAE_SUSPENDEU: "Produtos suspensos",
  CODAE_QUESTIONADO: "Produtos pendentes de homologação",
  CODAE_PEDIU_ANALISE_RECLAMACAO: "Produtos em análise de reclamação",
  CODAE_PEDIU_ANALISE_SENSORIAL: "Produtos aguardando análise sensorial",
  CODAE_PENDENTE_HOMOLOGACAO: "Produtos pendentes de homologação",
  CODAE_HOMOLOGADO: "Produtos homologados",
  CODAE_NAO_HOMOLOGADO: "Produtos não homologados",
  ESCOLA_OU_NUTRICIONISTA_RECLAMOU: "Produtos em análise de reclamação",
  TERCEIRIZADA_RESPONDEU_RECLAMACAO: "Produtos em análise de reclamação"
};

export const relatorioQuantitativo = async params => {
  const dadosRelatorio = await getRelatorioQuantitativo(params);
  const qtdePorStatusZerado = {};
  const relatorio = [];
  let totalProdutos = 0;

  Object.values(MAPEAMENTO_STATUS_LABEL).forEach(
    status => (qtdePorStatusZerado[status] = 0)
  );

  dadosRelatorio.data.results.forEach(dadosTerceirizada => {
    const qtdePorStatus = Object.assign({}, qtdePorStatusZerado);
    let totalProdutosTerceirizada = 0;
    dadosTerceirizada.qtde_por_status.forEach(statusEQtde => {
      totalProdutosTerceirizada += statusEQtde.qtde;
      totalProdutos += statusEQtde.qtde;
      qtdePorStatus[MAPEAMENTO_STATUS_LABEL[statusEQtde.status]] +=
        statusEQtde.qtde;
    });
    relatorio.push({
      nomeTerceirizada: dadosTerceirizada.nome_terceirizada,
      qtdePorStatus,
      totalProdutos: totalProdutosTerceirizada
    });
  });

  return {
    totalProdutos,
    detalhes: relatorio
  };
};
