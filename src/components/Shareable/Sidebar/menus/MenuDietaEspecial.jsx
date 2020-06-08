import React from "react";
import { Menu, LeafItem } from "./shared";
import {
  usuarioEhTerceirizada,
  usuarioEhCODAEDietaEspecial,
  usuarioEhDRE,
  usuarioEhEscola
} from "helpers/utilities";

const MenuDietaEspecial = () => {
  const exibePainelInicial = usuarioEhCODAEDietaEspecial();
  const exibeAtivasInativas =
    usuarioEhCODAEDietaEspecial() || usuarioEhEscola() || usuarioEhDRE();
  const exibeConsultaDieta = usuarioEhTerceirizada();

  return (
    <Menu id="DietaEspecial" icon="fa-utensils" title={"Dieta Especial"}>
      {exibePainelInicial && <LeafItem to="/">Painel Inicial</LeafItem>}
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
