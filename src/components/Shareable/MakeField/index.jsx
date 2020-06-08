/* eslint-disable react/no-children-prop */
import React from "react";
import { Form, Select, AutoComplete } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";

const FormItem = Form.Item;

export const makeField = Component => ({
  input,
  meta,
  children,
  hasFeedback,
  label,
  ...rest
}) => {
  const hasError = meta.touched && meta.invalid;
  return (
    <FormItem
      label={label}
      validateStatus={hasError ? "error" : "success"}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
      rules={[
        {
          required: true,
          message: "Please select your favourite colors!",
          type: "array"
        }
      ]}
    >
      <Component
        className="input-make-field"
        {...input}
        {...rest}
        children={children}
      />
    </FormItem>
  );
};

export const ASelect = makeField(Select);
export const AAutoComplete = makeField(AutoComplete);
