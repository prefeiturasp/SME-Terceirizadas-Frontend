import React from "react";
import { Menu, LeafItem } from "./shared";
import {
  ENVIO_REQUISICOES_ENTREGA,
  ENVIO_REQUISICOES_ENTREGA_AVANCADO,
  LOGISTICA,
  GESTAO_REQUISICAO_ENTREGA,
  GESTAO_SOLICITACAO_ALTERACAO,
  CONSULTA_SOLICITACAO_ALTERACAO,
  CONFERENCIA_INCONSISTENCIAS,
  CONFERIR_ENTREGA,
  INSUCESSO_ENTREGA
} from "configs/constants";
import {
  usuarioEhDistribuidora,
  usuarioEhLogistica,
  usuarioEhEscolaAbastecimento
} from "helpers/utilities";

const MenuLogistica = () => {
  return (
    <Menu id="Logistica" icon="fa-truck" title="Abastecimento">
      {/* <LeafItem to={`/${LOGISTICA}/${DISPONIBILIZACAO_DE_SOLICITACOES}`}>
        Disponibilização de solicitações
      </LeafItem> */}
      {usuarioEhLogistica() && (
        <>
          <LeafItem to={`/${LOGISTICA}/${ENVIO_REQUISICOES_ENTREGA}`}>
            Envio de Requisição de Entrega
          </LeafItem>
          <LeafItem to={`/${LOGISTICA}/${ENVIO_REQUISICOES_ENTREGA_AVANCADO}`}>
            Consulta de Requisições de entrega
          </LeafItem>
        </>
      )}

      {usuarioEhDistribuidora() && (
        <LeafItem to={`/${LOGISTICA}/${GESTAO_REQUISICAO_ENTREGA}`}>
          Gestão de Requisição de Entrega
        </LeafItem>
      )}

      {usuarioEhDistribuidora() && (
        <LeafItem to={`/${LOGISTICA}/${INSUCESSO_ENTREGA}`}>
          Insucesso de Entrega
        </LeafItem>
      )}

      {usuarioEhDistribuidora() && (
        <LeafItem to={`/${LOGISTICA}/${CONSULTA_SOLICITACAO_ALTERACAO}`}>
          Consulta de Solicitação de Alteração
        </LeafItem>
      )}

      {usuarioEhLogistica() && (
        <LeafItem to={`/${LOGISTICA}/${GESTAO_SOLICITACAO_ALTERACAO}`}>
          Solicitação de Alteração
        </LeafItem>
      )}

      {usuarioEhLogistica() && (
        <LeafItem to={`/${LOGISTICA}/${CONFERENCIA_INCONSISTENCIAS}`}>
          Conferência de Inconsistências
        </LeafItem>
      )}

      {usuarioEhEscolaAbastecimento() && (
        <LeafItem to={`/${LOGISTICA}/${CONFERIR_ENTREGA}`}>
          Conferir Entrega
        </LeafItem>
      )}
    </Menu>
  );
};

export default MenuLogistica;
