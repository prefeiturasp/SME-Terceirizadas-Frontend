import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Permissoes from "../../components/Permissoes";
import Page from "../../components/Shareable/Page/Page";
import { HOME } from "../../constants/config.constants";
import {
  criarEquipeAdministradoraEscola,
  getEquipeAdministradoraEscola,
  finalizarVinculoEscola,
  criarEquipeAdministradoraDiretoriaRegional,
  getEquipeAdministradoraDiretoriaRegional,
  finalizarVinculoDiretoriaRegional,
  criarEquipeAdministradoraCODAEGestaoAlimentacaoTerceirizada,
  getEquipeAdministradoraCODAEGestaoAlimentacaoTerceirizada,
  finalizarVinculoCODAEGestaoAlimentacaoTerceirizada
} from "../../services/permissoes.service";
import { CODAE, DRE, ESCOLA } from "../../configs/constants";

class PermissoesBase extends React.Component {
  render() {
    const atual = {
      href: "#",
      titulo: "Permissões"
    };

    return (
      <Page titulo={atual.titulo} botaoVoltar voltarPara={`/`}>
        <Breadcrumb home={HOME} atual={atual} />
        <Permissoes {...this.props} />
      </Page>
    );
  }
}

// Escola
export const PermissoesEscola = () => (
  <PermissoesBase
    criarEquipeAdministradora={criarEquipeAdministradoraEscola}
    getEquipeAdministradora={getEquipeAdministradoraEscola}
    finalizarVinculo={finalizarVinculoEscola}
    visao={ESCOLA}
  />
);

// DRE
export const PermissoesDRE = () => (
  <PermissoesBase
    criarEquipeAdministradora={criarEquipeAdministradoraDiretoriaRegional}
    getEquipeAdministradora={getEquipeAdministradoraDiretoriaRegional}
    finalizarVinculo={finalizarVinculoDiretoriaRegional}
    visao={DRE}
  />
);

// CODAE - Gestão de Alimentação Terceirizada
export const PermissoesCODAEGestaoAlimentacaoTerceirizada = () => (
  <PermissoesBase
    criarEquipeAdministradora={
      criarEquipeAdministradoraCODAEGestaoAlimentacaoTerceirizada
    }
    getEquipeAdministradora={
      getEquipeAdministradoraCODAEGestaoAlimentacaoTerceirizada
    }
    finalizarVinculo={finalizarVinculoCODAEGestaoAlimentacaoTerceirizada}
    visao={CODAE}
  />
);
