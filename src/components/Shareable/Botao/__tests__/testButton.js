import { mount } from "enzyme";
import React from "react";
import Button, { ButtonIcon, ButtonStyle, ButtonType } from "../button";

describe("Test <Button>", () => {
  let wrapper;
  const onClick = jest.fn();

  beforeAll(() => {
    wrapper = mount(
      <Button
        type={ButtonType.SUBMIT}
        icon={ButtonIcon.FOLDER}
        style={ButtonStyle.OutlineDark}
        onClick={onClick}
        label={"my label"}
        className="btn-block"
      />
    );
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders label props", () => {
    expect(wrapper.props().label).toBe("my label");
  });

  it("renders correct style props", () => {
    expect(wrapper.props().style).toBe("outline-dark");
  });

  it("correct type props", () => {
    expect(wrapper.props().type).toBe("submit");
  });

  it("correct className props", () => {
    expect(wrapper.props().className).toBe("btn-block");
  });

  it("correct icon props", () => {
    expect(wrapper.props().icon).toBe("folder");
  });

  it("disabled by default", () => {
    expect(wrapper.props().disabled).toBe(false);
  });

  it("correct div>icon", () => {
    expect(wrapper.find("i").props().className).toBe("pr-3 fas fa-folder");
  });

  it("clicked 2 times", () => {
    expect(onClick).not.toHaveBeenCalled();
    wrapper.find("button").simulate("click");
    wrapper.find("button").simulate("click");
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
