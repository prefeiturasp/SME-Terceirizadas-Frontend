import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { getFiltros } from "services/alunosMatriculados.service";
import { formataOpcoes } from "./helpers";
import { Filtros } from "./componentes/Filtros";
import { Spin } from "antd";
import { toastError } from "components/Shareable/Toast/dialogs";

export const AlunosMatriculados = () => {
  const [carregando, setCarregando] = useState(true);
  const [listaOpcoes, setListaOpcoes] = useState(undefined);
  const [dres, setDres] = useState([]);
  const [lotes, setLotes] = useState([]);
  const [tiposUnidades, setTiposUnidades] = useState([]);
  const [unidadesEducacionais, setUnidadesEducacionais] = useState([]);

  const getOpcoesFiltros = async () => {
    const response = await getFiltros();
    if (response.status === HTTP_STATUS.OK) {
      setListaOpcoes(response.data);
      setLotes(formataOpcoes(response.data.lotes));
      setDres(formataOpcoes(response.data.diretorias_regionais));
      setTiposUnidades(formataOpcoes(response.data.tipos_unidade_escolar));
      setUnidadesEducacionais(formataOpcoes(response.data.escolas));
    } else {
      toastError("Erro ao carregar filtros.");
    }
    setCarregando(false);
  };

  useEffect(() => {
    getOpcoesFiltros();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card relatorio-solicitacoes-alimentacao mt-3">
      <div className="card-body">
        <Spin tip="Carregando..." spinning={carregando}>
          <Filtros
            dres={dres}
            lotes={lotes}
            tiposUnidades={tiposUnidades}
            unidadesEducacionais={unidadesEducacionais}
            listaOpcoes={listaOpcoes}
          />
        </Spin>
      </div>
    </div>
  );
};
