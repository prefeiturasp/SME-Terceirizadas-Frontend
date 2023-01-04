import React from "react";
import { Menu, LeafItem } from "./shared";
import {
  CONFIGURACOES,
  CADASTROS,
  LOTE,
  EMPRESA,
  EDITAIS_CONTRATOS,
  TIPOS_ALIMENTACAO,
  FAIXAS_ETARIAS,
  HORARIO_COMBOS_ALIMENTACAO,
  SOBREMESA_DOCE,
  LABORATORIO,
  EMBALAGEM,
  PRODUTOS
} from "configs/constants";
import {
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhCronograma,
  usuarioEhDilogQualidade,
  usuarioEhDilogQualidadeOuCronograma,
  usuarioEhEscola,
  usuarioEhLogistica,
  usuarioEhMedicao
} from "helpers/utilities";

const MenuCadastros = () => {
  return (
    <Menu id="Cadastros" icon="fa-user-plus" title={"Cadastros"}>
      {usuarioEhEscola() && (
        <LeafItem
          to={`/${CONFIGURACOES}/${CADASTROS}/${HORARIO_COMBOS_ALIMENTACAO}`}
        >
          Horários de Alimentações
        </LeafItem>
      )}
      {usuarioEhLogistica() && (
        <LeafItem to={`/${CONFIGURACOES}/${CADASTROS}/${EMPRESA}`}>
          Empresas
        </LeafItem>
      )}
      {usuarioEhDilogQualidadeOuCronograma() && (
        <LeafItem to={`/${CONFIGURACOES}/${CADASTROS}/${EMBALAGEM}`}>
          Embalagens
        </LeafItem>
      )}
      {usuarioEhDilogQualidade() && (
        <LeafItem to={`/${CONFIGURACOES}/${CADASTROS}/${LABORATORIO}`}>
          Laboratórios
        </LeafItem>
      )}
      {usuarioEhCODAEGestaoAlimentacao() && (
        <>
          <LeafItem to={`/${CONFIGURACOES}/${CADASTROS}`}>
            Painel Inicial
          </LeafItem>
          <LeafItem to={`/${CONFIGURACOES}/${CADASTROS}/${LOTE}`}>
            Lotes
          </LeafItem>
          <LeafItem to={`/${CONFIGURACOES}/${CADASTROS}/${EMPRESA}`}>
            Empresas
          </LeafItem>
          <LeafItem to={`/${CONFIGURACOES}/${CADASTROS}/${EDITAIS_CONTRATOS}`}>
            Editais e Contratos
          </LeafItem>
          <LeafItem to={`/${CONFIGURACOES}/${CADASTROS}/${TIPOS_ALIMENTACAO}`}>
            Tipos de Alimentações
          </LeafItem>
          <LeafItem to={`/${CONFIGURACOES}/${CADASTROS}/${FAIXAS_ETARIAS}`}>
            Faixas Etárias
          </LeafItem>
          <LeafItem to={`/${CONFIGURACOES}/${CADASTROS}/${SOBREMESA_DOCE}`}>
            Sobremesa Doce
          </LeafItem>
        </>
      )}
      {usuarioEhMedicao() && (
        <LeafItem to={`/${CONFIGURACOES}/${CADASTROS}/${SOBREMESA_DOCE}`}>
          Sobremesa Doce
        </LeafItem>
      )}
      {usuarioEhCronograma() && (
        <LeafItem to={`/${CONFIGURACOES}/${CADASTROS}/${PRODUTOS}`}>
          Produtos
        </LeafItem>
      )}
    </Menu>
  );
};

export default MenuCadastros;
