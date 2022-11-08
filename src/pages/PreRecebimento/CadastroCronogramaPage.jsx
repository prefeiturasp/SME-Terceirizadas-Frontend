import React, { useState } from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import {
  CADASTRO_CRONOGRAMA,
  CRONOGRAMA_ENTREGA,
  PRE_RECEBIMENTO
} from "configs/constants";
import CadastroCronograma from "components/screens/PreRecebimento/CadastroCronograma";

const atual = {
  href: `/${PRE_RECEBIMENTO}/${CADASTRO_CRONOGRAMA}`,
  titulo: "Cadastrar Cronograma"
};

const anteriores = [
  {
    href: `/`,
    titulo: "Pré-Recebimento"
  },
  {
    href: `/${PRE_RECEBIMENTO}/${CRONOGRAMA_ENTREGA}`,
    titulo: "Cronograma de Entrega"
  }
];

export default () => {
  const [modalVoltar, setModalVoltar] = useState(false);
  const temModalVoltar = true;

  return (
    <Page
      botaoVoltar
      voltarPara={`/${PRE_RECEBIMENTO}/${CRONOGRAMA_ENTREGA}`}
      temModalVoltar={temModalVoltar}
      setModalVoltar={setModalVoltar}
      titulo={atual.titulo}
    >
      <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
      <CadastroCronograma
        modalVoltar={modalVoltar}
        setModalVoltar={setModalVoltar}
      />
    </Page>
  );
};
