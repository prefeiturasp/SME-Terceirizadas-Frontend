import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { CARGAS_USUARIOS, CONFIGURACOES } from "configs/constants";
import CargasUsuarios from "components/screens/Configuracoes/CargasUsuarios";

const atual = {
  href: `/${CONFIGURACOES}/${CARGAS_USUARIOS}`,
  titulo: "Cargas de Usuários",
};

const anteriores = [
  {
    href: `/`,
    titulo: "Configurações",
  },
  {
    href: `/`,
    titulo: "Gestão de Usuários",
  },
];

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <CargasUsuarios servidores />
  </Page>
);
