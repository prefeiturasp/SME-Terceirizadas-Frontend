import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import Relatorio from "../../../components/SuspensaoDeAlimentacao/Relatorio";
import { HOME } from "../constants";
import { TERCEIRIZADA, SUSPENSAO_ALIMENTACAO } from "configs/constants";
import { usuarioEhTerceirizada } from "helpers/utilities";

let voltarPara = "/";

if (usuarioEhTerceirizada())
  voltarPara = `/${TERCEIRIZADA}/${SUSPENSAO_ALIMENTACAO}`;

const atual = {
  href: "#",
  titulo: "Relatório"
};

export default () => (
  <Page botaoVoltar voltarPara={voltarPara}>
    <Breadcrumb home={HOME} atual={atual} />
    <Relatorio />
  </Page>
);
