import process from "process";

import { corrigeLinkAnexo } from "../../utilities";

//TODO: fazer iterando valores
describe("Teste corrigeLinkAnexo", () => {
  const urlHttp = "http://example.com";
  const urlHttps = "https://example.com";
  it("retorna a própria URL se não estiver em produção", () => {
    expect(corrigeLinkAnexo(urlHttp)).toBe(urlHttp);
  });

  it("retorna a URL com HTTPS se estiver em produção", () => {
    process.env.NODE_ENV = "production";
    expect(corrigeLinkAnexo(urlHttp)).toBe(urlHttps);
    expect(corrigeLinkAnexo(urlHttps)).toBe(urlHttps);
  });
});
