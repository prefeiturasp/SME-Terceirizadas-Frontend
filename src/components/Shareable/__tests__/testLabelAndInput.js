import { mount } from "enzyme";
import React from "react";
import { LabelAndInput } from "../labelAndInput";

// thanks to. https://medium.com/opendoor-labs/testing-react-components-with-jest-a7e8e4d312d8

describe("LabelAndInput", () => {
  let inputWrapper;
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
