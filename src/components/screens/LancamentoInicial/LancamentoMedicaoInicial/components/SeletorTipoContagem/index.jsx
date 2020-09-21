import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";

import { Select } from "components/Shareable/Select";
import { getTiposDeContagem } from "services/dietaEspecial.service";

import "./styles.scss";
import { OK } from "http-status-codes";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import { updateEscolaSimples } from "services/escola.service";

import "./styles.scss";

export default ({ escola }) => {
  const [tiposDeContagem, setTiposDeContagem] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const onFormUpdate = async formValues => {
    setSubmitting(true);
    const resposta = await updateEscolaSimples(escola.uuid, formValues);
    setSubmitting(false);
    if (resposta.status === OK) {
      toastSuccess("Tipo de contagem atualizado!");
    } else {
      toastError("Erro ao atualizar o tipo de contagem");
      setError(true);
    }
  };

  useEffect(() => {
    async function fetch() {
      const response = await getTiposDeContagem();
      setTiposDeContagem(response.data);
    }
    fetch();
  }, []);

  return (
    <div className="seletor-tipo-contagem">
      <div className="row">
        <div className="col report-label-value">
          <p className="value">Contagem de refeições</p>
        </div>
      </div>
      <Form
        onSubmit={() => {}}
        initialValues={
          escola.tipo_contagem && {
            tipo_contagem: escola.tipo_contagem.uuid
          }
        }
        render={({ pristine }) => (
          <div className="row">
            <div className="col-4">
              <form>
                <OnChange subscription={{ tipo_contagem: true }}>
                  {onFormUpdate}
                </OnChange>
                <Field
                  component={Select}
                  name="tipo_contagem"
                  options={
                    escola.tipo_contagem
                      ? tiposDeContagem
                      : [{ uuid: "", nome: "" }].concat(tiposDeContagem)
                  }
                  naoDesabilitarPrimeiraOpcao
                  disabled={submitting}
                />
              </form>
            </div>
            <div className="col-1">
              {submitting && (
                <img src="/assets/image/ajax-loader.gif" alt="ajax-loader" />
              )}
              {!pristine && !submitting && !error && (
                <i style={{ color: "green" }} className="fas fa-check-circle" />
              )}
              {!pristine && !submitting && error && (
                <i style={{ color: "red" }} className="fas fa-times-circle" />
              )}
            </div>
          </div>
        )}
      />
    </div>
  );
};
