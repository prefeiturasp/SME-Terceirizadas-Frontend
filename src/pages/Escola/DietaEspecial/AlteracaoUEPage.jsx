import React from "react";
import DietaEspecialAlteracaoUE from "../../../components/screens/DietaEspecial/AlteracaoUE";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import {
  DIETA_ESPECIAL_ALTERACAO_UE,
  ESCOLA
} from "../../../configs/constants";
import { HOME } from "../constants";

const atual = {
  href: `/${ESCOLA}/${DIETA_ESPECIAL_ALTERACAO_UE}`,
  titulo: "Solicitação de alteração de U.E da dieta especial"
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={HOME}>
    <Breadcrumb home={HOME} atual={atual} />
    <DietaEspecialAlteracaoUE />
  </Page>
);
