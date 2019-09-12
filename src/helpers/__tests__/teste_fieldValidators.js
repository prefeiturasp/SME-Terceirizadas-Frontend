import { deveSerNoAnoCorrente } from "../fieldValidators";

describe("Teste mesmo ano corrente", () => {
  it("não é o mesmo ano corrente", () => {
    expect(deveSerNoAnoCorrente("14/12/2021")).toBe("Deve ser no mesmo ano");
  });

  it("é o mesmo ano corrente", () => {
    expect(deveSerNoAnoCorrente("14/12/2019")).toBe(undefined);
  });

  it("é o mesmo ano corrente", () => {
    expect(deveSerNoAnoCorrente("31/12/2019")).toBe(undefined);
  });

  it("não é o mesmo ano corrente", () => {
    expect(deveSerNoAnoCorrente("14/12/2020")).toBe("Deve ser no mesmo ano");
  });

  it("não é o mesmo ano corrente", () => {
    expect(deveSerNoAnoCorrente("14/12/2018")).toBe("Deve ser no mesmo ano");
  });
});
