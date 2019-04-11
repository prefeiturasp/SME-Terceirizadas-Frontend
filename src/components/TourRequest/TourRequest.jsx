import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { validateTourRequestForm } from "../../helpers/formValidators/tourRequestValidators";
import { required, requiredCheck } from "../../helpers/validators";
import Button, { ButtonStyle, ButtonType } from "../Shareable/button";
import "../Shareable/custom.css";
import {
  LabelAndDate,
  LabelAndInput,
  LabelAndTextArea
} from "../Shareable/labelAndInput";
import RadioboxGroup from "../Shareable/RadioboxGroup";
import CheckboxWithCards from "./CheckBoxWithCards";

export const HORAS_ENUM = {
  _4: { tempo: "4h", qtd_kits: 1, label: "até 4 horas - 1 kit" },
  _5a7: { tempo: "5_7h", qtd_kits: 2, label: "de 5 a 7 horas - 2 kits" },
  _8: { tempo: "8h", qtd_kits: 3, label: "8 horas ou mais - 3 kits" }
};

export const KIT_ENUM = {
  KIT1: {
    value: "kit_1",
    label: "Modelo de Kit nº 1",
    foodList: [
      "- Bebida Láctea UHT Sabor Chocolate (200 ml)",
      "- Pão tipo hot dog (50g) com queijo (40g, duas fatias)",
      "- Fruta"
    ]
  },
  KIT2: {
    value: "kit_2",
    label: "Modelo de Kit nº 2",
    foodList: [
      "- Bebida Láctea UHT Sabor Chocolate (200 ml)",
      "- Biscoito Integral Salgado (mín. de 25g embalagem individual)",
      "- Fruta"
    ]
  },
  KIT3: {
    value: "kit_3",
    label: "Modelo de Kit nº 3",
    foodList: [
      "- Néctar UHT ou Suco Tropical UHT (200 ml)",
      "- Pão tipo Bisnaguinha (2 unidades - 40 g )",
      "- Barra de Cereal (20 a 25 g embalagem individual)"
    ]
  }
};

export class SelecionaKitLanche extends Component {
  render() {
    const kitOptions = [
      {
        value: KIT_ENUM.KIT1.value,
        label: KIT_ENUM.KIT1.label,
        foodList: KIT_ENUM.KIT1.foodList
      },
      {
        value: KIT_ENUM.KIT2.value,
        label: KIT_ENUM.KIT2.label,
        foodList: KIT_ENUM.KIT2.foodList
      },
      {
        value: KIT_ENUM.KIT3.value,
        label: KIT_ENUM.KIT3.label,
        foodList: KIT_ENUM.KIT3.foodList
      }
    ];
    let checkAll = kitOptions.length === this.props.choicesNumberLimit;

    return (
      <div>
        <Field
          name="kit_lanche"
          label="Kit Lanche"
          component={CheckboxWithCards}
          options={kitOptions}
          choicesNumberLimit={this.props.choicesNumberLimit}
          checkAll={checkAll}
          validate={[requiredCheck]}
        />
        <div>
          <label>Nº de kits</label>
          <br />
          <button className="btn btn-outline-primary mr-3">000</button>
        </div>
      </div>
    );
  }
}

export class SelecionaTempoPasseio extends Component {
  render() {
    const timeOptions = [
      { value: HORAS_ENUM._4.tempo, label: HORAS_ENUM._4.label },
      { value: HORAS_ENUM._5a7.tempo, label: HORAS_ENUM._5a7.label },
      { value: HORAS_ENUM._8.tempo, label: HORAS_ENUM._8.label }
    ];
    return (
      <div>
        <Field
          name="tempo_passeio"
          label="Tempo previsto do passeio"
          component={RadioboxGroup}
          validate={[requiredCheck]}
          onChange={this.props.onChange}
          options={timeOptions}
        />
      </div>
    );
  }
}

export class TourRequest extends Component {
  constructor(props) {
    super(props);
    this.setNumeroDeKitLanches = this.setNumeroDeKitLanches.bind(this);
    this.state = { qtd_kit_lanche: 0 };
  }
  // TODO: Rever uma forma melhor de escrever isso.
  parser = {
    "4h": HORAS_ENUM._4.qtd_kits,
    "5_7h": HORAS_ENUM._5a7.qtd_kits,
    "8h": HORAS_ENUM._8.qtd_kits
  };
  setNumeroDeKitLanches = (event, newValue, previousValue, name) => {
    let newQuantity = this.parser[event];
    this.setState({
      qtd_kit_lanche: newQuantity
    });
  };

  render() {
    return (
      <div className="d-flex flex-column p-4 mt-5">
        <form onSubmit={this.props.handleSubmit(validateTourRequestForm)}>
          <div>
            <label className="header-form-label mb-5">Nº de matriculados</label>
          </div>
          <div>
            <button className="btn btn-primary mr-3">150</button>
            <label>
              Informação automática disponibilizada no cadastro da UE
            </label>
          </div>
          <div className="form-group row">
            <Field
              component={LabelAndDate}
              cols="4 4 4 4"
              label="Data do evento"
              name="evento_data"
            />
            <Field
              component={LabelAndInput}
              cols="8 8 8 8"
              label="Local do passeio"
              name="local_passeio"
            />
          </div>
          <div className="form-group row">
            <Field
              component={LabelAndInput}
              cols="3 3 3 3"
              name="nro_alunos"
              type="number"
              label="Número de alunos participantes"
              validate={[required]}
            />
          </div>
          <hr />
          <SelecionaTempoPasseio
            onChange={(event, newValue, previousValue, name) =>
              this.setNumeroDeKitLanches(event, newValue, previousValue, name)
            }
          />
          <hr />
          <SelecionaKitLanche choicesNumberLimit={this.state.qtd_kit_lanche} />
          <hr />
          <div className="form-group">
            <Field
              component={LabelAndTextArea}
              label="Observações"
              name="obs"
            />
          </div>
          <div className="form-group row float-right">
            <Button label="Cancelar" style={ButtonStyle.OutlinePrimary} />
            <Button
              label="Salvar"
              className="ml-3"
              style={ButtonStyle.OutlinePrimary}
            />
            <Button
              label="Enviar Solicitação"
              type={ButtonType.SUBMIT}
              style={ButtonStyle.Primary}
              className="ml-3"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default (TourRequest = reduxForm({
  form: "tourRequest",
  destroyOnUnmount: false // para nao perder o estado
})(TourRequest));
