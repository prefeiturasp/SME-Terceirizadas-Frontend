import DashboardDREPage from "../pages/DRE/DashboardDREPage";
import DashboardEscolaPage from "../pages/Escola/DashboardEscolaPage";
import DashboardCODAEPage from "../pages/CODAE/DashboardCODAEPage";
import DashboardTerceirizadaPage from "../pages/Terceirizada/DashboardTerceirizadaPage";
import InclusaoDeAlimentacaoPage from "../pages/Escola/InclusaoDeAlimentacaoPage";
import InclusaoDeAlimentacaoCEIPage from "../pages/Escola/InclusaoDeAlimentacaoCEIPage";
import AlteracaoDeCardapioPage from "../pages/Escola/AlteracaoDeCardapioPage";
import AlteracaoDeCardapioCEIPage from "../pages/Escola/AlteracaoDeCardapioCEIPage";
import SuspensaoDeAlimentacaoPage from "../pages/Escola/SuspensaoDeAlimentacaoPage";
import SuspensaoDeAlimentacaoDeCEI from "../pages/Escola/SuspensaoDeAlimentacaoDeCEIPage";
import * as PermissoesPage from "../pages/Configuracoes/PermissoesPage";
import * as RelatoriosPage from "../pages/Relatorios/RelatoriosPage";
import * as RelatoriosAlteracaoDeCardapio from "../pages/AlteracaoDeCardapio/RelatorioPage";
import * as RelatoriosInversaoDiaCardapio from "../pages/InversaoDeDiaDeCardapio/RelatorioPage";
import * as RelatoriosInclusaoDeAlimentacao from "../pages/InclusaoDeAlimentacao/RelatorioPage";
import * as RelatoriosSolicitacaoKitLanche from "../pages/SolicitacaoDeKitLanche/RelatorioPage";
import * as RelatoriosSolicitacaoUnificada from "../pages/SolicitacaoUnificada/RelatoriosPage";
import * as RelatoriosDietaEspecial from "../pages/DietaEspecial/RelatorioPage";
import * as DashBoardDietaEspecial from "../pages/DietaEspecial/DashboardDietaEspecialPage";
import * as StatusSolicitacoesDietaEspecialPage from "../pages/DietaEspecial/StatusSolicitacoesPage";

import { PERFIL, TIPO_PERFIL } from "../constants/shared";
import PainelInicialPage from "../pages/PainelInicial/PainelInicialPage";

export const painelGestaoAlimentacao = () => {
  switch (localStorage.getItem("tipo_perfil")) {
    case TIPO_PERFIL.DIRETORIA_REGIONAL:
      return DashboardDREPage;
    case TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA:
      return DashboardCODAEPage;
    case TIPO_PERFIL.TERCEIRIZADA:
      return DashboardTerceirizadaPage;
    default:
      return DashboardEscolaPage;
  }
};

export const permissoes = () => {
  switch (localStorage.getItem("tipo_perfil")) {
    case TIPO_PERFIL.DIETA_ESPECIAL:
      return PermissoesPage.PermissoesCODAEGestaoDietaEspecial;
    case TIPO_PERFIL.GESTAO_PRODUTO:
      return PermissoesPage.PermissoesCODAEGestaoProdutos;
    case TIPO_PERFIL.SUPERVISAO_NUTRICAO:
      return PermissoesPage.PermissoesCODAESupervisaoNutricao;
    case TIPO_PERFIL.DIRETORIA_REGIONAL:
      return PermissoesPage.PermissoesDRE;
    case TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA:
      return PermissoesPage.PermissoesCODAEGestaoAlimentacaoTerceirizada;
    case TIPO_PERFIL.TERCEIRIZADA:
      return PermissoesPage.PermissoesTerceirizada;
    default:
      return PermissoesPage.PermissoesEscola;
  }
};

export const relatorios = () => {
  switch (localStorage.getItem("tipo_perfil")) {
    case TIPO_PERFIL.DIRETORIA_REGIONAL:
      return RelatoriosPage.RelatoriosDRE;
    case TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA:
      return RelatoriosPage.RelatoriosCODAE;
    case TIPO_PERFIL.TERCEIRIZADA:
      return RelatoriosPage.RelatoriosEscola;
    default:
      return RelatoriosPage.RelatoriosEscola;
  }
};

export const dashBoardDietaEspecial = () => {
  switch (localStorage.getItem("tipo_perfil")) {
    case TIPO_PERFIL.DIRETORIA_REGIONAL:
      return DashBoardDietaEspecial.DietaEspecialDRE;
    case TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA:
    case TIPO_PERFIL.SUPERVISAO_NUTRICAO:
    case TIPO_PERFIL.DIETA_ESPECIAL:
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

export const relatoriosDietaEspecial = () => {
  switch (localStorage.getItem("tipo_perfil")) {
    case TIPO_PERFIL.DIRETORIA_REGIONAL:
    case TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA:
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
      return StatusSolicitacoesDietaEspecialPage.SolicitacoesDietaEspecialCODAE;
    case TIPO_PERFIL.TERCEIRIZADA:
      return StatusSolicitacoesDietaEspecialPage.SolicitacoesDietaEspecialTerceirizada;
    default:
      return StatusSolicitacoesDietaEspecialPage.SolicitacoesDietaEspecialEscola;
  }
};

export const painelInicial = () => {
  // switch (localStorage.getItem("tipo_perfil")) {
  //   case TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA:
  //     return DashboardCODAEPage;
  //   default:
  return PainelInicialPage;
  //}
};

export const inclusaoCardapio = () => {
  switch (localStorage.getItem("perfil")) {
    case PERFIL.DIRETOR_CEI:
      return InclusaoDeAlimentacaoCEIPage;
    default:
      return InclusaoDeAlimentacaoPage;
  }
};

export const alteracaoCardapio = () => {
  switch (localStorage.getItem("perfil")) {
    case PERFIL.DIRETOR_CEI:
      return AlteracaoDeCardapioCEIPage;
    default:
      return AlteracaoDeCardapioPage;
  }
};

export const suspensaoAlimentacao = () => {
  switch (localStorage.getItem("perfil")) {
    case PERFIL.DIRETOR_CEI:
      return SuspensaoDeAlimentacaoDeCEI;
    default:
      return SuspensaoDeAlimentacaoPage;
  }
};
