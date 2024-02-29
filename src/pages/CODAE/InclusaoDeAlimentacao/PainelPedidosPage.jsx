import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import Container from "../../../components/InclusaoDeAlimentacao/CODAE/PainelPedidos/Container";
import { HOME } from "../constants";
import { CODAE, INCLUSAO_ALIMENTACAO } from "../../../configs/constants";
import { useLocation } from "react-router-dom";

const atual = {
  href: `/${CODAE}/${INCLUSAO_ALIMENTACAO}`,
  titulo: "Inclusão de Alimentação - Pendente Autorização",
};

export default () => {
  const location = useLocation();
  const filtros = location.state && location.state.filtros;

  return (
    <Page titulo={atual.titulo} botaoVoltar>
      <Breadcrumb home={HOME} atual={atual} />
      <Container filtros={filtros} />
    </Page>
  );
};
