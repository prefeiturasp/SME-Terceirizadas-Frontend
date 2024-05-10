import React, { useState } from "react";
import { Form } from "react-final-form";
import { Cabecalho } from "./components/Cabecalho";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import "./styles.scss";
import { ModalCancelaPreenchimento } from "./components/ModalCancelaPreenchimento";
import { ModalSalvarRascunho } from "./components/ModalSalvarRascunho";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import {
  EscolaLabelInterface,
  NovoRelatorioVisitasFormInterface,
} from "./interfaces";

export const NovoRelatorioVisitas = () => {
  const [showModalCancelaPreenchimento, setShowModalCancelaPreenchimento] =
    useState(false);
  const [showModalSalvarRascunho, setShowModalSalvarRascunho] = useState(false);

  const [escolaSelecionada, setEscolaSelecionada] =
    useState<EscolaLabelInterface>();

  const navigate: NavigateFunction = useNavigate();

  const salvarRascunho = async (
    values: NovoRelatorioVisitasFormInterface
  ): Promise<void> => {
    if (!values.escola || !values.data) {
      toastError(
        "Os campos escola e data da visita são obrigatórios para salvar um rascunho."
      );
      return;
    }
    if (!showModalSalvarRascunho) {
      setShowModalSalvarRascunho(true);
      return;
    }
    toastSuccess("Rascunho do Relatório de Fiscalização salvo com sucesso!");
  };

  const onSubmit = async (
    values: NovoRelatorioVisitasFormInterface
  ): Promise<void> => {
    console.log(values);
  };

  return (
    <div className="card novo-relatorio-visitas mt-3">
      <div className="card-body">
        <Form onSubmit={onSubmit}>
          {({ handleSubmit, values, form, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Cabecalho
                values={form.getState().values}
                form={form}
                setEscolaSelecionada={setEscolaSelecionada}
              />
              <div className="row">
                <div className="col-12">
                  <hr />
                </div>
              </div>
              <div className="row float-end mt-4">
                <div className="col-12">
                  <Botao
                    texto="Cancelar"
                    onClick={() => {
                      setShowModalCancelaPreenchimento(true);
                    }}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                  />
                  <Botao
                    texto={
                      values.uuid ? "Atualizar rascunho" : "Salvar rascunho"
                    }
                    className="ms-3"
                    disabled={submitting}
                    onClick={() => salvarRascunho(values)}
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                  />
                </div>
              </div>
              <ModalCancelaPreenchimento
                show={showModalCancelaPreenchimento}
                handleClose={() => setShowModalCancelaPreenchimento(false)}
                form={form}
                navigate={navigate}
              />
              <ModalSalvarRascunho
                show={showModalSalvarRascunho}
                handleClose={() => setShowModalSalvarRascunho(false)}
                values={form.getState().values}
                navigate={navigate}
                salvarRascunho={salvarRascunho}
                escolaSelecionada={escolaSelecionada}
              />
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};
