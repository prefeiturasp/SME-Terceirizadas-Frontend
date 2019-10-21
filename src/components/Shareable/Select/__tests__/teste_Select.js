import { mount } from "enzyme";
import React from "react";
import { Select } from "../index";
import { required } from "../../../../helpers/fieldValidators";

let options = [
  { uuid: "v1", nome: "op1", disable: false },
  { uuid: "v2", nome: "op2", selected: true },
  { uuid: "v3", nome: "op3", selected: false }
];

describe("teste Select", () => {
  let wrapper;
  let onChange = jest.fn();
  let input = { onChange };

  beforeEach(() => {
    const props = {
      meta: {
        touched: true,
        error: "This field is required"
      }
    };
    wrapper = mount(
      <Select
        options={options}
        className="teste"
        name="myCombo"
        input={input}
        label="mylabel"
        required
        validate={required}
        {...props}
      />
    );
  });

  it("deve exibir asterisco quando obrigatorio", () => {
    expect(wrapper.find(".required-asterisk").text()).toEqual("*");
  });
  it("should build correct options length", () => {
    expect(wrapper.find("option")).toHaveLength(options.length);
  });
  it("should not be disabled", () => {
    expect(wrapper.find("select").props().disabled).toBe(false);
  });
  it("should have correct name", () => {
    expect(wrapper.find("select").props().name).toBe("myCombo");
  });
  it("should have correct label", () => {
    expect(wrapper.find("label").text()).toBe("mylabel");
  });
  it("onChange called 2 times", () => {
    const select = wrapper.find("select");
    select.simulate("change", { target: { value: "A" } });
    select.simulate("change", { target: { value: "B" } });
    expect(input.onChange).toHaveBeenCalledTimes(2);
  });
  it("deve apresentar mensagem de erro receber erro via meta", () => {
    wrapper.find("select").simulate("click");
    wrapper.find("select").simulate("blur");
    expect(wrapper.find("select").props().className).toEqual(
      "form-control teste invalid-field"
    );
  });
});
