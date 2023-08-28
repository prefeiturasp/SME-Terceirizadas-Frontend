import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { ATUALIZACAO_EMAIL_EOL, CONFIGURACOES } from "configs/constants";
import AtualizacaoEmailEOL from "components/screens/Configuracoes/AtualizacaoEmailEOL";

const atual = {
  href: `/${CONFIGURACOES}/${ATUALIZACAO_EMAIL_EOL}`,
  titulo: "Atualização de E-mail do EOL",
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
    <AtualizacaoEmailEOL />
  </Page>
);
