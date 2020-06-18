import React from "react";
import "./style.scss";
import { NOME_STATUS } from "./helpers";
import Botao from "components/Shareable/Botao";
import { BUTTON_STYLE } from "components/Shareable/Botao/constants";

export const TabelaProdutos = ({ produtos, exibirDadosProduto }) => {
  return (
    <div className="tabela-lista-produtos">
      {!produtos && <div>Nenhum resultado encontrado.</div>}
      {produtos && (
        <table>
          <thead>
            <tr className="row">
              <th className="col-3">Nome do Produto</th>
              <th className="col-2">Marca</th>
              <th className="col-3">Fabricante</th>
              <th className="col-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto, key) => {
              return [
                <tr className="row" key={key}>
                  <td className="col-3">{produto.nome}</td>
                  <td className="col-2">
                    {produto.marca && produto.marca.nome}
                  </td>
                  <td className="col-3">
                    {produto.fabricante && produto.fabricante.nome}
                  </td>
                  <td className="col-4">
                    {produto.ultima_homologacao &&
                      NOME_STATUS[produto.ultima_homologacao.status]}
                    <i
                      className={`fas fa-${
                        produto.exibir ? "angle-up" : "angle-down"
                      }`}
                      onClick={() => exibirDadosProduto(key)}
                    />
                  </td>
                </tr>,
                produto.exibir && (
                  <div className="produto-exibir">
                    <div className="row">
                      <div className="col-5 report-label-value">
                        <p>Empresa solicitante (Terceirizada)</p>
                        <p className="value">
                          {
                            produto.ultima_homologacao.rastro_terceirizada
                              .nome_fantasia
                          }
                        </p>
                      </div>
                      <div className="col-3 report-label-value">
                        <p>Telefone</p>
                        <p className="value">
                          {
                            produto.ultima_homologacao.rastro_terceirizada
                              .contatos[0].telefone
                          }
                        </p>
                      </div>
                      <div className="col-4 report-label-value">
                        <p>E-mail</p>
                        <p className="value">
                          {
                            produto.ultima_homologacao.rastro_terceirizada
                              .contatos[0].email
                          }
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-5 report-label-value">
                        <p>Nome da Escola</p>
                        <p className="value">
                          {
                            produto.ultima_homologacao.reclamacoes[0].vinculo
                              .instituicao.nome
                          }
                        </p>
                      </div>
                      <div className="col-7 report-label-value">
                        <p>Código EOL</p>
                        <p className="value">
                          {
                            produto.ultima_homologacao.reclamacoes[0].vinculo
                              .instituicao.codigo_eol
                          }
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-5 report-label-value">
                        <p>Nome do reclamante</p>
                        <p className="value">
                          {
                            produto.ultima_homologacao.reclamacoes[0]
                              .reclamante_nome
                          }
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
                          {
                            produto.ultima_homologacao.reclamacoes[0]
                              .reclamante_cargo
                          }
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 report-label-value">
                        <p>Reclamação</p>
                        <p
                          className="value"
                          dangerouslySetInnerHTML={{
                            __html:
                              produto.ultima_homologacao.reclamacoes[0]
                                .reclamacao
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
                                  className="link"
                                >
                                  {`Anexo ${key + 1}`}
                                </a>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12 text-right">
                        <Botao texto="Ver produto" style={BUTTON_STYLE.GREEN} />
                        <Botao
                          className="ml-3"
                          texto="Questionar terceirizada"
                          style={BUTTON_STYLE.GREEN_OUTLINE}
                        />
                        <Botao
                          className="ml-3"
                          texto="Recusar"
                          style={BUTTON_STYLE.GREEN_OUTLINE}
                        />
                        <Botao
                          className="ml-3 mr-3"
                          texto="Aceitar"
                          style={BUTTON_STYLE.GREEN_OUTLINE}
                        />
                      </div>
                    </div>
                  </div>
                )
              ];
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
