import React, { useContext, useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { getDiretoriaregionalSimplissima } from "services/diretoriaRegional.service";
import { TIPOS_SOLICITACAO_LISTA } from "constants/shared";
import { formatarLotesParaVisao } from "helpers/utilities";
import DashboardCODAE from ".";
import { getLotesSimples } from "services/lote.service";
import { Spin } from "antd";
import MeusDadosContext from "context/MeusDadosContext";

export const Container = () => {
  const [visaoPor] = useState([
    {
      nome: "Tipo de Solicitação",
      uuid: "tipo_solicitacao"
    },
    {
      nome: "DRE",
      uuid: "dre"
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

  const [diretoriasRegionais, setDiretoriasRegionais] = useState(null);
  const [lotes, setLotes] = useState(null);
  const [erro, setErro] = useState("");

  const { meusDados } = useContext(MeusDadosContext);

  const LOADING = !meusDados || !lotes || !diretoriasRegionais;

  const getLotesAsync = async () => {
    const response = await getLotesSimples();
    if (response.status === HTTP_STATUS.OK) {
      setLotes(formatarLotesParaVisao(response.data.results));
    } else {
      setErro("Erro ao carregar lotes");
    }
  };

  const getDiretoriasRegionaisAsync = async () => {
    const response = await getDiretoriaregionalSimplissima();
    if (response.status === HTTP_STATUS.OK) {
      setDiretoriasRegionais(formatarLotesParaVisao(response.data.results));
    } else {
      setErro("Erro ao carregar DREs");
    }
  };

  useEffect(() => {
    getLotesAsync();
    getDiretoriasRegionaisAsync();
  }, []);

  return (
    <>
      {erro && <div>{erro}</div>}
      {!erro && (
        <Spin tip="Carregando..." spinning={LOADING}>
          {!LOADING && (
            <DashboardCODAE
              filtroPor={filtroPor}
              filtroPorSolicitacao={filtroTipoSolicitacao}
              visaoPor={visaoPor}
              meusDados={meusDados}
              lotes={lotes}
              diretoriasRegionais={diretoriasRegionais}
              cards={TIPOS_SOLICITACAO_LISTA}
              tiposSolicitacao={TIPOS_SOLICITACAO_LISTA}
            />
          )}
        </Spin>
      )}
    </>
  );
};
