import React, { useEffect, useState } from "react";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import moment from "moment";

import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import InputText from "components/Shareable/Input/InputText";
import AutoCompleteField from "components/Shareable/AutoCompleteField";
import { InputComData } from "components/Shareable/DatePicker";
import Select from "components/Shareable/Select";
import { getEtapas } from "services/cronograma.service";
import { getFeriadosAnoAtualEProximo } from "services/diasUteis.service";
import { deletaValues } from "helpers/formHelper";
import {
  formataMilhar,
  getAmanha,
  usuarioEhCronograma,
} from "helpers/utilities";
import {
  required,
  composeValidators,
  inteiroOuDecimalComVirgula,
} from "helpers/fieldValidators";

import "./styles.scss";
import { calculaTotalEmbalagens } from "./helper";

export default ({
  etapas,
  setEtapas,
  values,
  errors,
  duplicados,
  restante,
  unidadeMedida,
  ehAlteracao = false,
  form,
}) => {
  const [etapasOptions, setEtapasOptions] = useState([{}]);
  const [desabilitar, setDesabilitar] = useState([]);
  const [feriados, setFeriados] = useState([{}]);

  const getEtapasFiltrado = (etapa) => {
    if (etapa) {
      const reg = new RegExp(etapa, "iu");
      return etapasOptions.filter((a) => reg.test(a.value));
    }
    return etapasOptions;
  };

  const adicionaEtapa = () => {
    setEtapas([...etapas, {}]);
  };

  const deletaEtapa = (index) => {
    let listaChaves = [
      "empenho",
      "etapa",
      "parte",
      "data_programada",
      "quantidade",
      "total_embalagens",
    ];

    deletaValues(etapas, listaChaves, values, index);

    let etapasNovo = [...etapas];
    etapasNovo.splice(index, 1);
    setEtapas(etapasNovo);
  };

  const textoFaltante = () => {
    let qtdFaltante = restante;
    let textoPadrao = (
      <div>
        Faltam
        <span className="fw-bold">
          &nbsp;
          {formataMilhar(qtdFaltante)}
          &nbsp;
          {unidadeMedida && unidadeMedida.nome}
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

  const buscaEtapas = async () => {
    const response = await getEtapas();
    setEtapasOptions(response.data);
  };

  const buscaFeriados = async () => {
    const response = await getFeriadosAnoAtualEProximo();
    const datas = response.data.results.map((dateString) =>
      moment(dateString, "YYYY-MM-DD").toDate()
    );
    setFeriados(datas);
  };

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const requisicoesPreRender = async () => {
    await Promise.all([buscaFeriados(), buscaEtapas()]);
  };

  const desativaAdicionarEtapa = () => {
    let index = etapas.length - 1;
    const camposObrigatorios = [
      `empenho_${index - 1}`,
      `qtd_total_empenho_${index - 1}`,
      `etapa_${index - 1}`,
      `parte_${index - 1}`,
      `data_programada_${index - 1}`,
      `quantidade_${index - 1}`,
    ];

    return camposObrigatorios.some((campo) => Boolean(errors[campo]));
  };

  useEffect(() => {
    requisicoesPreRender();
  }, []);

  useEffect(() => {
    const desativaCampos = () => {
      if (ehAlteracao) {
        let array = [];
        etapas.forEach((etapa, index) => {
          let dataProgramada = moment(
            values[`data_programada_${index}`],
            "DD/MM/YYYY"
          ).toDate();
          if (dataProgramada <= new Date().setHours(0, 0, 0, 0)) {
            array[index] = true;
          }
        });
        array[0] = true;
        setDesabilitar(array);
      }
    };

    desativaCampos();
  }, [values]);

  return (
    <>
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
                      className="float-end ms-3"
                      onClick={() => deletaEtapa(index)}
                      tooltipExterno="Remover Etapa"
                    />
                  </div>
                </div>
              </>
            )}
            <div className="row">
              {usuarioEhCronograma() && (
                <>
                  <div className="col">
                    <Field
                      component={InputText}
                      label="Nº do Empenho"
                      name={`empenho_${index}`}
                      placeholder="Informe o Nº do Empenho"
                      required
                      validate={required}
                      proibeLetras
                      disabled={desabilitar[index]}
                    />
                  </div>
                  <div className="col">
                    <Field
                      component={InputText}
                      label="Qtde. Total do Empenho"
                      name={`qtd_total_empenho_${index}`}
                      placeholder="Informe a quantidade"
                      required
                      validate={composeValidators(
                        required,
                        inteiroOuDecimalComVirgula
                      )}
                      proibeLetras
                      disabled={desabilitar[index]}
                    />
                  </div>
                </>
              )}
              <div className="col">
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
                  disabled={desabilitar[index]}
                />
                <OnChange name={`etapa_${index}`}>
                  {() => {
                    ehAlteracao &&
                      form.mutators.setFieldTouched(`parte_${index}`, true);
                  }}
                </OnChange>
              </div>
              <div className="col">
                <Field
                  component={Select}
                  naoDesabilitarPrimeiraOpcao
                  options={[
                    {
                      uuid: "",
                      nome: "Selecione a Parte",
                    },
                    {
                      uuid: "Parte 1",
                      nome: "Parte 1",
                    },
                    {
                      uuid: "Parte 2",
                      nome: "Parte 2",
                    },
                    {
                      uuid: "Parte 3",
                      nome: "Parte 3",
                    },
                    {
                      uuid: "Parte 4",
                      nome: "Parte 4",
                    },
                    {
                      uuid: "Parte 5",
                      nome: "Parte 5",
                    },
                  ]}
                  label="Parte"
                  name={`parte_${index}`}
                  validate={() =>
                    duplicados.includes(index) && "Parte já selecionada"
                  }
                  required
                  disabled={desabilitar[index]}
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
                  minDate={getAmanha()}
                  disabled={desabilitar[index]}
                  filterDate={isWeekday}
                  excludeDates={feriados}
                />
              </div>
              <div className="col-4">
                <Field
                  component={InputText}
                  label="Quantidade"
                  name={`quantidade_${index}`}
                  placeholder="Digite a Quantidade"
                  validate={required}
                  required
                  apenasNumeros
                  agrupadorMilhar
                  disabled={desabilitar[index]}
                />
              </div>
              <OnChange name={`quantidade_${index}`}>
                {(value) => {
                  const totalEmbalagens = calculaTotalEmbalagens(
                    Number(value.replace(".", "")),
                    Number(
                      values.peso_liquido_embalagem_secundaria?.replace(
                        ",",
                        "."
                      )
                    )
                  );

                  form.change(`total_embalagens_${index}`, totalEmbalagens);
                }}
              </OnChange>
              <div className="col-4">
                <Field
                  component={InputText}
                  label="Total de Embalagens"
                  name={`total_embalagens_${index}`}
                  required
                  disabled
                  valorInicial={""}
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
          disabled={desativaAdicionarEtapa()}
          tooltipExterno={
            desativaAdicionarEtapa()
              ? "É necessário preencher todos os campos obrigatórios para adicionar uma nova Etapa"
              : ""
          }
        />
      </div>
    </>
  );
};
