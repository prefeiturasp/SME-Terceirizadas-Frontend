import React from "react";

export default ({ meusDados, nomeTerceirizada }) => {
  const escola = meusDados.vinculo_atual && meusDados.vinculo_atual.instituicao;

  return (
    <div>
      <div className="row">
        <div className="col report-label-value">
          <p className="value">Informações da escola</p>
        </div>
      </div>
      <div className="row">
        <div className="col-2 report-label-value">
          <p>Código EOL</p>
          <p className="value-important">{escola && escola.codigo_eol}</p>
        </div>
        <div className="col-6 report-label-value">
          <p>Nome</p>
          <p className="value-important">{escola && escola.nome}</p>
        </div>
        <div className="col-4 report-label-value">
          <p>DRE</p>
          <p className="value-important">
            {escola && escola.diretoria_regional.nome}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-2 report-label-value">
          <p>CEP</p>
          <p className="value-important">{escola && escola.endereco.cep}</p>
        </div>
        <div className="col-6 report-label-value">
          <p>Endereço</p>
          <p className="value-important">
            {escola && escola.endereco.logradouro}
          </p>
        </div>
        <div className="col-2 report-label-value">
          <p>Número</p>
          <p className="value-important">{escola && escola.endereco.numero}</p>
        </div>
        <div className="col-2 report-label-value">
          <p>Bairro</p>
          <p className="value-important">{escola && escola.endereco.bairro}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-2 report-label-value">
          <p>Telefone{escola && escola.contato.telefone2 && "s"}</p>
          <p className="value-important">{escola && escola.contato.telefone}</p>
          {escola && escola.contato.telefone2 && (
            <p className="value-important">
              {escola && escola.contato.telefone2}
            </p>
          )}
        </div>
        <div className="col-6 report-label-value">
          <p>E-mail</p>
          <p className="value-important">{escola && escola.contato.email}</p>
        </div>
        <div className="col-4 report-label-value">
          <p>Nome da empresa terceirizada</p>
          <p className="value-important">{nomeTerceirizada}</p>
        </div>
      </div>
    </div>
  );
};
