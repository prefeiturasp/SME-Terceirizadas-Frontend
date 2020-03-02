import mock from "../_mock";

import { API_URL } from "../../constants/config.constants";
import { ENDPOINT } from "../../constants";

import {
  criaAlteracaoCardapioCei,
  getAlunosPorFaixaEtariaNumaData,
  getEscolaPeriodoEscolares,
  iniciaFluxoAlteracaoCardapioCei
} from "../alteracaoDeCardapioCEI.service";

test("getAlunosPorFaixaEtariaNumaData", async () => {
  const escolaPeriodoUUID = "asdf-qwer-1234";
  const dataReferencia = "2020-04-01";
  const baseUrl = `${API_URL}/${
    ENDPOINT.QUANTIDADE_ALUNOS_POR_PERIODO
  }/${escolaPeriodoUUID}/alunos-por-faixa-etaria/${dataReferencia}/`;
  mock.onGet(baseUrl).reply(200, ["faixas", "etarias"]);
  const response = await getAlunosPorFaixaEtariaNumaData(
    escolaPeriodoUUID,
    dataReferencia
  );
  expect(response.data).toEqual(["faixas", "etarias"]);
  expect(response.status).toEqual(200);
});

describe("test criaAlteracaoCardapioCei", () => {
  const baseUrl = `${API_URL}/${ENDPOINT.ALTERACOES_CARDAPIO_CEI}/`;
  const data = { dados: "da", alteracao: "de cardapio" };
  mock.onPost(baseUrl).reply(201, { alteracao: "criada" });
  test("criada com sucesso", async () => {
    const response = await criaAlteracaoCardapioCei(data);
    expect(response.data).toEqual({ alteracao: "criada" });
    expect(response.status).toEqual(201);
  });
});

describe("test iniciaFluxoAlteracaoCardapioCei", () => {
  const uuid = "asdf-qwer-1234";
  const baseUrl = `${API_URL}/${ENDPOINT.ALTERACOES_CARDAPIO_CEI}/${uuid}/${
    ENDPOINT.INICIO_PEDIDO
  }/`;
  mock.onPatch(baseUrl).reply(200, { iniciado: "com sucesso" });
  test("iniciado com sucesso", async () => {
    const response = await iniciaFluxoAlteracaoCardapioCei(uuid);
    expect(response.data).toEqual({ iniciado: "com sucesso" });
    expect(response.status).toEqual(200);
  });
});

describe("test getEscolaPeriodoEscolares", () => {
  const baseUrl = `${API_URL}/${ENDPOINT.QUANTIDADE_ALUNOS_POR_PERIODO}/`;
  mock
    .onGet(baseUrl)
    .reply(200, { escolaPeriodoEscolares: "lista de resultados" });
  test("obtem os dados corretamente", async () => {
    const response = await getEscolaPeriodoEscolares();
    expect(response.data).toEqual({
      escolaPeriodoEscolares: "lista de resultados"
    });
    expect(response.status).toEqual(200);
  });
});
