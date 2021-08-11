import React from "react";

import { HOME } from "constants/config";

import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";

import UpdateProtocoloPadrao from "components/screens/DietaEspecial/CadastroProtocoloPadraoDietaEsp";
import {
  DIETA_ESPECIAL,
  CONSULTA_PROTOCOLO_PADRAO_DIETA
} from "configs/constants";

export default ({ match }) => {
  const uuid = match.params.uuid;
  const atual = {
    href: `/${DIETA_ESPECIAL}/protocolo-padrao/${uuid}/editar`,
    titulo: "Atualização de Protocolo Padrão de Dieta Especial"
  };
  const anteriores = [
    {
      href: `/${DIETA_ESPECIAL}/${CONSULTA_PROTOCOLO_PADRAO_DIETA}`,
      titulo: "Consultar Protocolo Padrão"
    }
  ];

  return (
    <Page
      botaoVoltar
      voltarPara="/dieta-especial/consultar-protocolo-padrao-dieta"
      titulo={atual.titulo}
    >
      <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
      <UpdateProtocoloPadrao uuid={uuid} />
    </Page>
  );
};
