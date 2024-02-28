import React from "react";

import { Table } from "antd";
import Column from "antd/es/table/Column";

import { Props, TotalAlimentacao } from "./types";

const Total = (dados: Array<TotalAlimentacao>) => {
  let totalServido = 0;
  let totalFrequencia = 0;
  let totalAdesao = 0;

  dados.forEach(({ total_servido, total_frequencia, total_adesao }) => {
    totalServido += total_servido;
    totalFrequencia += total_frequencia;
    totalAdesao += total_adesao;
  });

  return (
    <Table.Summary.Row>
      <Table.Summary.Cell index={0}>
        <b>TOTAL</b>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={1}>
        <b>{totalServido}</b>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={2}>{totalFrequencia}</Table.Summary.Cell>
      <Table.Summary.Cell index={3}>
        <b>{totalAdesao}%</b>
      </Table.Summary.Cell>
    </Table.Summary.Row>
  );
};

export default (props: Props) => {
  const { className, periodo, dados } = props;

  return (
    <div className={className}>
      <h3 className="text-start texto-simples-verde">
        <b>{periodo}</b>
      </h3>
      <Table pagination={false} bordered dataSource={dados} summary={Total}>
        <Column
          title="Tipo de Alimentação"
          dataIndex="tipo_alimentacao"
          key="tipo_alimentacao"
        />
        <Column
          title="Total de Alimentações Servidas"
          dataIndex="total_servido"
          key="total_servido"
          render={(value: string) => <b>{value}</b>}
        />
        <Column
          title="Número Total de Frequência"
          dataIndex="total_frequencia"
          key="total_frequencia"
        />
        <Column
          title="% de Adesão"
          dataIndex="total_adesao"
          key="total_adesao"
          render={(value: string) => <b>{value}%</b>}
        />
      </Table>
    </div>
  );
};
