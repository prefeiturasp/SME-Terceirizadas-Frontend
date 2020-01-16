import React, { Component } from "react";

import { statusEnum } from "../../constants";

import InputText from "../../components/Shareable/Input/InputText";
import { field as RadioboxGroup } from "../../components/Shareable/RadioboxGroup";

import CabecalhoSolicitacao from "./Components/CabecalhoSolicitacao";
import LinhaSolicitacao from "./Components/LinhaSolicitacao";

import "./style.scss";

import { getClassificacoesDietaEspecial } from "../../services/painelNutricionista.service";

export default class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classificacoesDieta: []
    };
  }

  componentWillMount = async () => {
    const classificacoesDieta = await getClassificacoesDietaEspecial();
    this.setState({
      classificacoesDieta: classificacoesDieta.results
    });
  };

  render() {
    const { classificacoesDieta } = this.state;
    const { dietaEspecial } = this.props;
    if (dietaEspecial === undefined) return <div>Carregando...</div>;
    return (
      <div>
        <CabecalhoSolicitacao dietaEspecial={dietaEspecial} />
        {dietaEspecial.status_solicitacao === statusEnum.CODAE_NEGOU_PEDIDO ? (
          <div>
            <LinhaSolicitacao titulo="Motivo da Negação">
              <div className="col-12">
                <p className="alergia-descricao">
                  {dietaEspecial.motivo_negacao.descricao}
                </p>
              </div>
            </LinhaSolicitacao>
            <LinhaSolicitacao titulo="Justificativa da Negação">
              <div className="col-12">
                <p
                  className="alergia-descricao"
                  dangerouslySetInnerHTML={{
                    __html: dietaEspecial.justificativa_negacao
                  }}
                />
              </div>
            </LinhaSolicitacao>
          </div>
        ) : (
          <div>
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
                      {a.nome}
                      {key < dietaEspecial.anexos.length - 1 ? <br /> : ""}
                    </a>
                  ))}
              </div>
            </LinhaSolicitacao>
            <LinhaSolicitacao titulo="Identificação do Nutricionista">
              <div className="col-9" id="identificacaoNutricionista">
                <InputText
                  input={{
                    value: dietaEspecial.registro_funcional_nutricionista
                  }}
                  disabled
                />
              </div>
            </LinhaSolicitacao>
          </div>
        )}
        {this.props.botoes}
      </div>
    );
  }
}
