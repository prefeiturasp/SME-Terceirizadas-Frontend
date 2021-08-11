import React, { useEffect, useState } from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import {
  CONFERIR_ENTREGA,
  REPOSICAO_GUIA,
  CONFERENCIA_GUIA_COM_OCORRENCIA,
  LOGISTICA
} from "configs/constants";
import ConferenciaDeGuiaResumoFinal from "components/screens/Logistica/ConferenciaDeGuiaResumoFinal";

export default () => {
  const [uuid, setUuid] = useState();
  const atual = {
    href: `/${LOGISTICA}/${CONFERENCIA_GUIA_COM_OCORRENCIA}`,
    titulo: "Reposição de alimentos faltantes"
  };

  const anteriores = [
    {
      href: `/`,
      titulo: "Abastecimento"
    },
    {
      href: `/${LOGISTICA}/${CONFERIR_ENTREGA}`,
      titulo: "Conferir Entrega"
    },
    {
      href: `/${LOGISTICA}/${REPOSICAO_GUIA}?uuid=${uuid}`,
      titulo: "Reposição da guia"
    }
  ];

  useEffect(() => {
    const queryString = window.location.search;

    if (queryString) {
      const urlParams = new URLSearchParams(window.location.search);
      const param = urlParams.get("uuid");
      setUuid(param);
    }
  }, []);

  return (
    <Page
      botaoVoltar
      voltarPara={`/${LOGISTICA}/${CONFERIR_ENTREGA}`}
      titulo={atual.titulo}
    >
      <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
      <ConferenciaDeGuiaResumoFinal reposicao />
    </Page>
  );
};
