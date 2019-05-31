import { mount } from "enzyme";
import React from "react";
import { LabelAndCombo } from "../labelAndInput";

let options = [
  { value: "v1", label: "op1", disable: false },
  { value: "v2", label: "op2", selected: true },
  { value: "v3", label: "op3", selected: false }
];

describe("LabelAndCombo", () => {
  let wrapper;
  let onChange = jest.fn();
  let input = { onChange };

  beforeEach(() => {
    wrapper = mount(
      <LabelAndCombo
        options={options}
        cols="12 12 12"
        name="myCombo"
        input={input}
        // onChange={onChange}
        label="mylabel"
      />
    );
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
  it("onChange called correctly", () => {
    const select = wrapper.find("select");
    select.simulate("change", { target: { value: "TEST@@@@" } });
    expect(input.onChange).toHaveBeenCalledWith("TEST@@@@");
  });

  it("onChange called 2 times", () => {
    const select = wrapper.find("select");
    select.simulate("change", { target: { value: "A" } });
    select.simulate("change", { target: { value: "B" } });
    expect(input.onChange).toHaveBeenCalledTimes(2);
  });
});
