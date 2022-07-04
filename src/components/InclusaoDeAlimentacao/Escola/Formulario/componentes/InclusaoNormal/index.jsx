import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { InputComData } from "components/Shareable/DatePicker";
import { checaSeDataEstaEntre2e5DiasUteis } from "helpers/utilities";
import moment from "moment";
import React from "react";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";

export const DataInclusaoNormal = ({ ...props }) => {
  const {
    index,
    pop,
    proximosDoisDiasUteis,
    proximosCincoDiasUteis,
    name,
    setShowModal
  } = props;

  console.log(proximosDoisDiasUteis, proximosCincoDiasUteis);

  const onDataChanged = value => {
    console.log();
    if (
      value &&
      checaSeDataEstaEntre2e5DiasUteis(
        value,
        proximosDoisDiasUteis,
        proximosCincoDiasUteis
      )
    ) {
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="col-4">
        <div className="row">
          <div className={`col-${index > 0 ? "8" : "12"}`}>
            <Field
              component={InputComData}
              name={`${name}.data`}
              //onBlur={event => this.onDataChanged(event.target.value)}
              minDate={proximosDoisDiasUteis}
              maxDate={moment()
                .endOf("year")
                .toDate()}
              label="Dia"
              required
              //validate={this.validaData}
            />
            <OnChange name={`${name}.data`}>
              {value => {
                onDataChanged(value);
              }}
            </OnChange>
          </div>
          {index > 0 && (
            <div className={`col-4 mt-auto mb-1`}>
              <Botao
                texto="Remover dia"
                type={BUTTON_TYPE.SUBMIT}
                onClick={() => pop("inclusoes")}
                style={BUTTON_STYLE.BLUE_OUTLINE}
                icon={BUTTON_ICON.TRASH}
                className="botao-remover-dia"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export const AdicionarDia = ({ push }) => {
  return (
    <Botao
      className="col-3 mb-3"
      texto="Adicionar dia"
      onClick={() => push("inclusoes")}
      style={BUTTON_STYLE.GREEN_OUTLINE}
      type={BUTTON_TYPE.BUTTON}
    />
  );
};
