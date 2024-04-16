import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Skeleton } from "antd";
import { Field } from "react-final-form";
import { FormApi } from "final-form";

import { required } from "helpers/fieldValidators";

import { Select } from "components/Shareable/Select";

import useView from "./view";

type Cadastro = {
  setTiposAlimentacao: Dispatch<SetStateAction<Array<any>>>;
  setGrupoSelecionado: Dispatch<SetStateAction<string>>;
  setFaixasEtarias: Dispatch<SetStateAction<Array<any>>>;
  form: FormApi<any, any>;
  ehCadastro: true;
};

type Filtro = {
  ehCadastro?: false;
};

type Props = Cadastro | Filtro;

export default ({ ...props }: Props) => {
  const ehCadastro = props.ehCadastro;
  const setTiposAlimentacao = props.ehCadastro && props.setTiposAlimentacao;
  const setGrupoSelecionado = props.ehCadastro && props.setGrupoSelecionado;
  const setFaixasEtarias = props.ehCadastro && props.setFaixasEtarias;
  const form = props.ehCadastro && props.form;

  const view = useView({
    setTiposAlimentacao,
    setGrupoSelecionado,
    setFaixasEtarias,
    form,
  });

  return (
    <div className="row">
      <div className="col-4">
        {view.carregando ? (
          <Skeleton paragraph={false} active />
        ) : (
          <Field
            component={Select}
            name="edital"
            label="Nº do Edital"
            naoDesabilitarPrimeiraOpcao
            options={view.editais}
            validate={ehCadastro && required}
            required={ehCadastro}
          />
        )}
      </div>

      <div className="col-8">
        {view.carregando ? (
          <Skeleton paragraph={false} active />
        ) : (
          <Field
            component={Select}
            name="lote"
            label="Lote e DRE"
            naoDesabilitarPrimeiraOpcao
            options={view.lotes}
            validate={ehCadastro && required}
            required={ehCadastro}
          />
        )}
      </div>

      <div className="col-4">
        {view.carregando ? (
          <Skeleton paragraph={false} active />
        ) : (
          <Field
            component={Select}
            name="tipos_unidades"
            label="Tipo de Unidade"
            naoDesabilitarPrimeiraOpcao
            options={view.tiposUnidadesOpcoes}
            validate={ehCadastro && required}
            required={ehCadastro}
            onChangeEffect={(e: ChangeEvent<HTMLInputElement>) =>
              ehCadastro && view.onChangeTiposUnidades(e.target.value)
            }
          />
        )}
      </div>
    </div>
  );
};
