import { mount } from "enzyme";
import React from "react";
import { Botao } from "../index";
import { BUTTON_TYPE, BUTTON_STYLE, BUTTON_ICON } from "../constants";

describe("Test <Botao>", () => {
  let wrapper;
  const onClick = jest.fn();

  beforeAll(() => {
    wrapper = mount(
      <Botao
        type={BUTTON_TYPE.SUBMIT}
        style={BUTTON_STYLE.GREEN}
        onClick={onClick}
        icon={BUTTON_ICON.ARROW_LEFT}
        texto={"texto do botao"}
        className="btn-block"
      />
    );
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders label props", () => {
    expect(wrapper.props().texto).toBe("texto do botao");
  });

  it("renders correct style props", () => {
    expect(wrapper.props().style).toBe("green-button");
  });

  it("correct type props", () => {
    expect(wrapper.props().type).toBe("submit");
  });

  it("disabled by default", () => {
    expect(wrapper.props().disabled).toBe(false);
  });

  it("correct div>icon", () => {
    expect(wrapper.find("i").props().className).toBe(
      "fas fa-arrow-left text-and-icon"
    );
  });

  it("clicked 2 times", () => {
    expect(onClick).not.toHaveBeenCalled();
    wrapper.find("button").simulate("click");
    wrapper.find("button").simulate("click");
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
