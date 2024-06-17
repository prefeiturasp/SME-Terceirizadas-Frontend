import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { toastError } from "components/Shareable/Toast/dialogs";
import {
  consultaParametrosClassificacao,
} from "services/parametrosClassificacao.service";
import Tabela from "./componentes/Tabela";
import "./style.scss";
import { CLASSIFICACAO_TIPO } from "./constants";


export default () => {
  const [carregando, setCarregando] = useState(true);
  const [resultado, setResultado] = useState(undefined);

  async function fetchData() {
    try {
    setCarregando(true);
      const respItems = await consultaParametrosClassificacao();
      setResultado(respItems.data.results);
      setCarregando(false);
    } catch (e) {
      setCarregando(false);
      toastError("Erro ao tentar carregar os dados");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const getClassificacaoTipo = (uuid) => {
    return CLASSIFICACAO_TIPO.find(i => i.uuid === uuid);
  }

  return (
    <>
      <div className="card mt-3 card-cadastro-geral p-3">
        <Spin tip="Carregando..." spinning={carregando}>
          {resultado && (
            <Tabela 
              resultado={resultado} 
              tipo={getClassificacaoTipo('CR')} 
              fetchData={fetchData} 
            />              
          )}
        </Spin>
      </div>
      <div className="card mt-3 card-cadastro-geral p-3">
        <Spin tip="Carregando..." spinning={carregando}>
          {resultado && (
            <Tabela 
              resultado={resultado} 
              tipo={getClassificacaoTipo('CS')} 
              fetchData={fetchData} 
            />
          )}
        </Spin>
      </div>
      <div className="card mt-3 card-cadastro-geral p-3">
        <Spin tip="Carregando..." spinning={carregando}>
          {resultado && (
            <Tabela 
              resultado={resultado} 
              tipo={getClassificacaoTipo('AR')} 
              fetchData={fetchData} 
            />
          )}
        </Spin>
      </div>
    </>
  );
};
