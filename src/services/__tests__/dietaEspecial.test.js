import moxios from "moxios";

import { API_URL } from "../../constants/config.constants";

import { getDietasAtivasInativasPorAluno } from "../dietaEspecial";

describe("test getDietasAtivasInativasPorAluno", () => {
  const baseUrl = `${API_URL}/solicitacoes-dieta-especial-ativas-inativas/`;
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test("sem parâmetros", async () => {
    moxios.stubRequest(baseUrl, {
      status: 200,
      response: ["dietas", "inativas"]
    });
    const response = await getDietasAtivasInativasPorAluno();
    expect(response.data).toEqual(["dietas", "inativas"]);
    expect(response.status).toEqual(200);
  });
  test("não permite dre+escola", async done => {
    getDietasAtivasInativasPorAluno({
      dre: 1,
      escola: 2
    }).catch(error => {
      expect(error.message).toEqual(
        "Pesquisa permitida apenas por DRE ou Escola, não ambos"
      );
      done();
    });
  });
  test("não permite cod_eol + nome", async done => {
    getDietasAtivasInativasPorAluno({
      codeol: 1,
      nomealuno: 2
    }).catch(error => {
      expect(error.message).toEqual(
        "Pesquisa permitida apenas por Cód. EOL ou Nome do Aluno, não ambos"
      );
      done();
    });
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
