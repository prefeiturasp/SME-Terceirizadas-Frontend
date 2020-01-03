import fetchMock from "fetch-mock";

import { SOLICITACOES, SOLICITACOES_DIETA } from "../contants";
import {
  getSolicitacaoDietaEspecial,
  getSolicitacoesPendentesNutricionista,
  getSolicitacoesAutorizadasNutricionista,
  getSolicitacoesNegadasNutricionista
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
fetchMock.get(`begin:${SOLICITACOES_DIETA}/`, { resultado: "dieta-especial" });

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
});
