import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import suspensaoDeAlimentacaoReducer from "./reducers/suspensaoDeAlimentacaoReducer";
import inversaoDeDiaDeCardapioReducer from "./reducers/inversaoDeDiaDeCardapio.reducer";
import alteracaoCardapioReducer from "./reducers/alteracaoCardapioReducer";
import loteReducer from "./reducers/lote.reducer";
import loadTipoAlimentacao from "./reducers/tipoAlimentacaoReducer";
import loadEmpresa from "./reducers/empresa.reducer";
import loadFiltroBusca from "./reducers/loadFiltroBusca";
import loadProduto from "./reducers/produto.reducer";
import kitLancheReducer from "./reducers/kitLanche.reducer";
import { produtoReducer } from "./reducers/produtoReducer";
import finalFormReducer from "./reducers/finalForm";
import avaliarReclamacaoProdutoReducer from "./reducers/avaliarReclamacaoProduto";
import reclamacaoProdutoReducer from "./reducers/reclamacaoProduto";
import responderAnaliseSensorialReducer from "./reducers/responderAnaliseSensorial";
import buscaAvancadaProdutoReducer from "./reducers/buscaAvancadaProduto";
import responderReclamacaoProdutoReducer from "./reducers/responderReclamacaoProduto";
import incluirDietaEspecialReducer from "./reducers/incluirDietaEspecialReducer";
import dietasAtivasInativasPorAlunoReducer from "./reducers/dietasAtivasInativasPorAlunoReducer";
import { filtersDietaReducer } from "./reducers/filtersDietaReducer";
import { filtersProdutoReducer } from "./reducers/filtersProdutoReducer";
import { filtersAlimentacaoReducer } from "./reducers/filtersAlimentacaoReducer";

// Junta todos os reducers do sistema! Vai pra store
const rootReducer = combineReducers({
  form: formReducer,
  inversaoDeDiaDeCardapioForm: inversaoDeDiaDeCardapioReducer,
  alteracaoCardapio: alteracaoCardapioReducer,
  loteForm: loteReducer,
  suspensaoDeAlimentacao: suspensaoDeAlimentacaoReducer,
  TipoDeAlimentacaoForm: loadTipoAlimentacao,
  cadastroEmpresaForm: loadEmpresa,
  FiltrosDeBuscaForm: loadFiltroBusca,
  kitLanche: kitLancheReducer,
  cadastroProduto: loadProduto,
  produtos: produtoReducer,
  finalForm: finalFormReducer,
  avaliarReclamacaoProduto: avaliarReclamacaoProdutoReducer,
  reclamacaoProduto: reclamacaoProdutoReducer,
  responderAnaliseSensorial: responderAnaliseSensorialReducer,
  buscaAvancadaProduto: buscaAvancadaProdutoReducer,
  responderReclamacaoProduto: responderReclamacaoProdutoReducer,
  incluirDietaEspecial: incluirDietaEspecialReducer,
  dietasAtivasInativasPorAluno: dietasAtivasInativasPorAlunoReducer,
  filtersDieta: filtersDietaReducer,
  filtersProduto: filtersProdutoReducer,
  filtersAlimentacao: filtersAlimentacaoReducer,
});

export default rootReducer;
