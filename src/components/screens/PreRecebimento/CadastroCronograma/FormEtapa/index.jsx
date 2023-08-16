import React, { useEffect, useState } from "react";
import "./styles.scss";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { Field } from "react-final-form";
import InputText from "components/Shareable/Input/InputText";
import AutoCompleteField from "components/Shareable/AutoCompleteField";
import { InputComData } from "components/Shareable/DatePicker";
import SelectSelecione from "components/Shareable/SelectSelecione";
import { getEtapas } from "services/cronograma.service";
//import "../CronogramaEntrega/styles.scss";
import { required } from "helpers/fieldValidators";

export default ({
  etapas,
  setEtapas,
  values,
  duplicados,
  restante,
  unidadeMedida,
  fornecedor = false
}) => {
  const [etapasOptions, setEtapasOptions] = useState([{}]);

  const getEtapasFiltrado = etapa => {
    if (etapa) {
      const reg = new RegExp(etapa, "iu");
      return etapasOptions.filter(a => reg.test(a.value));
    }
    return etapasOptions;
  };

  const adicionaEtapa = () => {
    setEtapas([...etapas, {}]);
  };

  const deletaEtapa = index => {
    let etapasNovo = [...etapas];
    etapasNovo.splice(index, 1);
    setEtapas(etapasNovo);
  };

  // const quantidadeFaltante = values => {
  //   let restante = values.quantidade_total;
  //   etapas.forEach((e, index) => {
  //     if (values[`quantidade_${index}`])
  //       restante = restante - values[`quantidade_${index}`];
  //   });
  //   return restante;
  // };

  const textoFaltante = () => {
    let qtdFaltante = restante;
    let textoPadrao = (
      <div>
        Faltam
        <span className="font-weight-bold">
          &nbsp;
          {qtdFaltante}
          &nbsp;
          {unidadeMedida.nome}
          &nbsp;
        </span>
        para programar
      </div>
    );

    let textoAcima = <div>Quantidade maior que a prevista em contrato</div>;

    return (
      <div className="row">
        <div
          className={`col-12 texto-alimento-faltante ${
            qtdFaltante === 0 ? "verde" : "vermelho"
          }`}
        >
          {qtdFaltante < 0 ? textoAcima : textoPadrao}
        </div>
      </div>
    );
  };

  useEffect(() => {
    const buscaEtapas = async () => {
      const response = await getEtapas();
      setEtapasOptions(response.data);
    };

    buscaEtapas();
  }, []);

  return (
    <>
      <div className="subtitulo">Cronograma das Entregas</div>
      <hr className="linha-verde" />
      {etapas &&
        etapas.map((etapa, index) => (
          <>
            {index !== 0 && (
              <>
                <hr />
                <div className="row">
                  <div className="w-100">
                    <Botao
                      texto=""
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      icon="fas fa-trash"
                      className="float-right ml-3"
                      onClick={() => deletaEtapa(index)}
                    />
                  </div>
                </div>
              </>
            )}
            <div className="row">
              {!fornecedor && (
                <div className="col-4">
                  {
                    <Field
                      component={InputText}
                      label="Nº do Empenho"
                      name={`empenho_${index}`}
                      placeholder="Informe o Nº do Empenho"
                      required
                      validate={required}
                      proibeLetras
                    />
                  }
                </div>
              )}
              <div className="col-4">
                <Field
                  component={AutoCompleteField}
                  options={getEtapasFiltrado(values[`etapa_${index}`])}
                  label="Etapa"
                  name={`etapa_${index}`}
                  className="input-busca-produto"
                  placeholder="Selecione a Etapa"
                  required
                  validate={required}
                  esconderIcone
                />
              </div>
              <div className="col-4">
                <Field
                  component={SelectSelecione}
                  naoDesabilitarPrimeiraOpcao
                  options={[
                    {
                      uuid: "Parte 1",
                      nome: "Parte 1"
                    },
                    {
                      uuid: "Parte 2",
                      nome: "Parte 2"
                    },
                    {
                      uuid: "Parte 3",
                      nome: "Parte 3"
                    },
                    {
                      uuid: "Parte 4",
                      nome: "Parte 4"
                    },
                    {
                      uuid: "Parte 5",
                      nome: "Parte 5"
                    }
                  ]}
                  label="Parte"
                  name={`parte_${index}`}
                  placeholder={"Selecione a Parte"}
                  validate={() =>
                    duplicados.includes(index) && "Parte já selecionada"
                  }
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <Field
                  component={InputComData}
                  label="Data Programada"
                  name={`data_programada_${index}`}
                  placeholder="Selecionar a Data"
                  required
                  validate={required}
                  writable={false}
                  minDate={null}
                />
              </div>
              <div className="col-4">
                <Field
                  component={InputText}
                  label="Quantidade"
                  name={`quantidade_${index}`}
                  placeholder="Digite a Quantidade"
                  validate={() =>
                    restante !== 0 &&
                    `quantidade total é diferente de ${values.quantidade_total ||
                      0}`
                  }
                  required
                  type="number"
                  pattern="[0-9]*"
                />
              </div>
              <div className="col-4">
                <Field
                  component={InputText}
                  label="Total de Embalagens"
                  name={`total_embalagens_${index}`}
                  placeholder="Digite a Quantidade"
                  required
                  validate={required}
                  apenasNumeros
                />
              </div>
            </div>
          </>
        ))}

      {values.quantidade_total && textoFaltante()}

      <div className="text-center mb-2 mt-2">
        <Botao
          texto="+ Adicionar Etapa"
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.GREEN_OUTLINE}
          className=""
          onClick={() => adicionaEtapa()}
        />
      </div>
    </>
  );
};
