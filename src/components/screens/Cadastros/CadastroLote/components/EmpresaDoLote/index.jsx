import React from "react";
import { mascaraCNPJ, mascaraTelefoneOuCelular } from "./helper";
import "./style.scss";

export const EmpresaDoLote = props => {
  const { empresa, ativo } = props;
  if (empresa === undefined || !ativo) return <tr />;
  return [
    <td className={"link"}>{empresa.nome_fantasia}</td>,
    <td className={"blueish"}>
      <span>CNPJ: </span>
      {mascaraCNPJ(empresa.cnpj)}
    </td>,
    <td className={"blueish"} colSpan="2">
      <span>Tel: </span>
      {mascaraTelefoneOuCelular(
        empresa.contatos[0].celular ||
          empresa.contatos[0].telefone ||
          empresa.contatos[0].telefone2
      )}
    </td>
  ];
};

export default EmpresaDoLote;
