import React, { useState, useEffect } from "react";
import { Field } from "react-final-form";
import Multiselect from "multiselect-react-dropdown";
import $ from "jquery";

const Diagnosticos = ({
  diagnosticos,
  setDiagnosticos,
  setDiagnosticosSelecionados,
  selectedValues,
  alergiasError,
  setAlergiasError
}) => {
  const [values, setValues] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(diagnosticos);
  }, [diagnosticos]);

  useEffect(() => {
    // Retirada do negrito dos diagnóticos
    let lis = $(`.optionContainer li:nth-child(-n+${values.length + 1})`);
    $(lis).each((_, element) => {
      $(element).css("font-weight", "");
    });

    // Negrito colocado só nos que estão selecionados
    lis = $(`.optionContainer li:nth-child(-n+${values.length})`);
    $(lis).each((_, element) => {
      $(element).css("font-weight", "900");
    });
  }, [options]);

  const compare = (a, b) => {
    return a.nome > b.nome ? 1 : b.nome > a.nome ? -1 : 0;
  };

  const onSelect = values => {
    if (alergiasError) {
      setAlergiasError(false);
    }
    setDiagnosticosSelecionados(formatarDiagnostico(values));
    const stateOptions = diagnosticos.filter(
      op => !values.find(o => o.uuid === op.uuid)
    );
    const orderedNewOptions = values.sort(compare);
    setDiagnosticos(orderedNewOptions.concat(stateOptions.sort(compare)));
    setValues(orderedNewOptions);
  };

  const onRemove = values => {
    setDiagnosticosSelecionados(formatarDiagnostico(values));
    const stateOptions = diagnosticos.filter(
      op => !values.find(o => o.uuid === op.uuid)
    );
    const orderedNewOptions = values.sort(compare);
    setDiagnosticos(orderedNewOptions.concat(stateOptions.sort(compare)));
    setValues(orderedNewOptions);
  };

  const formatarDiagnostico = values => {
    return values.map(value => value.uuid);
  };

  return (
    <div className="row">
      <div className="col-12 pt-2 input title">
        <span className="required-asterisk">*</span>
        <label>Relação por Diagnóstico</label>
      </div>
      <div className="col-12">
        <Field
          component={Multiselect}
          name="alergias_intolerancias"
          options={options}
          onSelect={onSelect}
          onRemove={onRemove}
          selectedValues={selectedValues}
          displayValue="nome"
          showArrow={true}
          closeIcon="close"
          showCheckbox
          placeholder=""
          closeOnSelect={false}
          avoidHighlightFirstOption={true}
          caseSensitiveSearch={true}
          emptyRecordMsg="Nenhuma opção encontrada"
        />
        {alergiasError && (
          <p className="mt-2" style={{ color: "#a50e05", fontSize: "12px" }}>
            Campo obrigatório
          </p>
        )}
      </div>
    </div>
  );
};

export default Diagnosticos;
