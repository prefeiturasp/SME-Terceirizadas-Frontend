import React from "react";
import "antd/dist/antd.css";
import { Select } from "antd";
import "./styles.css";

export class SelectWithHideOptions extends React.Component {
  state = {};

  render() {
    const {
      input,
      options,
      placeholder,
      handleChange,
      selectedItems,
      onSelect,
      onDeselect,
      mode
    } = this.props;
    const filteredOptions = options.filter(o => !selectedItems.includes(o));
    return (
      <Select
        mode={mode || "multiple"}
        placeholder={placeholder}
        value={selectedItems}
        onChange={handleChange}
        style={{ width: "100%" }}
        onSelect={onSelect}
        onDeselect={onDeselect}
        {...this.props}
        {...input}
      >
        {filteredOptions.map(item => (
          <Select.Option key={item} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
    );
  }
}
