import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import {
  CADASTROS,
  CONFIGURACOES,
  SUSPENSAO_ATIVIDADES,
} from "configs/constants";
import { Calendario } from "components/Shareable/Calendario";
import {
  getDiasSuspensaoAtividades,
  setDiaSuspensaoAtividades,
  deleteDiaSuspensaoAtividades,
} from "services/cadastroDiasSuspensaoAtividades.service";
import {
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhMedicao,
} from "helpers/utilities";

const atual = {
  href: `/${CONFIGURACOES}/${CADASTROS}/${SUSPENSAO_ATIVIDADES}`,
  titulo: "Suspensão de Atividades",
};

const anteriores = [
  {
    href: `/${CONFIGURACOES}/${CADASTROS}`,
    titulo: "Cadastros",
  },
];

export const CadastroSuspensaoDeAtividadesPage = () => {
  return (
    <Page titulo={atual.titulo} botaoVoltar>
      <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
      <Calendario
        getObjetos={getDiasSuspensaoAtividades}
        nomeObjeto="Suspensão de Atividades"
        nomeObjetoMinusculo="suspensão de atividades"
        setObjeto={setDiaSuspensaoAtividades}
        deleteObjeto={deleteDiaSuspensaoAtividades}
        podeEditar={usuarioEhCODAEGestaoAlimentacao() || usuarioEhMedicao()}
      />
    </Page>
  );
};

export default CadastroSuspensaoDeAtividadesPage;
