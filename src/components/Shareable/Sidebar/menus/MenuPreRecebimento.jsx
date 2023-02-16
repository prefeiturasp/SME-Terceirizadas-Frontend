import React from "react";
import { Menu, LeafItem } from "./shared";
import {
  PRE_RECEBIMENTO,
  CRONOGRAMA_ENTREGA,
  PAINEL_APROVACOES
} from "configs/constants";
import {
  usuarioEhDinutreDiretoria,
  usuarioEhFornecedor,
  usuarioEhPreRecebimento
} from "helpers/utilities";

const MenuPreRecebimento = () => {
  return (
    <Menu id="PreRecebimento" icon="fa-calendar-check" title="Pré-Recebimento">
      {(usuarioEhPreRecebimento() || usuarioEhFornecedor()) && (
        <LeafItem to={`/${PRE_RECEBIMENTO}/${CRONOGRAMA_ENTREGA}`}>
          Cronograma de Entrega
        </LeafItem>
      )}
      {usuarioEhDinutreDiretoria() && (
        <LeafItem to={`/${PRE_RECEBIMENTO}/${PAINEL_APROVACOES}`}>
          Painel de Aprovações
        </LeafItem>
      )}
    </Menu>
  );
};

export default MenuPreRecebimento;
