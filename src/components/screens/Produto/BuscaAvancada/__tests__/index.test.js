import React from "react";

import { rest } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { API_URL } from "constants/config";
import BuscaAvancada from "../";
import { renderWithProvider } from "../../../../../utils/test-utils";
import { MemoryRouter } from "react-router-dom";
import {
  mockListaEditais,
  mockListaFabricantes,
  mockListaMarcas,
  mockListaProdutos,
  mockListaTerceirizadas,
} from "../../../../../mocks/Produto/BuscaAvancada/listas";
import { mockResultados } from "../../../../../mocks/Produto/BuscaAvancada/results";

const valorBuscaEdital = "101010B";

const server = setupServer(
  rest.get(`${API_URL}/produtos/lista-nomes-unicos/`, (req, res, ctx) => {
    return res(ctx.json(mockListaProdutos()));
  }),
  rest.get(`${API_URL}/marcas/lista-nomes-unicos/`, (req, res, ctx) => {
    return res(ctx.json(mockListaMarcas()));
  }),
  rest.get(`${API_URL}/fabricantes/lista-nomes-unicos/`, (req, res, ctx) => {
    return res(ctx.json(mockListaFabricantes()));
  }),
  rest.get(`${API_URL}/terceirizadas/lista-nomes/`, (req, res, ctx) => {
    return res(ctx.json(mockListaTerceirizadas()));
  }),
  rest.get(
    `${API_URL}/produtos-editais/lista-nomes-unicos/`,
    (req, res, ctx) => {
      return res(ctx.json(mockListaEditais()));
    }
  ),
  rest.get(
    `${API_URL}/produtos/?nome_edital=${valorBuscaEdital}&page=1&page_size=10/`,
    (req, res, ctx) => {
      return res(ctx.json(mockResultados()));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const setup = () => {
  const initialState = {
    buscaAvancadaProduto: {},
    finalForm: {},
  };
  renderWithProvider(
    <MemoryRouter>
      <BuscaAvancada />
    </MemoryRouter>,
    initialState
  );
};

test("Relatorio autorizadas temporariamente", async () => {
  setup();

  expect(screen.getByText(/Edital/i)).toBeInTheDocument();

  const divInputEdital = screen.getByTestId("edital");
  const inputEdital = divInputEdital.getElementsByTagName("input")[0];
  //console.log('---------------------------------')
  //console.log(inputEdital)

  fireEvent.click(divInputEdital);
  fireEvent.click(inputEdital);
  //expect(screen.getByText(/101010B/i)).toBeInTheDocument();

  fireEvent.change(inputEdital, { target: { value: valorBuscaEdital } });

  expect(screen.getByDisplayValue(valorBuscaEdital)).toBeInTheDocument();

  const botao = screen.getByText("Consultar").closest("button");

  fireEvent.click(botao);

  expect(
    screen.getByText(/Veja os resultados para busca/i)
  ).toBeInTheDocument();

  // expect(
  //   await screen.findByText(/dieta especial - Autorizada Temporariamente/i)
  // ).toBeInTheDocument();
  // expect(
  //   await screen.findByRole("button", { name: /histórico/i })
  // ).toBeInTheDocument();
  // expect(await screen.queryByText("Motivo")).not.toBeInTheDocument();
  // expect(
  //   await screen.queryByText("Justificativa da Negação")
  // ).not.toBeInTheDocument();

  // expect(await screen.getByText(/dados do aluno/i)).toBeInTheDocument();
});
