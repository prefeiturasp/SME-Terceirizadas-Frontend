import React from "react";
import Container from "../../../components/AlteracaoDeCardapio/CODAE/PainelPedidos/Container";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import { ALTERACAO_TIPO_ALIMENTACAO, CODAE } from "../../../configs/constants";
import { HOME } from "../constants";

const atual = {
  href: `/${CODAE}/${ALTERACAO_TIPO_ALIMENTACAO}`,
  titulo: "Alteração do Tipo de Alimentação - Pendente Autorização"
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={HOME}>
    <Breadcrumb home={HOME} atual={atual} />
    <Container />
  </Page>
);
