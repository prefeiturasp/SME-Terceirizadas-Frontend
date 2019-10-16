import { mount } from "enzyme";
import React from "react";
import { TextArea } from "../index";

describe("teste TextArea", () => {
  let wrapper;
  const props = {
    input: { onChange: jest.fn() },
    name: "TESTX",
    placeholder: "PLACETEST",
    label: "LBLTEST"
  };
  beforeEach(() => {
    wrapper = mount(<TextArea {...props} />);
  });

  it("correct name props", () => {
    expect(wrapper.props().name).toBe(props.name);
  });

  it("correct label props", () => {
    expect(wrapper.props().label).toBe(props.label);
  });

  it("correct placeholder props", () => {
    expect(wrapper.props().placeholder).toBe(props.placeholder);
  });

  /*it("inicial state to be object", () => {
    expect(typeof wrapper.state().editorState).toBe("object");
  });*/
});
