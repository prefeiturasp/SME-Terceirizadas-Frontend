import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";

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
  const [dadosIniciais, setDadosIniciais] = useState({});

  const onFormUpdate = async tiposContagem => {
    setSubmitting(true);
    const resposta = await updateEscolaSimples(escola.uuid, {
      tipos_contagem: tiposContagem
    });
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
      setDadosIniciais(
        escola.tipos_contagem && {
          tipos_contagem: escola.tipos_contagem.map(
            tipoContagem => tipoContagem.uuid
          )
        }
      );
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
        initialValues={dadosIniciais}
        render={({ pristine }) => (
          <div className="row">
            <div className="col-4">
              <form>
                {dadosIniciais && (
                  <OnChange name="tipos_contagem">
                    {(value, previous) =>
                      previous !== "" &&
                      value.length !== previous.length &&
                      onFormUpdate(value)
                    }
                  </OnChange>
                )}
                {tiposDeContagem.map((tipoContagem, index) => (
                  <p key={index}>
                    <Field
                      component="input"
                      name="tipos_contagem"
                      type="checkbox"
                      value={tipoContagem.uuid}
                      disabled={submitting}
                    />
                    {tipoContagem.nome}
                  </p>
                ))}
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
