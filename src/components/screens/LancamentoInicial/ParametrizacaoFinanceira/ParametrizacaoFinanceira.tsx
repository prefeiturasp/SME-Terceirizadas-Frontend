import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { ADICIONAR_PARAMETRIZACAO_FINANCEIRA } from "configs/constants";

import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import { Spin } from "antd";
import CollapseFiltros from "components/Shareable/CollapseFiltros";
import Filtros from "./AdicionarParametrizacaoFinanceira/components/Filtros";
import { Paginacao } from "components/Shareable/Paginacao";

import {
  ParametrizacaoFinanceiraInterface,
  ParametrizacaoFinanceiraParams,
  ParametrizacaoFinanceiraResponse,
  TipoUnidade,
} from "services/medicaoInicial/parametrizacao_financeira.interface";
import ParametrizacaoFinanceiraService from "services/medicaoInicial/parametrizacao_financeira.service";

import "./styles.scss";

export default () => {
  const navigate = useNavigate();

  const [responseParametrizacoes, setResponseParametrizacoes] =
    useState<ParametrizacaoFinanceiraResponse>();
  const [parametrizacoes, setParametrizacoes] = useState<
    ParametrizacaoFinanceiraInterface[]
  >([]);
  const [erroAPI, setErroAPI] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [filtros, setFiltros] = useState<ParametrizacaoFinanceiraParams>();
  const [carregando, setCarregando] = useState(false);

  const getParametrizacoes = async (
    page: number = null,
    filtros: ParametrizacaoFinanceiraParams = null
  ) => {
    setCarregando(true);
    try {
      const response =
        await ParametrizacaoFinanceiraService.getParametrizacaoFinanceira(
          page,
          filtros
        );
      setResponseParametrizacoes(response);
      setParametrizacoes(response.results);
    } catch (error) {
      setErroAPI(
        "Erro ao carregar parametrizações financeiras. Tente novamente mais tarde."
      );
    } finally {
      setCarregando(false);
    }
  };

  const formataTiposUnidades = (tiposUnidades: TipoUnidade[]) => {
    return tiposUnidades.map((tipoUnidade) => tipoUnidade.iniciais).join(", ");
  };

  const onChangePage = async (
    page: number,
    filtros: ParametrizacaoFinanceiraParams
  ) => {
    setPaginaAtual(page);
    await getParametrizacoes(page, filtros);
  };

  useEffect(() => {
    getParametrizacoes();
  }, []);

  return (
    <div className="parametrizacao-financeira">
      {erroAPI && <div>{erroAPI}</div>}

      <Spin tip="Carregando..." spinning={carregando}>
        <div className="card mt-4">
          <div className="card-body">
            <CollapseFiltros
              onSubmit={async (values) => {
                setFiltros(values);
                onChangePage(1, values);
              }}
              onClear={() => {
                setFiltros({});
                onChangePage(1, {});
              }}
              titulo="Filtrar Resultados"
            >
              {() => <Filtros />}
            </CollapseFiltros>

            <div className="mt-4">
              <Botao
                texto="Adicionar Parametrização"
                titulo="Adicionar Parametrização"
                className="mt-4"
                onClick={() => navigate(ADICIONAR_PARAMETRIZACAO_FINANCEIRA)}
                style={BUTTON_STYLE.GREEN}
                type={BUTTON_TYPE.BUTTON}
              />

              {parametrizacoes.length === 0 && !carregando ? (
                <div className="text-center mt-4 mb-4">
                  Nenhum resultado encontrado
                </div>
              ) : (
                <div className="tabela mt-4 mb-4">
                  <div className="titulo-tabela mt-5 mb-3">
                    Parametrizações Cadastradas
                  </div>

                  <table>
                    <thead>
                      <tr className="row">
                        <th className="col-3">Edital</th>
                        <th className="col-4">DRE</th>
                        <th className="col-1">Lote</th>
                        <th className="col-4">Tipo de Unidade</th>
                      </tr>
                    </thead>

                    <tbody>
                      {parametrizacoes.map((parametrizacao) => (
                        <tr className="row" key={parametrizacao.uuid}>
                          <td className="col-3">
                            {parametrizacao.edital.numero}
                          </td>
                          <td className="col-4">{parametrizacao.dre}</td>
                          <td className="col-1">{parametrizacao.lote.nome}</td>
                          <td className="col-4">
                            {formataTiposUnidades(
                              parametrizacao.tipos_unidades
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <Paginacao
                    onChange={(page: number) => onChangePage(page, filtros)}
                    total={responseParametrizacoes?.count}
                    pageSize={responseParametrizacoes?.page_size}
                    current={paginaAtual}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
};
