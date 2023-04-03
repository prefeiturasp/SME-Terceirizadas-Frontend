import React from "react";
import { Menu, LeafItem } from "./shared";
import {
  ENVIO_REQUISICOES_ENTREGA_AVANCADO,
  LOGISTICA,
  GESTAO_REQUISICAO_ENTREGA,
  GESTAO_SOLICITACAO_ALTERACAO,
  CONSULTA_SOLICITACAO_ALTERACAO,
  CONFERENCIA_INCONSISTENCIAS,
  CONFERIR_ENTREGA,
  INSUCESSO_ENTREGA,
  ENTREGAS_DILOG,
  ENTREGAS_DRE,
  ENTREGAS_DISTRIBUIDOR
} from "configs/constants";
import {
  usuarioEhEmpresaDistribuidora,
  usuarioEhLogistica,
  usuarioEhEscolaAbastecimento,
  usuarioEhDRE,
  usuarioComAcessoTelaEntregasDilog,
  usuarioEhCoordenadorNutriSupervisao,
  usuarioEhCodaeDilog,
  usuarioEhEscolaAbastecimentoDiretor
} from "helpers/utilities";

const MenuLogistica = () => {
  return (
    <Menu id="Logistica" icon="fa-truck" title="Abastecimento">
      {/* <LeafItem to={`/${LOGISTICA}/${DISPONIBILIZACAO_DE_SOLICITACOES}`}>
        Disponibilização de solicitações
      </LeafItem> */}
      {usuarioEhLogistica() && (
        <LeafItem to={`/${LOGISTICA}/${ENVIO_REQUISICOES_ENTREGA_AVANCADO}`}>
          Requisição de Entrega
        </LeafItem>
      )}

      {usuarioEhEmpresaDistribuidora() && (
        <LeafItem to={`/${LOGISTICA}/${GESTAO_REQUISICAO_ENTREGA}`}>
          Requisição de Entrega
        </LeafItem>
      )}

      {usuarioEhEmpresaDistribuidora() && (
        <LeafItem to={`/${LOGISTICA}/${INSUCESSO_ENTREGA}`}>
          Insucesso de Entrega
        </LeafItem>
      )}

      {usuarioEhEmpresaDistribuidora() && (
        <LeafItem to={`/${LOGISTICA}/${CONSULTA_SOLICITACAO_ALTERACAO}`}>
          Solicitação de Alteração
        </LeafItem>
      )}

      {usuarioEhLogistica() && (
        <LeafItem to={`/${LOGISTICA}/${GESTAO_SOLICITACAO_ALTERACAO}`}>
          Alteração da Requisição
        </LeafItem>
      )}

      {usuarioEhCodaeDilog() && (
        <LeafItem to={`/${LOGISTICA}/${CONFERENCIA_INCONSISTENCIAS}`}>
          Conferência de Inconsistência
        </LeafItem>
      )}

      {(usuarioComAcessoTelaEntregasDilog() ||
        usuarioEhCoordenadorNutriSupervisao()) && (
        <LeafItem to={`/${LOGISTICA}/${ENTREGAS_DILOG}`}>Entregas</LeafItem>
      )}

      {usuarioEhDRE() && (
        <LeafItem to={`/${LOGISTICA}/${ENTREGAS_DRE}`}>Entregas</LeafItem>
      )}

      {usuarioEhEmpresaDistribuidora() && (
        <LeafItem to={`/${LOGISTICA}/${ENTREGAS_DISTRIBUIDOR}`}>
          Entregas
        </LeafItem>
      )}

      {(usuarioEhEscolaAbastecimento() ||
        usuarioEhEscolaAbastecimentoDiretor()) && (
        <LeafItem to={`/${LOGISTICA}/${CONFERIR_ENTREGA}`}>
          Conferir Entrega
        </LeafItem>
      )}
    </Menu>
  );
};

export default MenuLogistica;
