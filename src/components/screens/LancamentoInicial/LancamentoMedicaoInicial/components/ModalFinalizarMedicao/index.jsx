import React, { useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { Radio } from "antd";
import { Modal } from "react-bootstrap";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import InputFile from "components/Shareable/Input/InputFile";
import { Field, Form } from "react-final-form";
import { OPCOES_AVALIACAO_A_CONTENTO } from "../LancamentoPorPeriodo/helpers";
import { updateSolicitacaoMedicaoInicial } from "services/medicaoInicial/solicitacaoMedicaoInicial.service";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";

export const ModalFinalizarMedicao = ({ ...props }) => {
  const {
    showModal,
    closeModal,
    escolaInstituicao,
    solicitacaoMedicaoInicial,
    setObjSolicitacaoMIFinalizada,
    onClickInfoBasicas
  } = props;

  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
  const [disableFinalizarMedicao, setDisableFinalizarMedicao] = useState(true);
  const [showButtonAnexarPlanilha, setShowButtonAnexarPlanilha] = useState(
    false
  );
  const [arquivo, setArquivo] = useState([]);

  const handleOnChange = event => {
    if (opcaoSelecionada === OPCOES_AVALIACAO_A_CONTENTO.NAO_COM_OCORRENCIAS) {
      setArquivo([]);
    }
    if (
      event.target.value === OPCOES_AVALIACAO_A_CONTENTO.SIM_SEM_OCORRENCIAS
    ) {
      setDisableFinalizarMedicao(false);
      setShowButtonAnexarPlanilha(false);
    } else {
      arquivo.length === 0 && setDisableFinalizarMedicao(true);
      event.target.value === OPCOES_AVALIACAO_A_CONTENTO.NAO_COM_OCORRENCIAS &&
        setShowButtonAnexarPlanilha(true);
    }
    setOpcaoSelecionada(event.target.value);
  };

  const handleHideModal = () => {
    setOpcaoSelecionada(null);
    setDisableFinalizarMedicao(true);
    setShowButtonAnexarPlanilha(false);
    setArquivo([]);
    closeModal();
  };

  const removeFile = () => {
    setArquivo([]);
    setDisableFinalizarMedicao(true);
  };

  const setFiles = files => {
    let arquivos = arquivo;
    arquivos = files;
    setArquivo(arquivos);
    setDisableFinalizarMedicao(false);
  };

  const handleFinalizarMedicao = async () => {
    let data = new FormData();
    data.append("escola", String(escolaInstituicao.uuid));
    data.append(
      "tipo_contagem_alimentacoes",
      String(solicitacaoMedicaoInicial.tipo_contagem_alimentacoes.uuid)
    );
    data.append(
      "responsaveis",
      JSON.stringify(solicitacaoMedicaoInicial.responsaveis)
    );
    data.append("com_ocorrencias", String(!opcaoSelecionada));

    if (!opcaoSelecionada) {
      data.append(
        "anexo",
        JSON.stringify({
          nome: String(arquivo[0].nome),
          base64: String(arquivo[0].arquivo)
        })
      );
    }

    const response = await updateSolicitacaoMedicaoInicial(
      solicitacaoMedicaoInicial.uuid,
      data
    );
    if (response.status === HTTP_STATUS.OK) {
      toastSuccess("Solicitação de Medição Inicial Finalizada com sucesso!");
      setObjSolicitacaoMIFinalizada(response.data);
      handleHideModal();
    } else {
      toastError("Não foi possível finalizar as alterações!");
    }
    onClickInfoBasicas();
  };

  return (
    <Modal
      dialogClassName="modal-50w"
      show={showModal}
      onHide={() => handleHideModal()}
    >
      <Modal.Header closeButton>
        <Modal.Title>Avaliação do Serviço</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col">
            <p className="ml-2">
              Neste mês, a direção da Unidade Educacional considera que o
              serviço foi realizado a contento?
            </p>
          </div>
        </div>
        <div className="row">
          <Radio.Group
            onChange={event => handleOnChange(event)}
            value={opcaoSelecionada}
          >
            <Radio
              className="radio-opt-positive"
              value={OPCOES_AVALIACAO_A_CONTENTO.SIM_SEM_OCORRENCIAS}
            >
              Sim, sem ocorrências
            </Radio>
            <Radio
              className="radio-opt-negative"
              value={OPCOES_AVALIACAO_A_CONTENTO.NAO_COM_OCORRENCIAS}
            >
              Não, com ocorrências
            </Radio>
          </Radio.Group>
        </div>
        {showButtonAnexarPlanilha && (
          <div className="row ml-2 mt-4 mb-2 anexo-planilha">
            <Form
              onSubmit={() => {}}
              render={() => (
                <Field
                  component={InputFile}
                  className="inputfile"
                  texto="Anexar planilha de ocorrências"
                  name="file"
                  accept=".xls, .xlsx"
                  setFiles={setFiles}
                  removeFile={removeFile}
                  toastSuccess={"Planilha de ocorrências anexada com sucesso!"}
                  ehPlanilhaMedicaoInicial={true}
                  disabled={arquivo.length > 0}
                />
              )}
            />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="row">
          <div className="col-12">
            <Botao
              texto="Cancelar"
              type={BUTTON_TYPE.BUTTON}
              onClick={() => handleHideModal()}
              style={BUTTON_STYLE.GREEN_OUTLINE_WHITE}
              className="ml-3"
            />
            <Botao
              texto="Finalizar Medição"
              type={BUTTON_TYPE.BUTTON}
              onClick={() => handleFinalizarMedicao()}
              style={BUTTON_STYLE.GREEN}
              className="ml-3"
              disabled={disableFinalizarMedicao}
            />
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
