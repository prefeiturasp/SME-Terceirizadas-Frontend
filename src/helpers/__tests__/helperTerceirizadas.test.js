import { relatorioQuantitativo } from "helpers/terceirizadas";
import mock from "services/_mock";
import { ENDPOINT_RELATORIO_QUANTITATIVO } from "constants/shared";

const DADOS_TESTE_RELATORIO_QUANTITATIVO = {
  results: [
    {
      nome_terceirizada: "Pedreira bebidas",
      qtde_por_status: [
        {
          status: "CODAE_NAO_HOMOLOGADO",
          qtde: 1
        },
        {
          status: "TERCEIRIZADA_RESPONDEU_RECLAMACAO",
          qtde: 1
        }
      ]
    },
    {
      nome_terceirizada: "SINGULAR GESTÃO DE SERVIÇOS LTDA",
      qtde_por_status: [
        {
          status: "CODAE_HOMOLOGADO",
          qtde: 1
        },
        {
          status: "CODAE_NAO_HOMOLOGADO",
          qtde: 1
        },
        {
          status: "CODAE_PEDIU_ANALISE_RECLAMACAO",
          qtde: 1
        }
      ]
    }
  ]
};

const RESULTADO_RELATORIO_QUANTITATIVO = [
  {
    nomeTerceirizada: "Pedreira bebidas",
    qtdePorStatus: {
      "Reclamação de produto": 0,
      "Produtos suspensos": 0,
      "Produtos pendentes de homologação": 0,
      "Produtos em análise de reclamação": 1,
      "Produtos aguardando análise sensorial": 0,
      "Produtos homologados": 0,
      "Produtos não homologados": 1
    }
  },
  {
    nomeTerceirizada: "SINGULAR GESTÃO DE SERVIÇOS LTDA",
    qtdePorStatus: {
      "Reclamação de produto": 0,
      "Produtos suspensos": 0,
      "Produtos pendentes de homologação": 0,
      "Produtos em análise de reclamação": 1,
      "Produtos aguardando análise sensorial": 0,
      "Produtos homologados": 1,
      "Produtos não homologados": 1
    }
  }
];

describe("test helperTerceirizadas", () => {
  mock
    .onGet(ENDPOINT_RELATORIO_QUANTITATIVO)
    .reply(200, DADOS_TESTE_RELATORIO_QUANTITATIVO);
  test("sem parâmetros", async () => {
    const resultado = await relatorioQuantitativo();
    expect(resultado).toEqual(RESULTADO_RELATORIO_QUANTITATIVO);
  });
});
