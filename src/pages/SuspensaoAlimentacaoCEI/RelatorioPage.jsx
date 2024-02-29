import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import Relatorio from "components/SuspensaoAlimentacaoDeCEI/Relatorio";
import {
  TERCEIRIZADA,
  SUSPENSAO_ALIMENTACAO,
  ESCOLA,
  DRE,
  CODAE,
} from "configs/constants";
import { usuarioEhDRE, usuarioEhEmpresaTerceirizada } from "helpers/utilities";

let voltarPara = "/painel-gestao-alimentacao";

if (usuarioEhEmpresaTerceirizada())
  voltarPara = `/${TERCEIRIZADA}/${SUSPENSAO_ALIMENTACAO}`;

let visao = ESCOLA;
if (usuarioEhEmpresaTerceirizada()) {
  visao = TERCEIRIZADA;
} else if (usuarioEhDRE()) {
  visao = DRE;
} else {
  visao = CODAE;
}

const atual = {
  href: "#",
  titulo: "Relatório",
};

export default () => (
  <Page botaoVoltar voltarPara={voltarPara}>
    <Breadcrumb home="/" atual={atual} />
    <Relatorio visao={visao} />
  </Page>
);
