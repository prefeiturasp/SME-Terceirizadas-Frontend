import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import { NovaPermissaoLancamentoEspecial } from "components/screens/Cadastros/NovaPermissaoLancamentoEspecial";
import {
  CADASTROS,
  CONFIGURACOES,
  NOVA_PERMISSAO_LANCAMENTO_ESPECIAL,
  TIPOS_ALIMENTACAO,
  PERMISSAO_LANCAMENTOS_ESPECIAIS,
} from "../../configs/constants";

const atual = {
  href: `/${CONFIGURACOES}/${CADASTROS}/${TIPOS_ALIMENTACAO}/${PERMISSAO_LANCAMENTOS_ESPECIAIS}/${NOVA_PERMISSAO_LANCAMENTO_ESPECIAL}`,
  titulo: "Nova Permissão de Lançamento Especial",
};

const anteriores = [
  {
    href: `/${CONFIGURACOES}/${CADASTROS}`,
    titulo: "Cadastros",
  },
  {
    href: `/${CONFIGURACOES}/${CADASTROS}/${TIPOS_ALIMENTACAO}`,
    titulo: "Cadastro de tipo de alimentação",
  },
  {
    href: `/${CONFIGURACOES}/${CADASTROS}/${TIPOS_ALIMENTACAO}/${PERMISSAO_LANCAMENTOS_ESPECIAIS}`,
    titulo: "Permissão de Lançamentos Especiais",
  },
];

export default () => (
  <Page titulo={atual.titulo} botaoVoltar>
    <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
    <NovaPermissaoLancamentoEspecial />
  </Page>
);
