import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import { CADASTROS, CODAE, EDITAR, KITS } from "../../configs/constants";
import CadastroKitLanche from "../../components/screens/Cadastros/CadastroKitLanche";

export default ({ match }) => {
  const uuid = match.params.uuid;

  const defineAtual = () => {
    if (uuid) {
      return {
        href: `/${CODAE}/${CADASTROS}/${KITS}/${uuid}/${EDITAR}`,
        titulo: "Edição de Modelo de KIT LANCHE"
      };
    } else {
      return {
        href: `/${CODAE}/${CADASTROS}/${KITS}`,
        titulo: "Cadastro de Modelo de KIT LANCHE"
      };
    }
  };

  const atual = defineAtual();

  return (
    <Page titulo={atual.titulo} botaoVoltar voltarPara={`/`}>
      <Breadcrumb home={"/"} atual={atual} />
      <CadastroKitLanche uuid={uuid} />
    </Page>
  );
};
