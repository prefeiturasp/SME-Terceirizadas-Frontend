import { shallow } from "enzyme";
import React from "react";
import { LabelAndCombo } from "../labelAndInput";

let options = [
  { value: "v1", label: "op1", disable: false },
  { value: "v2", label: "op2", selected: true },
  { value: "v3", label: "op3", selected: false }
];

let wrapper;

beforeEach(() => {
  wrapper = shallow(
    <LabelAndCombo
      options={options}
      cols="12 12 12"
      name="myCombo"
      label="mylabel"
      disabled={true}
    />
  );
});

describe("LabelAndInput", () => {
  it("should build correct options length", () => {
    expect(wrapper.find("option")).toHaveLength(options.length);
  });
  // thanks to. https://medium.com/opendoor-labs/testing-react-components-with-jest-a7e8e4d312d8
  it("should be disabled", () => {
    expect(wrapper.find("select").props().disabled).toBe(true);
  });
  it("should have correct name", () => {
    expect(wrapper.find("select").props().name).toBe("myCombo");
  });
  it("should have correct label", () => {
    expect(wrapper.find("label").text()).toBe("mylabel");
  });
});
