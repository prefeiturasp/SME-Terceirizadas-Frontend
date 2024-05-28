import {
  ACOMPANHAMENTO_DE_LANCAMENTOS,
  ADICIONAR_PARAMETRIZACAO_FINANCEIRA,
  CADASTRO_DE_CLAUSULA,
  CADASTRO_DE_EMPENHO,
  CLAUSULAS_PARA_DESCONTOS,
  CONFERENCIA_DOS_LANCAMENTOS,
  CONTROLE_DE_FREQUENCIA,
  DETALHAMENTO_DO_LANCAMENTO,
  EDITAR_CLAUSULA,
  EDITAR_EMPENHO,
  EDITAR_PARAMETRIZACAO_FINANCEIRA,
  EMPENHOS,
  LANCAMENTO_INICIAL,
  LANCAMENTO_MEDICAO_INICIAL,
  MEDICAO_INICIAL,
  PARAMETRIZACAO_FINANCEIRA,
  PERIODO_LANCAMENTO,
  PERIODO_LANCAMENTO_CEI,
  REGISTRAR_NOVA_OCORRENCIA,
  REGISTRAR_OCORRENCIAS,
  RELATORIOS,
  RELATORIO_ADESAO,
  RELATORIO_FINANCEIRO,
} from "configs/constants";
import {
  usuarioEhCODAEGabinete,
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhCODAENutriManifestacao,
  usuarioEhDRE,
  usuarioEhEscolaTerceirizadaQualquerPerfil,
  usuarioEhMedicao,
} from "helpers/utilities";
import { ListaOcorrenciasPage } from "pages/IMR/ListaOcorrenciasPage";
import { RegistrarNovaOcorrenciaPage } from "pages/IMR/RegistrarNovaOcorrenciaPage";
import { AcompanhamentoDeLancamentosPage } from "pages/LancamentoMedicaoInicial/AcompanhamentoDeLancamentosPage";
import { CadastroDeClausulasPage } from "pages/LancamentoMedicaoInicial/CadastroDeClausulasPage";
import { CadastroDeEmpenhoPage } from "pages/LancamentoMedicaoInicial/CadastroDeEmpenhoPage";
import { ClausulasParaDescontosPage } from "pages/LancamentoMedicaoInicial/ClausulasParaDescontosPage";
import { ConferenciaDosLancamentosPage } from "pages/LancamentoMedicaoInicial/ConferenciaDosLancamentosPage";
import { ControleDeFrequenciaPage } from "pages/LancamentoMedicaoInicial/ControleDeFrequenciaPage";
import { DetalhamentoDoLancamentoPage } from "pages/LancamentoMedicaoInicial/DetalhamentoDoLancamentoPage";
import { EditarClausulaPage } from "pages/LancamentoMedicaoInicial/EditarClausulaPage";
import { EditarEmpenhoPage } from "pages/LancamentoMedicaoInicial/EditarEmpenhoPage";
import { EmpenhosPage } from "pages/LancamentoMedicaoInicial/EmpenhosPage";
import { LancamentoMedicaoInicialPage } from "pages/LancamentoMedicaoInicial/LancamentoMedicaoInicialPage";
import { AdicionarParametrizacaoFinanceiraPage } from "pages/LancamentoMedicaoInicial/ParametrizacaoFinanceira/AdicionarParametrizacaoFinanceiraPage";
import { EditarParametrizacaoFinanceiraPage } from "pages/LancamentoMedicaoInicial/ParametrizacaoFinanceira/EditarParametrizacaoFinanceiraPage";
import { ParametrizacaoFinanceiraPage } from "pages/LancamentoMedicaoInicial/ParametrizacaoFinanceira/ParametrizacaoFinanceiraPage";
import { PeriodoLancamentoMedicaoInicialCEIPage } from "pages/LancamentoMedicaoInicial/PeriodoLancamentoMedicaoInicialCEIPage";
import { PeriodoLancamentoMedicaoInicialPage } from "pages/LancamentoMedicaoInicial/PeriodoLancamentoMedicaoInicialPage";
import { RelatorioFinanceiroPage } from "pages/LancamentoMedicaoInicial/RelatorioFinanceiro/RelatorioFinanceiroPage";
import { RelatorioAdesaoPage } from "pages/LancamentoMedicaoInicial/Relatorios/RelatorioAdesaoPage";

