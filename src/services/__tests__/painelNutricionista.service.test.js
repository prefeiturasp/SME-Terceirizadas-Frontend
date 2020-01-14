import fetchMock from "fetch-mock";

import { SOLICITACOES, SOLICITACOES_DIETA } from "../contants";
import { API_URL } from "../../constants/config.constants";
import {
  autorizaSolicitacaoDietaEspecial,
  getAlergiasIntolerancias,
  getClassificacoesDietaEspecial,
  getMotivosNegacaoDietaEspecial,
  getSolicitacaoDietaEspecial,
  getSolicitacoesPendentesNutricionista,
  getSolicitacoesAutorizadasNutricionista,
  getSolicitacoesNegadasNutricionista,
  getTiposDietaEspecial,
  negaSolicitacaoDietaEspecial
} from "../painelNutricionista.service";

fetchMock.get(`${SOLICITACOES_DIETA}/${SOLICITACOES.PENDENTES}/`, {
  results: ["resultados", "pendentes"]
});
fetchMock.get(`${SOLICITACOES_DIETA}/${SOLICITACOES.AUTORIZADOS}/`, {
  results: ["resultados", "autorizados"]
});
fetchMock.get(`${SOLICITACOES_DIETA}/${SOLICITACOES.NEGADOS}/`, {
  results: ["resultados", "negados"]
});
fetchMock.get(`${API_URL}/alergias-intolerancias`, {
  results: [
    { descricao: "asdf", id: "1234" },
    { descricao: "qwer", id: "5678" }
  ]
});
fetchMock.get(`${API_URL}/tipos-dieta-especial`, {
  results: ["tipos", "dieta", "especial"]
});
fetchMock.get(`${API_URL}/classificacoes-dieta`, {
  results: ["classificacoes", "dieta"]
});
fetchMock.get(`${API_URL}/motivos-negacao`, {
  results: ["motivos", "negacao"]
});
fetchMock.get(`begin:${SOLICITACOES_DIETA}/`, { resultado: "dieta-especial" });
fetchMock.post(`begin:${API_URL}/solicitacoes-dieta-especial/1234/negar/`, {
  mensagem: "Solicitação de Dieta Especial Negada"
});
fetchMock.post(`begin:${API_URL}/solicitacoes-dieta-especial/1234/autorizar/`, {
  mensagem: "Autorização de dieta especial realizada com sucesso"
});

describe("test painelNutricionista.service", () => {
  it("getSolicitacoesPendentesNutricionista", async () => {
    const response = await getSolicitacoesPendentesNutricionista();
    expect(response).toEqual({
      results: ["resultados", "pendentes"],
      status: 200
    });
  });
  it("getSolicitacoesPendentesNutricionista", async () => {
    const response = await getSolicitacoesAutorizadasNutricionista();
    expect(response).toEqual({
      results: ["resultados", "autorizados"],
      status: 200
    });
  });
  it("getSolicitacoesPendentesNutricionista", async () => {
    const response = await getSolicitacoesNegadasNutricionista();
    expect(response).toEqual({
      results: ["resultados", "negados"],
      status: 200
    });
  });
  it("getSolicitacaoDietaEspecial", async () => {
    const response = await getSolicitacaoDietaEspecial();
    expect(response).toEqual({
      results: { resultado: "dieta-especial" },
      status: 200
    });
  });
  it("getAlergiasIntolerancias", async () => {
    const response = await getAlergiasIntolerancias();
    expect(response).toEqual({
      results: [{ nome: "asdf", uuid: "1234" }, { nome: "qwer", uuid: "5678" }],
      status: 200
    });
  });
  it("getTiposDietaEspecial", async () => {
    const response = await getTiposDietaEspecial();
    expect(response).toEqual({
      results: ["tipos", "dieta", "especial"],
      status: 200
    });
  });
  it("getClassificacoesDietaEspecial", async () => {
    const response = await getClassificacoesDietaEspecial();
    expect(response).toEqual({
      results: ["classificacoes", "dieta"],
      status: 200
    });
  });
  it("getMotivosNegacaoDietaEspecial", async () => {
    const response = await getMotivosNegacaoDietaEspecial();
    expect(response).toEqual({
      results: ["motivos", "negacao"],
      status: 200
    });
  });
  it("negaSolicitacaoDietaEspecial", async () => {
    const response = await negaSolicitacaoDietaEspecial({
      uuid: 1234,
      motivo: 1,
      justificativa: "Justificando porque foi negado"
    });
    expect(response).toEqual({
      data: { mensagem: "Solicitação de Dieta Especial Negada" },
      status: 200
    });
  });
  it("autorizaSolicitacaoDietaEspecial", async () => {
    const response = await autorizaSolicitacaoDietaEspecial({
      uuid: 1234,
      classificacaoDieta: 1,
      diagnosticosSelecionados: [2, 3, 4],
      identificacaoNutricionista:
        "ELABORADO por USUARIO NUTRICIONISTA CODAE - CRN null",
      protocolos: ["asdf", "qwer"]
    });
    expect(response).toEqual({
      data: { mensagem: "Autorização de dieta especial realizada com sucesso" },
      status: 200
    });
  });
});
