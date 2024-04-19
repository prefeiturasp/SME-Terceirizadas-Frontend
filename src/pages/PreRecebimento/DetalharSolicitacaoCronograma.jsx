import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import {
  ALTERACAO_CRONOGRAMA,
  PRE_RECEBIMENTO,
  SOLICITACAO_ALTERACAO_CRONOGRAMA,
  SOLICITACAO_ALTERACAO_CRONOGRAMA_FORNECEDOR,
} from "configs/constants";
import AlterarCronograma from "components/screens/PreRecebimento/AlterarCronograma";
import { usuarioEhEmpresaFornecedor } from "helpers/utilities";

const atual = {
  href: `/${PRE_RECEBIMENTO}/${ALTERACAO_CRONOGRAMA}`,
  titulo: "Detalhar Solicitação Alteração de Cronograma de Entrega",
};

const anteriores = [
  {
    href: `/`,
    titulo: "Pré-Recebimento",
  },
  {
    href: `/${PRE_RECEBIMENTO}/${
      usuarioEhEmpresaFornecedor()
        ? SOLICITACAO_ALTERACAO_CRONOGRAMA_FORNECEDOR
        : SOLICITACAO_ALTERACAO_CRONOGRAMA
    }`,
    titulo: "Verificar Alterações de Cronograma",
  },
];

export default () => (
  <Page botaoVoltar titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <AlterarCronograma analiseSolicitacao={true} />
  </Page>
);
