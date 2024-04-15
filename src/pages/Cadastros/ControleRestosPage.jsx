import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import { CONTROLE_RESTOS } from "../../configs/constants";
import ControleRestos from "components/screens/Cadastros/ControleRestos";

const atual = {
  href: `/${CONTROLE_RESTOS}`,
  titulo: "Controle de Restos",
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar>
    <Breadcrumb home={"/"} atual={atual} />
    <ControleRestos />
  </Page>
);
