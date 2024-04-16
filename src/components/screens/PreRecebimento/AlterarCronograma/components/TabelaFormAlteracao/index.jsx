import InputText from "components/Shareable/Input/InputText";
import { required } from "helpers/fieldValidators";
import React from "react";
import { Field } from "react-final-form";
import "./styles.scss";
import { formataMilhar } from "../../../../../../helpers/utilities";
import { numberToStringDecimal } from "helpers/parsers";

export default ({ solicitacao, somenteLeitura }) => {
  const pintaTabela = (campo, index) => {
    const classe = "fundo-laranja";
    if (
      index >= solicitacao.etapas_antigas.length ||
      solicitacao.etapas_novas[index][campo] !==
        solicitacao.etapas_antigas[index][campo]
    ) {
      return classe;
    } else return "";
  };

  return (
    <>
      <table className="table tabela-form-alteracao mt-2 mb-4">
        <thead className="head-crono">
          <th className="borda-crono">Confirmar N° do Empenho</th>
          <th className="borda-crono">Qtde Total do Empenho</th>
          <th className="borda-crono">Etapa</th>
          <th className="borda-crono">Parte</th>
          <th className="borda-crono">Data Programada</th>
          <th className="borda-crono">Quantidade</th>
          <th className="borda-crono">Total de Embalagens</th>
        </thead>
        <tbody>
          {solicitacao.etapas_novas.length > 0 &&
            solicitacao.etapas_novas.map((etapa, index) => {
              return (
                <tr key={index}>
                  {somenteLeitura ? (
                    <td
                      className={`borda-crono ${pintaTabela(
                        "numero_empenho",
                        index
                      )}`}
                    >
                      {etapa.numero_empenho ? etapa.numero_empenho : "----"}
                    </td>
                  ) : (
                    <td className="borda-crono">
                      <Field
                        component={InputText}
                        name={`empenho_${index}`}
                        validate={required}
                        proibeLetras
                      />
                    </td>
                  )}
                  {somenteLeitura ? (
                    <td
                      className={`borda-crono ${pintaTabela(
                        "qtd_total_empenho",
                        index
                      )}`}
                    >
                      {etapa.qtd_total_empenho
                        ? numberToStringDecimal(etapa.qtd_total_empenho)
                        : "----"}
                    </td>
                  ) : (
                    <td className="borda-crono">
                      <Field
                        component={InputText}
                        name={`qtd_total_empenho_${index}`}
                        validate={required}
                        agrupadorMilharComDecimal
                      />
                    </td>
                  )}
                  <td className={`borda-crono ${pintaTabela("etapa", index)}`}>
                    {etapa.etapa}
                  </td>
                  <td className={`borda-crono ${pintaTabela("parte", index)}`}>
                    {etapa.parte}
                  </td>
                  <td
                    className={`borda-crono ${pintaTabela(
                      "data_programada",
                      index
                    )}`}
                  >
                    {etapa.data_programada}
                  </td>
                  <td
                    className={`borda-crono ${pintaTabela(
                      "quantidade",
                      index
                    )}`}
                  >
                    {formataMilhar(etapa.quantidade)}
                  </td>
                  <td
                    className={`borda-crono ${pintaTabela(
                      "total_embalagens",
                      index
                    )}`}
                  >
                    {formataMilhar(etapa.total_embalagens)}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};
