import React from "react";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_ICON,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";

export const Botoes = ({
  produto,
  setVerProduto,
  verUnicoProduto,
  setModal,
  setProdutoAAtualizar
}) => {
  return (
    <div className="row mb-3">
      <div className="col-12 text-right">
        <Botao
          onClick={() => {
            setVerProduto(verUnicoProduto ? null : produto);
            window.scrollTo(0, 0);
          }}
          texto={verUnicoProduto ? "Voltar" : "Ver produto"}
          style={verUnicoProduto ? BUTTON_STYLE.BLUE : BUTTON_STYLE.GREEN}
          type={BUTTON_TYPE.BUTTON}
          icon={verUnicoProduto && BUTTON_ICON.ARROW_LEFT}
        />
        <Botao
          className="ml-3"
          onClick={() => {
            setModal("Questionar terceirizada");
            setProdutoAAtualizar(produto);
          }}
          texto="Questionar terceirizada"
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.GREEN_OUTLINE}
          disabled={
            !["ESCOLA_OU_NUTRICIONISTA_RECLAMOU"].includes(
              produto.ultima_homologacao.status
            )
          }
        />
        <Botao
          className="ml-3"
          onClick={() => {
            setModal("Recusar reclamação");
            setProdutoAAtualizar(produto);
          }}
          texto="Recusar"
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.GREEN_OUTLINE}
          disabled={
            ![
              "ESCOLA_OU_NUTRICIONISTA_RECLAMOU",
              "TERCEIRIZADA_RESPONDEU_RECLAMACAO"
            ].includes(produto.ultima_homologacao.status)
          }
        />
        <Botao
          className="ml-3 mr-3"
          onClick={() => {
            setModal("Aceitar reclamação");
            setProdutoAAtualizar(produto);
          }}
          texto="Aceitar"
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.GREEN_OUTLINE}
          disabled={
            ![
              "ESCOLA_OU_NUTRICIONISTA_RECLAMOU",
              "TERCEIRIZADA_RESPONDEU_RECLAMACAO"
            ].includes(produto.ultima_homologacao.status)
          }
        />
      </div>
    </div>
  );
};
