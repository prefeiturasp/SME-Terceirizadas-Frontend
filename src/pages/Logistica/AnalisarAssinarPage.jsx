import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import {
  ANALISAR_ASSINAR,
  LOGISTICA,
  GUIAS_NOTIFICACAO_FISCAL,
} from "configs/constants";
import NotificarEmpresa from "components/screens/Logistica/NotificarEmpresa";

const atual = {
  href: `/${LOGISTICA}/${ANALISAR_ASSINAR}`,
  titulo: "Analisar e Assinar",
};

const anteriores = [
  {
    href: `/`,
    titulo: "Abastecimento",
  },
  {
    href: `/`,
    titulo: "Ocorrências",
  },
  {
    href: `/${LOGISTICA}/${GUIAS_NOTIFICACAO_FISCAL}`,
    titulo: "Guias com Notificações",
  },
];

const voltarPara = `/${LOGISTICA}/${GUIAS_NOTIFICACAO_FISCAL}`;

export default () => (
  <Page botaoVoltar voltarPara={voltarPara} titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <NotificarEmpresa naoEditavel fiscal botaoVoltar />
  </Page>
);
