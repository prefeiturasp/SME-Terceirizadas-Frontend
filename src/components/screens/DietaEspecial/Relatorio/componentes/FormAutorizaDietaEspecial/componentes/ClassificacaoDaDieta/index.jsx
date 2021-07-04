import React from "react";
import { Field } from "react-final-form";
import { ASelect } from "components/Shareable/MakeField";
import { Icon, Select as SelectAntd } from "antd";
import { selectValidate } from "helpers/fieldValidators";

const ClassificacaoDaDieta = ({ classificacoesDieta }) => {
  const { Option } = SelectAntd;

  const opcoes = classificacoesDieta.map(classificacao => {
    return <Option key={classificacao.uuid}>{classificacao.nome}</Option>;
  });

  return (
    <div className="row mt-3">
      <div className="col-12 input title">
        <span className="required-asterisk">*</span>
        <label>Classificação da Dieta</label>
      </div>
      <div className="col-4">
        <Field
          component={ASelect}
          className={"select-form-produto"}
          suffixIcon={<Icon type="caret-down" />}
          showSearch
          required
          validate={selectValidate}
          name="classificacao"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {opcoes}
        </Field>
      </div>
    </div>
  );
};

export default ClassificacaoDaDieta;