export const medicaoInicial = [
  {
    path: `/${LANCAMENTO_INICIAL}/${LANCAMENTO_MEDICAO_INICIAL}`,
    component: LancamentoMedicaoInicialPage,
    tipoUsuario: usuarioEhEscolaTerceirizadaQualquerPerfil(),
  },
  {
    path: `/${LANCAMENTO_INICIAL}/${LANCAMENTO_MEDICAO_INICIAL}/${PERIODO_LANCAMENTO}`,
    component: PeriodoLancamentoMedicaoInicialPage,
    tipoUsuario: usuarioEhEscolaTerceirizadaQualquerPerfil(),
  },
  {
    path: `/${LANCAMENTO_INICIAL}/${LANCAMENTO_MEDICAO_INICIAL}/${PERIODO_LANCAMENTO_CEI}`,
    component: PeriodoLancamentoMedicaoInicialCEIPage,
    tipoUsuario: usuarioEhEscolaTerceirizadaQualquerPerfil(),
  },
  {
    path: `/${LANCAMENTO_INICIAL}/${LANCAMENTO_MEDICAO_INICIAL}/${REGISTRAR_OCORRENCIAS}`,
    component: ListaOcorrenciasPage,
    tipoUsuario: usuarioEhEscolaTerceirizadaQualquerPerfil(),
  },
  {
    path: `/${LANCAMENTO_INICIAL}/${LANCAMENTO_MEDICAO_INICIAL}/${REGISTRAR_OCORRENCIAS}/${REGISTRAR_NOVA_OCORRENCIA}`,
    component: RegistrarNovaOcorrenciaPage,
    tipoUsuario: usuarioEhEscolaTerceirizadaQualquerPerfil(),
  },
  {
    path: `/${MEDICAO_INICIAL}/${ACOMPANHAMENTO_DE_LANCAMENTOS}`,
    component: AcompanhamentoDeLancamentosPage,
    tipoUsuario:
      usuarioEhDRE() ||
      usuarioEhMedicao() ||
      usuarioEhEscolaTerceirizadaQualquerPerfil() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${MEDICAO_INICIAL}/${CONFERENCIA_DOS_LANCAMENTOS}`,
    component: ConferenciaDosLancamentosPage,
    tipoUsuario:
      usuarioEhDRE() ||
      usuarioEhMedicao() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhCODAEGabinete(),
  },
  {
    path: `/${MEDICAO_INICIAL}/${DETALHAMENTO_DO_LANCAMENTO}`,
    component: DetalhamentoDoLancamentoPage,
    tipoUsuario: usuarioEhEscolaTerceirizadaQualquerPerfil(),
  },
  {
    path: `/${MEDICAO_INICIAL}/${EMPENHOS}`,
    component: EmpenhosPage,
    tipoUsuario: usuarioEhMedicao(),
  },
  {
    path: `/${MEDICAO_INICIAL}/${EMPENHOS}/${CADASTRO_DE_EMPENHO}`,
    component: CadastroDeEmpenhoPage,
    tipoUsuario: usuarioEhMedicao(),
  },
  {
    path: `/${MEDICAO_INICIAL}/${EMPENHOS}/${EDITAR_EMPENHO}`,
    component: EditarEmpenhoPage,
    tipoUsuario: usuarioEhMedicao(),
  },
  {
    path: `/${MEDICAO_INICIAL}/${CLAUSULAS_PARA_DESCONTOS}`,
    component: ClausulasParaDescontosPage,
    tipoUsuario: usuarioEhMedicao(),
  },
  {
    path: `/${MEDICAO_INICIAL}/${PARAMETRIZACAO_FINANCEIRA}`,
    component: ParametrizacaoFinanceiraPage,
    tipoUsuario: usuarioEhMedicao(),
  },
  {
    path: `/${MEDICAO_INICIAL}/${PARAMETRIZACAO_FINANCEIRA}/${ADICIONAR_PARAMETRIZACAO_FINANCEIRA}`,
    component: AdicionarParametrizacaoFinanceiraPage,
    tipoUsuario: usuarioEhMedicao(),
  },
  {
    path: `/${MEDICAO_INICIAL}/${PARAMETRIZACAO_FINANCEIRA}/${EDITAR_PARAMETRIZACAO_FINANCEIRA}`,
    component: EditarParametrizacaoFinanceiraPage,
    tipoUsuario: usuarioEhMedicao(),
  },
  {
    path: `/${MEDICAO_INICIAL}/${CLAUSULAS_PARA_DESCONTOS}/${CADASTRO_DE_CLAUSULA}`,
    component: CadastroDeClausulasPage,
    tipoUsuario: usuarioEhMedicao(),
  },
  {
    path: `/${MEDICAO_INICIAL}/${CLAUSULAS_PARA_DESCONTOS}/${EDITAR_CLAUSULA}`,
    component: EditarClausulaPage,
    tipoUsuario: usuarioEhMedicao(),
  },
  {
    path: `/${MEDICAO_INICIAL}/${CONTROLE_DE_FREQUENCIA}`,
    component: ControleDeFrequenciaPage,
    tipoUsuario: usuarioEhEscolaTerceirizadaQualquerPerfil(),
  },
  {
    path: `/${MEDICAO_INICIAL}/${RELATORIOS}/${RELATORIO_ADESAO}`,
    component: RelatorioAdesaoPage,
    tipoUsuario:
      usuarioEhMedicao() ||
      usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhDRE() ||
      usuarioEhEscolaTerceirizadaQualquerPerfil(),
  },
  {
    path: `/${MEDICAO_INICIAL}/${RELATORIO_FINANCEIRO}`,
    component: RelatorioFinanceiroPage,
    tipoUsuario: usuarioEhMedicao(),
  },
];
