import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import { CADASTROS, CODAE, CONSULTA_KITS } from "../../configs/constants";
import ConsultaKitLanche from "../../components/screens/Cadastros/ConsultaKitLanche";

const atual = {
  href: `/${CODAE}/${CADASTROS}/${CONSULTA_KITS}`,
  titulo: "Consulta de Kits"
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={`/`}>
    <Breadcrumb home={"/"} atual={atual} />
    <ConsultaKitLanche />
  </Page>
);
