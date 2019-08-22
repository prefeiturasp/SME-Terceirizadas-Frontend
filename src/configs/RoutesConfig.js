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
import StatusSolicitacoesDREPage from "../pages/DRE/StatusSolicitacoesDREPage";
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
import KitsLancheOrdersTerceirizadaPage from "../pages/Terceirizada/KitLancheOrdersTerceirizadaPage";
import KitsLancheRelatorioTerceirizadaPage from "../pages/Terceirizada/KitLancheRelatorioTerceirizadaPage";
import StatusSolicitacoesTerceirizadaPage from "../pages/Terceirizada/StatusSolicitacoesTerceirizadaPage";
import UnifiedSolicitationHistoricPage from "../pages/UnifiedSolicitationHistoricPage";



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
    path: "/escola/painel-de-controle",
    component: DashboardEscolaPage,
    exact: false
  },
  {
    path: "/escola/status-solicitacoes",
    component: StatusSolicitacoesPage,
    exact: false
  },
  {
    path: "/escola/inclusao-de-alimentacao",
    component: InclusaoDeAlimentacaoPage,
    exact: false
  },
  {
    path: "/escola/alteracao-de-cardapio",
    component: AlteracaoDeCardapioPage,
    exact: false
  },
  {
    path: "/escola/solicitacao-de-kit-lanche",
    component: SolicitacaoDeKitLanchePage,
    exact: false
  },
  {
    path: "/escola/inversao-de-dia-de-cardapio",
    component: InversaoDeDiaDeCardapioPage,
    exact: false
  },
  {
    path: "/escola/suspensao-de-alimentacao",
    component: SuspensaoDeAlimentacaoPage,
    exact: false
  },
  {
    path: "/dre/painel-de-controle",
    component: DashboardDREPage,
    exact: false
  },
  {
    path: "/dre/solicitacoes",
    component: StatusSolicitacoesDREPage,
    exact: false
  },
  {
    path: "/dre/inclusoes-de-alimentacao/relatorio",
    component: InclusaoDeAlimentacaoRelatorioDREPage,
    exact: false
  },
  {
    path: "/dre/inclusoes-de-alimentacao",
    component: PainelPedidosInclusaoDeAlimentacaoDREPage,
    exact: false
  },
  {
    path: "/dre/inversoes-dia-cardapio/relatorio",
    component: InversaoDiaCardapioRelatorioDREPage,
    exact: false
  },
  {
    path: "/dre/inversoes-dia-cardapio",
    component: PainelPedidosInversaoDiaCardapioDREPage,
    exact: false
  },
  {
    path: "/dre/kits-lanche/relatorio",
    component: KitsLancheRelatorioPage,
    exact: false
  },
  {
    path: "/dre/kits-lanche",
    component: KitsLancheOrdersPage,
    exact: false
  },
  {
    path: "/dre/solicitacao-unificada",
    component: SolicitacaoUnificadaPage,
    exact: false
  },
  {
    path: "/dre/alteracoes-de-cardapio/relatorio",
    component: AlteracaoDeCardapioRelatorioDREPage,
    exact: false
  },
  {
    path: "/codae/inclusoes-de-alimentacao/relatorio",
    component: InclusaoDeAlimentacaoRelatorioCODAEPage,
    exact: false
  },
  {
    path: "/codae/inclusoes-de-alimentacao",
    component: PainelPedidosInclusaoDeAlimentacaoCODAEPage,
    exact: false
  },
  {
    path: "/codae/alteracoes-de-cardapio/relatorio",
    component: AlteracaoDeCardapioRelatorioCODAEPage,
    exact: false
  },
  {
    path: "/codae/alteracoes-de-cardapio",
    component: PainelPedidosAlteracaoDeCardapioCODAEPage,
    exact: false
  },
  {
    path: "/codae/inversoes-dia-cardapio/relatorio",
    component: PainelPedidosInversaoDiaCardapioRelatorioCODAEPage,
    exact: false
  },
  {
    path: "/codae/inversoes-dia-cardapio",
    component: PainelPedidosInversaoDiaCardapioCODAEPage,
    exact: false
  },
  {
    path: "/dre/alteracoes-de-cardapio",
    component: PainelPedidosAlteracaoDeCardapioDREPage,
    exact: false
  },
  {
    path: "/dre/alteracoes-de-cardapio/relatorio",
    component: AlteracaoDeCardapioRelatorioDREPage,
    exact: false
  },
  {
    path: "/codae/solicitacao-unificada/historico",
    component: UnifiedSolicitationHistoricPage,
    exact: false
  },
  {
    path: "/terceirizada/painel-de-controle",
    component: DashboardTerceirizadaPage,
    exact: false
  },
  {
    path: "/terceirizada/solicitacoes",
    component: StatusSolicitacoesTerceirizadaPage,
    exact: false
  },
  {
    path: "/terceirizada/inclusoes-de-alimentacao/relatorio",
    component: InclusaoDeAlimentacaoRelatorioTerceirizadaPage,
    exact: false
  },
  {
    path: "/terceirizada/inclusoes-de-alimentacao",
    component: PainelPedidosInclusaoDeAlimentacaoTerceirizadaPage,
    exact: false
  },
  {
    path: "/terceirizada/kits-lanche/relatorio",
    component: KitsLancheRelatorioTerceirizadaPage,
    exact: false
  },
  {
    path: "/terceirizada/kits-lanche",
    component: KitsLancheOrdersTerceirizadaPage,
    exact: false
  },
  {
    path: "/configuracoes/cadastros/lotes-cadastrados",
    component: LotesCadastradosPage,
    exact: false
  },
  {
    path: "/configuracoes/cadastros/editais-cadastrados",
    component: EditaisCadastradosPage,
    exact: true
  },
  {
    path: "/configuracoes/cadastros/lote",
    component: CadastroLotePage,
    exact: false
  },
  {
    path: "/configuracoes/cadastros/empresas-cadastradas",
    component: EmpresasCadastradas,
    exact: false
  },
  {
    path: "/configuracoes/cadastros/empresa",
    component: CadastroEmpresaPage,
    exact: false
  },
  {
    path: "/configuracoes/cadastros/editais-contratos",
    component: EditaisContratosPage,
    exact: true
  },
  {
    path: "/configuracoes/cadastros",
    component: CadastrosPage,
    exact: false
  },
  {
    path: "/configuracoes/mensagem",
    component: MensagemPage,
    exact: false
  },
  {
    path: "/configuracoes/permissoes",
    component: PermissionsPage,
    exact: false
  },
  {
    path: "/permission-root/permissions/:type/:subtype",
    component: PermissionsCheckBoxesPage,
    exact: null
  },
  {
    path: "/configuracoes",
    component: ConfigEmailPage,
    exact: false
  },
  {
    path: "/codae/solicitacoes",
    component: StatusSolicitacoesCODAEPage,
    exact: false
  },
  {
    path: "/codae/kits-lanche/relatorio",
    component: KitsLancheRelatorioCodaePage,
    exact: false
  },
  {
    path: "/codae/kits-lanche",
    component: KitLancheOrdersPageCodae,
    exact: true
  },
  {
    path: "/codae/painel-de-controle",
    component: DashboardCODAEPage,
    exact: false
  },
  {
    path: "/codae/detalhe-dashboard-dre",
    component: DashboardCODAEDetailDRE,
    exact: false
  },
  {
    path: "/terceirizada/alteracoes-de-cardapio/relatorio",
    component: AlteracaoDeCardapioRelatorioTerceirizadaPage,
    exact: false
  },
  {
    path: "/terceirizada/alteracoes-de-cardapio",
    component: PainelPedidosAlteracaoDeCardapioTerceirizadaPage,
    exact: false
  }
];

export default routesConfig;
