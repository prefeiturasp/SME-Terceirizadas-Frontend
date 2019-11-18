import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Perfil from "../../components/screens/Perfil";
import Page from "../../components/Shareable/Page/Page";
import { PERFIL } from "../../configs/constants";

const atual = {
  href: `/${PERFIL}`,
  titulo: "Perfil"
};

export default () => (
  <Page titulo={"Meus Dados"} botaoVoltar voltarPara={"/"}>
    <Breadcrumb home={"/"} atual={atual} />
    <Perfil />
  </Page>
);
