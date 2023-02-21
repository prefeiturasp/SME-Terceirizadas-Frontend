import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import HTTP_STATUS from "http-status-codes";
import { Spin } from "antd";
import CardListarSolicitacoesCronograma from "components/Shareable/CardListarSolicitacoesCronograma";
import { Paginacao } from "components/Shareable/Paginacao";
import { gerarLinkDoItem } from "components/screens/helper";

const gerarPayloadSolicitacao = itens => {
  return itens.map(item => ({
    empresa: item.empresa,
    numero: item.numero,
    produto: item.produto,
    data: item.log_mais_recente,
    link: gerarLinkDoItem(item)
  }));
};

export const Solicitacoes = ({ ...props }) => {
  const { getSolicitacoes, params, limit, titulo, icone, cardType } = props;
  const [solicitacoes, setSolicitacoes] = useState(null);
  const [erro, setErro] = useState("");
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = limit || 100;

  const getSolicitacoesAsync = async params => {
    const response = await getSolicitacoes(params);
    if (response.status === HTTP_STATUS.OK) {
      let solicitacoes_new = response.data.results
        .map(solicitacao => solicitacao.dados)
        .map(dado => dado)[0];
      solicitacoes_new = gerarPayloadSolicitacao(solicitacoes_new);
      setSolicitacoes(solicitacoes_new);
      setCount(response.data.results[0].total);
    } else {
      setErro(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    setCurrentPage(1);
    getSolicitacoesAsync(params);
  }, []);

  const onPageChanged = async page => {
    const paramsPage = { limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE };
    let newParams = Object.assign({}, params, paramsPage);
    setLoading(true);
    await getSolicitacoesAsync(newParams);
    setCurrentPage(page);
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        {erro && <div>{erro}</div>}
        {!erro && (
          <Spin tip="Carregando..." spinning={loading}>
            <CardListarSolicitacoesCronograma
              titulo={titulo}
              icone={icone}
              tipo={cardType}
              solicitacoes={solicitacoes}
            />
            <Paginacao
              onChange={page => onPageChanged(page)}
              total={count}
              pageSize={PAGE_SIZE}
              current={currentPage}
            />
          </Spin>
        )}
      </div>
    </div>
  );
};
