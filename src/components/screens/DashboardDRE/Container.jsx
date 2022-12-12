import React, { useContext, useState } from "react";
import { TIPOS_SOLICITACAO_LISTA_DRE } from "constants/shared";
import { formatarLotesParaVisao } from "helpers/utilities";
import DashboardDRE from ".";
import { Spin } from "antd";
import MeusDadosContext from "context/MeusDadosContext";

export const Container = () => {
  const [visaoPor] = useState([
    {
      nome: "Tipo de Solicitação",
      uuid: "tipo_solicitacao"
    },
    {
      nome: "Lote",
      uuid: "lote"
    }
  ]);
  const [filtroPor] = useState([
    {
      nome: "Sem filtro",
      uuid: "sem_filtro"
    },
    {
      nome: "Semana",
      uuid: "daqui_a_7_dias"
    },
    {
      nome: "Mês",
      uuid: "daqui_a_30_dias"
    }
  ]);

  const [filtroTipoSolicitacao] = useState([
    {
      nome: "Tipo de Solicitação",
      uuid: ""
    },
    {
      nome: "Inclusão de Autorização",
      uuid: "inclusão"
    },
    {
      nome: "Alteração do Tipo de Alimentação",
      uuid: "alteração"
    },
    {
      nome: "Kit Lanche Passeio",
      uuid: "Kit Lanche Passeio"
    },
    {
      nome: "Kit Lanche Passeio Unificado",
      uuid: "Kit Lanche Passeio Unificado"
    },
    {
      nome: "Inversão de dia de Cardápio",
      uuid: "inversão"
    },
    {
      nome: "Suspensão de Alimentação",
      uuid: "suspensão"
    }
  ]);

  const { meusDados } = useContext(MeusDadosContext);

  return (
    <>
      <Spin tip="Carregando..." spinning={!meusDados}>
        {meusDados && (
          <DashboardDRE
            filtroPor={filtroPor}
            filtroPorSolicitacao={filtroTipoSolicitacao}
            visaoPor={visaoPor}
            meusDados={meusDados}
            lotes={
              meusDados &&
              formatarLotesParaVisao(meusDados.vinculo_atual.instituicao.lotes)
            }
            cards={TIPOS_SOLICITACAO_LISTA_DRE}
            tiposSolicitacao={TIPOS_SOLICITACAO_LISTA_DRE}
          />
        )}
      </Spin>
    </>
  );
};
