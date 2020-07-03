import { Input, AutoComplete } from "antd";
import React, { Component } from "react";

export default class AutoCompleteField extends Component {
  render() {
    const { label, onSearch, input, rootClassname, ...props } = this.props;
    return (
      <div className={rootClassname}>
        <label className="mb-1">{label}</label>
        <AutoComplete {...props} {...input} onSearch={onSearch}>
          <Input.Search size="large" onSearch={onSearch} />
        </AutoComplete>
      </div>
    );
  }
}
