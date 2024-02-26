import React from "react";

import { Field } from "react-final-form";
import { FormApi } from "final-form";

import Select from "components/Shareable/Select";
import MultiSelect from "components/Shareable/FinalForm/MultiSelect";
import AutoCompleteSelectField from "components/Shareable/AutoCompleteSelectField";

import useView from "./view";
import { Skeleton } from "antd";

type Props = {
  form: FormApi;
};

export default (props: Props) => {
  const { form } = props;

  const view = useView({ form });

  return (
    <div className="row">
      <div className="col-4">
        {view.buscandoOpcoes.buscandoMesesAnos ? (
          <Skeleton paragraph={false} active />
        ) : (
          <Field
            component={Select}
            label="Mês de Referência"
            name="mes"
            placeholder="Selecione o mês de referência"
            options={view.mesesAnosOpcoes}
            required
            naoDesabilitarPrimeiraOpcao
            validate={view.validaMesAno}
          />
        )}
      </div>

      <div className="col-8">
        {view.buscandoOpcoes.buscandoDiretoriasRegionais ? (
          <Skeleton paragraph={false} active />
        ) : (
          <Field
            component={Select}
            label="DRE"
            name="dre"
            placeholder="Selecione uma DRE"
            options={view.diretoriasRegionaisOpcoes}
            naoDesabilitarPrimeiraOpcao
            onChangeEffect={view.onChangeDRE}
          />
        )}
      </div>

      <div className="col-4">
        {view.buscandoOpcoes.buscandoLotes ? (
          <Skeleton paragraph={false} active />
        ) : (
          <Field
            component={MultiSelect}
            disableSearch
            label="Lotes"
            name="lotes"
            placeholder="Selecione os lotes"
            options={view.lotesOpcoes}
            nomeDoItemNoPlural="lotes"
            onChangeEffect={view.onChangeLotes}
          />
        )}
      </div>

      <div className="col-8">
        {view.buscandoOpcoes.buscandoUnidadesEducacionais ? (
          <Skeleton paragraph={false} active />
        ) : (
          <Field
            component={AutoCompleteSelectField}
            label="Unidade Educacional"
            name="unidade_educacional"
            placeholder="Selecione uma Unidade Educacional"
            options={view.unidadesEducacionaisOpcoes}
            filterOption={view.filtraUnidadesEducacionaisOpcoes}
            onSelect={view.onChangeUnidadeEducacional}
          />
        )}
      </div>

      <div className="col-4">
        {view.buscandoOpcoes.buscandoPeriodosEscolares ? (
          <Skeleton paragraph={false} active />
        ) : (
          <Field
            component={MultiSelect}
            disableSearch
            label="Período"
            name="periodos"
            nomeDoItemNoPlural="períodos"
            placeholder="Selecione os períodos"
            options={view.periodosEscolaresOpcoes}
          />
        )}
      </div>

      <div className="col-4">
        {view.buscandoOpcoes.buscandoTiposAlimentacao ? (
          <Skeleton paragraph={false} active />
        ) : (
          <Field
            component={MultiSelect}
            disableSearch
            label="Tipo de Alimentação"
            name="alimentacoes"
            nomeDoItemNoPlural="alimentações"
            placeholder="Selecione os tipos de alimentação"
            options={view.tiposAlimentacaoOpcoes}
          />
        )}
      </div>
    </div>
  );
};
