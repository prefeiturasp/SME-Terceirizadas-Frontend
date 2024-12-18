import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { getListaDiasSobremesaDoce } from "services/medicaoInicial/diaSobremesaDoce.service";
import * as periodoLancamentoMedicaoService from "services/medicaoInicial/periodoLancamentoMedicao.service";
import { getSolicitacoesInclusoesAutorizadasEscola } from "services/medicaoInicial/periodoLancamentoMedicao.service";
import * as perfilService from "services/perfil.service";
import { PeriodoLancamentoMedicaoInicialCEI } from "..";
import { mockCategoriasMedicaoCEI } from "mocks/medicaoInicial/PeriodoLancamentoMedicaoInicialCEI/mockCategoriasMedicaoCEI";
import { mockDiasCalendarioCEI } from "mocks/medicaoInicial/PeriodoLancamentoMedicaoInicialCEI/mockDiasCalendarioCEI";
import { mockFeriadosNoMesCEI } from "mocks/medicaoInicial/PeriodoLancamentoMedicaoInicialCEI/mockFeriadosNoMesCEI";
import { mockInclusoesAutorizadasEscolaCEI } from "mocks/medicaoInicial/PeriodoLancamentoMedicaoInicialCEI/mockInclusoesAutorizadasEscolaCEI.";
import { mockLogsDietasAutorizadasCEI } from "mocks/medicaoInicial/PeriodoLancamentoMedicaoInicialCEI/mockLogsDietasAutorizadasCEI";
import { mockLogsMatriculadosCEI } from "mocks/medicaoInicial/PeriodoLancamentoMedicaoInicialCEI/mockLogsMatriculadosCEI";
import { mockLogsMatriculadosCEIInclusao } from "mocks/medicaoInicial/PeriodoLancamentoMedicaoInicialCEI/mockLogsMatriculadosCEIInclusao";
import { mockMeusDadosEscolaCEI } from "mocks/medicaoInicial/PeriodoLancamentoMedicaoInicialCEI/mockMeusDadosEscolaCEI";
import { mockValoresMedicaoCEI } from "mocks/medicaoInicial/PeriodoLancamentoMedicaoInicialCEI/mockValoresMedicaoCEI";

jest.mock("services/perfil.service.js");
jest.mock("services/medicaoInicial/diaSobremesaDoce.service.js");
jest.mock("services/medicaoInicial/periodoLancamentoMedicao.service");

const awaitServices = async () => {
  await waitFor(() => expect(perfilService.meusDados).toHaveBeenCalled());
  await waitFor(() => expect(getListaDiasSobremesaDoce).toHaveBeenCalled());
  await waitFor(() =>
    expect(getSolicitacoesInclusoesAutorizadasEscola).toHaveBeenCalled()
  );
  await waitFor(() =>
    expect(periodoLancamentoMedicaoService.getFeriadosNoMes).toHaveBeenCalled()
  );
};

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
    getListaDiasSobremesaDoce.mockResolvedValue({ data: [], status: 200 });
    getSolicitacoesInclusoesAutorizadasEscola.mockResolvedValue({
      data: mockInclusoesAutorizadasEscolaCEI,
      status: 200,
    });
    periodoLancamentoMedicaoService.getLogMatriculadosPorFaixaEtariaDia.mockResolvedValueOnce(
      {
        data: mockLogsMatriculadosCEIInclusao,
        status: 200,
      }
    );
    periodoLancamentoMedicaoService.getSolicitacoesAlteracoesAlimentacaoAutorizadasEscola.mockResolvedValue(
      { results: [] }
    );
    periodoLancamentoMedicaoService.getLogMatriculadosPorFaixaEtariaDia.mockResolvedValueOnce(
      {
        data: mockLogsMatriculadosCEI,
        status: 200,
      }
    );
    periodoLancamentoMedicaoService.getSolicitacoesSuspensoesAutorizadasEscola.mockResolvedValue(
      { results: [] }
    );
    periodoLancamentoMedicaoService.getCategoriasDeMedicao.mockResolvedValue({
      data: mockCategoriasMedicaoCEI,
      status: 200,
    });
    periodoLancamentoMedicaoService.getLogDietasAutorizadasCEIPeriodo.mockResolvedValue(
      { data: mockLogsDietasAutorizadasCEI, status: 200 }
    );
    periodoLancamentoMedicaoService.getValoresPeriodosLancamentos.mockResolvedValue(
      { data: mockValoresMedicaoCEI, status: 200 }
    );
    periodoLancamentoMedicaoService.getDiasParaCorrecao.mockResolvedValue({
      data: [],
      status: 200,
    });
    periodoLancamentoMedicaoService.getDiasCalendario.mockResolvedValue({
      data: mockDiasCalendarioCEI,
      status: 200,
    });
    periodoLancamentoMedicaoService.getFeriadosNoMes.mockResolvedValue({
      data: mockFeriadosNoMesCEI,
      status: 200,
    });

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

  it("renderiza label `Semana 1`", async () => {
    await awaitServices();
    expect(screen.getByText("Semana 1")).toBeInTheDocument();
  });

  it("renderiza label `Semana 5`", async () => {
    await awaitServices();
    expect(screen.getByText("Semana 5")).toBeInTheDocument();
  });

  it("renderiza label `ALIMENTAÇÃO`", async () => {
    await awaitServices();
    expect(screen.getByText("ALIMENTAÇÃO")).toBeInTheDocument();
  });

  it("renderiza label `Matriculados` dentro da seção `ALIMENTAÇÃO`", async () => {
    await awaitServices();
    const categoriaAlimentacaoUuid = "0e1f14ce-685a-4d4c-b0a7-96efe52b754f";
    const myElement = screen.getByTestId(
      `div-lancamentos-por-categoria-${categoriaAlimentacaoUuid}`
    );
    const allMatriculados = screen.getAllByText("Matriculados");
    const specificMatriculados = allMatriculados.find((element) =>
      myElement.contains(element)
    );
    expect(specificMatriculados).toBeInTheDocument();
  });

  it("renderiza label `Seg.` dentro da seção `ALIMENTAÇÃO`", async () => {
    await awaitServices();
    const categoriaAlimentacaoUuid = "0e1f14ce-685a-4d4c-b0a7-96efe52b754f";
    const myElement = screen.getByTestId(
      `div-lancamentos-por-categoria-${categoriaAlimentacaoUuid}`
    );
    const allMatriculados = screen.getAllByText("Seg.");
    const specificMatriculados = allMatriculados.find((element) =>
      myElement.contains(element)
    );
    expect(specificMatriculados).toBeInTheDocument();
  });

  it("renderiza label `DIETA ESPECIAL - TIPO B - LANCHE`", async () => {
    await awaitServices();
    expect(
      screen.getByText("DIETA ESPECIAL - TIPO B - LANCHE")
    ).toBeInTheDocument();
  });
});
