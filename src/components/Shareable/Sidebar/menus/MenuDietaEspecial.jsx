import React from "react";
import { Menu, LeafItem } from "./shared";

const MenuDietaEspecial = () => {
  return (
    <Menu id="DietaEspecial" icon="fa-utensils" title={"Dieta Especial"}>
      <LeafItem to="/">Painel Inicial</LeafItem>
      <LeafItem to={`/dieta-especial/ativas-inativas`}>
        Aguardando autorização
      </LeafItem>
    </Menu>
  );
};

export default MenuDietaEspecial;
