import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { getError } from "helpers/utilities";
import { Spin } from "antd";
import CardListarSolicitacoes from "components/Shareable/CardListarSolicitacoes";
import { ajustarFormatoLog } from "../helper";
import { Paginacao } from "components/Shareable/Paginacao";
import { Field, Form } from "react-final-form";
import InputText from "components/Shareable/Input/InputText";
import { OnChange } from "react-final-form-listeners";

export const SolicitacoesPorStatusGenerico = ({ ...props }) => {
  const {
    titulo,
    tipoCard,
    icone,
    getSolicitacoes,
    Legendas,
    tipoPaginacao,
    limit
  } = props;

  const [solicitacoes, setSolicitacoes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [erro, setErro] = useState("");

  const PAGE_SIZE = limit || 100;
  const TIPO_PAGINACAO = tipoPaginacao || "OFFSET";
  const PARAMS = TIPO_PAGINACAO
    ? { limit: PAGE_SIZE, offset: 0 }
    : { page: currentPage };

  const getSolicitacoesAsync = async (params = null) => {
    const response = await getSolicitacoes(params || PARAMS);
    if (response.status === HTTP_STATUS.OK) {
      setSolicitacoes(ajustarFormatoLog(response.data.results));
      setCount(response.data.count);
      setLoading(false);
    } else {
      setErro(getError(response.data));
      setLoading(false);
    }
  };

  const onSubmit = async () => {};

  const onPageChanged = async page => {
    const params = TIPO_PAGINACAO
      ? { limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE }
      : { page };
    getSolicitacoesAsync(params);
    setCurrentPage(page);
  };

  useEffect(() => {
    getSolicitacoesAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card mt-3">
      <div className="card-body">
        {erro && <div>{erro}</div>}
        {!erro && (
          <Spin tip="Carregando..." spinning={loading}>
            {solicitacoes && (
              <Form onSubmit={onSubmit}>
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-12 float-right">
                        <Field
                          component={InputText}
                          name="titulo"
                          placeholder="Pesquisar"
                          className="offset-9 col-3"
                          disabled={props.disabled}
                        />
                        <div className="warning-num-charac">
                          * mínimo de 3 caracteres
                        </div>
                        <OnChange name="titulo">
                          {value => {
                            if (value && value.length > 2) {
                              getSolicitacoesAsync({
                                busca: value,
                                ...PARAMS
                              });
                              setCurrentPage(1);
                            } else {
                              getSolicitacoesAsync(PARAMS);
                              setCurrentPage(1);
                            }
                          }}
                        </OnChange>
                      </div>
                    </div>
                    <CardListarSolicitacoes
                      titulo={titulo}
                      solicitacoes={solicitacoes}
                      tipo={tipoCard}
                      icone={icone}
                    />
                    <Paginacao
                      onChange={onPageChanged}
                      total={count}
                      pageSize={PAGE_SIZE}
                      current={currentPage}
                    />
                  </form>
                )}
              </Form>
            )}

            <Legendas />
          </Spin>
        )}
      </div>
    </div>
  );
};
