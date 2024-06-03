import InclusaoDeAlimentacaoPage from "../pages/Escola/InclusaoDeAlimentacaoPage";
import InclusaoDeAlimentacaoCEIPage from "../pages/Escola/InclusaoDeAlimentacaoCEIPage";
import AlteracaoDeCardapioPage from "../pages/Escola/AlteracaoDeCardapioPage";
import AlteracaoDeCardapioCEIPage from "../pages/Escola/AlteracaoDeCardapioCEIPage";
import SuspensaoDeAlimentacaoPage from "../pages/Escola/SuspensaoDeAlimentacaoPage";
import SuspensaoDeAlimentacaoDeCEI from "../pages/Escola/SuspensaoDeAlimentacaoDeCEIPage";
import * as RelatoriosAlteracaoDeCardapio from "../pages/AlteracaoDeCardapio/RelatorioPage";
import * as RelatoriosInversaoDiaCardapio from "../pages/InversaoDeDiaDeCardapio/RelatorioPage";
import * as RelatoriosInclusaoDeAlimentacao from "../pages/InclusaoDeAlimentacao/RelatorioPage";
import * as RelatoriosInclusaoDeAlimentacaoCEMEI from "pages/InclusaoDeAlimentacaoCEMEIRelatorios";
import * as RelatoriosAlteracaoDeCardapioCEMEI from "../pages/AlteracaoDeCardapioCEMEIRelatorios";
import * as RelatoriosSolicitacaoKitLanche from "../pages/SolicitacaoDeKitLanche/RelatorioPage";
import * as RelatorioSolicitacaoKitLancheCEMEI from "../pages/SolicitacaoDeKitLancheCEMEI/RelatorioPage";
import * as RelatoriosSolicitacaoUnificada from "../pages/SolicitacaoUnificada/RelatoriosPage";
import * as RelatoriosDietaEspecial from "../pages/DietaEspecial/RelatorioPage";
import * as DashBoardDietaEspecial from "../pages/DietaEspecial/DashboardDietaEspecialPage";
import * as StatusSolicitacoesDietaEspecialPage from "../pages/DietaEspecial/StatusSolicitacoesPage";

import { TIPO_PERFIL } from "../constants/shared";
import PainelInicialPage from "../pages/PainelInicial/PainelInicialPage";
import { escolaEhCei, escolaEhCEMEI } from "helpers/utilities";
import InclusaoDeAlimentacaoCEMEIPage from "pages/Escola/InclusaoDeAlimentacaoCEMEIPage";
import AlteracaoDeCardapioCEMEIPage from "pages/Escola/AlteracaoDeCardapioCEMEIPage";

export const dashBoardDietaEspecial = () => {
  switch (localStorage.getItem("tipo_perfil")) {
    case TIPO_PERFIL.DIRETORIA_REGIONAL:
      return DashBoardDietaEspecial.DietaEspecialDRE;
    case TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA:
    case TIPO_PERFIL.SUPERVISAO_NUTRICAO:
    case TIPO_PERFIL.DIETA_ESPECIAL:
    case TIPO_PERFIL.NUTRICAO_MANIFESTACAO:
    case TIPO_PERFIL.MEDICAO:
    case TIPO_PERFIL.CODAE_GABINETE:
      return DashBoardDietaEspecial.DietaEspecialCODAE;
    case TIPO_PERFIL.TERCEIRIZADA:
      return DashBoardDietaEspecial.DietaEspecialTerceirizada;
    default:
      return DashBoardDietaEspecial.DietaEspecialEscola;
  }
};

export const relatoriosAlteracaoDeCardapio = () => {
  switch (localStorage.getItem("tipo_perfil")) {
    case TIPO_PERFIL.DIRETORIA_REGIONAL:
      return RelatoriosAlteracaoDeCardapio.RelatorioDRE;
    case TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA:
      return RelatoriosAlteracaoDeCardapio.RelatorioCODAE;
    case TIPO_PERFIL.TERCEIRIZADA:
      return RelatoriosAlteracaoDeCardapio.RelatorioTerceirizada;
    default:
      return RelatoriosAlteracaoDeCardapio.RelatorioEscola;
  }
};

export const relatoriosAlteracaoDeCardapioCEMEI = () => {
  switch (localStorage.getItem("tipo_perfil")) {
    case TIPO_PERFIL.DIRETORIA_REGIONAL:
      return RelatoriosAlteracaoDeCardapioCEMEI.RelatorioDRE;
    case TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA:
      return RelatoriosAlteracaoDeCardapioCEMEI.RelatorioCODAE;
    case TIPO_PERFIL.TERCEIRIZADA:
      return RelatoriosAlteracaoDeCardapioCEMEI.RelatorioTerceirizada;
    default:
      return RelatoriosAlteracaoDeCardapioCEMEI.RelatorioEscola;
  }
};

export const relatoriosInclusaoDeAlimentacao = () => {
  switch (localStorage.getItem("tipo_perfil")) {
    case TIPO_PERFIL.DIRETORIA_REGIONAL:
      return RelatoriosInclusaoDeAlimentacao.RelatorioDRE;
    case TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA:
      return RelatoriosInclusaoDeAlimentacao.RelatorioCODAE;
    case TIPO_PERFIL.TERCEIRIZADA:
      return RelatoriosInclusaoDeAlimentacao.RelatorioTerceirizada;
    default:
      return RelatoriosInclusaoDeAlimentacao.RelatorioEscola;
  }
};

