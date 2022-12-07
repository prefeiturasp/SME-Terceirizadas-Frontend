import React, { useEffect, useState } from "react";
import { Pagination, Spin } from "antd";
import "./style.scss";
import { getEmbalagens } from "services/qualidade.service";

const pageSize = 10;

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [embalagens, setEmbalagens] = useState([]);
  const [embalagensFiltradas, setEmbalagensFiltradas] = useState([]);
  const [embalagensPaginadas, setEmbalagensPaginadas] = useState([]);
  const [page, setPage] = useState(1);

  const nextPage = page => {
    let paginado = embalagensFiltradas.slice(
      (page - 1) * pageSize,
      page * pageSize
    );
    setEmbalagensPaginadas(paginado);
    setPage(page);
  };

  const filtrarEmbalagens = event => {
    if (event.target.value.length >= 2) {
      let filtrados = embalagens.filter(embalagem => {
        const palavraAFiltrar = event.target.value.toLowerCase();
        return embalagem.nome.toLowerCase().search(palavraAFiltrar) !== -1;
      });
      setEmbalagensFiltradas(filtrados);
      nextPage(1);
    } else {
      setEmbalagensFiltradas(embalagens);
      nextPage(1);
    }
  };

  useEffect(() => {
    const buscaEmbalagens = async () => {
      setCarregando(true);
      const response = await getEmbalagens();
      setEmbalagens(response.data.results);
      setEmbalagensFiltradas(response.data.results);
      setEmbalagensPaginadas(response.data.results.slice(0, pageSize));
      setCarregando(false);
    };

    buscaEmbalagens();
  }, []);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-embalagens-cadastradas">
        <div className="card-body embalagens-cadastradas">
          <table className="tabela-embalagens">
            <thead>
              <tr>
                <th className="col">Nome da Embalagem</th>
                <th className="col">Abreviação</th>
                <th className="">
                  <div className="">
                    <input
                      className="input-search"
                      placeholder="Pesquisar"
                      onChange={e => filtrarEmbalagens(e)}
                    />
                    <i className="fas fa-search" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {embalagensPaginadas.map((embalagem, key) => {
                return [
                  <tr key={key}>
                    <td className="nome-empresa">{embalagem.nome}</td>
                    <td>{embalagem.abreviacao}</td>
                    <td />
                  </tr>
                ];
              })}
            </tbody>
          </table>
          <div className="row mt-3">
            <div className="col">
              <Pagination
                current={page}
                total={embalagensFiltradas.length}
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
