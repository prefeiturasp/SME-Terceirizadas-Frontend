import React, { Component } from "react";
import { Field } from "redux-form";
import { requiredCheck } from "../../helpers/fieldValidators";
import CheckboxWithCards from "./CheckBoxWithCards";


export const HORAS_ENUM = {
  _4: { tempo: "4h", qtd_kits: 1, label: "até 4 horas - 1 kit" },
  _5a7: { tempo: "5_7h", qtd_kits: 2, label: "de 5 a 7 horas - 2 kits" },
  _8: { tempo: "8h", qtd_kits: 3, label: "8 horas ou mais - 3 kits" }
};

class  SelecionaKitLancheBox extends Component {

  render() {
    const KIT_ENUM = this.props.kits;

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
        <h5 className="font-weight-bold">Selecione a opção desejada</h5>
        <Field
          name="kit_lanche"
          label="Kit Lanche"
          component={CheckboxWithCards}
          options={kitOptions}
          showOptions={this.props.showOptions !== undefined ? this.props.showOptions : true}
          choicesNumberLimit={this.props.choicesNumberLimit}
          checkAll={checkAll}
          clearAll={false}
          onChange={this.props.onChange}
          validate={
            this.props.validate !== undefined
              ? this.props.validate && [requiredCheck]
              : [requiredCheck]
          }
        />
      </div>
    );
  }
}
export default SelecionaKitLancheBox
