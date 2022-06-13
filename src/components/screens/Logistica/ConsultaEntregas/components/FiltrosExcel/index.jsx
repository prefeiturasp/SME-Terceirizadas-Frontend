import React, { useState, useEffect, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import { Spin } from "antd";
import { gerarParametrosConsulta } from "helpers/utilities";
import {
  gerarExcelEntregas,
  imprimirGuiasDaSolicitacao
} from "services/logistica.service.js";
import { Switch, Checkbox } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import { STATUS_GUIA } from "../../../../const.js";
import { toastError } from "components/Shareable/Toast/dialogs";
import { CentralDeDownloadContext } from "context/CentralDeDownloads";

export default ({ solicitacao, excel, pdf, showModal }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [conferidas, setConferidas] = useState(false);
  const [insucesso, setInsucesso] = useState(false);
  const [pendentes, setPendentes] = useState(false);
  const [recebidas, setRecebidas] = useState(false);
  const [parciais, setParciais] = useState(false);
  const [naoRecebidas, setNaoRecebidas] = useState(false);
  const [repoParcial, setRepoParcial] = useState(false);
  const [repoTotal, setRepoTotal] = useState(false);

  const centralDownloadContext = useContext(CentralDeDownloadContext);

  const handleDownload = () => {
    setLoading(true);
    let uuid = solicitacao.uuid;
    let payload = montaPayload(uuid);
    if (excel) {
      const params = gerarParametrosConsulta({ uuid, ...payload });
      gerarExcelEntregas(params)
        .then(() => {
          setLoading(false);
          handleClose();
        })
        .catch(error => {
          error.response.data.text().then(text => toastError(text));
          setLoading(false);
        });
    } else if (pdf) {
      const params = gerarParametrosConsulta(payload);
      imprimirGuiasDaSolicitacao(uuid, params)
        .then(() => {
          showModal(true);
          setLoading(false);
          handleClose();
          centralDownloadContext.getQtdeDownloadsNaoLidas();
        })
        .catch(error => {
          error.response.data.text().then(text => toastError(text));
          setLoading(false);
        });
    }
  };

  const montaPayload = () => {
    let status_guia = [];
    let tem_insucesso = insucesso;
    let tem_conferencia = conferidas || pendentes;

    if (pendentes) status_guia.push(STATUS_GUIA.PENDENTE);
    if (recebidas) status_guia.push(STATUS_GUIA.RECEBIDA);
    if (parciais) status_guia.push(STATUS_GUIA.PARCIAL);
    if (naoRecebidas) status_guia.push(STATUS_GUIA.NAO_RECEBIDO);
    if (repoParcial) status_guia.push(STATUS_GUIA.REPOSICAO_PARCIAL);
    if (repoTotal) status_guia.push(STATUS_GUIA.REPOSICAO_TOTAL);

    // Caso especifico para onde o usuário não marca nenhuma opção
    if (!tem_insucesso && !tem_conferencia) {
      tem_insucesso = true;
      tem_conferencia = true;
      status_guia = [
        STATUS_GUIA.PENDENTE,
        STATUS_GUIA.RECEBIDA,
        STATUS_GUIA.PARCIAL,
        STATUS_GUIA.NAO_RECEBIDO,
        STATUS_GUIA.REPOSICAO_TOTAL,
        STATUS_GUIA.REPOSICAO_PARCIAL
      ];
    }

    return { status_guia, tem_conferencia, tem_insucesso };
  };

  const handleClose = () => {
    setShow(false);
    desligaTodosFiltros();
  };
  const handleShow = () => setShow(true);

  const desligaTodosFiltros = () => {
    desligaConferidas();
    setInsucesso(false);
    setPendentes(false);
  };

  const desligaConferidas = () => {
    setConferidas(false);
    setRecebidas(false);
    setParciais(false);
    setNaoRecebidas(false);
    setRepoParcial(false);
    setRepoTotal(false);
  };

  const validaCampos = () => {
    return (
      conferidas &&
      (!recebidas && !parciais && !naoRecebidas && !repoParcial && !repoTotal)
    );
  };

  useEffect(() => {
    if (!conferidas) {
      desligaConferidas();
    }
  }, [conferidas]);

  return (
    <>
      {excel && (
        <Button className="acoes" variant="link" onClick={() => handleShow()}>
          <i className="fas fa-file-excel green" />
          <span className="link-exportar">Planilha</span>
        </Button>
      )}

      {pdf && (
        <Button className="acoes" variant="link" onClick={() => handleShow()}>
          <i className="fas fa-file-pdf red" />
          <span className="link-exportar">PDF</span>
        </Button>
      )}

      <Modal show={show} onHide={handleClose} dialogClassName="modal-entregas">
        <Spin tip="Carregando..." spinning={loading}>
          <Modal.Header closeButton>
            <Modal.Title>
              Exportar Relatório com seguintes status de Guia de Remessa
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="switch-container">
              <div className="switch-box">
                <div className="switch-label">Guias Conferidas</div>
                <Switch onChange={() => setConferidas(!conferidas)} />
              </div>
              <div className="switch-box">
                <div className="switch-label">Guias Insucesso</div>
                <Switch onChange={() => setInsucesso(!insucesso)} />
              </div>
              <div className="switch-box">
                <div className="switch-label">Guias Pendentes</div>
                <Switch onChange={() => setPendentes(!pendentes)} />
              </div>
            </div>

            {conferidas && (
              <div className="checkbox-container">
                <div className="checkbox-title">
                  Escolha os tipos de guias conferidas
                </div>
                <Checkbox onChange={() => setRecebidas(!recebidas)}>
                  Recebidas
                </Checkbox>
                <Checkbox onChange={() => setParciais(!parciais)}>
                  Parciais
                </Checkbox>
                <Checkbox onChange={() => setNaoRecebidas(!naoRecebidas)}>
                  Não Recebidas
                </Checkbox>
                <Checkbox onChange={() => setRepoParcial(!repoParcial)}>
                  Reposição Parcial
                </Checkbox>
                <Checkbox onChange={() => setRepoTotal(!repoTotal)}>
                  Reposição Total
                </Checkbox>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Botao
              texto="Exportar"
              type={BUTTON_TYPE.BUTTON}
              style={BUTTON_STYLE.GREEN}
              className="ml-3"
              onClick={handleDownload}
              disabled={validaCampos()}
            />
          </Modal.Footer>
        </Spin>
      </Modal>
    </>
  );
};
