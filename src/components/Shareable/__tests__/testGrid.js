import { mount } from "enzyme";
import React from "react";
import { Grid } from "../responsiveBs4";

describe("test <Grid>", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <Grid className="TEST CLASSNAME" style={{ color: "blue" }} />
    );
  });

  it("correct cols", () => {
    expect(wrapper.props().cols).toBe("4 4");
  });

  it("correct className", () => {
    expect(wrapper.props().className).toBe("TEST CLASSNAME");
  });

  it("correct default div className", () => {
    expect(wrapper.find("div").props().className).toBe(
      "col-sm-4 col-lg-4 TEST CLASSNAME"
    );
  });

  it("correct div style", () => {
    expect(wrapper.find("div").props().style).toStrictEqual({ color: "blue" });
  });

  it("correct default div className pt2", () => {
    wrapper = mount(<Grid cols="3 7 9 4" className="TEST@" />);
    expect(wrapper.find("div").props().className).toBe(
      "col-sm-3 col-lg-7 col-md-9 col-xs-4 TEST@"
    );
  });
});
