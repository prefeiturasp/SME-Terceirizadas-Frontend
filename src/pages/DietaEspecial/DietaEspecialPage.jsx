import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import DashBoardDietaEspecial from "../../components/screens/DashBoardDietaEspecial";
import Page from "../../components/Shareable/Page/Page";
import { HOME } from "../../constants/config.constants";
import { ESCOLA, DRE, CODAE, TERCEIRIZADA } from "../../configs/constants";

import {
  getDietaEspecialPendenteAutorizacaoEscola,
  getDietaEspecialAutorizadasEscola,
  getDietaEspecialNegadasEscola
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
  />
);

// DRE
export const DietaEspecialDRE = () => (
  <DietaEspecialBase
    visao={DRE}
    getDietaEspecialPendenteAutorizacao={"dre"}
    getDietaEspecialAutorizadas={null}
    getDietaEspecialNegadas={null}
  />
);

// CODAE
export const DietaEspecialCODAE = () => (
  <DietaEspecialBase
    visao={CODAE}
    getDietaEspecialPendenteAutorizacao={"codae"}
    getDietaEspecialAutorizadas={null}
    getDietaEspecialNegadas={null}
  />
);

// Terceirizada
export const DietaEspecialTerceirizada = () => (
  <DietaEspecialBase
    visao={TERCEIRIZADA}
    getDietaEspecialPendenteAutorizacao={"terc"}
    getDietaEspecialAutorizadas={null}
    getDietaEspecialNegadas={null}
  />
);
