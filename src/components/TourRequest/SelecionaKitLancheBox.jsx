import React, { Component } from "react";
import { Field } from "redux-form";
import { requiredCheck } from "../../helpers/fieldValidators";
import CheckboxWithCards from "./CheckBoxWithCards";
import {connect} from 'react-redux'
import * as actions from '../../actions/tourRequest.action'


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
  

  class SelecionaKitLancheBox extends Component {


    componentWillMount(){
      this.props.getKits()
    }

    render() {
      // const KIT_ENUM = this.props.enumKits
       
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
            clearAll={false}
            onChange={this.props.onChange}
            validate={[requiredCheck]}
          />
        </div>
      );
    }
  }

  const mapStateToProps = (state)=>({
    enumKits : state.tourRequests.kitEnum
  })

  // const tourRequestKits = 
  export default connect(mapStateToProps, actions)(SelecionaKitLancheBox)