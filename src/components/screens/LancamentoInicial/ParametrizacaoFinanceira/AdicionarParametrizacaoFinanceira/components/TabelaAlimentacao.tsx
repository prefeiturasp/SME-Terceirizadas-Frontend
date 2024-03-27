import React from "react";

import { Table } from "antd";
import Column from "antd/es/table/Column";

import { FormApi } from "final-form";
import { Field } from "react-final-form";

import { AInputNumber } from "components/Shareable/MakeField";

import {
  formataValorDecimal,
  parserValorDecimal,
} from "components/screens/helper";
import { TIPOS_UNIDADES_GRUPO_3 } from "../const";

type Props = {
  form: FormApi<any, any>;
  tiposAlimentacao: Array<any>;
  tiposUnidades: Array<any>;
};

export default ({ form, tiposAlimentacao, tiposUnidades }: Props) => {
  const alimentacoes = tiposAlimentacao.map((t) => ({ ...t }));

  const trataTiposAlimentacaoGrupo3 = () => {
    const refeicaoIndex = alimentacoes.findIndex((t) => t.nome === "Refeição");
    if (refeicaoIndex !== -1) {
      alimentacoes[refeicaoIndex] = {
        ...alimentacoes[refeicaoIndex],
        grupo: "EMEF / CEUEMEF / EMEFM / EMEBS / CIEJA",
      };

      alimentacoes.splice(refeicaoIndex + 1, 0, {
        ...alimentacoes[refeicaoIndex],
        grupo: "EJA",
      });
    }
  };

  const selecionouGrupo3 =
    form.getState().values.tipos_unidades &&
    form
      .getState()
      .values.tipos_unidades.split(",")
      .map((unidade) => tiposUnidades.find((u) => u.uuid === unidade).iniciais)
      .every((unidade) => TIPOS_UNIDADES_GRUPO_3.includes(unidade));

  if (selecionouGrupo3) {
    trataTiposAlimentacaoGrupo3();
  }

  return (
    <div className="row mt-5">
      <div className="col-4">
        <h2 className="text-start texto-simples-verde fw-bold">
          Preço das Alimentações Convencionais
        </h2>
        <Table pagination={false} bordered dataSource={alimentacoes}>
          <Column
            title="Tipo de Alimentação"
            dataIndex="nome"
            key="nome"
            render={(value, record: any, index) => {
              return (
                <div>
                  <p className="fw-bold mb-0">
                    {value} {record.grupo && `- ${record.grupo}`}
                  </p>
                  <Field
                    component="input"
                    name={`tabelas.alimentacao.${value}_${index}.lanche`}
                    type="hidden"
                    defaultValue={record.uuid}
                  />
                  <Field
                    component="input"
                    name={`tabelas.alimentacao.${value}_${index}.grupo`}
                    type="hidden"
                    defaultValue={record.grupo}
                  />
                </div>
              );
            }}
          />
          <Column
            title="Valor Unitário"
            dataIndex="valor_unitario"
            key="valor_unitario"
            render={(_, record: any, index) => (
              <Field
                component={AInputNumber}
                name={`tabelas.alimentacao.${record.nome}_${index}.valor_unitario`}
                placeholder="0,00"
                min={0}
                formatter={(value: string) => formataValorDecimal(value)}
                parser={(value: string) => parserValorDecimal(value)}
              />
            )}
          />
          <Column
            title="Valor Unitário Reajuste"
            dataIndex="valor_unitario_reajuste"
            key="valor_unitario_reajuste"
            render={(_, record: any, index) => (
              <Field
                component={AInputNumber}
                name={`tabelas.alimentacao.${record.nome}_${index}.valor_unitario_reajuste`}
                placeholder="0,00"
                min={0}
                formatter={(value: string) => formataValorDecimal(value)}
                parser={(value: string) => parserValorDecimal(value)}
              />
            )}
          />
        </Table>
      </div>
    </div>
  );
};
