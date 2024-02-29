import React from "react";

import { HOME } from "constants/config";

import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";

import { ConferenciaDosLancamentos } from "components/screens/LancamentoInicial/ConferenciaDosLancamentos";
import {
  ACOMPANHAMENTO_DE_LANCAMENTOS,
  CONFERENCIA_DOS_LANCAMENTOS,
  MEDICAO_INICIAL,
} from "configs/constants";
import { usuarioEhMedicao } from "helpers/utilities";

const atual = {
  href: `/${MEDICAO_INICIAL}/${CONFERENCIA_DOS_LANCAMENTOS}`,
  titulo: "Conferência dos Lançamentos",
};

const anteriores = [
  {
    href: `/${MEDICAO_INICIAL}/${ACOMPANHAMENTO_DE_LANCAMENTOS}`,
    titulo: "Medição Inicial",
  },
  usuarioEhMedicao() && {
    href: `/${MEDICAO_INICIAL}/${ACOMPANHAMENTO_DE_LANCAMENTOS}`,
    titulo: "Acompanhamento de Lançamentos",
  },
];

export default () => (
  <Page botaoVoltar titulo={"Conferência dos Lançamentos"}>
    <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
    <ConferenciaDosLancamentos />
  </Page>
);
