import React from "react";

import { HOME } from "constants/config";
import { RECEBIMENTO, FICHA_RECEBIMENTO } from "configs/constants";
import Page from "components/Shareable/Page/Page";
import Breadcrumb from "components/Shareable/Breadcrumb";
import FichaRecebimento from "components/screens/Recebimento/FichaRecebimento";

const atual = {
  href: `/${RECEBIMENTO}/${FICHA_RECEBIMENTO}`,
  titulo: "Ficha de Recebimento",
};

const anteriores = [
  {
    href: `/`,
    titulo: "Recebimento",
  },
];

export default () => (
  <Page
    botaoVoltar
    voltarPara={anteriores[anteriores.length - 1].href}
    titulo={atual.titulo}
  >
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <FichaRecebimento />
  </Page>
);
