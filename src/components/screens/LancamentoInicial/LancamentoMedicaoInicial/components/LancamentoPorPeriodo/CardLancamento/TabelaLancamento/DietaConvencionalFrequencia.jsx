import React from "react";
import { Field } from "react-final-form";

import { numericInteger } from "helpers/fieldValidators";

import BorderlessInput from "../../../BorderlessInput";

import "./styles.scss";
import BorderlessTextarea from "../../../BorderlessTextarea";

export default ({ panorama }) => (
  <div className="tabela-lancamento tabela-dieta-convencional-frequencia">
    <div className="cabecalho-tabela">
      <div>
        <span>Freq.</span>
      </div>
      {panorama.horas_atendimento !== 5 && (
        <div>
          <span>
            Lanche
            <br />4 h
          </span>
        </div>
      )}
      {panorama.horas_atendimento !== 4 && (
        <div>
          <span>
            Lanche
            <br />5 h
          </span>
        </div>
      )}
      <div>
        <span>
          Refeição
          <br />
          1ª oferta
        </span>
      </div>
      <div>
        <span>
          Repet.
          <br />
          refeição
        </span>
      </div>
      <div>
        <span>
          Sobremesa
          <br />
          1ª oferta
        </span>
      </div>
      <div>
        <span>
          Repet.
          <br />
          sobremesa
        </span>
      </div>
      {panorama.periodo === "INTEGRAL" && (
        <>
          <div>
            <span>
              Refeição
              <br />
              2ª oferta
            </span>
          </div>
          <div>
            <span>
              Repet.
              <br />
              refeição
            </span>
          </div>
          <div>
            <span>
              Sobremesa
              <br />
              2ª oferta
            </span>
          </div>
          <div>
            <span>
              Repet.
              <br />
              sobremesa
            </span>
          </div>
        </>
      )}
      <div>
        <span>
          Observações
          <br />
          diárias
        </span>
      </div>
    </div>
    <div className="linha-tabela">
      <div>
        <Field
          component={BorderlessInput}
          name="convencional.frequencia"
          validate={numericInteger}
          disabled
        />
      </div>
      {panorama.horas_atendimento !== 5 && (
        <div>
          <Field
            component={BorderlessInput}
            name="convencional.lanche_4h"
            validate={numericInteger}
          />
        </div>
      )}
      {panorama.horas_atendimento !== 4 && (
        <div>
          <Field
            component={BorderlessInput}
            name="convencional.lanche_5h"
            validate={numericInteger}
          />
        </div>
      )}
      <div>
        <Field
          component={BorderlessInput}
          name="convencional.refeicoes.0.ref_oferta"
          validate={numericInteger}
        />
      </div>
      <div>
        <Field
          component={BorderlessInput}
          name="convencional.refeicoes.0.ref_repet"
          validate={numericInteger}
        />
      </div>
      <div>
        <Field
          component={BorderlessInput}
          name="convencional.refeicoes.0.sob_oferta"
          validate={numericInteger}
        />
      </div>
      <div>
        <Field
          component={BorderlessInput}
          name="convencional.refeicoes.0.sob_repet"
          validate={numericInteger}
        />
      </div>
      {panorama.periodo === "INTEGRAL" && (
        <>
          <div>
            <Field
              component={BorderlessInput}
              name="convencional.refeicoes.1.ref_oferta"
              validate={numericInteger}
            />
          </div>
          <div>
            <Field
              component={BorderlessInput}
              name="convencional.refeicoes.1.ref_repet"
              validate={numericInteger}
            />
          </div>
          <div>
            <Field
              component={BorderlessInput}
              name="convencional.refeicoes.1.sob_oferta"
              validate={numericInteger}
            />
          </div>
          <div>
            <Field
              component={BorderlessInput}
              name="convencional.refeicoes.1.sob_repet"
              validate={numericInteger}
            />
          </div>
        </>
      )}
      <div>
        <Field component={BorderlessTextarea} name="convencional.observacoes" />
      </div>
    </div>
  </div>
);
