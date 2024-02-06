import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import {
  EMPENHOS,
  CADASTRO_DE_EMPENHO,
  MEDICAO_INICIAL,
  ACOMPANHAMENTO_DE_LANCAMENTOS,
} from "configs/constants";
import { CadastroDeEmpenho } from "components/screens/LancamentoInicial/CadastroDeEmpenho";

const atual = {
  href: `/${MEDICAO_INICIAL}/${EMPENHOS}/${CADASTRO_DE_EMPENHO}/`,
  titulo: "Cadastrar Empenho",
};

const anterior = [
  {
    href: `/${MEDICAO_INICIAL}/${ACOMPANHAMENTO_DE_LANCAMENTOS}`,
    titulo: "Medição Inicial",
  },
  {
    href: "#",
    titulo: "Cadastros",
  },
  {
    href: `/${MEDICAO_INICIAL}/${EMPENHOS}/`,
    titulo: "Empenhos",
  },
];

export default () => (
  <Page titulo={atual.titulo} botaoVoltar>
    <Breadcrumb home={"/"} anteriores={anterior} atual={atual} />
    <CadastroDeEmpenho />
  </Page>
);
