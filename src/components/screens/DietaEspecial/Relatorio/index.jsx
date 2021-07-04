import React, { useState, useEffect } from "react";
import {
  getDietaEspecial,
  escolaCancelaSolicitacao
} from "services/dietaEspecial.service";
import { getProtocoloDietaEspecial } from "services/relatorios";
import { toastSuccess, toastError } from "components/Shareable/Toast/dialogs";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import HTTP_STATUS from "http-status-codes";
import { ESCOLA, CODAE } from "configs/constants";
import { statusEnum } from "constants/shared";
import "antd/dist/antd.css";
import { cabecalhoDieta } from "./helpers";
import CorpoRelatorio from "./componentes/CorpoRelatorio";
import EscolaCancelaDietaEspecial from "./componentes/EscolaCancelaDietaEspecial";
import FormAutorizaDietaEspecial from "./componentes/FormAutorizaDietaEspecial";
import ModalNegaDietaEspecial from "./componentes/ModalNegaDietaEspecial";
import { Spin } from "antd";
import "./style.scss";

const Relatorio = ({ visao }) => {
  const [dietaEspecial, setDietaEspecial] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [showNaoAprovaModal, setShowNaoAprovaModal] = useState(false);
  const [status, setStatus] = useState(undefined);

  const fetchData = uuid => {
    loadSolicitacao(uuid);
  };

  const loadSolicitacao = async uuid => {
    setCarregando(true);
    const responseDietaEspecial = await getDietaEspecial(uuid);
    if (responseDietaEspecial.status === HTTP_STATUS.OK) {
      setDietaEspecial(responseDietaEspecial.data);
      setStatus(responseDietaEspecial.data.status_solicitacao);
      setCarregando(false);
    } else {
      toastError("Houve um erro ao carregar Solicitação");
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) {
      fetchData(uuid);
    }
  }, []);

  const gerarProtocolo = async uuid => {
    setCarregando(true);
    await getProtocoloDietaEspecial(uuid);
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

  const BotaoGerarRelatorio = ({ uuid }) => {
    return (
      <div className="row">
        <div className="col-12">
          <Botao
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.GREEN}
            icon={BUTTON_ICON.PRINT}
            className="ml-3 float-right mt-4"
            onClick={() => gerarProtocolo(uuid)}
          />
        </div>
      </div>
    );
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      {dietaEspecial && status && (
        <span className="page-title">{cabecalhoDieta(dietaEspecial)}</span>
      )}
      <div className="card mt-3">
        <div className="card-body">
          {dietaEspecial && status === statusEnum.CODAE_AUTORIZADO && (
            <BotaoGerarRelatorio uuid={dietaEspecial.uuid} />
          )}
          {dietaEspecial && (
            <>
              <CorpoRelatorio dietaEspecial={dietaEspecial} />
              {status === statusEnum.CODAE_A_AUTORIZAR && visao === ESCOLA && (
                <EscolaCancelaDietaEspecial
                  uuid={dietaEspecial.uuid}
                  onCancelar={() => loadSolicitacao(dietaEspecial.uuid)}
                />
              )}
            </>
          )}
          {dietaEspecial &&
            status === statusEnum.CODAE_A_AUTORIZAR &&
            visao === CODAE && (
              <FormAutorizaDietaEspecial
                dietaEspecial={dietaEspecial}
                onAutorizarOuNegar={() => loadSolicitacao(dietaEspecial.uuid)}
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
            visao === CODAE && (
              <BotaoAutorizaCancelamento
                uuid={dietaEspecial.uuid}
                showNaoAprovaModal={showNaoAprovaModal}
                onAutorizar={() => {
                  loadSolicitacao(dietaEspecial.uuid);
                }}
                setCarregando={setCarregando}
              />
            )}
        </div>
      </div>
      {dietaEspecial && (
        <ModalNegaDietaEspecial
          showModal={showNaoAprovaModal}
          closeModal={setShowNaoAprovaModal}
          onNegar={() => {
            loadSolicitacao(dietaEspecial.uuid);
          }}
          uuid={dietaEspecial.uuid}
        />
      )}
    </Spin>
  );
};

export default Relatorio;
