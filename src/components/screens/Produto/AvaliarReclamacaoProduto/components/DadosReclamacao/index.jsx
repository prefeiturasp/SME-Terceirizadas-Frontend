import React from "react";

export const DadosReclamacaoProduto = ({ produto }) => {
  return (
    <div className="produto-exibir">
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
            {
              produto.ultima_homologacao.rastro_terceirizada.contatos[0]
                .telefone
            }
          </p>
        </div>
        <div className="col-4 report-label-value">
          <p>E-mail</p>
          <p className="value">
            {produto.ultima_homologacao.rastro_terceirizada.contatos[0].email}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-5 report-label-value">
          <p>Nome da Escola</p>
          <p className="value">
            {produto.ultima_homologacao.reclamacoes[0].vinculo.instituicao.nome}
          </p>
        </div>
        <div className="col-7 report-label-value">
          <p>Código EOL</p>
          <p className="value">
            {
              produto.ultima_homologacao.reclamacoes[0].vinculo.instituicao
                .codigo_eol
            }
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-5 report-label-value">
          <p>Nome do reclamante</p>
          <p className="value">
            {produto.ultima_homologacao.reclamacoes[0].reclamante_nome}
          </p>
        </div>
        <div className="col-3 report-label-value">
          <p>RF/CRN/CFN</p>
          <p className="value">
            {
              produto.ultima_homologacao.reclamacoes[0]
                .reclamante_registro_funcional
            }
          </p>
        </div>
        <div className="col-4 report-label-value">
          <p>Cargo</p>
          <p className="value">
            {produto.ultima_homologacao.reclamacoes[0].reclamante_cargo}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 report-label-value">
          <p>Reclamação</p>
          <p
            className="value"
            dangerouslySetInnerHTML={{
              __html: produto.ultima_homologacao.reclamacoes[0].reclamacao
            }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 report-label-value">
          <p>Anexos</p>
          {produto.ultima_homologacao.reclamacoes[0].anexos.map(
            (anexo, key) => {
              return (
                <div key={key}>
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={anexo.arquivo}
                    className="link font-weight-bold"
                  >
                    {`Anexo ${key + 1}`}
                  </a>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};
