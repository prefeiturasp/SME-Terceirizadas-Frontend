import React, { useState } from "react";
import { Pagination, Spin } from "antd";
import Filtros from "./components/Filtros";
import ListagemGuias from "./components/ListagemGuias";
import { useEffect } from "react";
import { gerarParametrosConsulta } from "helpers/utilities";
import {
  criarNotificacao,
  getGuiaDetalhe,
  getGuiasNaoNotificadas
} from "services/logistica.service";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import ModalDesvincular from "./components/ModalDesvincular";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { GUIAS_NOTIFICACAO, LOGISTICA } from "configs/constants";
import { useHistory } from "react-router-dom";
import "./styles.scss";
import ModalDetalharGuia from "./components/ModalDetalharGuia";

export default () => {
  const history = useHistory();
  const [carregando, setCarregando] = useState(false);
  const [guias, setGuias] = useState();
  const [filtros, setFiltros] = useState();
  const [page, setPage] = useState();
  const [total, setTotal] = useState();
  const [modal, setModal] = useState(false);
  const [guiasVinculadas, setGuiasVinculadas] = useState([]);
  const [showVinculadas, setShowVinculadas] = useState(false);
  const [empresa, setEmpresa] = useState(null);
  const [guiaModal, setGuiaModal] = useState();

  useEffect(() => {
    if (filtros) {
      buscarGuias(1);
      setPage(1);
      if (filtros.empresa) {
        setEmpresa(filtros.empresa);
      }
    }
  }, [filtros]);

  const buscarGuias = async page => {
    setCarregando(true);

    if (!showVinculadas) {
      const params = gerarParametrosConsulta({ page: page, ...filtros });
      const response = await getGuiasNaoNotificadas(params);
      if (response.data.count) {
        setGuias(response.data.results);
        setTotal(response.data.count);
      } else {
        setTotal(response.data.count);
        setGuias([]);
      }
    } else {
      setGuias(guiasVinculadas.slice((page - 1) * 10, page * 10));
      setTotal(guiasVinculadas.length);
    }

    setCarregando(false);
  };

  const nextPage = page => {
    buscarGuias(page);
    setPage(page);
  };

  const vincularGuia = guia => {
    setGuiasVinculadas([...guiasVinculadas, guia]);
    toastSuccess("Guia Vinculada com sucesso!");
  };

  const desvincularGuia = guia => {
    setGuiasVinculadas(
      guiasVinculadas.filter(g => g.numero_guia !== guia.numero_guia)
    );
    toastSuccess("Guia desvinculada com sucesso!");
    setModal(false);
  };

  const buscarDetalheGuia = async guia => {
    let response;
    try {
      setCarregando(true);
      response = await getGuiaDetalhe(guia.uuid);
      setGuiaModal(response.data);
      setCarregando(false);
    } catch (e) {
      toastError(e.response.data.detail);
      setCarregando(false);
    }
  };

  const salvarNotificacao = async () => {
    const payload = {
      empresa,
      guias: guiasVinculadas.map(guia => guia.uuid)
    };
    const response = await criarNotificacao(payload);
    if (response.status === 201) {
      toastSuccess("Notificação criada com sucesso");
      history.push(`/${LOGISTICA}/${GUIAS_NOTIFICACAO}`);
    }
  };

  const botaoAcao = guia => {
    if (guia && guiasVinculadas.find(g => g.uuid === guia.uuid)) {
      return (
        <Botao
          texto="Excluir Vínculo"
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.GREEN}
          className="ml-3"
          onClick={() => setModal(guia)}
        />
      );
    } else {
      return (
        <Botao
          texto="Vincular Guia"
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.GREEN}
          className="ml-3"
          onClick={() => {
            setGuiaModal(false);
            vincularGuia(guia);
          }}
        />
      );
    }
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <ModalDetalharGuia
        guia={guiaModal}
        handleClose={() => setGuiaModal(false)}
        botaoAcao={botaoAcao}
      />
      <ModalDesvincular
        guia={modal}
        handleClose={() => setModal(false)}
        handleSim={desvincularGuia}
      />
      <div className="card mt-3 card-guias-notificacoes">
        <div className="card-body guias-notificacoes">
          <Filtros
            setFiltros={setFiltros}
            setGuias={setGuias}
            travaEmpresa={guiasVinculadas.length > 0}
            showVinculadas={showVinculadas}
            setShowVinculadas={setShowVinculadas}
          />
          {guias && (
            <>
              <ListagemGuias
                guias={guias}
                guiasVinculadas={guiasVinculadas}
                vincularGuia={vincularGuia}
                desvincularGuia={guia => {
                  setModal(guia);
                }}
                buscarDetalheGuia={buscarDetalheGuia}
              />
              <div className="row">
                <div className="col-12 pb-3">
                  <span className="green-dot mr-1" />
                  {guiasVinculadas.length} Guia(s) já vinculada(s) a
                  notificação.
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <Pagination
                    current={page}
                    total={total}
                    showSizeChanger={false}
                    onChange={nextPage}
                    pageSize={10}
                    className="float-left mb-2"
                  />
                </div>
              </div>
              {total === 0 && (
                <div className="text-center mt-5">
                  Nenhum resultado encontrado
                </div>
              )}
              <div className="mt-4 mb-4">
                <Botao
                  texto="Salvar Rascunho"
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.GREEN}
                  className="float-right ml-3"
                  onClick={salvarNotificacao}
                  disabled={guiasVinculadas.length === 0}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </Spin>
  );
};
