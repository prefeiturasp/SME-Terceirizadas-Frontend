import { Input, AutoComplete } from "antd";
import React, { Component } from "react";

export default class AutoCompleteField extends Component {
  render() {
    const { label, onSearch, input, ...props } = this.props;
    return (
      <div>
        <label>Nome do Produto</label>
        <AutoComplete {...props} {...input} onSearch={onSearch}>
          <Input.Search size="large" onSearch={onSearch} />
        </AutoComplete>
      </div>
    );
  }
}
