import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import {
  CADASTROS,
  DESPERDICIO,
  PARAMETROS_CLASSIFICACAO,
} from "../../configs/constants";
import ParametrosClassificacao from "components/screens/Cadastros/ParametrosClassificacao";

const atual = {
  href: `/${DESPERDICIO}/${CADASTROS}/${PARAMETROS_CLASSIFICACAO}`,
  titulo: "Parametros de Classificação",
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar>
    <Breadcrumb home={"/"} atual={atual} />
    <ParametrosClassificacao />
  </Page>
);
