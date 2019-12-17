import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Permissoes from "../../components/Permissoes";
import PermissoesTerceirizadas from "../../components/Permissoes/PermissoesTerceirizadas";
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
  finalizarVinculoCODAEGestaoAlimentacaoTerceirizada,
  criarEquipeAdministradoraTerceirizadas,
  getEquipeAdministradoraTerceirizadas,
  finalizarVinculoTerceirizadas
} from "../../services/permissoes.service";
import { CODAE, DRE, ESCOLA, TERCEIRIZADA } from "../../configs/constants";

class PermissoesBase extends React.Component {
  render() {
    const atual = {
      href: "#",
      titulo: "Permissões"
    };

    const ComponenteBase =
      this.props.visao === TERCEIRIZADA ? PermissoesTerceirizadas : Permissoes;

    return (
      <Page titulo={atual.titulo} botaoVoltar voltarPara={`/`}>
        <Breadcrumb home={HOME} atual={atual} />
        <ComponenteBase {...this.props} />
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

// Terceirizada
export const PermissoesTerceirizada = () => (
  <PermissoesBase
    criarEquipeAdministradora={criarEquipeAdministradoraTerceirizadas}
    getEquipeAdministradora={getEquipeAdministradoraTerceirizadas}
    finalizarVinculo={finalizarVinculoTerceirizadas}
    visao={TERCEIRIZADA}
  />
);
