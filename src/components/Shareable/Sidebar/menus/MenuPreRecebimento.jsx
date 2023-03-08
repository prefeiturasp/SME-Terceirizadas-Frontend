import React from "react";
import { Menu, LeafItem } from "./shared";
import {
  PRE_RECEBIMENTO,
  CRONOGRAMA_ENTREGA,
  PAINEL_APROVACOES,
  SOLICITACAO_ALTERACAO_CRONOGRAMA
} from "configs/constants";
import {
  usuarioEhCronograma,
  usuarioEhDinutreDiretoria,
  usuarioEhFornecedor,
  usuarioEhPreRecebimento
} from "helpers/utilities";

const MenuPreRecebimento = () => {
  return (
    <Menu id="PreRecebimento" icon="fa-calendar-check" title="Pré-Recebimento">
      {usuarioEhDinutreDiretoria() && (
        <LeafItem to={`/${PRE_RECEBIMENTO}/${PAINEL_APROVACOES}`}>
          Painel de Aprovações
        </LeafItem>
      )}
      {(usuarioEhPreRecebimento() || usuarioEhFornecedor()) && (
        <LeafItem to={`/${PRE_RECEBIMENTO}/${CRONOGRAMA_ENTREGA}`}>
          Cronograma de Entrega
        </LeafItem>
      )}
      {usuarioEhCronograma() && (
        <LeafItem
          to={`/${PRE_RECEBIMENTO}/${SOLICITACAO_ALTERACAO_CRONOGRAMA}`}
        >
          Alteração de Cronograma
        </LeafItem>
      )}
    </Menu>
  );
};

export default MenuPreRecebimento;
