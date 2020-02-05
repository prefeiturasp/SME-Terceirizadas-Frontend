import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Relatorios from "../../components/screens/Relatorios";
import Page from "../../components/Shareable/Page/Page";
import { HOME } from "../../constants/config.constants";
import { ESCOLA, DRE, CODAE } from "../../configs/constants";
import {
  getEvolucaoSolicitacoesEscola,
  getResumoTotaisPorMesEscola,
  getPedidosESolicitacoesFiltroEscola,
  getPedidosESolicitacoesFiltroPaginacaoEscola,
  getEvolucaoSolicitacoesDiretoriaRegional,
  getResumoTotaisPorMesDiretoriaRegional,
  getPedidosESolicitacoesFiltroDiretoriaRegional,
  getPedidosESolicitacoesFiltroPaginacaoDiretoriaRegional,
  getEvolucaoSolicitacoesCODAE,
  getResumoTotaisPorMesCODAE,
  getPedidosESolicitacoesFiltroCODAE,
  getPedidosESolicitacoesFiltroPaginacaoCODAE
} from "../../services/relatorios.service";

class RelatoriosBase extends React.Component {
  render() {
    const atual = {
      href: "#",
      titulo: "Relatórios"
    };

    return (
      <Page titulo={atual.titulo} botaoVoltar voltarPara={`/`}>
        <Breadcrumb home={HOME} atual={atual} />
        <Relatorios {...this.props} />
      </Page>
    );
  }
}

// Escola
export const RelatoriosEscola = () => (
  <RelatoriosBase
    visao={ESCOLA}
    getEvolucaoSolicitacoes={getEvolucaoSolicitacoesEscola}
    getResumoTotaisPorMes={getResumoTotaisPorMesEscola}
    getPedidosESolicitacoesFiltro={getPedidosESolicitacoesFiltroEscola}
    getPedidosESolicitacoesFiltroPaginacao={
      getPedidosESolicitacoesFiltroPaginacaoEscola
    }
  />
);

// DRE
export const RelatoriosDRE = () => (
  <RelatoriosBase
    visao={DRE}
    getEvolucaoSolicitacoes={getEvolucaoSolicitacoesDiretoriaRegional}
    getResumoTotaisPorMes={getResumoTotaisPorMesDiretoriaRegional}
    getPedidosESolicitacoesFiltro={
      getPedidosESolicitacoesFiltroDiretoriaRegional
    }
    getPedidosESolicitacoesFiltroPaginacao={
      getPedidosESolicitacoesFiltroPaginacaoDiretoriaRegional
    }
  />
);

// CODAE
export const RelatoriosCODAE = () => (
  <RelatoriosBase
    visao={CODAE}
    getEvolucaoSolicitacoes={getEvolucaoSolicitacoesCODAE}
    getResumoTotaisPorMes={getResumoTotaisPorMesCODAE}
    getPedidosESolicitacoesFiltro={getPedidosESolicitacoesFiltroCODAE}
    getPedidosESolicitacoesFiltroPaginacao={
      getPedidosESolicitacoesFiltroPaginacaoCODAE
    }
  />
);
