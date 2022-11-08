import React from "react";
import { Menu, LeafItem } from "./shared";
import { PRE_RECEBIMENTO, CRONOGRAMA_ENTREGA } from "configs/constants";
import { usuarioEhPreRecebimento } from "helpers/utilities";

const MenuPreRecebimento = () => {
  return (
    <Menu id="PreRecebimento" icon="fa-calendar-check" title="Pré-Recebimento">
      {usuarioEhPreRecebimento() && (
        <LeafItem to={`/${PRE_RECEBIMENTO}/${CRONOGRAMA_ENTREGA}`}>
          Cronograma de Entrega
        </LeafItem>
      )}
    </Menu>
  );
};

export default MenuPreRecebimento;
