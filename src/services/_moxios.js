import moxios from "moxios";

import axios from "./_base";

beforeAll(() => {
  moxios.install(axios);
});
afterAll(() => {
  moxios.uninstall();
});

export default moxios;
