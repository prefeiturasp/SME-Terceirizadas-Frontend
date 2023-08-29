import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import Container from "../../../components/InversaoDeDiaDeCardapio/DRE/PainelPedidos/Container";
import { HOME } from "../constants";
import { INVERSAO_CARDAPIO, DRE } from "../../../configs/constants";
import { useLocation } from "react-router-dom";

export default () => {
  const atual = {
    href: `/${DRE}/${INVERSAO_CARDAPIO}`,
    titulo: "Inversão de dia de Cardápio",
  };

  const location = useLocation();
  const filtros = location.state && location.state.filtros;

  return (
    <Page titulo={atual.titulo} botaoVoltar>
      <Breadcrumb home={HOME} atual={atual} />
      <Container filtros={filtros} />
    </Page>
  );
};
