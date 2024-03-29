import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Skeleton } from "antd";
import { Field } from "react-final-form";

import { required } from "helpers/fieldValidators";

import { Select } from "components/Shareable/Select";

import useView from "./view";

type Props = {
  tiposUnidades: Array<any>;
  setTiposAlimentacao: Dispatch<SetStateAction<Array<any>>>;
  setTiposUnidades: Dispatch<SetStateAction<Array<any>>>;
};

export default ({
  tiposUnidades,
  setTiposUnidades,
  setTiposAlimentacao,
}: Props) => {
  const view = useView({
    tiposUnidades,
    setTiposUnidades,
    setTiposAlimentacao,
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
            validate={required}
            required
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
            validate={required}
            required
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
            validate={required}
            required
            onChangeEffect={(e: ChangeEvent<HTMLInputElement>) =>
              view.onChangeTiposUnidades(e.target.value)
            }
          />
        )}
      </div>
    </div>
  );
};
