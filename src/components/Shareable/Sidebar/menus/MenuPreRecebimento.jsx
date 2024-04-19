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
  CALENDARIO_CRONOGRAMA,
  PAINEL_FICHAS_TECNICAS,
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
  usuarioComAcessoAoPainelFichasTecnicas,
  usuarioComAcessoAoCalendarioCronograma,
  usuarioEhCODAEGabinete,
} from "helpers/utilities";

const MenuPreRecebimento = () => {
  return (
    <Menu id="PreRecebimento" icon="fa-calendar-check" title="Pré-Recebimento">
      {usuarioComAcessoAoPainelAprovacoes() && (
        <LeafItem to={`/${PRE_RECEBIMENTO}/${PAINEL_APROVACOES}`}>
          Painel de Aprovações
        </LeafItem>
      )}
      {(usuarioEhPreRecebimento() ||
        usuarioEhEmpresaFornecedor() ||
        usuarioEhCODAEGabinete()) && (
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
          Verificar Alterações de Cronograma
        </LeafItem>
      )}
      {usuarioEhEmpresaFornecedor() && (
        <LeafItem
          to={`/${PRE_RECEBIMENTO}/${SOLICITACAO_ALTERACAO_CRONOGRAMA_FORNECEDOR}`}
        >
          Verificar Alterações de Cronograma
        </LeafItem>
      )}
      {usuarioComAcessoAoCalendarioCronograma() && (
        <LeafItem to={`/${PRE_RECEBIMENTO}/${CALENDARIO_CRONOGRAMA}`}>
          Calendário de Cronogramas
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
      {usuarioComAcessoAoPainelFichasTecnicas() && (
        <LeafItem to={`/${PRE_RECEBIMENTO}/${PAINEL_FICHAS_TECNICAS}`}>
          Fichas Técnicas
        </LeafItem>
      )}
    </Menu>
  );
};

export default MenuPreRecebimento;
