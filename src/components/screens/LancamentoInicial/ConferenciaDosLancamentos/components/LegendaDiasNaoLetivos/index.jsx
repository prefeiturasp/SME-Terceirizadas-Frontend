import React from "react";
import { ehFimDeSemana } from "helpers/utilities";

import "./style.scss";

export const LegendaDiasNaoLetivos = ({ ...props }) => {
  const { diasCalendario, feriadosNoMes, anoSolicitacao, mesSolicitacao } =
    props;

  return (
    <div className="legenda-dias-nao-letivos mb-3">
      {feriadosNoMes.map((diaFeriado, index) => {
        return (
          <div key={index} className="d-flex">
            <div key={index} className="square mr-1 my-auto" />
            {diaFeriado.dia} - {diaFeriado.feriado}
          </div>
        );
      })}
      {diasCalendario
        .filter(
          (diaCalendario) =>
            !diaCalendario.dia_letivo &&
            !feriadosNoMes.find(
              (diaFeriado) => diaFeriado.dia === diaCalendario.dia
            )
        )
        .map((diaCalendario, index) => {
          const dateObj = new Date(
            `${anoSolicitacao}-${mesSolicitacao}-${(
              parseInt(diaCalendario.dia) + 1
            )
              .toString()
              .padStart(2, "0")}`
          );
          return (
            !ehFimDeSemana(dateObj) && (
              <div key={index} className="d-flex">
                <div key={index} className="square mr-1 my-auto" />
                {diaCalendario.dia} - Dia não letivo
              </div>
            )
          );
        })}
    </div>
  );
};
