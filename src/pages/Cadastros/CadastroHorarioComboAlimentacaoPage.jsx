import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Container from "../../components/screens/Cadastros/CadastroHorarioComboAlimentacao/Container";
import Page from "../../components/Shareable/Page/Page";
import {
  CADASTROS,
  CONFIGURACOES,
  HORARIO_COMBOS_ALIMENTACAO
} from "../../configs/constants";

const atual = {
  href: `/${CONFIGURACOES}/${CADASTROS}/${HORARIO_COMBOS_ALIMENTACAO}`,
  titulo: "Horário de fornecimento de alimentação"
};

const anteriores = [
  {
    href: `/${CONFIGURACOES}/${CADASTROS}`,
    titulo: "Cadastros"
  }
];

export default props => (
  <Page
    titulo={atual.titulo}
    botaoVoltar
    voltarPara={`/${CONFIGURACOES}/${CADASTROS}`}
    {...props}
  >
    <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
    <Container {...props} />
  </Page>
);
