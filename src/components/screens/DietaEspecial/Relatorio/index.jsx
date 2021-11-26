import React, { useState, useEffect } from "react";
import {
  getDietaEspecial,
  escolaCancelaSolicitacao,
  getDietasEspeciaisVigentesDeUmAluno
} from "services/dietaEspecial.service";
import {
  getProtocoloDietaEspecial,
  getRelatorioDietaEspecial
} from "services/relatorios";
import {
  CODAENegaSolicitacaoCancelamento,
  getMotivosNegarSolicitacaoCancelamento
} from "services/dietaEspecial.service";
import { toastSuccess, toastError } from "components/Shareable/Toast/dialogs";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import HTTP_STATUS from "http-status-codes";
import { ESCOLA, CODAE, TERCEIRIZADA } from "configs/constants";
import { statusEnum } from "constants/shared";
import EscolaCancelaDietaEspecial from "./componentes/EscolaCancelaDietaEspecial";
import "antd/dist/antd.css";
import { cabecalhoDieta, ehSolicitacaoDeCancelamento } from "./helpers";
import CorpoRelatorio from "./componentes/CorpoRelatorio";
import FormAutorizaDietaEspecial from "./componentes/FormAutorizaDietaEspecial";
import ModalNegaDietaEspecial from "./componentes/ModalNegaDietaEspecial";
import ModalMarcarConferencia from "./componentes/ModalMarcarConferencia";
import ModalHistorico from "../../../Shareable/ModalHistorico";
import { Spin } from "antd";
import "./style.scss";
import ModalAvisoDietaImportada from "./componentes/ModalAvisoDietaImportada";

