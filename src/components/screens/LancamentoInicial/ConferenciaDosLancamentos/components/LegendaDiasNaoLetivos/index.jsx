import React from "react";
import { ehFimDeSemana } from "helpers/utilities";

import "./style.scss";

export const LegendaDiasNaoLetivos = ({ ...props }) => {
  const {
    diasCalendario,
    feriadosNoMes,
    anoSolicitacao,
    mesSolicitacao,
    weekColumns,
    values,
    categoria,
    periodoGrupo,
  } = props;

  return (
    <div className="legenda-dias-nao-letivos mb-3">
      {feriadosNoMes
        .filter((feriadoNoMes) =>
          weekColumns.find((weekColumn) => weekColumn.dia === feriadoNoMes.dia)
        )
        .filter((diaCalendario) => {
          return (
            !["Mês anterior", "Mês posterior"].includes(
              values[
                `frequencia__dia_${diaCalendario.dia}__categoria_${
                  categoria.id
                }__uuid_medicao_periodo_grupo_${periodoGrupo.uuid_medicao_periodo_grupo.slice(
                  0,
                  5
                )}`
              ]
            ) &&
            !["Mês anterior", "Mês posterior"].includes(
              values[
                `lanche_emergencial__dia_${diaCalendario.dia}__categoria_${
                  categoria.id
                }__uuid_medicao_periodo_grupo_${periodoGrupo.uuid_medicao_periodo_grupo.slice(
                  0,
                  5
                )}`
              ]
            )
          );
        })
        .map((diaFeriado, index) => {
          return (
            <div key={index} className="d-flex">
              <div key={index} className="mr-1 my-auto" />* {diaFeriado.dia} -
              Feriado: {diaFeriado.feriado}
            </div>
          );
        })}
      {diasCalendario
        .filter((diaCalendario) =>
          weekColumns.find((weekColumn) => weekColumn.dia === diaCalendario.dia)
        )
        .filter((diaCalendario) => {
          return (
            !["Mês anterior", "Mês posterior"].includes(
              values[
                `frequencia__dia_${diaCalendario.dia}__categoria_${
                  categoria.id
                }__uuid_medicao_periodo_grupo_${periodoGrupo.uuid_medicao_periodo_grupo.slice(
                  0,
                  5
                )}`
              ]
            ) &&
            !["Mês anterior", "Mês posterior"].includes(
              values[
                `lanche_emergencial__dia_${diaCalendario.dia}__categoria_${
                  categoria.id
                }__uuid_medicao_periodo_grupo_${periodoGrupo.uuid_medicao_periodo_grupo.slice(
                  0,
                  5
                )}`
              ]
            )
          );
        })
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
                <div key={index} className="mr-1 my-auto" />*{" "}
                {diaCalendario.dia} - Dia não letivo
              </div>
            )
          );
        })}
    </div>
  );
};
