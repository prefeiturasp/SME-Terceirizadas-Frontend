import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import {
  DETALHAR_NOTIFICACAO,
  LOGISTICA,
  GUIAS_NOTIFICACAO,
} from "configs/constants";
import NotificarEmpresa from "components/screens/Logistica/NotificarEmpresa";

const atual = {
  href: `/${LOGISTICA}/${DETALHAR_NOTIFICACAO}`,
  titulo: "Detalhar Notificação",
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
    href: `/${LOGISTICA}/${GUIAS_NOTIFICACAO}`,
    titulo: "Guias com Notificações",
  },
];

const voltarPara = `/${LOGISTICA}/${GUIAS_NOTIFICACAO}`;

export default () => (
  <Page botaoVoltar voltarPara={voltarPara} titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <NotificarEmpresa naoEditavel botaoVoltar voltarPara={voltarPara} />
  </Page>
);
