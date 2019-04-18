import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { maxValue, required, requiredCheck } from "../../helpers/fieldValidators";
import { validateTourRequestForm } from "../../helpers/formValidators/tourRequestValidators";
import Button, { ButtonStyle, ButtonType } from "../Shareable/button";
import CheckboxWithCards from "../Shareable/CheckBoxWithCards";
import { LabelAndDate, LabelAndInput, LabelAndTextArea } from "../Shareable/labelAndInput";
import RadioboxGroup from "../Shareable/RadioboxGroup";
import { Grid } from "../Shareable/responsiveBs4";

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

export class SelecionaKitLancheBox extends Component {
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
      <div className={this.props.className}>
        <h5 className="bold">Selecione a opção desejada</h5>
        <Field
          name="kit_lanche"
          label="Kit Lanche"
          component={CheckboxWithCards}
          options={kitOptions}
          choicesNumberLimit={this.props.choicesNumberLimit}
          checkAll={checkAll}
          onChange={this.props.onChange}
          validate={[requiredCheck]}
        />
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
      <div className={this.props.className}>
        <h5 className="bold">Tempo previsto do passeio</h5>
        <RadioboxGroup
          name="tempo_passeio"
          label="Tempo previsto do passeio"
          validate={[requiredCheck]}
          onChange={this.props.onChange}
          options={timeOptions}
        />
        <div className="border rounded p-3">
          <label>
            <b>Até 4 horas</b> = 1 kit lanche/aluno: Escolher 1 kit entre os 3
            modelos estabelecidos contratualmente;
          </label>
          <label>
            <b>De 5 a 7 horas</b> = 2 kits lanche/alunos: Escolher 2 kits
            distintos entre os 3 modelos estabelecidos contratualmente;
          </label>
          <label>
            <b>8 horas ou mais</b> = 3 kits lanche/aluno: Será autorizado o
            fornecimento dos 3 modelos estabelecidos, kits 1, 2 e 3);
          </label>
        </div>
      </div>
    );
  }
}
