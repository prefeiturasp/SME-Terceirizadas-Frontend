import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import StatusSolicitacoes from "../../components/screens/DashBoardDietaEspecial/StatusSolicitacoes";
import Page from "../../components/Shareable/Page/Page";
import { ESCOLA, CODAE, TERCEIRIZADA, DRE } from "../../configs/constants";

import {
  getDietaEspecialPendenteAutorizacaoEscola,
  getDietaEspecialAutorizadasEscola,
  getDietaEspecialNegadasEscola,
  getDietaEspecialCanceladasEscola,
  getDietaEspecialPendenteAutorizacaoDRE,
  getDietaEspecialAutorizadasDRE,
  getDietaEspecialNegadasDRE,
  getDietaEspecialCanceladasDRE,
  getDietaEspecialPendenteAutorizacaoCODAE,
  getDietaEspecialAutorizadasCODAE,
  getDietaEspecialNegadasCODAE,
  getDietaEspecialCanceladasCODAE,
  getDietaEspecialPendenteAutorizacaoTerceirizada,
  getDietaEspecialAutorizadasTerceirizada,
  getDietaEspecialNegadasTerceirizada,
  getDietaEspecialCanceladasTerceirizada
} from "../../services/dashBoardDietaEspecial.service";

export const HOME = "/painel-dieta-especial";

export const LOG_PARA = {
  ESCOLA: 0,
  DRE: 1,
  CODAE: 3,
  TERCEIRIZADA: 2
};

class StatusSolicitacoesBase extends React.Component {
  render() {
    const atual = {
      href: "#",
      titulo: "Status Solicitações"
    };
    const anteriores = [
      {
        href: `/painel-dieta-especial`,
        titulo: "Painel Dieta Especial"
      }
    ];
    return (
      <Page titulo={atual.titulo} botaoVoltar voltarPara={HOME}>
        <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
        <StatusSolicitacoes {...this.props} />
      </Page>
    );
  }
}

// Escola
export const SolicitacoesDietaEspecialEscola = () => (
  <StatusSolicitacoesBase
    visao={ESCOLA}
    logPara={LOG_PARA.ESCOLA}
    getDietaEspecialPendenteAutorizacao={
      getDietaEspecialPendenteAutorizacaoEscola
    }
    getDietaEspecialAutorizadas={getDietaEspecialAutorizadasEscola}
    getDietaEspecialNegadas={getDietaEspecialNegadasEscola}
    getDietaEspecialCanceladas={getDietaEspecialCanceladasEscola}
  />
);

// DRE
export const SolicitacoesDietaEspecialDRE = () => (
  <StatusSolicitacoesBase
    visao={DRE}
    logPara={LOG_PARA.DRE}
    getDietaEspecialPendenteAutorizacao={getDietaEspecialPendenteAutorizacaoDRE}
    getDietaEspecialAutorizadas={getDietaEspecialAutorizadasDRE}
    getDietaEspecialNegadas={getDietaEspecialNegadasDRE}
    getDietaEspecialCanceladas={getDietaEspecialCanceladasDRE}
  />
);

// CODAE
export const SolicitacoesDietaEspecialCODAE = () => (
  <StatusSolicitacoesBase
    visao={CODAE}
    logPara={LOG_PARA.CODAE}
    getDietaEspecialPendenteAutorizacao={
      getDietaEspecialPendenteAutorizacaoCODAE
    }
    getDietaEspecialAutorizadas={getDietaEspecialAutorizadasCODAE}
    getDietaEspecialNegadas={getDietaEspecialNegadasCODAE}
    getDietaEspecialCanceladas={getDietaEspecialCanceladasCODAE}
  />
);

// Terceirizada
export const SolicitacoesDietaEspecialTerceirizada = () => (
  <StatusSolicitacoesBase
    visao={TERCEIRIZADA}
    logPara={LOG_PARA.TERCEIRIZADA}
    getDietaEspecialPendenteAutorizacao={
      getDietaEspecialPendenteAutorizacaoTerceirizada
    }
    getDietaEspecialAutorizadas={getDietaEspecialAutorizadasTerceirizada}
    getDietaEspecialNegadas={getDietaEspecialNegadasTerceirizada}
    getDietaEspecialCanceladas={getDietaEspecialCanceladasTerceirizada}
  />
);
