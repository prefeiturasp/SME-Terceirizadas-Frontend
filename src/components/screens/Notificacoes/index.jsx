import React, { useEffect, useState } from "react";
import { Spin, Pagination } from "antd";
import "./style.scss";
import {
  getNotificacoesGerais,
  getPendenciasNaoResolvidas,
  setNotificacaoMarcarDesmarcarLida
} from "services/notificacoes.service";
import CardNotificacao from "./components/CardNotificacao";
import { gerarParametrosConsulta } from "helpers/utilities";

export default () => {
  const [carregando] = useState(false);
  const [notificacoes, setNotificacoes] = useState([]);
  const [pendencias, setPendencias] = useState([]);
  const [total, setTotal] = useState(1);
  const [page, setPage] = useState(1);
  const [clickBtnNotificacoes, setClickBtnNotificacoes] = useState(false);

  const buscarNotificacoes = async page => {
    const params = gerarParametrosConsulta({ page: page });
    let pendenciasResponse = await getPendenciasNaoResolvidas();
    let notifsResponse = await getNotificacoesGerais(params);
    setPendencias(pendenciasResponse.data.results);
    setNotificacoes(notifsResponse.data.results);
    setTotal(notifsResponse.data.count);
  };

  const nextPage = page => {
    buscarNotificacoes(page);
    setPage(page);
  };

  const toggleBtnNotificacoes = uuid => {
    setClickBtnNotificacoes({
      [uuid]: !clickBtnNotificacoes[uuid]
    });
  };

  const handleChangeMarcarComoLida = async (notificacao, index) => {
    const payload = {
      uuid: notificacao.uuid,
      lido: !notificacao.lido
    };
    if (notificacao.tipo === "Pendência") {
      let pendenciasNew = pendencias;
      pendenciasNew[index].lido = !pendenciasNew[index].lido;
      setPendencias([...pendenciasNew]);
    } else {
      let notificacoesNew = notificacoes;
      notificacoesNew[index].lido = !notificacoesNew[index].lido;
      setNotificacoes([...notificacoesNew]);
    }

    await setNotificacaoMarcarDesmarcarLida(payload);
  };

  useEffect(() => {
    buscarNotificacoes(page);
  }, []);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-notificacoes">
        <div className="card-body notificacoes">
          {notificacoes && (
            <>
              <div className="accordion mt-1" id="accordionNotificacoes">
                <div className="titulo">Pendências</div>
                {pendencias &&
                  pendencias.length > 0 &&
                  pendencias.map((pendencia, index) => (
                    <CardNotificacao
                      key={pendencia.uuid}
                      notificacao={pendencia}
                      handleChangeMarcarComoLida={handleChangeMarcarComoLida}
                      clickBtnNotificacoes={clickBtnNotificacoes}
                      toggleBtnNotificacoes={toggleBtnNotificacoes}
                      index={index}
                    />
                  ))}
                <hr />
                <div className="titulo">Outras Notificações</div>
                {notificacoes &&
                  notificacoes.length > 0 &&
                  notificacoes.map((notificacao, index) => (
                    <CardNotificacao
                      key={notificacao.uuid}
                      notificacao={notificacao}
                      handleChangeMarcarComoLida={handleChangeMarcarComoLida}
                      clickBtnNotificacoes={clickBtnNotificacoes}
                      toggleBtnNotificacoes={toggleBtnNotificacoes}
                      index={index}
                    />
                  ))}
              </div>
              <div className="row">
                <div className="col">
                  <Pagination
                    current={page}
                    total={total}
                    showSizeChanger={false}
                    onChange={nextPage}
                    pageSize={10}
                    className="float-left mt-4 mb-2"
                  />
                </div>
              </div>
            </>
          )}
          {total === 0 && (
            <div className="text-center mt-5">
              Não existe informação para os critérios de busca utilizados.
            </div>
          )}
        </div>
      </div>
    </Spin>
  );
};
