import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import "antd/dist/antd.css";
import "./styles.scss";
import { retornaStatusFormatado } from "./helpers";

const ListagemProdutos = ({ produtos }) => {
  const [ativos, setAtivos] = useState([]);

  return (
    <section className="resultado-busca-produto-avancada">
      <header>Veja os resultados para busca</header>
      <article>
        <div className="grid-produto-table header-table-produtos">
          <div>Tipo</div>
          <div>Status</div>
          <div>Data cadastro</div>
          <div>Nome do Produto</div>
          <div>Marca</div>
          <div>Fabricante</div>
          <div />
        </div>
        {produtos.map((produto, index) => {
          const terceirizada = produto.ultima_homologacao.rastro_terceirizada;
          const urlDetalhes = `/pesquisa-desenvolvimento/relatorio-produto?uuid=${
            produto.uuid
          }`;
          const status = produto.ultima_homologacao.status;
          const bordas = ativos.includes(index) ? "desativar-borda" : "";
          const icone = ativos.includes(index) ? "angle-up" : "angle-down";
          return (
            <Fragment key={index}>
              <div className="grid-produto-table body-table-produtos">
                <div className={`${bordas}`}>
                  {produto.eh_para_alunos_com_dieta ? "D. Especial" : "Comum"}
                </div>
                <div className={`${bordas}`}>
                  {retornaStatusFormatado(status)}
                </div>
                <div className={`${bordas}`}>
                  {produto.criado_em.split(" ")[0]}
                </div>
                <div className={`${bordas}`}>{produto.nome}</div>
                <div className={`${bordas}`}>{produto.marca.nome}</div>
                <div className={`${bordas}`}>{produto.fabricante.nome}</div>
                <div>
                  <i
                    className={`fas fa-${icone}`}
                    onClick={() => {
                      ativos.includes(index)
                        ? setAtivos(ativos.filter(el => el !== index))
                        : setAtivos([...ativos, index]);
                    }}
                  />
                </div>
              </div>
              {ativos.includes(index) && (
                <section className="resultado-busca-detalhe-produto">
                  <div className="grid-contatos-terceirizada">
                    <div className="label-empresa">
                      Empresa solicitante (Terceirizada)
                    </div>
                    <div className="label-empresa">Telefone</div>
                    <div className="label-empresa">E-mail</div>
                    <div className="value-empresa">
                      {terceirizada.nome_fantasia}
                    </div>
                    <div className="value-empresa template-contatos-terc">
                      {terceirizada.contatos.map((contato, index) => {
                        return <div key={index}>{contato.telefone}</div>;
                      })}
                    </div>
                    <div className="value-empresa template-contatos-terc">
                      {terceirizada.contatos.map((contato, index) => {
                        return <div key={index}>{contato.email}</div>;
                      })}
                    </div>
                    <div />
                  </div>
                  <div className="grid-do-produto">
                    <div className="label-empresa">Componentes do produto</div>
                    <div className="value-empresa">{produto.componentes}</div>
                  </div>
                  <div className="grid-do-produto">
                    <div className="label-empresa">
                      O produto contém ou pode conter ingredientes/aditivos
                      alergênicos?
                    </div>
                    <div className="value-empresa">
                      {produto.tem_aditivos_alergenicos ? "SIM" : "NÃO"}
                    </div>
                  </div>
                  <div className="grid-do-produto">
                    <div className="label-empresa">Quais?</div>
                    <div className="value-empresa">{produto.aditivos}</div>
                  </div>
                  <div className="grid-do-produto botao-produto-visualizar">
                    {/* <NavLink
                        activeClassName="active"
                        className="botao-visualizar-produto"
                        to={urlDetalhes}
                      > */}
                    <NavLink
                      activeClassName="active"
                      className="botao-visualizar-produto"
                      to={urlDetalhes}
                    >
                      Visualizar
                    </NavLink>
                  </div>
                </section>
              )}
            </Fragment>
          );
        })}
      </article>
    </section>
  );
};

export default ListagemProdutos;
