import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { CALENDARIO_CRONOGRAMA, PRE_RECEBIMENTO } from "configs/constants";
import { CalendarioCronograma } from "components/Shareable/CalendarioCronograma";
import { getCalendarioCronogramas } from "services/cronograma.service";

const atual = {
  href: `/${PRE_RECEBIMENTO}/${CALENDARIO_CRONOGRAMA}`,
  titulo: "Calendário de Cronogramas",
};

const anteriores = [
  {
    href: `/`,
    titulo: "Pré-Recebimento",
  },
];

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <CalendarioCronograma
      getObjetos={getCalendarioCronogramas}
      nomeObjeto="Calendario de Cronogramas"
      nomeObjetoMinusculo="calendario de cronogramas"
    />
  </Page>
);
