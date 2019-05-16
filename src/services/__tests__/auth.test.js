import authService from "../auth";

const sampleToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6Im1tYWlhLmNjQGdtYWlsLmNvbSIsImV4cCI6MTU1ODAxOTU3OSwiZW1haWwiOiJtbWFpYS5jY0BnbWFpbC5jb20iLCJvcmlnX2lhdCI6MTU1ODAxNTk3OX0.1dd6FpIpKagM5K6Qk8PL499oHi9PCrcoAGRJOqKeBf8";

describe("AuthService isValidResponse", () => {

  it("Test Token Valid", () => {
    const resp = authService.isValidResponse({ token: sampleToken });
    expect(resp).toBe(true);
  });

  it("Test undefined", () => {
    const resp = authService.isValidResponse({ token: undefined });
    expect(resp).toBe(false);
  });

  it("Test plain string", () => {
    const resp = authService.isValidResponse(sampleToken);
    expect(resp).toBe(false);
  });
});

