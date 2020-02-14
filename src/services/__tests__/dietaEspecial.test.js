import mock from "../_mock";

import { API_URL } from "../../constants/config.constants";
import { ENDPOINT } from "../../constants";

import {
  CODAEAutorizaDietaEspecial,
  getAlimentos,
  getDietasAtivasInativasPorAluno
} from "../dietaEspecial.service";

describe("test getDietasAtivasInativasPorAluno", () => {
  const baseUrl = `${API_URL}/solicitacoes-dieta-especial-ativas-inativas/`;
  mock.onGet(baseUrl).reply(200, ["dietas", "inativas"]);
  mock.onGet(baseUrl + "?dre=12").reply(200, ["dietas", "inativas"]);
  test("sem parâmetros", async () => {
    const response = await getDietasAtivasInativasPorAluno();
    expect(response.data).toEqual(["dietas", "inativas"]);
    expect(response.status).toEqual(200);
  });
  test("pesquisa dre", async () => {
    const response = await getDietasAtivasInativasPorAluno({
      dre: 12
    });
    expect(response.data).toEqual(["dietas", "inativas"]);
    expect(response.status).toEqual(200);
  });
});

describe("test getAlimentos", () => {
  const baseUrl = `${API_URL}/${ENDPOINT.ALIMENTOS}/`;
  mock.onGet(baseUrl).reply(200, ["lista", "de", "alimentos"]);
  test("obtem lista de alimentos", async () => {
    const response = await getAlimentos();
    expect(response.data).toEqual(["lista", "de", "alimentos"]);
    expect(response.status).toEqual(200);
  });
});

describe("test CODAEAutorizaDietaEspecial", () => {
  const baseUrl = `${API_URL}/${ENDPOINT.AUTORIZAR_DIETA("1234-5678")}/`;
  mock.onPatch(baseUrl).reply(200, {
    detail: "Autorização de dieta especial realizada com sucesso"
  });
  test("autorização bem sucedida", async () => {
    const response = await CODAEAutorizaDietaEspecial({
      uuid: "1234-5678"
    });
    expect(response.data).toEqual({
      detail: "Autorização de dieta especial realizada com sucesso"
    });
    expect(response.status).toEqual(200);
  });
});
