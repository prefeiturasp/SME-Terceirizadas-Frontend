import React from "react";

import { rest } from "msw";
import { setupServer } from "msw/node";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { API_URL } from "constants/config";
import BuscaAvancada from "../";
import { renderWithProvider } from "../../../../../utils/test-utils";
import { MemoryRouter } from "react-router-dom";

const server = setupServer(
  rest.get(`${API_URL}/produtos/lista-nomes-unicos/`, (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.get(`${API_URL}/marcas/lista-nomes-unicos/`, (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.get(`${API_URL}/fabricantes/lista-nomes-unicos/`, (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.get(`${API_URL}/terceirizadas/lista-nomes/`, (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.get(
    `${API_URL}/produtos-editais/lista-nomes-unicos/`,
    (req, res, ctx) => {
      return res(ctx.json({}));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Relatorio autorizadas temporariamente", async () => {
  // const search = `?uuid=${payload.uuid}&ehInclusaoContinua=false&card=autorizadas-temp`;
  // Object.defineProperty(window, "location", {
  //   value: {
  //     search: search,
  //   },
  // });
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

  expect(await screen.getByText(/Edital/i)).toBeInTheDocument();

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
