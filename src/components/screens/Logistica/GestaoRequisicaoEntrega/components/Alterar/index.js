import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Botao from "components/Shareable/Botao";
import { Button } from "react-bootstrap";
import MultiSelect from "components/Shareable/FinalForm/MultiSelect";
import { Field, Form } from "react-final-form";
import { getConsolidadoAlimentos } from "services/logistica.service";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import { requiredMultiselectKhan } from "helpers/fieldValidators";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import { distribuidorAltera } from "services/logistica.service";
import ConfirmarEnvio from "./ConfirmarEnvio";
import { Spin } from "antd";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import "./styles.scss";

export default ({ solicitacao, updatePage }) => {
  const [show, setShow] = useState(false);
  const [showConfirmarEnvio, setShowConfirmarEnvio] = useState(false);
  const [alimentosConsolidado, setAlimentosConsolidado] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (!alimentosConsolidado) getAlimentos();
    setShow(true);
  };

  const getAlimentos = () => {
    getConsolidadoAlimentos(solicitacao.uuid).then(res => {
      setAlimentosConsolidado(res.data);
    });
  };

  const isDisabled = () => {
    if (solicitacao.status === "Enviada" || solicitacao.status === "Confirmada")
      return false;
    return true;
  };

  const onSubmit = async values => {
    const payload = { ...values };
    payload.requisicao = solicitacao.uuid;
    const res = await distribuidorAltera(payload);
    if (res.status === 201) {
      setShowConfirmarEnvio(false);
      handleClose();
      toastSuccess("Solicitação enviada para análise da CODAE.");
      updatePage();
    } else {
      toastError("Houve um erro ao solicitar a alteração de requisição.");
    }
  };

  return (
    <>
      <Button
        className="acoes alterar"
        onClick={handleShow}
        variant="link"
        disabled={isDisabled()}
      >
        <i className="fas fa-sync-alt alterar" /> Alterar
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="custom-modal-size"
      >
        <Modal.Header closeButton>
          <Modal.Title> Alterar </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Confira a visão geral da solicitação:{" "}
          <b>{solicitacao.numero_solicitacao}</b>.
          <label className="float-right">
            Data de entrega: <b>{solicitacao.guias[0].data_entrega}</b>
          </label>
          <div className="text-center">
            <Spin
              tip="Carregando alimentos..."
              spinning={!alimentosConsolidado}
            />
          </div>
          {alimentosConsolidado && (
            <table className="table table-bordered table-consolidado-alimentos mt-3">
              <thead>
                <tr>
                  <th scope="col">Alimento</th>
                  <th scope="col">Total de embalagens</th>
                  <th scope="col">Peso total</th>
                </tr>
              </thead>
              <tbody>
                {alimentosConsolidado.map(item => (
                  <>
                    <tr>
                      <td>{item.nome_alimento}</td>
                      <td>
                        {item.total_embalagens.map(item => (
                          <>
                            {item.qtd_volume} {item.descricao_embalagem}.{" "}
                            {item.peso_embalagem}
                            {item.unidade_medida}
                            <br />
                          </>
                        ))}
                      </td>
                      <td>
                        {item.peso_total}
                        {item.total_embalagens[0].unidade_medida}
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          )}
          <Form
            onSubmit={onSubmit}
            subscription={{ submitting: true, values: true }}
            validate={values => {
              const errors = {};
              if (
                values.motivo &&
                values.motivo.includes("OUTROS") &&
                !values.justificativa
              ) {
                errors.justificativa = "Campo obrigatório";
              }
              return errors;
            }}
            render={({ handleSubmit, form, values }) => {
              return (
                <>
                  <form
                    onSubmit={handleSubmit}
                    className="filtros-alterar-req-logistica"
                  >
                    <div className="row">
                      <div className="col">
                        <Field
                          label="Motivo"
                          component={MultiSelect}
                          disableSearch
                          name="motivo"
                          multiple
                          nomeDoItemNoPlural="classificações"
                          pluralFeminino
                          required
                          validate={requiredMultiselectKhan}
                          options={[
                            {
                              value: "ALTERAR_DATA_ENTREGA",
                              label: "Alterar data de entrega"
                            },
                            {
                              value: "ALTERAR_QTD_ALIMENTO",
                              label: "Alterar quantidade de alimento"
                            },
                            {
                              value: "ALTERAR_ALIMENTO",
                              label: "Alterar alimento"
                            },
                            { value: "OUTROS", label: "Outros" }
                          ]}
                        />
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col">
                        <Field
                          component={TextArea}
                          label="Justificativa"
                          name="justificativa"
                          required={
                            values.motivo && values.motivo.includes("OUTROS")
                              ? true
                              : false
                          }
                        />
                      </div>
                    </div>
                    <br />

                    <div className="row mb-3">
                      <div className="col">
                        <ConfirmarEnvio
                          show={showConfirmarEnvio}
                          setShow={setShowConfirmarEnvio}
                          form={form}
                        />
                        <Botao
                          texto="Voltar"
                          type={BUTTON_TYPE.BUTTON}
                          onClick={handleClose}
                          style={BUTTON_STYLE.GREEN_OUTLINE}
                          className="float-right ml-3"
                        />
                      </div>
                    </div>
                  </form>
                </>
              );
            }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
