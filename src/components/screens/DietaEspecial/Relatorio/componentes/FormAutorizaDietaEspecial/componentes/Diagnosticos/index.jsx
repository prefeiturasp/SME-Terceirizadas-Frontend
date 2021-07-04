import React from "react";
import { Field } from "react-final-form";
import Multiselect from "multiselect-react-dropdown";

const Diagnosticos = ({
  diagnosticos,
  setDiagnosticosSelecionados,
  selectedValues,
  alergiasError,
  setAlergiasError
}) => {
  const onSelect = values => {
    if (alergiasError) {
      setAlergiasError(false);
    }
    setDiagnosticosSelecionados(formatarDiagnostico(values));
  };

  const onRemove = values => {
    setDiagnosticosSelecionados(formatarDiagnostico(values));
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
          options={diagnosticos}
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
