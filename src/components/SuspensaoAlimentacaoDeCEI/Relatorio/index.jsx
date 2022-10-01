import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { getSuspensaoAlimentacaoCEI } from "services/suspensaoAlimentacaoCei.service";
import CorpoRelatorio from "./components/CorpoRelatorio";
import ModalCancelaSuspensao from "./components/ModalCancelaSuspensao";
import { usuarioEhEscola } from "helpers/utilities";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import Botao from "components/Shareable/Botao";
import "./style.scss";

export default () => {
  const [carregando, setCarregando] = useState(true);
  const [solicitacaoSuspensao, setSolicitacaoSuspensao] = useState(undefined);
  const [showModal, setShowModal] = useState(false);

  async function fetchData() {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) {
      await getSuspensaoAlimentacaoCEI(uuid).then(response => {
        setSolicitacaoSuspensao(response.data);
      });
    }
    setCarregando(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <span className="page-title">{`Suspensão de Alimentação - Solicitação # ${
        solicitacaoSuspensao ? solicitacaoSuspensao.id_externo : ""
      }`}</span>
      <div className="card mt-3 card-relatorio-suspensao pl-3 pr-3">
        <div className="card-body">
          {solicitacaoSuspensao && (
            <CorpoRelatorio solicitacaoSuspensao={solicitacaoSuspensao} />
          )}
          {solicitacaoSuspensao &&
            usuarioEhEscola() &&
            solicitacaoSuspensao.status !== "ESCOLA_CANCELOU" && (
              <>
                {" "}
                <div className="row">
                  <div className="col-12 text-right">
                    <Botao
                      texto="Cancelar"
                      onClick={() => setShowModal(true)}
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                    />
                  </div>
                </div>
                <ModalCancelaSuspensao
                  showModal={showModal}
                  closeModal={() => setShowModal(false)}
                  setSolicitacaoSuspensao={setSolicitacaoSuspensao}
                  uuid={solicitacaoSuspensao.uuid}
                />
              </>
            )}
        </div>
      </div>
    </Spin>
  );
};
