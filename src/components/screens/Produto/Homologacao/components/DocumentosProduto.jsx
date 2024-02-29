import React from "react";

export const DocumentosProduto = ({ homologacao }) => {
  const documentoRegex = new RegExp("(doc|docx|pdf)$", "i");
  const documentos = homologacao.produto.imagens.filter((documento) =>
    documentoRegex.test(documento.arquivo)
  );
  return (
    <div className="row">
      <div className="col-12">
        <p className="titulo-section">Documentos</p>
      </div>
      {documentos.length > 0 ? (
        documentos.map((documento, documentoIndice) => {
          return (
            <div className="col-12" key={documentoIndice}>
              <a
                href={documento.arquivo}
                rel="noopener noreferrer"
                target="_blank"
              >
                {documento.nome}
              </a>
            </div>
          );
        })
      ) : (
        <div className="col-12">
          <p>Não há documentos do produto</p>
        </div>
      )}
      <div className="col-12">
        <hr />
      </div>
    </div>
  );
};
export default DocumentosProduto;
