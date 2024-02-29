import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { RELATORIO_ALUNOS_MATRICULADOS } from "../../configs/constants";
import { AlunosMatriculados } from "components/screens/Relatorios/AlunosMatriculados";

const atual = {
  href: `/${RELATORIO_ALUNOS_MATRICULADOS}`,
  titulo: "Alunos Matriculados",
};

const anteriores = [
  {
    href: `/painel-gestao-alimentacao`,
    titulo: "Gestão de Alimentação",
  },
  {
    href: `/`,
    titulo: "Relatórios",
  },
];

export default (props) => (
  <Page titulo="Alunos Matriculados" botaoVoltar {...props}>
    <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
    <AlunosMatriculados {...props} />
  </Page>
);
