import { Login } from "../components/Login";
import CadastroEmpresaPage from "../pages/Cadastros/CadastroEmpresaPage";
import CadastroLotePage from "../pages/Cadastros/CadastroLotePage";
import CadastrosPage from "../pages/Cadastros/CadastrosPage";
import EditaisCadastradosPage from "../pages/Cadastros/EditaisCadastradosPage";
import EditaisContratosPage from "../pages/Cadastros/EditaisContratosPage";
import EmpresasCadastradas from "../pages/Cadastros/EmpresasCadastradasPage";
import LotesCadastradosPage from "../pages/Cadastros/LotesCadastradosPage";
import PainelPedidosAlteracaoDeCardapioCODAEPage from "../pages/CODAE/AlteracaoDeCardapio/PainelPedidosPage";
import AlteracaoDeCardapioRelatorioCODAEPage from "../pages/CODAE/AlteracaoDeCardapio/RelatorioPage";
import DashboardCODAEDetailDRE from "../pages/CODAE/DashboardCODAEDetailDRE";
import DashboardCODAEPage from "../pages/CODAE/DashboardCODAEPage";
import PainelPedidosInclusaoDeAlimentacaoCODAEPage from "../pages/CODAE/InclusaoDeAlimentacao/PainelPedidosPage";
import InclusaoDeAlimentacaoRelatorioCODAEPage from "../pages/CODAE/InclusaoDeAlimentacao/RelatorioPage";
import PainelPedidosInversaoDiaCardapioCODAEPage from "../pages/CODAE/InversaoDiaCardapio/PainelPedidosPage";
import PainelPedidosInversaoDiaCardapioRelatorioCODAEPage from "../pages/CODAE/InversaoDiaCardapio/RelatorioPage";
import KitLancheOrdersPageCodae from "../pages/CODAE/KitLancheOrderPageCodae";
import KitsLancheRelatorioCodaePage from "../pages/CODAE/KitLancheRelatorioCodaePage";
import StatusSolicitacoesCODAEPage from "../pages/CODAE/StatusSolicitacoesCODAEPage";
import ConfigEmailPage from "../pages/Configuracoes/ConfigEmailPage";
import MensagemPage from "../pages/Configuracoes/MensagemPage";
import PermissionsCheckBoxesPage from "../pages/Configuracoes/PermissionsCheckBoxesPage";
import PermissionsPage from "../pages/Configuracoes/PermissionsPage";
import PainelPedidosAlteracaoDeCardapioDREPage from "../pages/DRE/AlteracaoDeCardapio/PainelPedidosPage";
import AlteracaoDeCardapioRelatorioDREPage from "../pages/DRE/AlteracaoDeCardapio/RelatorioPage";
import DashboardDREPage from "../pages/DRE/DashboardDREPage";
import PainelPedidosInclusaoDeAlimentacaoDREPage from "../pages/DRE/InclusaoDeAlimentacao/PainelPedidosPage";
import InclusaoDeAlimentacaoRelatorioDREPage from "../pages/DRE/InclusaoDeAlimentacao/RelatorioPage";
import PainelPedidosInversaoDiaCardapioDREPage from "../pages/DRE/InversaoDiaCardapio/PainelPedidosPage";
import InversaoDiaCardapioRelatorioDREPage from "../pages/DRE/InversaoDiaCardapio/RelatorioPage";
import KitsLancheOrdersPage from "../pages/DRE/SolicitacaoDeKitLanche/KitLancheOrdersPage";
import KitsLancheRelatorioPage from "../pages/DRE/SolicitacaoDeKitLanche/KitLancheRelatorioPage";
import SolicitacaoUnificadaPage from "../pages/DRE/SolicitacaoUnificadaPage";
import StatusSolicitacoesAutorizadasDREPage from "../pages/DRE/StatusSolicitacoesAutorizadasDREPage";
import StatusSolicitacoesPendentesDREPage from "../pages/DRE/StatusSolicitacoesPendentesDREPage";
import AlteracaoDeCardapioPage from "../pages/Escola/AlteracaoDeCardapioPage";
import DashboardEscolaPage from "../pages/Escola/DashboardEscolaPage";
import InclusaoDeAlimentacaoPage from "../pages/Escola/InclusaoDeAlimentacaoPage";
import InversaoDeDiaDeCardapioPage from "../pages/Escola/InversaoDeDiaDeCardapioPage";
import SolicitacaoDeKitLanchePage from "../pages/Escola/SolicitacaoDeKitLanchePage";
import StatusSolicitacoesPage from "../pages/Escola/StatusSolicitacoesPage";
import SuspensaoDeAlimentacaoPage from "../pages/Escola/SuspensaoDeAlimentacaoPage";
import Home from "../pages/Home";
import PainelPedidosAlteracaoDeCardapioTerceirizadaPage from "../pages/Terceirizada/AlteracaoDeCardapio/PainelPedidosPage";
import AlteracaoDeCardapioRelatorioTerceirizadaPage from "../pages/Terceirizada/AlteracaoDeCardapio/RelatorioPage";
import DashboardTerceirizadaPage from "../pages/Terceirizada/DashboardTerceirizadaPage";
import PainelPedidosInclusaoDeAlimentacaoTerceirizadaPage from "../pages/Terceirizada/InclusaoDeAlimentacao/PainelPedidosPage";
import InclusaoDeAlimentacaoRelatorioTerceirizadaPage from "../pages/Terceirizada/InclusaoDeAlimentacao/RelatorioPage";
import PainelPedidosInversaoDiaCardapioTerceirizadaPage from "../pages/Terceirizada/InversaoDiaCardapio/PainelPedidosPage";
import PainelPedidosInversaoDiaCardapioRelatorioTerceirizadaPage from "../pages/Terceirizada/InversaoDiaCardapio/RelatorioPage";
import KitsLancheOrdersTerceirizadaPage from "../pages/Terceirizada/KitLancheOrdersTerceirizadaPage";
import KitsLancheRelatorioTerceirizadaPage from "../pages/Terceirizada/KitLancheRelatorioTerceirizadaPage";
import StatusSolicitacoesTerceirizadaPage from "../pages/Terceirizada/StatusSolicitacoesTerceirizadaPage";
import PainelPedidosSuspensaoAlimentacao from "../pages/Terceirizada/SuspensaoAlimentacao/PainelPedidosPage";
import PainelPedidosSuspensaoAlimentacaoRelatorio from "../pages/Terceirizada/SuspensaoAlimentacao/RelatorioPage";

