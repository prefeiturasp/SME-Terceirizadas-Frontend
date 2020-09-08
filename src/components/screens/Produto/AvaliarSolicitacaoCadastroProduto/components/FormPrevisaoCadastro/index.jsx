import HTTP_STATUS from "http-status-codes";
import moment from "moment";
import React from "react";
import { Field, Form } from "react-final-form";

import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import { InputComData } from "components/Shareable/DatePicker";
import { TextAreaWYSIWYG } from "components/Shareable/TextArea/TextAreaWYSIWYG";
import { required } from "helpers/fieldValidators";

import "./styles.scss";
import { updateSolicitacaoCadastroProdutoDieta } from "services/produto.service";
import { toastSuccess, toastError } from "components/Shareable/Toast/dialogs";
import { converterDDMMYYYYparaYYYYMMDD } from "helpers/utilities";

export default ({ onUpdate, uuidSolicitacao }) => {
  const onSubmit = async values => {
    const resposta = await updateSolicitacaoCadastroProdutoDieta(
      uuidSolicitacao,
      values
    );
    if (resposta.status === HTTP_STATUS.OK) {
      toastSuccess("Solicitação de cadastro de produto confirmada com sucesso");
      onUpdate(values);
    } else {
      toastError("Houve um erro ao confirmar a solicitação de cadastro");
    }
  };
  return (
    <Form
      onSubmit={onSubmit}
      render={({ form, handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit} className="form-previsao-cadastro">
          <Field
            component={InputComData}
            name="data_previsao_cadastro"
            labelClassName="datepicker-fixed-padding"
            popperPlacement="bottom-end"
            label="Data prevista"
            minDate={moment()._d}
            required
            validate={required}
            parse={d => converterDDMMYYYYparaYYYYMMDD(d)}
            format={d =>
              d === undefined ? "" : moment(d).format("DD/MM/YYYY")
            }
          />
          <Field
            component={TextAreaWYSIWYG}
            label="Justificativa"
            name="justificativa_previsao_cadastro"
          />
          <Botao
            texto="Confirmar"
            type={BUTTON_TYPE.SUBMIT}
            style={BUTTON_STYLE.GREEN}
            disabled={submitting}
          />
        </form>
      )}
    />
  );
};
