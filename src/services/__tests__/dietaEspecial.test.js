import moxios from "../_moxios";

import { API_URL } from "../../constants/config.constants";
import { ENDPOINT } from "../../constants";

import {
  CODAEAutorizaDietaEspecial,
  getAlimentos,
  getDietasAtivasInativasPorAluno
} from "../dietaEspecial.service";

describe("test getDietasAtivasInativasPorAluno", () => {
  const baseUrl = `${API_URL}/solicitacoes-dieta-especial-ativas-inativas/`;
  test("sem parâmetros", async () => {
    moxios.stubRequest(baseUrl, {
      status: 200,
      response: ["dietas", "inativas"]
    });
    const response = await getDietasAtivasInativasPorAluno();
    expect(response.data).toEqual(["dietas", "inativas"]);
    expect(response.status).toEqual(200);
  });
  test("pesquisa dre", async () => {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      expect(request.url).toEqual(baseUrl + "?dre=12");
      request.respondWith({
        status: 200,
        response: ["dietas", "inativas"]
      });
    });
    const response = await getDietasAtivasInativasPorAluno({
      dre: 12
    });
    expect(response.data).toEqual(["dietas", "inativas"]);
    expect(response.status).toEqual(200);
  });
});

describe("test getAlimentos", () => {
  const baseUrl = `${API_URL}/${ENDPOINT.ALIMENTOS}/`;
  test("obtem lista de alimentos", async () => {
    moxios.stubRequest(baseUrl, {
      status: 200,
      response: ["lista", "de", "alimentos"]
    });
    const response = await getAlimentos();
    expect(response.data).toEqual(["lista", "de", "alimentos"]);
    expect(response.status).toEqual(200);
  });
});

describe("test CODAEAutorizaDietaEspecial", () => {
  const baseUrl = `${API_URL}/${ENDPOINT.AUTORIZAR_DIETA("1234-5678")}/`;
  test("autorização bem sucedida", async () => {
    moxios.stubRequest(baseUrl, {
      status: 200,
      response: {
        detail: "Autorização de dieta especial realizada com sucesso"
      }
    });
    const response = await CODAEAutorizaDietaEspecial({
      uuid: "1234-5678"
    });
    expect(response.data).toEqual({
      detail: "Autorização de dieta especial realizada com sucesso"
    });
    expect(response.status).toEqual(200);
  });
});
