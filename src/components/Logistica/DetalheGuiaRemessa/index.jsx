import React, { useEffect, useState } from "react";
import TabelaAlimentoConsolidado from "../TabelaAlimentoConsolidado";
import InsucessoDetalhe from "./components/InsucessoDetalhe";
import ConferenciaDetalhe from "./components/ConferenciaDetalhe";

import "./style.scss";

export default ({ guia }) => {
  const [conferencia, setConferencia] = useState();
  const [reposicao, setReposicao] = useState();

  const montaConferencia = (guia, reposicao) => {
    let conferencia = guia.conferencias.find(
      (conf) => conf.eh_reposicao === reposicao
    );
    if (conferencia) {
      conferencia.conferencia_dos_alimentos = guia.alimentos.map((alimento) => {
        alimento.embalagens = alimento.embalagens.map((emb) => {
          let conf = conferencia.conferencia_dos_alimentos.find(
            (conf) =>
              alimento.nome_alimento === conf.nome_alimento &&
              emb.tipo_embalagem === conf.tipo_embalagem
          );
          if (guia.status === "Recebida") {
            conf = {};
            conf.status_alimento = "Recebido";
            conf.qtd_recebido = emb.qtd_volume;
          }

          return { ...emb, ...conf };
        });

        return { ...alimento };
      });
    }
    return conferencia;
  };

  useEffect(() => {
    if (Object.keys(guia).length > 0) {
      setConferencia(montaConferencia(guia, false));
      setReposicao(montaConferencia(guia, true));
    }
  }, [guia]);

  return (
    <>
      <div className="componente-detalhamento-guia">
        {guia.alimentos &&
          [
            "Pendente de conferência",
            "Insucesso de entrega",
            "Cancelada",
          ].includes(guia.status) && (
            <>
              <div className="titulo-secao">
                Alimentos pendentes de conferência:
              </div>
              <TabelaAlimentoConsolidado
                className="table-sm tabela-conferencia-guia"
                alimentosConsolidado={guia.alimentos}
              />
              <hr />
            </>
          )}

        {guia && guia.insucessos && guia.insucessos[0] && (
          <>
            <InsucessoDetalhe insucesso={guia.insucessos[0]} />
            {conferencia && <hr />}
          </>
        )}

        {conferencia && (
          <>
            <ConferenciaDetalhe conferencia={conferencia} guia={guia} />
          </>
        )}

        {reposicao && (
          <>
            <hr />
            <ConferenciaDetalhe
              conferencia={reposicao}
              reposicaoFlag={true}
              guia={guia}
            />
          </>
        )}
      </div>
    </>
  );
};
