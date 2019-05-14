import { mount, shallow } from "enzyme";
import React from "react";
import { LabelAndCombo, LabelAndInput } from "../labelAndInput";

// thanks to. https://medium.com/opendoor-labs/testing-react-components-with-jest-a7e8e4d312d8

let options = [
  { value: "v1", label: "op1", disable: false },
  { value: "v2", label: "op2", selected: true },
  { value: "v3", label: "op3", selected: false }
];

let comboWrapper;
let inputWrapper;

describe("LabelAndCombo", () => {
  beforeEach(() => {
    comboWrapper = shallow(
      <LabelAndCombo
        options={options}
        cols="12 12 12"
        name="myCombo"
        label="mylabel"
        disabled={true}
      />
    );
  });

  it("should build correct options length", () => {
    expect(comboWrapper.find("option")).toHaveLength(options.length);
  });
  it("should be disabled", () => {
    expect(comboWrapper.find("select").props().disabled).toBe(true);
  });
  it("should have correct name", () => {
    expect(comboWrapper.find("select").props().name).toBe("myCombo");
  });
  it("should have correct label", () => {
    expect(comboWrapper.find("label").text()).toBe("mylabel");
  });
});

describe("LabelAndInput", () => {
  beforeEach(() => {
    inputWrapper = mount(
      <LabelAndInput
        cols="12 12 12"
        name="myInput"
        label="mylabel"
        placeholder="myPlaceholder"
        type="number"
      />
    );
  });
  it("should not be readOnly", () => {
    expect(inputWrapper.find("input").props().readOnly).toBe(false);
  });
  it("should have correct name", () => {
    expect(inputWrapper.find("input").props().name).toBe("myInput");
  });
  it("should have correct label", () => {
    expect(inputWrapper.find("label").text()).toBe("mylabel");
  });
});
