import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { PeriodoLancamentoMedicaoInicialCEI } from "..";
import * as perfilService from "services/perfil.service";
import { mockMeusDadosEscolaCEI } from "./mocks/mockMeusDadosEscolaCEI";
import { getListaDiasSobremesaDoce } from "services/medicaoInicial/diaSobremesaDoce.service";

jest.mock("services/perfil.service.js");
jest.mock("services/medicaoInicial/diaSobremesaDoce.service.js");

describe("Test <PeriodoLancamentoMedicaoInicialCEI> com inclusão em dia não letivo", () => {
  const mockLocationState = {
    ehEmeiDaCemei: false,
    escola: "CEI DIRET VILA BRASILANDIA",
    justificativa_periodo: null,
    mesAnoSelecionado: new Date("2024-11-01T00:00:00-03:00"),
    periodo: "PARCIAL",
    periodosInclusaoContinua: undefined,
    status_periodo: "MEDICAO_EM_ABERTO_PARA_PREENCHIMENTO_UE",
    status_solicitacao: "MEDICAO_EM_ABERTO_PARA_PREENCHIMENTO_UE",
    tiposAlimentacao: [],
  };

  beforeEach(() => {
    perfilService.meusDados.mockResolvedValue(mockMeusDadosEscolaCEI);
    getListaDiasSobremesaDoce.mockResolvedValue([]);

    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/", state: mockLocationState }]}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <PeriodoLancamentoMedicaoInicialCEI />
      </MemoryRouter>
    );
  });

  it("teste mock meusDados", async () => {
    await waitFor(() => expect(perfilService.meusDados).toHaveBeenCalled());
    expect(perfilService.meusDados).toHaveBeenCalledTimes(1);
    expect(perfilService.meusDados).toHaveReturnedWith(
      Promise.resolve(mockMeusDadosEscolaCEI)
    );

    const dados = await perfilService.meusDados();
    expect(dados.vinculo_atual).toBeDefined();
    expect(dados.vinculo_atual.instituicao).toBeDefined();
    expect(dados.vinculo_atual.instituicao.nome).toBe(
      "CEI DIRET VILA BRASILANDIA"
    );
  });

  it("teste mock getDiasSobremesaDoce", async () => {
    await waitFor(() => expect(getListaDiasSobremesaDoce).toHaveBeenCalled());
    expect(getListaDiasSobremesaDoce).toHaveBeenCalledTimes(1);
    expect(getListaDiasSobremesaDoce).toHaveReturnedWith(Promise.resolve([]));
  });

  it("renderiza label `Mês do Lançamento`", () => {
    expect(screen.getByText("Mês do Lançamento")).toBeInTheDocument();
  });

  it("renderiza valor `Novembro / 2024` no input `Mês do Lançamento`", () => {
    const inputElement = screen.getByTestId("input-mes-lancamento");
    expect(inputElement).toHaveAttribute("value", "Novembro / 2024");
  });

  it("renderiza label `Período de Lançamento`", () => {
    expect(screen.getByText("Período de Lançamento")).toBeInTheDocument();
  });

  it("renderiza valor `PARCIAL` no input `Período de Lançamento`", () => {
    const inputElement = screen.getByTestId("input-periodo-lancamento");
    expect(inputElement).toHaveAttribute("value", "PARCIAL");
  });

  it("renderiza label `Semanas do Período para Lançamento da Medição Inicial`", () => {
    expect(
      screen.getByText("Semanas do Período para Lançamento da Medição Inicial")
    ).toBeInTheDocument();
  });

  /*it("renderiza label `Semana 1`", () => {
    expect(screen.getByText("Semana 1")).toBeInTheDocument();
  });*/
});
