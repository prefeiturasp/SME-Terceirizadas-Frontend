import React from "react";
import { Menu, LeafItem } from "./shared";
import {
  PRE_RECEBIMENTO,
  CRONOGRAMA_ENTREGA,
  PAINEL_APROVACOES,
  SOLICITACAO_ALTERACAO_CRONOGRAMA,
  SOLICITACAO_ALTERACAO_CRONOGRAMA_FORNECEDOR,
  DOCUMENTOS_RECEBIMENTO,
  LAYOUT_EMBALAGEM,
  PAINEL_DOCUMENTOS_RECEBIMENTO,
  PAINEL_LAYOUT_EMBALAGEM,
  FICHA_TECNICA,
} from "configs/constants";
import {
  usuarioEhCronograma,
  usuarioEhDilogDiretoria,
  usuarioEhDinutreDiretoria,
  usuarioEhPreRecebimento,
  usuarioEhEmpresaFornecedor,
  usuarioComAcessoAoPainelAprovacoes,
  usuarioComAcessoAoPainelDocumentos,
  usuarioComAcessoAoPainelEmbalagens,
} from "helpers/utilities";

const MenuPreRecebimento = () => {
  return (
    <Menu id="PreRecebimento" icon="fa-calendar-check" title="Pré-Recebimento">
      {usuarioComAcessoAoPainelAprovacoes() && (
        <LeafItem to={`/${PRE_RECEBIMENTO}/${PAINEL_APROVACOES}`}>
          Painel de Aprovações
        </LeafItem>
      )}
      {(usuarioEhPreRecebimento() || usuarioEhEmpresaFornecedor()) && (
        <LeafItem to={`/${PRE_RECEBIMENTO}/${CRONOGRAMA_ENTREGA}`}>
          Cronograma de Entrega
        </LeafItem>
      )}
      {(usuarioEhCronograma() ||
        usuarioEhDinutreDiretoria() ||
        usuarioEhDilogDiretoria()) && (
        <LeafItem
          to={`/${PRE_RECEBIMENTO}/${SOLICITACAO_ALTERACAO_CRONOGRAMA}`}
        >
          Alteração de Cronograma
        </LeafItem>
      )}
      {usuarioEhEmpresaFornecedor() && (
        <LeafItem
          to={`/${PRE_RECEBIMENTO}/${SOLICITACAO_ALTERACAO_CRONOGRAMA_FORNECEDOR}`}
        >
          Alteração de Cronograma
        </LeafItem>
      )}
      {usuarioEhEmpresaFornecedor() && (
        <LeafItem to={`/${PRE_RECEBIMENTO}/${LAYOUT_EMBALAGEM}`}>
          Layout de Embalagem
        </LeafItem>
      )}
      {usuarioComAcessoAoPainelEmbalagens() && (
        <LeafItem to={`/${PRE_RECEBIMENTO}/${PAINEL_LAYOUT_EMBALAGEM}`}>
          Layout de Embalagem
        </LeafItem>
      )}
      {usuarioEhEmpresaFornecedor() && (
        <LeafItem to={`/${PRE_RECEBIMENTO}/${DOCUMENTOS_RECEBIMENTO}`}>
          Documentos de Recebimento
        </LeafItem>
      )}
      {usuarioComAcessoAoPainelDocumentos() && (
        <LeafItem to={`/${PRE_RECEBIMENTO}/${PAINEL_DOCUMENTOS_RECEBIMENTO}`}>
          Documentos de Recebimento
        </LeafItem>
      )}
      {usuarioEhEmpresaFornecedor() && (
        <LeafItem to={`/${PRE_RECEBIMENTO}/${FICHA_TECNICA}`}>
          Ficha Técnica do Produto
        </LeafItem>
      )}
    </Menu>
  );
};

export default MenuPreRecebimento;
