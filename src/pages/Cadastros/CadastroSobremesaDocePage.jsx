import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { CADASTROS, CONFIGURACOES, SOBREMESA_DOCE } from "configs/constants";
import { Calendario } from "components/Shareable/Calendario";
import {
  getDiasSobremesaDoce,
  setDiaSobremesaDoce,
  deleteDiaSobremesaDoce,
} from "services/medicaoInicial/diaSobremesaDoce.service";

const atual = {
  href: `/${CONFIGURACOES}/${CADASTROS}/${SOBREMESA_DOCE}`,
  titulo: "Cadastro de Sobremesa Doce",
};

const anteriores = [
  {
    href: `/${CONFIGURACOES}/${CADASTROS}`,
    titulo: "Cadastros",
  },
];

export const CadastroSobremesaDocePage = () => {
  return (
    <Page titulo={atual.titulo} botaoVoltar voltarPara>
      <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
      <Calendario
        getObjetos={getDiasSobremesaDoce}
        nomeObjeto="Sobremesa Doce"
        setObjeto={setDiaSobremesaDoce}
        deleteObjeto={deleteDiaSobremesaDoce}
      />
    </Page>
  );
};

export default CadastroSobremesaDocePage;
