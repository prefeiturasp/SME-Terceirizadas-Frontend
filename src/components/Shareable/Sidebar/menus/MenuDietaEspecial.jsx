import React from "react";
import { Menu, LeafItem } from "./shared";
import {
  GESTAO_PRODUTO,
  AVALIAR_SOLICITACAO_CADASTRO_PRODUTO,
  ACOMPANHAR_SOLICITACAO_CADASTRO_PRODUTO
} from "configs/constants";
import {
  usuarioEhTerceirizada,
  usuarioEhCODAEDietaEspecial,
  usuarioEhDRE,
  usuarioEhEscola,
  usuarioEhNutricionistaSupervisao
} from "helpers/utilities";

const MenuDietaEspecial = () => {
  const exibePainelInicial = usuarioEhCODAEDietaEspecial() || usuarioEhEscola();
  const exibeNovaSolicitacao = usuarioEhEscola();
  const exibeConsultaDieta =
    usuarioEhTerceirizada() ||
    usuarioEhNutricionistaSupervisao() ||
    usuarioEhEscola();
  const exibeAtivasInativas =
    usuarioEhCODAEDietaEspecial() ||
    usuarioEhNutricionistaSupervisao() ||
    usuarioEhDRE();
  const exibeAvaliarSolicitacaoCadastroProduto = usuarioEhTerceirizada();
  const exibeAcompanharSolicitacaoCadastroProduto = usuarioEhCODAEDietaEspecial();

  return (
    <Menu id="DietaEspecial" icon="fa-utensils" title={"Dieta Especial"}>
      {exibePainelInicial && <LeafItem to="/">Painel Inicial</LeafItem>}
      {exibeNovaSolicitacao && (
        <LeafItem to={`/escola/dieta-especial`}>Nova Solicitação</LeafItem>
      )}
      {exibeConsultaDieta && (
        <LeafItem to={`/painel-dieta-especial`}>
          Consulta Dieta de Alunos
        </LeafItem>
      )}
      {exibeAtivasInativas && (
        <LeafItem to={`/dieta-especial/ativas-inativas`}>
          Aguardando autorização
        </LeafItem>
      )}
      {exibeAvaliarSolicitacaoCadastroProduto && (
        <LeafItem
          to={`/${GESTAO_PRODUTO}/${AVALIAR_SOLICITACAO_CADASTRO_PRODUTO}`}
        >
          Avaliar solic. cad. produto
        </LeafItem>
      )}
      {exibeAcompanharSolicitacaoCadastroProduto && (
        <LeafItem
          to={`/${GESTAO_PRODUTO}/${ACOMPANHAR_SOLICITACAO_CADASTRO_PRODUTO}`}
        >
          Acompanhar solic. novos produtos
        </LeafItem>
      )}
    </Menu>
  );
};

export default MenuDietaEspecial;
