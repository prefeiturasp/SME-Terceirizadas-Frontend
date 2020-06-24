import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import RelatorioAnaliseSensorial from "../../components/screens/Produto/RelatorioAnaliseSensorial";
import Page from "../../components/Shareable/Page/Page";
import {
  PESQUISA_DESENVOLVIMENTO,
  RELATORIO_ANALISE_SENSORIAL,
  BUSCA_PRODUTO_ANALISE_SENSORIAL
} from "../../configs/constants";

const atual = {
  href: `/${PESQUISA_DESENVOLVIMENTO}/${RELATORIO_ANALISE_SENSORIAL}`,
  titulo: "Responder análise sensorial"
};

export default () => (
  <Page
    titulo={"Responder análise sensorial"}
    botaoVoltar
    voltarPara={`/${PESQUISA_DESENVOLVIMENTO}/${BUSCA_PRODUTO_ANALISE_SENSORIAL}`}
  >
    <Breadcrumb home={"/"} atual={atual} />
    <RelatorioAnaliseSensorial />
  </Page>
);
