import React from "react";

export const FotosProduto = ({ homologacao }) => {
  const imagemRegex = new RegExp("(jpe|jpg|jpeg|png)$", "i");
  const imagens = homologacao.produto.imagens.filter((imagem) =>
    imagemRegex.test(imagem.arquivo)
  );
  return (
    <div className="row">
      <div className="col-12">
        <p className="titulo-section">Fotos do Produto</p>
      </div>
      {imagens.length > 0 ? (
        imagens.map((imagem, imagemIndice) => {
          return (
            <div className="col-3 text-center" key={imagemIndice}>
              <a
                href={imagem.arquivo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="arquivo-produto-ficha"
                  src={imagem.arquivo}
                  alt={imagem.nome}
                />
              </a>
            </div>
          );
        })
      ) : (
        <div className="col-12">
          <p>Não há imagens do produto</p>
        </div>
      )}
      <div className="col-12">
        <hr />
      </div>
    </div>
  );
};
export default FotosProduto;
