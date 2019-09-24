import React from "react";

export function CheckBox(props) {
  return (
    <div className="input-group">
      <div className="input-group-prepend">
        <div className="input-group-text">
          <input type="checkbox" />
        </div>
      </div>
      <input
        type="text"
        value={props.inputText}
        className="form-control"
        disabled
      />
    </div>
  );
}

export const CheckBoxListDefault = props => {
  const permissions = [
    "Visualização de Fluxo",
    `Cadastro de ${props.typeOfFeature}`,
    `Validação de ${props.typeOfFeature}`,
    `Edição de ${props.typeOfFeature}`,
    `Aprovação de ${props.typeOfFeature}`,
    `Cancelamento de ${props.typeOfFeature}`,
    `Validação de Cancelamento de ${props.typeOfFeature}`,
    `Edição de Cancelamento de ${props.typeOfFeature}`,
    `Notificação de Cadastro de ${props.typeOfFeature}`,
    `Notificação de Cancelamento de ${props.typeOfFeature}`,
    `Ciência de ${props.typeOfFeature}`,
    `Ciência de Cancelamento de ${props.typeOfFeature}`
  ];
  const listPermissions = permissions.map(text => (
    <CheckBox key={text} inputText={text} />
  ));
  return listPermissions;
};

export const CheckBoxListDashboard = props => {
  const permissions = [
    "Visualização de Todos e/ou Parte dos Pedidos",
    `Filtragem dos Pedidos`,
    `Impressão de Todos e/ou Parte dos Pedidos`
  ];
  const listPermissions = permissions.map(text => (
    <CheckBox key={text} inputText={text} />
  ));
  return listPermissions;
};
