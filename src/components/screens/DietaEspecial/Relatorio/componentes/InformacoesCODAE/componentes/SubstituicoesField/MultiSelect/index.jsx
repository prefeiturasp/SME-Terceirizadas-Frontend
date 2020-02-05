import React from "react";
import StatefuMultiSelect from "./StatefuMultiSelect";
import "./style.scss";
import { HelpText } from "../../../../../../../../Shareable/HelpText";
import InputErroMensagem from "../../../../../../../../Shareable/Input/InputErroMensagem";

export default class MultiSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.input.value
    };
  }
  render() {
    const {
      helpText,
      label,
      input: { onChange },
      meta,
      name,
      required,
      ...rest
    } = this.props;
    const { selected } = this.state;
    return (
      <div className="select">
        {label && [
          required && (
            <span key={1} className="required-asterisk">
              *
            </span>
          ),
          <label key={2} htmlFor={name} className="col-form-label">
            {label}
          </label>
        ]}
        <StatefuMultiSelect
          selected={selected}
          onSelectedChanged={selected => {
            this.setState({ selected });
          }}
          onUnexpand={() => onChange(selected)}
          overrideStrings={{
            selectSomeItems: "Selecione",
            allItemsAreSelected: "Todos os itens estão selecionados",
            selectAll: "Todos"
          }}
          {...rest}
        />
        <HelpText helpText={helpText} />
        <InputErroMensagem meta={meta} />
      </div>
    );
  }
}
