import React from "react";
import { Menu, LeafItem } from "./shared";
import { PESQUISA_DESENVOLVIMENTO } from "configs/constants";

const MenuPesquisaDesenvolvimento = () => {
  return (
    <Menu id="PesquisaDesenvolvimento" icon="fa-atom" title={"P&D"}>
      <LeafItem to={`/${PESQUISA_DESENVOLVIMENTO}/busca-produto`}>
        Busca de Produto
      </LeafItem>
    </Menu>
  );
};

export default MenuPesquisaDesenvolvimento;
