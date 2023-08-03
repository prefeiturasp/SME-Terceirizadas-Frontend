import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import CadastroUnidadeMedida from "components/screens/Cadastros/UnidadesMedida/components/CadastroUnidadeMedida";
import Page from "../../components/Shareable/Page/Page";
import {
  CADASTROS,
  CONFIGURACOES,
  EDICAO_UNIDADE_MEDIDA,
  UNIDADES_MEDIDA
} from "../../configs/constants";

const atual = {
  href: `/${CONFIGURACOES}/${CADASTROS}/${EDICAO_UNIDADE_MEDIDA}`,
  titulo: "Editar Cadastro de Unidade de Medida"
};

const anteriores = [
  {
    href: `/${CONFIGURACOES}/${CADASTROS}`,
    titulo: "Cadastros"
  },
  {
    href: `/${CONFIGURACOES}/${CADASTROS}/${UNIDADES_MEDIDA}`,
    titulo: "Unidades de Medida"
  }
];

export default () => (
  <Page
    titulo={atual.titulo}
    botaoVoltar
    voltarPara={`/${CONFIGURACOES}/${CADASTROS}/${UNIDADES_MEDIDA}`}
  >
    <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
    <CadastroUnidadeMedida />
  </Page>
);
