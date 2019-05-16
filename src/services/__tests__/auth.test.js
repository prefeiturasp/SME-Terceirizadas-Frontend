import authService, { calculateTokenSecondsLeft, isTokenExpired, TOKEN_ALIAS } from "../auth";

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6Im1tYWlhLmNjQGdtYWlsLmNvbSIsImV4cCI6MTU1ODAxOTU3OSwiZW1haWwiOiJtbWFpYS5jY0BnbWFpbC5jb20iLCJvcmlnX2lhdCI6MTU1ODAxNTk3OX0.1dd6FpIpKagM5K6Qk8PL499oHi9PCrcoAGRJOqKeBf8";
localStorage.setItem(TOKEN_ALIAS, token);
const mock = jest.fn();
Date.now = mock.mockReturnValue(new Date(1558020115077));

describe("AuthService isValidResponse", () => {
  it("Should pass token Valid", () => {
    const resp = authService.isValidResponse({ token });
    expect(resp).toBe(true);
  });

  it("Should not pass plain undefined", () => {
    const resp = authService.isValidResponse({ token: undefined });
    expect(resp).toBe(false);
  });

  it("Should not pass plain string", () => {
    const resp = authService.isValidResponse(token);
    expect(resp).toBe(false);
  });
});

describe("AuthService Helper functions", () => {
  it("should return true on isLoggedIn", () => {
    const resp = authService.isLoggedIn();
    expect(resp).toBe(true);
  });
  it("should return correct seconds", () => {
    const resp = calculateTokenSecondsLeft(token);
    expect(resp).toBe(-536.077);
  });
  it("isTokenExpired should return true on token expired", () => {
    const resp = isTokenExpired(token);
    expect(resp).toBe(true);
  });
  it("isTokenExpired should return true when undefined", () => {
    const resp = isTokenExpired(undefined);
    expect(resp).toBe(true);
  });
});
