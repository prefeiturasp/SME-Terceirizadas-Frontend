import React from "react";

import { HOME } from "constants/config";
import {
  RECEBIMENTO,
  FICHA_RECEBIMENTO,
  CADASTRO_FICHA_RECEBIMENTO,
} from "configs/constants";
import Page from "components/Shareable/Page/Page";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Cadastrar from "components/screens/Recebimento/FichaRecebimento/components/Cadastrar";

const atual = {
  href: `/${RECEBIMENTO}/${CADASTRO_FICHA_RECEBIMENTO}`,
  titulo: "Cadastrar Recebimento",
};

const anteriores = [
  {
    href: `/`,
    titulo: "Recebimento",
  },
  {
    href: `/${RECEBIMENTO}/${FICHA_RECEBIMENTO}`,
    titulo: "Ficha de Recebimento",
  },
];

export default () => (
  <Page
    botaoVoltar
    voltarPara={anteriores[anteriores.length - 1].href}
    titulo={atual.titulo}
  >
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <Cadastrar />
  </Page>
);
