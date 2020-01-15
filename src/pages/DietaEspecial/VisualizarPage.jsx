import React, { Component } from "react";

import { HOME } from "../../constants/config.constants";
import * as constants from "../../configs/constants";

import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import InputText from "../../components/Shareable/Input/InputText";
import { field as RadioboxGroup } from "../../components/Shareable/RadioboxGroup";

import CabecalhoSolicitacao from "./Components/CabecalhoSolicitacao";
import LinhaSolicitacao from "./Components/LinhaSolicitacao";

import "./style.scss";

import {
  getClassificacoesDietaEspecial,
  getSolicitacaoDietaEspecial
} from "../../services/painelNutricionista.service";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dietaEspecial: undefined,
      classificacoesDieta: []
    };
  }
  componentDidMount = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) {
      const dietaEspecial = await getSolicitacaoDietaEspecial(uuid);
      const classificacoesDieta = await getClassificacoesDietaEspecial();
      this.setState({
        classificacoesDieta: classificacoesDieta.results,
        dietaEspecial: dietaEspecial.results,
        uuid
      });
    }
  };

  render() {
    const { classificacoesDieta, dietaEspecial } = this.state;
    if (dietaEspecial === undefined) return <div>Carregando...</div>;
    return (
      <div>
        <CabecalhoSolicitacao dietaEspecial={dietaEspecial} />
        <LinhaSolicitacao titulo="Relação por Diagnóstico">
          <div className="col-12">
            {dietaEspecial.alergias_intolerancias.map((i, key) => (
              <p className="alergia-descricao" key={key}>
                {i.descricao}
              </p>
            ))}
          </div>
        </LinhaSolicitacao>
        <LinhaSolicitacao titulo="Classificação da Dieta">
          <div className="col-12">
            <RadioboxGroup
              options={classificacoesDieta.map(cd => {
                return {
                  value: cd.id.toString(),
                  label: cd.nome
                };
              })}
              meta={{}}
              input={{
                value: dietaEspecial.classificacao.id.toString(),
                onBlur: () => {},
                onChange: () => {}
              }}
            />
          </div>
        </LinhaSolicitacao>
        <LinhaSolicitacao titulo="Protocolo da Dieta Especial">
          <div className="col-12">
            {dietaEspecial.anexos
              .filter(a => !a.eh_laudo_medico)
              .map((a, key) => (
                <a
                  key={key}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={a.arquivo}
                >
                  {a.nome.split("/").pop()}
                  {key < dietaEspecial.anexos.length - 1 ? <br /> : ""}
                </a>
              ))}
          </div>
        </LinhaSolicitacao>
        <LinhaSolicitacao titulo="Identificação do Nutricionista">
          <div className="col-9" id="identificacaoNutricionista">
            <InputText
              input={{ value: dietaEspecial.registro_funcional_nutricionista }}
              disabled
            />
          </div>
        </LinhaSolicitacao>
      </div>
    );
  }
}

export default class VisualizarPage extends Component {
  render() {
    const atual = {
      href: "#",
      titulo: "Relatório"
    };
    const anteriores = [
      {
        href: `/${constants.RELATORIOS}`,
        titulo: "Dietas Especiais"
      }
    ];

    return (
      <Page>
        <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
        <Relatorio {...this.props} />
      </Page>
    );
  }
}
