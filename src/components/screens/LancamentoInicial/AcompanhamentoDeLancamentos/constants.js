import { usuarioEhEscolaTerceirizadaDiretor } from "helpers/utilities";
import React from "react";

export const MEDICAO_CARD_NOME_POR_STATUS_DRE = {
  MEDICAO_ENVIADA_PELA_UE: {
    nome: (
      <div>
        {usuarioEhEscolaTerceirizadaDiretor() ? "Enviados" : "Recebidos"} <br />{" "}
        para análise
      </div>
    ),
    cor: "azul-claro"
  },
  MEDICAO_CORRECAO_SOLICITADA: {
    nome: (
      <div>
        {usuarioEhEscolaTerceirizadaDiretor()
          ? "Devolvidos para"
          : "Devolvidos"}{" "}
        <br />{" "}
        {usuarioEhEscolaTerceirizadaDiretor() ? "ajustes DRE" : "para ajustes"}
      </div>
    ),
    cor: "laranja"
  },
  MEDICAO_CORRECAO_SOLICITADA_CODAE: {
    nome: (
      <div>
        Devolvidos para
        <br /> ajustes CODAE
      </div>
    ),
    cor: "Vermelho"
  },
  MEDICAO_CORRIGIDA_PELA_UE: {
    nome: <div>Corrigidos</div>,
    cor: "azul-escuro"
  },
  MEDICAO_APROVADA_PELA_DRE: {
    nome: (
      <div>
        Aprovados <br /> pela DRE
      </div>
    ),
    cor: "verde-claro"
  },
  MEDICAO_APROVADA_PELA_CODAE: {
    nome: (
      <div>
        Aprovados <br /> pela CODAE
      </div>
    ),
    cor: "verde-escuro"
  },
  TODOS_OS_LANCAMENTOS: {
    nome: (
      <div>
        Todos os <br /> Lançamentos
      </div>
    ),
    cor: "vermelho"
  }
};
