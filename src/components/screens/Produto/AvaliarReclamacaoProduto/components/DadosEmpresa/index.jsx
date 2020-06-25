import React from "react";

export const DadosEmpresa = ({ produto }) => {
  return (
    <div className="row">
      <div className="col-5 report-label-value">
        <p>Empresa solicitante (Terceirizada)</p>
        <p className="value">
          {produto.ultima_homologacao.rastro_terceirizada.nome_fantasia}
        </p>
      </div>
      <div className="col-3 report-label-value">
        <p>Telefone</p>
        <p className="value">
          {produto.ultima_homologacao.reclamacoes &&
            produto.ultima_homologacao.rastro_terceirizada.contatos[0].telefone}
        </p>
      </div>
      <div className="col-4 report-label-value">
        <p>E-mail</p>
        <p className="value">
          {produto.ultima_homologacao.rastro_terceirizada.contatos[0].email}
        </p>
      </div>
    </div>
  );
};
