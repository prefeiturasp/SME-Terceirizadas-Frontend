import getAxios from "../_base";

describe("test getAxios", () => {
  it("requer URL terminando em '/'", async done => {
    const axios = getAxios();
    axios.get("endpoint").catch(error => {
      expect(error.message).toEqual(
        "URLs devem obrigatoriamente terminar em '/': endpoint"
      );
      done();
    });
  });
});
