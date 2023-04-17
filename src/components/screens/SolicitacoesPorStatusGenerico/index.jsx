import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { agregarDefault, getError } from "helpers/utilities";
import { Spin } from "antd";
import CardListarSolicitacoes from "components/Shareable/CardListarSolicitacoes";
import { ajustarFormatoLog } from "../helper";
import { Paginacao } from "components/Shareable/Paginacao";
import { Field, Form } from "react-final-form";
import InputText from "components/Shareable/Input/InputText";
import { OnChange } from "react-final-form-listeners";
import Select from "components/Shareable/Select";

export const SolicitacoesPorStatusGenerico = ({ ...props }) => {
  const {
    titulo,
    tipoCard,
    icone,
    getSolicitacoes,
    Legendas,
    tipoPaginacao,
    limit,
    lotes,
    listaStatus
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

  const onPageChanged = async (page, values) => {
    const params = TIPO_PAGINACAO
      ? { limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE }
      : { page };
    if (values.titulo && values.titulo.length > 2) {
      params["busca"] = values.titulo;
    }
    setTimeout(async () => {
      await getSolicitacoesAsync(params);
      setCurrentPage(page);
    }, 500);
  };

  useEffect(() => {
    getSolicitacoesAsync();
  }, []);

  let typingTimeout = null;

  return (
    <div className="card mt-3">
      <div className="card-body">
        {erro && <div>{erro}</div>}
        {!erro && (
          <Spin tip="Carregando..." spinning={loading}>
            {solicitacoes && (
              <Form onSubmit={onSubmit}>
                {({ handleSubmit, values }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div
                        className={`${
                          lotes && listaStatus
                            ? "offset-3"
                            : lotes || listaStatus
                            ? "offset-6"
                            : "offset-9"
                        } col-3`}
                      >
                        <Field
                          component={InputText}
                          name="titulo"
                          placeholder="Pesquisar"
                          disabled={props.disabled}
                        />
                        <div className="warning-num-charac">
                          * mínimo de 3 caracteres
                        </div>
                        <OnChange name="titulo">
                          {value => {
                            clearTimeout(typingTimeout);
                            typingTimeout = setTimeout(async () => {
                              getSolicitacoesAsync({
                                busca: value && value.length > 2 ? value : null,
                                status: values.status,
                                lote: values.lote,
                                ...PARAMS
                              });
                              setCurrentPage(1);
                            }, 1000);
                          }}
                        </OnChange>
                      </div>
                      {listaStatus && (
                        <div className="col-3">
                          <Field
                            component={Select}
                            options={listaStatus}
                            name="status"
                            placeholder="Conferência Status"
                            naoDesabilitarPrimeiraOpcao
                          />
                          <OnChange name="status">
                            {value => {
                              getSolicitacoesAsync({
                                status: value,
                                lote: values.lote,
                                busca:
                                  values.titulo && values.titulo.length > 2
                                    ? values.titulo
                                    : null,
                                ...PARAMS
                              });
                              setCurrentPage(1);
                            }}
                          </OnChange>
                        </div>
                      )}
                      {lotes && (
                        <div className="col-3">
                          <Field
                            component={Select}
                            options={agregarDefault(lotes)}
                            name="lote"
                            placeholder="Selecione um Lote"
                            naoDesabilitarPrimeiraOpcao
                          />
                          <OnChange name="lote">
                            {value => {
                              getSolicitacoesAsync({
                                lote: value,
                                status: values.status,
                                busca:
                                  values.titulo && values.titulo.length > 2
                                    ? values.titulo
                                    : null,
                                ...PARAMS
                              });
                              setCurrentPage(1);
                            }}
                          </OnChange>
                        </div>
                      )}
                    </div>
                    <CardListarSolicitacoes
                      titulo={titulo}
                      solicitacoes={solicitacoes}
                      tipo={tipoCard}
                      icone={icone}
                    />
                    <Paginacao
                      onChange={page => onPageChanged(page, values)}
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
