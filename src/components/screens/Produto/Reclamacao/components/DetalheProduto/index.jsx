import React, { Fragment } from "react";

const DetalheProduto = ({ produto }) => {
  const terceirizada =
    produto.homologacoes[produto.homologacoes.length - 1].rastro_terceirizada;
  return (
    <div className="detalhe-produto">
      <div className="contatos-terceirizada">
        <div>
          <div className="label-item">Empresa solicitante (Terceirizada)</div>
          <div className="value-item">{terceirizada.nome_fantasia}</div>
        </div>
        <div className="telefone-email" style={{ display: "flex" }}>
          {terceirizada.contatos.map((contatos, index) => (
            <Fragment key={index}>
              {(contatos.telefone ||
                contatos.telefone2 ||
                contatos.celular) && (
                <div>
                  <div className="label-item">Telefone</div>
                  {contatos.telefone && (
                    <div className="value-item">{contatos.telefone}</div>
                  )}
                  {contatos.telefone2 && (
                    <div className="value-item">{contatos.telefone2}</div>
                  )}
                  {contatos.celular && (
                    <div className="value-item">{contatos.celular}</div>
                  )}
                </div>
              )}
              {contatos.email && (
                <div>
                  <div className="label-item">E-mail</div>
                  <div className="value-item">{contatos.email}</div>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
      <div className="componentes-produto">
        <div className="label-item">Componentes do produto</div>
        <div className="value-item">{produto.componentes}</div>
      </div>

      <div className="componentes-produto">
        <div className="label-item">
          O produto contém ou pode conter ingredientes/aditivos alergênicos?
        </div>
        <div className="value-item">
          {produto.tem_aditivos_alergenicos ? "SIM" : "NÃO"}
        </div>
      </div>

      {produto.tem_aditivos_alergenicos && (
        <div className="componentes-produto">
          <div className="label-item">Quais?</div>
          <div className="value-item">{produto.aditivos}</div>
        </div>
      )}

      <div className="componentes-produto">
        <div className="label-item">Prazo de Validade</div>
        <div className="value-item">{produto.prazo_validade}</div>
      </div>

      <div className="componentes-produto">
        <div className="label-item">
          Condições de Armazenamento, conservação e prazo máximo após abertura
          da embalagem
        </div>
        <div className="value-item">{produto.info_armazenamento}</div>
      </div>

      {produto.outras_informacoes && (
        <div className="componentes-produto">
          <div className="label-item">
            Outras informações que a empresa julgar necessário
          </div>
          <div className="value-item">{produto.outras_informacoes}</div>
        </div>
      )}
    </div>
  );
};

export default DetalheProduto;