export const relatoriosInclusaoDeAlimentacaoCEMEI = () => {
  switch (localStorage.getItem("tipo_perfil")) {
    case TIPO_PERFIL.DIRETORIA_REGIONAL:
      return RelatoriosInclusaoDeAlimentacaoCEMEI.RelatorioDRE;
    case TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA:
      return RelatoriosInclusaoDeAlimentacaoCEMEI.RelatorioCODAE;
    case TIPO_PERFIL.TERCEIRIZADA:
      return RelatoriosInclusaoDeAlimentacaoCEMEI.RelatorioTerceirizada;
    default:
      return RelatoriosInclusaoDeAlimentacaoCEMEI.RelatorioEscola;
  }
};

export const relatoriosInversaoDiaCardapio = () => {
  switch (localStorage.getItem("tipo_perfil")) {
    case TIPO_PERFIL.DIRETORIA_REGIONAL:
      return RelatoriosInversaoDiaCardapio.RelatorioDRE;
    case TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA:
      return RelatoriosInversaoDiaCardapio.RelatorioCODAE;
    case TIPO_PERFIL.TERCEIRIZADA:
      return RelatoriosInversaoDiaCardapio.RelatorioTerceirizada;
    default:
      return RelatoriosInversaoDiaCardapio.RelatorioEscola;
  }
};

export const relatoriosSolicitacaoKitLanche = () => {
  switch (localStorage.getItem("tipo_perfil")) {
    case TIPO_PERFIL.DIRETORIA_REGIONAL:
      return RelatoriosSolicitacaoKitLanche.RelatorioDRE;
    case TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA:
      return RelatoriosSolicitacaoKitLanche.RelatorioCODAE;
    case TIPO_PERFIL.TERCEIRIZADA:
      return RelatoriosSolicitacaoKitLanche.RelatorioTerceirizada;
    default:
      return RelatoriosSolicitacaoKitLanche.RelatorioEscola;
  }
};

export const relatoriosSolicitacaoKitLancheCEMEI = () => {
  switch (localStorage.getItem("tipo_perfil")) {
    case TIPO_PERFIL.DIRETORIA_REGIONAL:
      return RelatorioSolicitacaoKitLancheCEMEI.RelatorioDRE;
    case TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA:
      return RelatorioSolicitacaoKitLancheCEMEI.RelatorioCODAE;
    case TIPO_PERFIL.TERCEIRIZADA:
      return RelatorioSolicitacaoKitLancheCEMEI.RelatorioTerceirizada;
    default:
      return RelatorioSolicitacaoKitLancheCEMEI.RelatorioEscola;
  }
};

export const relatoriosDietaEspecial = () => {
  switch (localStorage.getItem("tipo_perfil")) {
    case TIPO_PERFIL.DIRETORIA_REGIONAL:
    case TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA:
    case TIPO_PERFIL.NUTRICAO_MANIFESTACAO:
    case TIPO_PERFIL.CODAE_GABINETE:
      return RelatoriosDietaEspecial.RelatorioEscola;
    case TIPO_PERFIL.DIETA_ESPECIAL:
      return RelatoriosDietaEspecial.RelatorioCODAE;
    case TIPO_PERFIL.TERCEIRIZADA:
      return RelatoriosDietaEspecial.RelatorioTerceirizada;
    default:
      return RelatoriosDietaEspecial.RelatorioEscola;
  }
};

export const relatoriosSolicitacaoUnificada = () => {
  switch (localStorage.getItem("tipo_perfil")) {
    case TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA:
      return RelatoriosSolicitacaoUnificada.RelatorioCODAE;
    case TIPO_PERFIL.TERCEIRIZADA:
      return RelatoriosSolicitacaoUnificada.RelatorioTerceirizada;
    case TIPO_PERFIL.ESCOLA:
      return RelatoriosSolicitacaoUnificada.RelatorioEscola;
    default:
      return RelatoriosSolicitacaoUnificada.RelatorioDRE;
  }
};

export const StatusSolicitacoesDietaEspecial = () => {
  switch (localStorage.getItem("tipo_perfil")) {
    case TIPO_PERFIL.DIRETORIA_REGIONAL:
      return StatusSolicitacoesDietaEspecialPage.SolicitacoesDietaEspecialDRE;
    case TIPO_PERFIL.DIETA_ESPECIAL:
    case TIPO_PERFIL.SUPERVISAO_NUTRICAO:
    case TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA:
    case TIPO_PERFIL.NUTRICAO_MANIFESTACAO:
    case TIPO_PERFIL.CODAE_GABINETE:
      return StatusSolicitacoesDietaEspecialPage.SolicitacoesDietaEspecialCODAE;
    case TIPO_PERFIL.TERCEIRIZADA:
      return StatusSolicitacoesDietaEspecialPage.SolicitacoesDietaEspecialTerceirizada;
    default:
      return StatusSolicitacoesDietaEspecialPage.SolicitacoesDietaEspecialEscola;
  }
};

export const painelInicial = () => {
  return PainelInicialPage;
};

export const inclusaoAlimentacao = () => {
  return escolaEhCei()
    ? InclusaoDeAlimentacaoCEIPage
    : escolaEhCEMEI()
    ? InclusaoDeAlimentacaoCEMEIPage
    : InclusaoDeAlimentacaoPage;
};

export const alteracaoCardapio = () => {
  return escolaEhCei()
    ? AlteracaoDeCardapioCEIPage
    : escolaEhCEMEI()
    ? AlteracaoDeCardapioCEMEIPage
    : AlteracaoDeCardapioPage;
};

export const suspensaoAlimentacao = () => {
  return escolaEhCei()
    ? SuspensaoDeAlimentacaoDeCEI
    : SuspensaoDeAlimentacaoPage;
};

export const getDDMMYYYfromDate = (date) => {
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
};

export const getYYYYMMDDfromDate = (date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};
