import { cabecalhoDieta } from "../helpers";

describe("test cabecalhoDieta", () => {
  test("retorna com id_externo", async () => {
    const dietaEspecial = {
      id_externo: "ABCDE",
      status_solicitacao: "CODAE_A_AUTORIZAR"
    };
    expect(cabecalhoDieta(dietaEspecial)).toEqual(
      "Dieta Especial - Solicitação de Inclusão # ABCDE"
    );
  });
});
