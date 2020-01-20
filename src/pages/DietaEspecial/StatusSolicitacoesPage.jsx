import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import StatusSolicitacoes from "../../components/screens/DashBoardDietaEspecial/StatusSolicitacoes";
import Page from "../../components/Shareable/Page/Page";
import { ESCOLA, CODAE, TERCEIRIZADA, DRE } from "../../configs/constants";

import {
  getDietaEspecialPendenteAutorizacaoEscola,
  getDietaEspecialAutorizadasEscola,
  getDietaEspecialNegadasEscola,
  getDietaEspecialPendenteAutorizacaoDRE,
  getDietaEspecialAutorizadasDRE,
  getDietaEspecialNegadasDRE,
  getDietaEspecialPendenteAutorizacaoCODAE,
  getDietaEspecialAutorizadasCODAE,
  getDietaEspecialNegadasCODAE,
  getDietaEspecialPendenteAutorizacaoTerceirizada,
  getDietaEspecialAutorizadasTerceirizada,
  getDietaEspecialNegadasTerceirizada
} from "../../services/dashBoardDietaEspecial.service";

export const HOME = "/";

export const LOG_PARA = {
  ESCOLA: 0,
  DRE: 1,
  CODAE: 3,
  TERCEIRIZADA: 2
};

class StatusSolicitacoesBase extends React.Component {
  render() {
    return (
      <Page>
        <Breadcrumb home={HOME} />
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
  />
);
