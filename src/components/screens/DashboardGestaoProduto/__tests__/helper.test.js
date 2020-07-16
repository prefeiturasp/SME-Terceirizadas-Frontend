import moment from "moment";

import { ordenaPorLogMaisRecente } from "../helper";

describe("test ordenaPorLogMaisRecente", () => {
  test("a < b only date", () => {
    const log_a = { log_mais_recente: moment("2020-03-20") };
    const log_b = { log_mais_recente: moment("2020-04-10") };
    expect(ordenaPorLogMaisRecente(log_a, log_b)).toEqual(-1);
  });
  test("a < b date & time", () => {
    const log_a = { log_mais_recente: moment("2020-03-20 15:30") };
    const log_b = { log_mais_recente: moment("2020-03-20 18:15") };
    expect(ordenaPorLogMaisRecente(log_a, log_b)).toEqual(-1);
  });
  test("a > b only date", () => {
    const log_a = { log_mais_recente: moment("2020-05-18") };
    const log_b = { log_mais_recente: moment("2020-04-20") };
    expect(ordenaPorLogMaisRecente(log_a, log_b)).toEqual(1);
  });
  test("a > b date & time", () => {
    const log_a = { log_mais_recente: moment("2020-05-18 14:45") };
    const log_b = { log_mais_recente: moment("2020-05-18 11:00") };
    expect(ordenaPorLogMaisRecente(log_a, log_b)).toEqual(1);
  });
  test("a = b only date", () => {
    const log = { log_mais_recente: moment("2020-08-16") };
    expect(ordenaPorLogMaisRecente(log, log)).toEqual(0);
  });
  test("a = b date & time", () => {
    const log = { log_mais_recente: moment("2020-09-23 08:10") };
    expect(ordenaPorLogMaisRecente(log, log)).toEqual(0);
  });
});
