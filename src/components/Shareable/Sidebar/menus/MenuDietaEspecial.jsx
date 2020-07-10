import React from "react";
import { Menu, LeafItem } from "./shared";
import {
  usuarioEhTerceirizada,
  usuarioEhCODAEDietaEspecial,
  usuarioEhDRE,
  usuarioEhEscola
} from "helpers/utilities";

const MenuDietaEspecial = () => {
  const exibePainelInicial = usuarioEhCODAEDietaEspecial() || usuarioEhEscola();
  const exibeNovaSolicitacao = usuarioEhEscola();
  const exibeConsultaDieta = usuarioEhTerceirizada() || usuarioEhEscola();
  const exibeAtivasInativas = usuarioEhCODAEDietaEspecial() || usuarioEhDRE();

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
    </Menu>
  );
};

export default MenuDietaEspecial;
