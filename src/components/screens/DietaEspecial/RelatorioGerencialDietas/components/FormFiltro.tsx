import React from "react";

import { Field } from "react-final-form";
import { FormApi } from "final-form";

import MultiSelect from "components/Shareable/FinalForm/MultiSelect";
import { InputComData } from "components/Shareable/DatePicker";

import { MESES } from "constants/shared";

type Props = {
  values: Record<string, any>;
  form: FormApi;
};

const buscaAnosComDietas = () => ["2024", "2023", "2022"];

const MESES_OPCOES = MESES.map((m: string, k: number) => ({
  label: m.toUpperCase(),
  value: k,
}));

export default (props: Props) => {
  const { values, form } = props;

  const anoVigente = new Date().getFullYear();
  const selecionouMaisDeUmAno = values.ano?.length > 1;
  const selecionouMaisDeUmMes = values.mes?.length > 1;
  const selecionouAno = values.ano?.length > 0;
  const selecionouMes = values.mes?.length > 0;

  const anosOpcoes = buscaAnosComDietas().map((a: string) => ({
    label: a,
    value: Number(a),
  }));

  if (!values.ano) {
    form.change("ano", [anoVigente]);
  }

  if (selecionouMaisDeUmAno) {
    form.change("mes", null);
    form.change("dia", null);
  }

  if (selecionouMaisDeUmMes) {
    form.change("dia", null);
  }

  let dataMinima,
    dataMaxima = null;
  if (
    selecionouAno &&
    !selecionouMaisDeUmAno &&
    selecionouMes &&
    !selecionouMaisDeUmMes
  ) {
    dataMinima = new Date(values.ano[0], values.mes[0], 1);
    dataMaxima = new Date(values.ano[0], values.mes[0] + 1, 0);
  } else if (selecionouAno && !selecionouMaisDeUmAno) {
    dataMinima = new Date(values.ano[0], 0, 1);
    dataMaxima = new Date(values.ano[0], 12, 0);
  } else if (selecionouMes && !selecionouMaisDeUmMes) {
    dataMinima = new Date(anoVigente, values.mes[0], 1);
    dataMaxima = new Date(anoVigente, values.mes[0] + 1, 0);
  }

  return (
    <div className="row">
      <div className="col-4">
        <Field
          component={MultiSelect}
          disableSearch
          label="Ano"
          name="ano"
          nomeDoItemNoPlural="anos"
          placeholder="Selecione o ano"
          tooltipText="Serão contabilizadas todas as dietas referente ao(s) ano(s) selecionado(s)."
          options={anosOpcoes}
        />
      </div>

      <div className="col-4">
        <Field
          component={MultiSelect}
          disableSearch
          label="Mês"
          name="mes"
          nomeDoItemNoPlural="meses"
          placeholder="Selecione o mês"
          tooltipText="Serão contabilizadas todas as dietas referente ao(s) mes(s) selecionado(s)."
          options={MESES_OPCOES}
          disabled={selecionouMaisDeUmAno}
        />
      </div>

      <div className="col-4">
        <Field
          component={InputComData}
          className="input-data"
          label="Dia"
          name="dia"
          placeholder="Selecione o dia"
          tooltipText="Selecione apenas um mês e um ano para habilitar o filtro de Dia"
          writable={false}
          minDate={dataMinima}
          maxDate={dataMaxima}
          disabled={selecionouMaisDeUmAno || selecionouMaisDeUmMes}
        />
      </div>
    </div>
  );
};
