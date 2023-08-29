import React from "react";
import Container from "../../../components/AlteracaoDeCardapio/CODAE/PainelPedidos/Container";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import { ALTERACAO_TIPO_ALIMENTACAO, CODAE } from "../../../configs/constants";
import { HOME } from "../constants";
import { useLocation } from "react-router-dom";

const atual = {
  href: `/${CODAE}/${ALTERACAO_TIPO_ALIMENTACAO}`,
  titulo: "Alteração do Tipo de Alimentação - Pendente Autorização",
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
