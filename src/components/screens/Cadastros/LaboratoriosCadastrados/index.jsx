import React, { useEffect, useState } from "react";
import moment from "moment";
import { Pagination, Spin, Tooltip } from "antd";
import "./style.scss";
import { NavLink } from "react-router-dom";
import { getLaboratorios } from "services/laboratorio.service";
import { ToggleExpandir } from "components/Shareable/ToggleExpandir";
import { CADASTROS, CONFIGURACOES, LABORATORIO } from "configs/constants";

const pageSize = 10;

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [laboratorios, setLaboratorios] = useState([]);
  const [laboratoriosFiltrados, setLaboratoriosFiltrados] = useState([]);
  const [laboratoriosPaginados, setLaboratoriosPaginados] = useState([]);
  const [page, setPage] = useState(1);

  const expandirLaboratorio = laboratorio => {
    laboratorio.ativo = !laboratorio.ativo;
    setLaboratorios([...laboratorios]);
  };

  const nextPage = page => {
    let paginado = laboratoriosFiltrados.slice(
      (page - 1) * pageSize,
      page * pageSize
    );
    setLaboratoriosPaginados(paginado);
    setPage(page);
  };

  const filtrarLabs = event => {
    if (event.target.value.length >= 2) {
      let filtrados = laboratorios.filter(lab => {
        const palavraAFiltrar = event.target.value.toLowerCase();
        return (
          lab.cnpj.toLowerCase().search(palavraAFiltrar) !== -1 ||
          lab.nome.toLowerCase().search(palavraAFiltrar) !== -1
        );
      });
      setLaboratoriosFiltrados(filtrados);
      nextPage(1);
    } else {
      setLaboratoriosFiltrados(laboratorios);
      nextPage(1);
    }
  };

  useEffect(() => {
    const buscaLaboratorios = async () => {
      setCarregando(true);
      const response = await getLaboratorios();
      setLaboratorios(response.data.results);
      setLaboratoriosFiltrados(response.data.results);
      setLaboratoriosPaginados(response.data.results.slice(0, pageSize));
      setCarregando(false);
    };

    buscaLaboratorios();
  }, []);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-laboratorios-cadastrados">
        <div className="card-body laboratorios-cadastrados">
          <table className="tabela-laboratorios">
            <thead>
              <tr>
                <th className="col">Nome do Laboratório</th>
                <th className="col">CNPJ</th>
                <th className="col">Credenciado</th>
                <th className="">
                  <div className="">
                    <input
                      className="input-search"
                      placeholder="Pesquisar"
                      onChange={e => filtrarLabs(e)}
                    />
                    <i className="fas fa-search" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {laboratoriosPaginados.map((laboratorio, key) => {
                return [
                  <tr
                    key={key}
                    className={laboratorio.ativo ? "detalhe-empresa" : ""}
                  >
                    <td className="nome-empresa">{laboratorio.nome}</td>
                    <td>{laboratorio.cnpj}</td>
                    <td>{laboratorio.credenciado ? "SIM" : "NÃO"}</td>

                    <td className="btn-action botao-direita">
                      <Tooltip title="Editar">
                        <span>
                          <div className="mr-4">
                            <NavLink
                              className="float-right ml-4"
                              to={`/${CONFIGURACOES}/${CADASTROS}/${LABORATORIO}/editar?uuid=${
                                laboratorio.uuid
                              }`}
                            >
                              <i className="fas fa-edit" />
                            </NavLink>
                          </div>
                        </span>
                      </Tooltip>
                      <ToggleExpandir
                        onClick={() => expandirLaboratorio(laboratorio)}
                        ativo={laboratorio.ativo}
                      />
                    </td>
                  </tr>,

                  laboratorio.ativo && (
                    <tr>
                      <td className="container-detalhe" colSpan="5">
                        <div className="row mb-3">
                          <div className="col-4">
                            <span className="descricao">Logradouro:</span>
                            <span className="valor-desc">
                              {laboratorio.logradouro}, {laboratorio.numero}
                            </span>
                          </div>
                          <div className="col-4">
                            <span className="descricao">Complemento:</span>
                            <span className="valor-desc">
                              {laboratorio.complemento}
                            </span>
                          </div>
                          <div className="col-4">
                            <span className="descricao">CEP:</span>
                            <span className="valor-desc">
                              {laboratorio.cep}
                            </span>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-4">
                            <span className="descricao">Bairro:</span>
                            <span className="valor-desc">
                              {laboratorio.bairro}
                            </span>
                          </div>
                          <div className="col-4">
                            <span className="descricao">Cidade:</span>
                            <span className="valor-desc">
                              {laboratorio.cidade}
                            </span>
                          </div>
                          <div className="col-4">
                            <span className="descricao">Estado:</span>
                            <span className="valor-desc">
                              {laboratorio.estado}
                            </span>
                          </div>
                        </div>
                        {laboratorio.contatos.map((contato, index) => (
                          <div className="row mb-3" key={index}>
                            <div className="col-4">
                              <span className="descricao">E-mail:</span>
                              <span className="valor-desc">
                                {contato.email}
                              </span>
                            </div>
                            <div className="col-4">
                              <span className="descricao">Telefone:</span>
                              <span className="valor-desc">
                                {contato.telefone}
                              </span>
                            </div>
                            <div className="col-4">
                              <span className="descricao">Contato:</span>
                              <span className="valor-desc">{contato.nome}</span>
                            </div>
                          </div>
                        ))}
                        <div className="row mb-3">
                          <div className="col-4">
                            <span className="descricao">Data de Cadastro:</span>
                            <span className="valor-desc">
                              {moment(
                                laboratorio.criado_em,
                                "DD/MM/YYYY"
                              ).format("DD/MM/YYYY")}
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                ];
              })}
            </tbody>
          </table>
          <div className="row mt-3">
            <div className="col">
              <Pagination
                current={page}
                total={laboratoriosFiltrados.length}
                showSizeChanger={false}
                onChange={nextPage}
                pageSize={pageSize}
                className="float-left mb-2"
              />
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};
