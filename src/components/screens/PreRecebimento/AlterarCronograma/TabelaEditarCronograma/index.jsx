import React from "react";
import "./styles.scss";
import { Field } from "react-final-form";
import { InputComData } from "components/Shareable/DatePicker";
import InputText from "components/Shareable/Input/InputText";

export default ({ cronograma, motivos }) => {
  return (
    cronograma && (
      <div className="grid-cronograma mt-4">
        <div className="grid-cronograma-header head-crono">
          <div>
            <div>Data programada</div>
          </div>
          <div>
            <div>Etapa</div>
          </div>
          <div>
            <div>Parte</div>
          </div>
          {motivos.includes("data_entrega") && (
            <div className="crono-header-green">
              <div>Informar nova data</div>
            </div>
          )}

          {motivos.includes("quantidade_programada") && (
            <>
              <div>
                <div>Quantidade</div>
              </div>
              <div className="crono-header-green">
                <div>Informar nova quantidade</div>
              </div>
            </>
          )}
        </div>
        <div className="grid-cronograma-body">
          <div>
            <div>22/08/2022</div>
          </div>
          <div>
            <div>1</div>
          </div>
          <div>
            <div>1</div>
          </div>

          {motivos.includes("data_entrega") && (
            <div>
              <div>
                <Field
                  component={InputComData}
                  name="data_geracao"
                  placeholder="Selecionar Data"
                  minDate={null}
                  maxDate={null}
                  writable
                />
              </div>
            </div>
          )}

          {motivos.includes("quantidade_programada") && (
            <>
              <div>
                <div>4000.0kg</div>
              </div>
              <div>
                <div>
                  <Field
                    component={InputText}
                    name="quantidade_total"
                    placeholder="Quantidade"
                    className="input-busca-produto"
                    required
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    )
  );
};
