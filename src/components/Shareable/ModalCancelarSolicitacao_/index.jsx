import React, { useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { Modal } from "react-bootstrap";
import { Field } from "react-final-form";
import Botao from "../Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../Botao/constants";
import MultiSelect from "../FinalForm/MultiSelect";
import { TextArea } from "../TextArea/TextArea";
import { toastError, toastSuccess } from "../Toast/dialogs";
import { textAreaRequired } from "../../../helpers/fieldValidators";
import { mensagemCancelamento } from "../../../helpers/utilities";
import { TIPOS_SOLICITACAO_LABEL } from "constants/shared";
import { DRE } from "configs/constants";
import { OnChange } from "react-final-form-listeners";

const ModalCancelarSolicitacao = ({
  showModal,
  closeModal,
  uuid,
  solicitacao,
  visao,
  endpoint,
  tipoSolicitacao,
  loadSolicitacao,
}) => {
  const [justificativa, setJustificativa] = useState("");
  const [escolasSelecionadas, setEscolasSelecionadas] = useState([]);

  const optionsMultiselect = () =>
    solicitacao.escolas_quantidades
      .filter((eq) => !eq.cancelado)
      .map((eq) => ({
        label: eq.escola.nome,
        value: eq.escola.uuid,
      }));

  const desabilitarBotaoSim = (
    justificativa,
    escolasSelecionadas,
    visao,
    solicitacao
  ) => {
    if (
      solicitacao &&
      solicitacao.tipo === TIPOS_SOLICITACAO_LABEL.SOLICITACAO_UNIFICADA &&
      visao === DRE
    ) {
      return (
        justificativa === "" ||
        justificativa === undefined ||
        escolasSelecionadas.length === 0
      );
    } else {
      return justificativa === "" || justificativa === undefined;
    }
  };

  const cancelarSolicitacaoDaEscola = async (uuid) => {
    let resp = "";
    let mensagem = "Solicitação cancelada com sucesso!";
    if (
      solicitacao.tipo === TIPOS_SOLICITACAO_LABEL.SOLICITACAO_UNIFICADA &&
      visao === DRE
    ) {
      mensagem = "Unidade(s) cancelada(s) com sucesso!";
    }
    resp = await endpoint(
      uuid,
      justificativa,
      tipoSolicitacao,
      escolasSelecionadas
    );
    if (resp.status === HTTP_STATUS.OK) {
      closeModal();
      toastSuccess(mensagem);
      if (loadSolicitacao) loadSolicitacao(uuid, tipoSolicitacao);
    } else {
      closeModal();
      toastError(resp.data ? resp.data.detail : resp.detail);
    }
  };

  return (
    <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Cancelamento de Solicitação</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-row">
          <div className="row">
            <div className="col-12">
              <p className="label--red pl-1">
                {solicitacao &&
                  mensagemCancelamento(solicitacao.status, solicitacao.tipo)}
                Deseja seguir em frente com o cancelamento?
              </p>
            </div>
          </div>
          <div className="form-group col-12">
            {solicitacao &&
            solicitacao.tipo ===
              TIPOS_SOLICITACAO_LABEL.SOLICITACAO_UNIFICADA &&
            visao === DRE ? (
              <div className="col-6 pl-0 mb-2">
                <div className="mb-2">
                  <span className="label--red">* </span>
                  Selecione a(s) unidade(s) para solicitar o cancelamento:
                </div>
                <Field
                  component={MultiSelect}
                  name="escolas"
                  options={optionsMultiselect() || []}
                  onChange={(values) => setEscolasSelecionadas(values)}
                  disableSearch={true}
                  pluralFeminino
                  overrideStrings={{
                    selectSomeItems: "Selecione as unidades educacionais",
                    allItemsAreSelected: "Todas as unidades estão selecionadas",
                    selectAll: "Todas",
                  }}
                  nomeDoItemNoPlural="unidades educacionais"
                  required
                />
              </div>
            ) : null}
            <Field
              required
              component={TextArea}
              placeholder="Obrigatório"
              label="Justificativa"
              name="justificativa"
              validate={textAreaRequired}
            />
            <OnChange name="justificativa">
              {(value) => setJustificativa(value)}
            </OnChange>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Botao
          texto="Não"
          type={BUTTON_TYPE.BUTTON}
          onClick={closeModal}
          style={BUTTON_STYLE.GREEN_OUTLINE}
          className="ml-3"
        />
        <Botao
          texto="Sim"
          type={BUTTON_TYPE.BUTTON}
          onClick={() => {
            cancelarSolicitacaoDaEscola(uuid);
          }}
          style={BUTTON_STYLE.GREEN}
          disabled={desabilitarBotaoSim(
            justificativa,
            escolasSelecionadas,
            visao,
            solicitacao
          )}
          className="ml-3"
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCancelarSolicitacao;
