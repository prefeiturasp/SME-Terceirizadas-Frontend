import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import { Select } from "components/Shareable/Select";
import { formataMesNome } from "helpers/utilities";
import React from "react";
import { Field, Form } from "react-final-form";
import { Location, useLocation } from "react-router-dom";
import "./style.scss";

export const ListaOcorrencias = () => {
  const location: Location<any> = useLocation();

  const onSubmit = () => {};

  return (
    <div className="card lista-ocorrencias mt-3">
      <div className="card-body">
        <Form onSubmit={onSubmit}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-3">
                  <Field
                    component={Select}
                    name="mes_ano"
                    label="Período de Lançamento da Medição"
                    options={[
                      {
                        nome: `${formataMesNome(location.state?.mes)} / ${
                          location.state?.ano
                        }`,
                        uuid: "",
                      },
                    ]}
                    disabled
                  />
                </div>
                <div className="col-9 mt-auto text-end">
                  <Botao
                    texto="Registrar Nova Ocorrência"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                  />
                </div>
              </div>
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};
