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
  ENTREGAS_DISTRIBUIDOR
} from "configs/constants";
import {
  usuarioEhDistribuidora,
  usuarioEhLogistica,
  usuarioEhEscolaAbastecimento,
  usuarioEhDRE
} from "helpers/utilities";

const MenuLogistica = () => {
  return (
    <Menu id="Logistica" icon="fa-truck" title="Abastecimento">
      {/* <LeafItem to={`/${LOGISTICA}/${DISPONIBILIZACAO_DE_SOLICITACOES}`}>
        Disponibilização de solicitações
      </LeafItem> */}
      {usuarioEhLogistica() && (
        <LeafItem to={`/${LOGISTICA}/${ENVIO_REQUISICOES_ENTREGA_AVANCADO}`}>
          Requisições de Entrega
        </LeafItem>
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

      {usuarioEhLogistica() ||
        (usuarioEhDRE() && (
          <LeafItem to={`/${LOGISTICA}/${ENTREGAS_DILOG}`}>Entregas</LeafItem>
        ))}

      {usuarioEhDistribuidora() && (
        <LeafItem to={`/${LOGISTICA}/${ENTREGAS_DISTRIBUIDOR}`}>
          Entregas
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
