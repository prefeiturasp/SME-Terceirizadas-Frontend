import React from "react";
import DashBoardDietaEspecial from "../../components/screens/DashBoardDietaEspecial";
import SolicitacaoDietaEspecial from "../../components/screens/DietaEspecial/Aluno";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import { CODAE, DRE, ESCOLA, TERCEIRIZADA } from "../../configs/constants";
import { HOME } from "../../constants/config";
import {
  getDietaEspecialAutorizadasCODAE,
  getDietaEspecialAutorizadasDRE,
  getDietaEspecialAutorizadasEscola,
  getDietaEspecialAutorizadasTerceirizada,
  getDietaEspecialNegadasCODAE,
  getDietaEspecialNegadasDRE,
  getDietaEspecialNegadasEscola,
  getDietaEspecialNegadasTerceirizada,
  getDietaEspecialPendenteAutorizacaoCODAE,
  getDietaEspecialPendenteAutorizacaoDRE,
  getDietaEspecialPendenteAutorizacaoEscola,
  getDietaEspecialPendenteAutorizacaoTerceirizada,
  getDietaEspecialCanceladasCODAE,
  getDietaEspecialCanceladasDRE,
  getDietaEspecialCanceladasTerceirizada,
  getDietaEspecialCanceladasEscola
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

// Detalhes do aluno

export const DietaEspecialAluno = () => (
  <Page titulo="Consulta de Dieta Especial">
    <Breadcrumb home={HOME} />
    <SolicitacaoDietaEspecial />
  </Page>
);
