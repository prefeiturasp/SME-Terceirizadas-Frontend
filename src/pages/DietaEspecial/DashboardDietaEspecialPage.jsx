import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import DashBoardDietaEspecial from "../../components/screens/DashBoardDietaEspecial";
import Page from "../../components/Shareable/Page/Page";
import { HOME } from "../../constants/config.constants";
import { ESCOLA, DRE, CODAE, TERCEIRIZADA } from "../../configs/constants";

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

class DietaEspecialBase extends React.Component {
  render() {
    return (
      <Page>
        <Breadcrumb home={HOME} />
        <DashBoardDietaEspecial {...this.props} />
      </Page>
    );
  }
}

// Escola
export const DietaEspecialEscola = () => (
  <DietaEspecialBase
    visao={ESCOLA}
    getDietaEspecialPendenteAutorizacao={
      getDietaEspecialPendenteAutorizacaoEscola
    }
    getDietaEspecialAutorizadas={getDietaEspecialAutorizadasEscola}
    getDietaEspecialNegadas={getDietaEspecialNegadasEscola}
    getDietaEspecialCanceladas={getDietaEspecialCanceladasEscola}
  />
);

// DRE
export const DietaEspecialDRE = () => (
  <DietaEspecialBase
    visao={DRE}
    getDietaEspecialPendenteAutorizacao={getDietaEspecialPendenteAutorizacaoDRE}
    getDietaEspecialAutorizadas={getDietaEspecialAutorizadasDRE}
    getDietaEspecialNegadas={getDietaEspecialNegadasDRE}
    getDietaEspecialCanceladas={getDietaEspecialCanceladasDRE}
  />
);

// CODAE
export const DietaEspecialCODAE = () => (
  <DietaEspecialBase
    visao={CODAE}
    getDietaEspecialPendenteAutorizacao={
      getDietaEspecialPendenteAutorizacaoCODAE
    }
    getDietaEspecialAutorizadas={getDietaEspecialAutorizadasCODAE}
    getDietaEspecialNegadas={getDietaEspecialNegadasCODAE}
    getDietaEspecialCanceladas={getDietaEspecialCanceladasCODAE}
  />
);

// Terceirizada
export const DietaEspecialTerceirizada = () => (
  <DietaEspecialBase
    visao={TERCEIRIZADA}
    getDietaEspecialPendenteAutorizacao={
      getDietaEspecialPendenteAutorizacaoTerceirizada
    }
    getDietaEspecialAutorizadas={getDietaEspecialAutorizadasTerceirizada}
    getDietaEspecialNegadas={getDietaEspecialNegadasTerceirizada}
    getDietaEspecialCanceladas={getDietaEspecialCanceladasTerceirizada}
  />
);
