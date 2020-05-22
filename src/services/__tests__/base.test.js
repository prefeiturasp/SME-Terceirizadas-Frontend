import mock from "../_mock";

import { API_URL } from "../../constants/config";
import { AUTH_TOKEN } from "../constants";
import axios from "../_base";

describe("test getAxios", () => {
  it("requer URL terminando em '/'", async done => {
    axios.get("endpoint").catch(error => {
      expect(error.message).toEqual(
        "URLs devem obrigatoriamente terminar em '/': endpoint"
      );
      done();
    });
  });
  test("seta corretamente headers e configurações", async () => {
    const baseUrl = `${API_URL}/test/`;
    mock.onGet(baseUrl).reply(200, ["lista", "de", "substitutos"]);
    const response = await axios.get(`test/`);
    expect(response.data).toEqual(["lista", "de", "substitutos"]);
    expect(response.status).toEqual(200);
    expect(response.config.baseURL).toEqual(API_URL);
    expect(response.config.headers).toEqual(
      Object.assign(
        {
          Accept: "application/json, text/plain, */*"
        },
        AUTH_TOKEN
      )
    );
  });
});
