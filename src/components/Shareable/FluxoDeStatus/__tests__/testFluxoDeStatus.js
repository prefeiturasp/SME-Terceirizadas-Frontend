import { mount } from "enzyme";
import React from "react";
import { FluxoDeStatus } from "../../FluxoDeStatus/FluxoDeStatus";

describe("Teste <FluxoDeStatus>", () => {
  let wrapper;
  const listaDeStatus = [
    {
      titulo: "Solicitação Realizada",
      status: "aprovado",
      timestamp: "25/04/2019 às 9:20",
      rf: "7972324",
      nome: "João da Silva"
    },
    {
      titulo: "Reprovado da DRE",
      status: "reprovado",
      timestamp: "25/04/2019 às 9:20",
      rf: "7972324",
      nome: "João da Silva"
    },
    {
      titulo: "Cancelado pela CODAE",
      status: "cancelado",
      timestamp: "25/04/2019 às 9:20",
      rf: "7972324",
      nome: "João da Silva"
    },
    {
      titulo: "Visualizado pela Terceirizada",
      status: null,
      timestamp: null
    }
  ];

  beforeAll(() => {
    wrapper = mount(<FluxoDeStatus listaDeStatus={listaDeStatus} />);
  });

  it("renderiza", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renderiza a quantidade de titulos passados", () => {
    expect(wrapper.find(".progressbar-titles").find("li")).toHaveLength(4);
  });

  it("renderiza o primeiro titulo corretamente", () => {
    expect(
      wrapper
        .find(".progressbar-titles")
        .find("li")
        .at(0)
        .text()
    ).toEqual("Solicitação Realizada");
  });

  it("renderiza a classe do primeiro status corretamente", () => {
    expect(
      wrapper
        .find(".progressbar")
        .find("li")
        .at(0)
        .props().className
    ).toEqual("active");
  });

  it("renderiza a classe do segundo status corretamente", () => {
    expect(
      wrapper
        .find(".progressbar")
        .find("li")
        .at(1)
        .props().className
    ).toEqual("disapproved");
  });

  it("renderiza a largura corretamente", () => {
    expect(
      wrapper
        .find(".progressbar")
        .find("li")
        .at(2)
        .props().style
    ).toHaveProperty("width", "25%");
  });
});