const Relatorio = ({ visao }) => {
  const [dietaEspecial, setDietaEspecial] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [showNaoAprovaModal, setShowNaoAprovaModal] = useState(false);
  const [showModalMarcarConferencia, setShowModalMarcarConferencia] = useState(
    false
  );
  const [showModalAviso, setShowModalAviso] = useState(false);
  const [status, setStatus] = useState(undefined);
  const [mostrarHistorico, setMostrarHistorico] = useState(false);
  const [historico, setHistorico] = useState([]);
  const [card, setCard] = useState(null);
  const [solicitacaoVigenteAtiva, setSolicitacaoVigenteAtiva] = useState(null);

  const dietaCancelada = status ? ehSolicitacaoDeCancelamento(status) : false;
  const tipoUsuario = localStorage.getItem("tipo_perfil");

  const fetchData = uuid => {
    loadSolicitacao(uuid);
  };

  const loadSolicitacao = async uuid => {
    setCarregando(true);
    const responseDietaEspecial = await getDietaEspecial(uuid);
    if (responseDietaEspecial.status === HTTP_STATUS.OK) {
      setDietaEspecial(responseDietaEspecial.data);
      setStatus(responseDietaEspecial.data.status_solicitacao);
      setHistorico(responseDietaEspecial.data.logs);
      await getSolicitacoesVigentes(
        responseDietaEspecial.data.aluno.codigo_eol
      );
      setCarregando(false);
    } else {
      toastError("Houve um erro ao carregar Solicitação");
    }
  };

  const getSolicitacoesVigentes = async codigo_eol => {
    const responseDietasVigentes = await getDietasEspeciaisVigentesDeUmAluno(
      codigo_eol
    );
    if (responseDietasVigentes.status === HTTP_STATUS.OK) {
      setSolicitacaoVigenteAtiva(
        responseDietasVigentes.data.results.slice(0, 1)
      );
    } else {
      toastError("Houve um erro ao carregar Solicitação");
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    const card = urlParams.get("card");
    if (card) {
      setCard(card);
    }
    if (uuid) {
      fetchData(uuid);
    }
  }, []);

  const gerarProtocolo = async (uuid, eh_importado) => {
    if (eh_importado === true) {
      setShowModalAviso(true);
    } else {
      setCarregando(true);
      await getProtocoloDietaEspecial(uuid);
      setCarregando(false);
    }
  };

  const gerarRelatorio = async uuid => {
    setCarregando(true);
    await getRelatorioDietaEspecial(uuid);
    setCarregando(false);
  };

  const BotaoAutorizaCancelamento = ({ uuid, onAutorizar, setCarregando }) => {
    return (
      <div className="form-group row float-right mt-4">
        <Botao
          texto="Autorizar"
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.GREEN}
          className="ml-3"
          onClick={() => {
            setCarregando(true);
            escolaCancelaSolicitacao(uuid).then(() => {
              onAutorizar();
              toastSuccess(
                "Autorização do Cancelamento realizada com sucesso!"
              );
            });
          }}
        />
      </div>
    );
  };

  const BotaoImprimir = ({ uuid }) => {
    return (
      <Botao
        title="botao_imprimir"
        type={BUTTON_TYPE.BUTTON}
        style={BUTTON_STYLE.GREEN}
        icon={BUTTON_ICON.PRINT}
        className="float-right botaoImprimirDieta"
        onClick={() => gerarRelatorio(uuid)}
      />
    );
  };

  const BotaoMarcarConferencia = () => {
    return (
      <Botao
        texto="Marcar Conferência"
        type={BUTTON_TYPE.BUTTON}
        style={BUTTON_STYLE.GREEN}
        className="ml-3"
        onClick={() => {
          setShowModalMarcarConferencia(true);
        }}
      />
    );
  };

  const BotaoGerarProtocolo = ({ uuid, eh_importado }) => {
    return (
      <div className="form-group float-right mt-4">
        <Botao
          texto="Gerar Protocolo"
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.GREEN_OUTLINE}
          icon={BUTTON_ICON.PRINT}
          className="ml-3"
          onClick={() => {
            gerarProtocolo(uuid, eh_importado);
          }}
        />
      </div>
    );
  };

  const getHistorico = () => {
    return historico;
  };

  const showModalHistorico = () => {
    setMostrarHistorico(true);
  };

  const handleOk = () => {
    setMostrarHistorico(false);
  };

  const handleCancel = () => {
    setMostrarHistorico(false);
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      {dietaEspecial && status && (
        <span className="page-title">
          {cabecalhoDieta(dietaEspecial, card)}
        </span>
      )}
      <div className="card mt-3">
        <div className="card-body">
          <div className="row">
            <div className="col-12 mb-3" style={{ alignItems: "flex-end" }}>
              {dietaEspecial && <BotaoImprimir uuid={dietaEspecial.uuid} />}
              {dietaEspecial && historico && (
                <Botao
                  type={BUTTON_TYPE.BUTTON}
                  texto="Histórico"
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                  onClick={showModalHistorico}
                  className="mr-2 float-left"
                />
              )}
            </div>
          </div>
          {historico.length > 0 && (
            <>
              <ModalHistorico
                visible={mostrarHistorico}
                onOk={handleOk}
                onCancel={handleCancel}
                logs={historico}
                getHistorico={getHistorico}
              />
            </>
          )}
          {dietaEspecial && (
            <>
              <CorpoRelatorio
                dietaEspecial={dietaEspecial}
                dietaCancelada={dietaCancelada}
                card={card}
                solicitacaoVigenteAtiva={solicitacaoVigenteAtiva}
              />
              {status === statusEnum.CODAE_A_AUTORIZAR &&
                visao === ESCOLA &&
                !dietaCancelada &&
                dietaEspecial.tipo_solicitacao !== "ALTERACAO_UE" &&
                tipoUsuario !== '"gestao_alimentacao_terceirizada"' && (
                  <EscolaCancelaDietaEspecial
                    uuid={dietaEspecial.uuid}
                    onCancelar={() => loadSolicitacao(dietaEspecial.uuid)}
                  />
                )}
            </>
          )}
          {status === statusEnum.CODAE_A_AUTORIZAR && visao === CODAE && (
            <FormAutorizaDietaEspecial
              dietaEspecial={dietaEspecial}
              onAutorizarOuNegar={() => loadSolicitacao(dietaEspecial.uuid)}
              visao={visao}
              setTemSolicitacaoCadastroProduto={() =>
                setDietaEspecial({
                  ...dietaEspecial,
                  tem_solicitacao_cadastro_produto: true
                })
              }
            />
          )}

          {dietaEspecial &&
            status === statusEnum.ESCOLA_SOLICITOU_INATIVACAO &&
            visao === CODAE && [
              <BotaoAutorizaCancelamento
                key={0}
                uuid={dietaEspecial.uuid}
                showNaoAprovaModal={showNaoAprovaModal}
                onAutorizar={() => {
                  loadSolicitacao(dietaEspecial.uuid);
                }}
                setCarregando={setCarregando}
              />,
              <div className="form-group row float-right mt-4 mr-3" key={1}>
                <Botao
                  texto="Negar"
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.RED}
                  className="ml-3"
                  onClick={() => setShowNaoAprovaModal(true)}
                />
              </div>
            ]}
          {dietaEspecial &&
            visao === TERCEIRIZADA &&
            (status === statusEnum.CODAE_AUTORIZADO || dietaCancelada) && (
              <div className="form-group float-right mt-4">
                {dietaEspecial.conferido ? (
                  <label className="ml-3 conferido">
                    <i className="fas fa-check mr-2" />
                    Solicitação Conferida
                  </label>
                ) : (
                  <BotaoMarcarConferencia uuid={dietaEspecial.uuid} />
                )}
              </div>
            )}
          {dietaEspecial &&
            status === statusEnum.CODAE_AUTORIZADO &&
            card !== "inativas-temp" && (
              <BotaoGerarProtocolo
                uuid={dietaEspecial.uuid}
                eh_importado={dietaEspecial.eh_importado}
              />
            )}
        </div>
      </div>
      {dietaEspecial && (
        <ModalNegaDietaEspecial
          showModal={showNaoAprovaModal}
          closeModal={() => setShowNaoAprovaModal(false)}
          onNegar={() => {
            loadSolicitacao(dietaEspecial.uuid);
          }}
          uuid={dietaEspecial.uuid}
          getMotivos={() => getMotivosNegarSolicitacaoCancelamento()}
          submitModal={(uuid, values) =>
            CODAENegaSolicitacaoCancelamento(uuid, values)
          }
          fieldJustificativa={"justificativa"}
          tituloModal={"Deseja negar a solicitação de cancelamento?"}
        />
      )}
      {dietaEspecial && (
        <ModalMarcarConferencia
          showModal={showModalMarcarConferencia}
          closeModal={() => setShowModalMarcarConferencia(false)}
          onMarcarConferencia={() => {
            loadSolicitacao(dietaEspecial.uuid);
          }}
          uuid={dietaEspecial.uuid}
        />
      )}
      <ModalAvisoDietaImportada
        closeModal={() => setShowModalAviso(false)}
        showModal={showModalAviso}
      />
    </Spin>
  );
};

export default Relatorio;
