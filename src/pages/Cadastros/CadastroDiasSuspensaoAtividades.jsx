import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import { CadastroSuspensaoAtividades } from "components/screens/Cadastros/CadastroSuspensaoAtividades";
import Page from "components/Shareable/Page/Page";
import {
  CADASTROS,
  CONFIGURACOES,
  SUSPENSAO_ATIVIDADES,
} from "configs/constants";

const atual = {
  href: `/${CONFIGURACOES}/${CADASTROS}/${SUSPENSAO_ATIVIDADES}`,
  titulo: "Cadastro de Suspensão de Atividades",
};

const anteriores = [
  {
    href: `/${CONFIGURACOES}/${CADASTROS}`,
    titulo: "Cadastros",
  },
];

export const CadastroSuspensaoDeAtividadesPage = () => {
  return (
    <Page titulo={atual.titulo} botaoVoltar voltarPara>
      <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
      <CadastroSuspensaoAtividades />
    </Page>
  );
};

export default CadastroSuspensaoDeAtividadesPage;
