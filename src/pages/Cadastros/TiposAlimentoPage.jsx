import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import {
  CADASTROS,
  CONFIGURACOES,
  TIPOS_ALIMENTO,
} from "../../configs/constants";
import TiposAlimento from "components/screens/Cadastros/TiposAlimento";

const atual = {
  href: `/${CONFIGURACOES}/${CADASTROS}/${TIPOS_ALIMENTO}`,
  titulo: "Cadastro de Tipos de Alimento",
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar>
    <Breadcrumb home={"/"} atual={atual} />
    <TiposAlimento />
  </Page>
);