export const INVERSAO_CARDAPIO = "inversao-de-dia-de-cardapio";
export const INCLUSAO_ALIMENTACAO = "inclusao-de-alimentacao";
export const SUSPENSAO_ALIMENTACAO = "suspensao-de-alimentacao";
export const SOLICITACAO_KIT_LANCHE = "solicitacao-de-kit-lanche";
export const PAINEL_CONTROLE = "painel-de-controle";
export const ALTERACAO_CARDAPIO = "alteracao-de-cardapio";
export const SOLICITACAO_KIT_LANCHE_UNIFICADA = "solicitacao-unificada";

export const CODAE = "codae";
export const TERCEIRIZADA = "terceirizada";
export const DRE = "dre";
export const ESCOLA = "escola";

export const SOLICITACOES_AUTORIZADAS = "solicitacoes-autorizadas";

export const RELATORIO = "relatorio";
export const HISTORICO = "historico";
export const SOLICITACOES = "solicitacoes";

const routesConfig = [
  {
    path: "/",
    component: Home,
    exact: true
  },
  {
    path: "/login",
    component: Login,
    exact: false
  },
  {
    path: `/${ESCOLA}/${PAINEL_CONTROLE}`,
    component: DashboardEscolaPage,
    exact: false
  },
  {
    path: `/${ESCOLA}/status-solicitacoes`,
    component: StatusSolicitacoesPage,
    exact: false
  },
  {
    path: `/${ESCOLA}/${INCLUSAO_ALIMENTACAO}`,
    component: InclusaoDeAlimentacaoPage,
    exact: false
  },
  {
    path: `/${ESCOLA}/${ALTERACAO_CARDAPIO}`,
    component: AlteracaoDeCardapioPage,
    exact: false
  },
  {
    path: `/${ESCOLA}/${SOLICITACAO_KIT_LANCHE}`,
    component: SolicitacaoDeKitLanchePage,
    exact: false
  },
  {
    path: `/${ESCOLA}/${INVERSAO_CARDAPIO}`,
    component: InversaoDeDiaDeCardapioPage,
    exact: false
  },
  {
    path: `/${ESCOLA}/${SUSPENSAO_ALIMENTACAO}`,
    component: SuspensaoDeAlimentacaoPage,
    exact: false
  },
  {
    path: `/${DRE}/${PAINEL_CONTROLE}`,
    component: DashboardDREPage,
    exact: false
  },
  {
    path: `/${DRE}/${SOLICITACOES_AUTORIZADAS}`,
    component: StatusSolicitacoesAutorizadasDREPage,
    exact: false
  },
  {
    path: `/${DRE}/solicitacoes-pendentes`,
    component: StatusSolicitacoesPendentesDREPage,
    exact: false
  },
  {
    path: `/${DRE}/${INCLUSAO_ALIMENTACAO}/${RELATORIO}`,
    component: InclusaoDeAlimentacaoRelatorioDREPage,
    exact: false
  },
  {
    path: `/${DRE}/${INCLUSAO_ALIMENTACAO}`,
    component: PainelPedidosInclusaoDeAlimentacaoDREPage,
    exact: false
  },
  {
    path: `/${DRE}/${INVERSAO_CARDAPIO}/${RELATORIO}`,
    component: InversaoDiaCardapioRelatorioDREPage,
    exact: false
  },
  {
    path: `/${DRE}/${INVERSAO_CARDAPIO}`,
    component: PainelPedidosInversaoDiaCardapioDREPage,
    exact: false
  },
  {
    path: `/${DRE}/${SOLICITACAO_KIT_LANCHE}/${RELATORIO}`,
    component: KitsLancheRelatorioPage,
    exact: false
  },
  {
    path: `/${DRE}/${SOLICITACAO_KIT_LANCHE}`,
    component: KitsLancheOrdersPage,
    exact: false
  },
  {
    path: `/${DRE}/${SOLICITACAO_KIT_LANCHE_UNIFICADA}`,
    component: SolicitacaoUnificadaPage,
    exact: false
  },
  {
    path: `/${DRE}/${ALTERACAO_CARDAPIO}/${RELATORIO}`,
    component: AlteracaoDeCardapioRelatorioDREPage,
    exact: false
  },
  {
    path: `/${CODAE}/${INCLUSAO_ALIMENTACAO}/${RELATORIO}`,
    component: InclusaoDeAlimentacaoRelatorioCODAEPage,
    exact: false
  },
  {
    path: `/${CODAE}/${INCLUSAO_ALIMENTACAO}`,
    component: PainelPedidosInclusaoDeAlimentacaoCODAEPage,
    exact: false
  },
  {
    path: `/${CODAE}/${ALTERACAO_CARDAPIO}/${RELATORIO}`,
    component: AlteracaoDeCardapioRelatorioCODAEPage,
    exact: false
  },
  {
    path: `/${CODAE}/${ALTERACAO_CARDAPIO}`,
    component: PainelPedidosAlteracaoDeCardapioCODAEPage,
    exact: false
  },
  {
    path: `/${CODAE}/${INVERSAO_CARDAPIO}/${RELATORIO}`,
    component: PainelPedidosInversaoDiaCardapioRelatorioCODAEPage,
    exact: false
  },
  {
    path: `/${CODAE}/${INVERSAO_CARDAPIO}`,
    component: PainelPedidosInversaoDiaCardapioCODAEPage,
    exact: false
  },
  {
    path: `/${TERCEIRIZADA}/${INVERSAO_CARDAPIO}/${RELATORIO}`,
    component: PainelPedidosInversaoDiaCardapioRelatorioTerceirizadaPage,
    exact: false
  },
  {
    path: `/${TERCEIRIZADA}/${INVERSAO_CARDAPIO}`,
    component: PainelPedidosInversaoDiaCardapioTerceirizadaPage,
    exact: false
  },
  {
    path: `/${DRE}/${ALTERACAO_CARDAPIO}`,
    component: PainelPedidosAlteracaoDeCardapioDREPage,
    exact: false
  },
  {
    path: `/${DRE}/${ALTERACAO_CARDAPIO}/${RELATORIO}`,
    component: AlteracaoDeCardapioRelatorioDREPage,
    exact: false
  },
  {
    path: `/${TERCEIRIZADA}/${PAINEL_CONTROLE}`,
    component: DashboardTerceirizadaPage,
    exact: false
  },
  {
    path: `/${TERCEIRIZADA}/${SOLICITACOES}`,
    component: StatusSolicitacoesTerceirizadaPage,
    exact: false
  },
  {
    path: `/${TERCEIRIZADA}/${INCLUSAO_ALIMENTACAO}/${RELATORIO}`,
    component: InclusaoDeAlimentacaoRelatorioTerceirizadaPage,
    exact: false
  },
  {
    path: `/${TERCEIRIZADA}/${INCLUSAO_ALIMENTACAO}`,
    component: PainelPedidosInclusaoDeAlimentacaoTerceirizadaPage,
    exact: false
  },
  {
    path: `/${TERCEIRIZADA}/${SOLICITACAO_KIT_LANCHE}/${RELATORIO}`,
    component: KitsLancheRelatorioTerceirizadaPage,
    exact: false
  },
  {
    path: `/${TERCEIRIZADA}/${SOLICITACAO_KIT_LANCHE}`,
    component: KitsLancheOrdersTerceirizadaPage,
    exact: false
  },
  {
    path: `/${TERCEIRIZADA}/${SUSPENSAO_ALIMENTACAO}/${RELATORIO}`,
    component: PainelPedidosSuspensaoAlimentacaoRelatorio,
    exact: false
  },
  {
    path: `/${TERCEIRIZADA}/${SUSPENSAO_ALIMENTACAO}`,
    component: PainelPedidosSuspensaoAlimentacao,
    exact: false
  },
  {
    path: `/configuracoes/cadastros/lotes-cadastrados`,
    component: LotesCadastradosPage,
    exact: false
  },
  {
    path: `/configuracoes/cadastros/editais-cadastrados`,
    component: EditaisCadastradosPage,
    exact: true
  },
  {
    path: `/configuracoes/cadastros/lote`,
    component: CadastroLotePage,
    exact: false
  },
  {
    path: `/configuracoes/cadastros/empresas-cadastradas`,
    component: EmpresasCadastradas,
    exact: false
  },
  {
    path: `/configuracoes/cadastros/empresa`,
    component: CadastroEmpresaPage,
    exact: false
  },
  {
    path: `/configuracoes/cadastros/editais-contratos`,
    component: EditaisContratosPage,
    exact: true
  },
  {
    path: `/configuracoes/cadastros`,
    component: CadastrosPage,
    exact: false
  },
  {
    path: `/configuracoes/mensagem`,
    component: MensagemPage,
    exact: false
  },
  {
    path: `/configuracoes/permissoes`,
    component: PermissionsPage,
    exact: false
  },
  {
    path: `/permission-root/permissions/:type/:subtype`,
    component: PermissionsCheckBoxesPage,
    exact: null
  },
  {
    path: `/configuracoes`,
    component: ConfigEmailPage,
    exact: false
  },
  {
    path: `/${CODAE}/${SOLICITACOES}`,
    component: StatusSolicitacoesCODAEPage,
    exact: false
  },
  {
    path: `/${CODAE}/${SOLICITACAO_KIT_LANCHE}/${RELATORIO}`,
    component: KitsLancheRelatorioCodaePage,
    exact: false
  },
  {
    path: `/${CODAE}/${SOLICITACAO_KIT_LANCHE}`,
    component: KitLancheOrdersPageCodae,
    exact: true
  },
  {
    path: `/${CODAE}/${PAINEL_CONTROLE}`,
    component: DashboardCODAEPage,
    exact: false
  },
  {
    path: `/${CODAE}/detalhe-dashboard-dre`,
    component: DashboardCODAEDetailDRE,
    exact: false
  },
  {
    path: `/${TERCEIRIZADA}/${ALTERACAO_CARDAPIO}/${RELATORIO}`,
    component: AlteracaoDeCardapioRelatorioTerceirizadaPage,
    exact: false
  },
  {
    path: `/${TERCEIRIZADA}/${ALTERACAO_CARDAPIO}`,
    component: PainelPedidosAlteracaoDeCardapioTerceirizadaPage,
    exact: false
  }
];

export default routesConfig;
