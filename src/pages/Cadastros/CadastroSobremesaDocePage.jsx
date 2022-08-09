import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import { CadastroSobremesaDoce } from "../../components/screens/Cadastros/CadastroSobremesaDoce";
import Page from "../../components/Shareable/Page/Page";
import {
  CADASTROS,
  CONFIGURACOES,
  SOBREMESA_DOCE
} from "../../configs/constants";

const atual = {
  href: `/${CONFIGURACOES}/${CADASTROS}/${SOBREMESA_DOCE}`,
  titulo: "Cadastro de Sobremesa Doce"
};

const anteriores = [
  {
    href: `/${CONFIGURACOES}/${CADASTROS}`,
    titulo: "Cadastros"
  }
];

export const CadastroSobremesaDocePage = () => {
  return (
    <Page titulo={atual.titulo} botaoVoltar voltarPara>
      <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
      <CadastroSobremesaDoce />
    </Page>
  );
};

export default CadastroSobremesaDocePage;
