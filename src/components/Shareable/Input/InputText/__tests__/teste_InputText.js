import { mount } from "enzyme";
import React from "react";
import { InputText } from "../index";
import { required } from "../../../../../helpers/fieldValidators";

// thanks to. https://medium.com/opendoor-labs/testing-react-components-with-jest-a7e8e4d312d8

describe("teste InputText", () => {
  let inputWrapper;
  beforeEach(() => {
    const props = {
      meta: {
        touched: true,
        error: "This field is required"
      }
    };
    inputWrapper = mount(
      <InputText
        className="teste"
        name="myInput"
        label="mylabel"
        placeholder="myPlaceholder"
        validate={required}
        required
        {...props}
      />
    );
  });
  it("não deve ser required", () => {
    expect(inputWrapper.find("input").props().required).toBe(true);
  });
  it("deve exibir asterisco quando obrigatorio", () => {
    expect(inputWrapper.find(".required-asterisk").text()).toEqual("*");
  });
  it("não deve ser disabled", () => {
    expect(inputWrapper.find("input").props().disabled).toBe(false);
  });
  it("tipo deve ser text", () => {
    expect(inputWrapper.find("input").props().type).toBe("text");
  });
  it("deve atribuir nome da label corretamente", () => {
    expect(inputWrapper.find("label").text()).toBe("mylabel");
  });
  it("deve apresentar mensagem de erro receber erro via meta", () => {
    inputWrapper.find("input").simulate("click");
    inputWrapper.find("input").simulate("blur");
    expect(inputWrapper.find("input").props().className).toEqual(
      "form-control teste invalid-field"
    );
  });
});

describe("teste InputText warning message", () => {
  let inputWrapper;
  beforeEach(() => {
    const props = {
      meta: {
        touched: true,
        warning: "Password invalid"
      }
    };
    inputWrapper = mount(
      <InputText
        className="teste"
        name="myInput"
        label="mylabel"
        placeholder="myPlaceholder"
        validate={required}
        required
        {...props}
      />
    );
  });
  it("deve apresentar mensagem de warning ao receber warning via meta", () => {
    inputWrapper.find("input").simulate("click");
    inputWrapper.find("input").simulate("blur");
    expect(inputWrapper.find("input").props().className).toEqual(
      "form-control teste invalid-field"
    );
  });
});
