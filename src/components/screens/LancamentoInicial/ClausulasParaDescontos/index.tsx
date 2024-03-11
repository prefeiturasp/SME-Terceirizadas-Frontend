import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import { Filtros } from "./components/Filtros";
import { Paginacao } from "components/Shareable/Paginacao";
import {
  MEDICAO_INICIAL,
  CLAUSULAS_PARA_DESCONTOS,
  CADASTRO_DE_CLAUSULA,
  EDITAR_CLAUSULA,
} from "configs/constants";
import {
  ClausulaInterface,
  FiltrosInterface,
  ResponseClausulasInterface,
} from "interfaces/clausulas_para_descontos.interface";
import { getClausulasParaDescontos } from "services/medicaoInicial/clausulasParaDescontos.service";
import { getNumerosEditais } from "services/edital.service";
import "./styles.scss";

type Edital = {
  uuid: string;
  numero: string;
};

export function ClausulasParaDescontos() {
  const [clausulas, setClausulas] = useState<ClausulaInterface[]>([]);
  const [responseClausulas, setResponseClausulas] =
    useState<ResponseClausulasInterface>();
  const [editais, setEditais] = useState<Edital[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erroAPI, setErroAPI] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [filtros, setFiltros] = useState<FiltrosInterface>();

  const getClausulasAsync = async (
    page: number = null,
    filtros: FiltrosInterface = null
  ) => {
    try {
      const { data } = await getClausulasParaDescontos(page, filtros);
      setClausulas(data.results);
      setResponseClausulas(data);
    } catch (error) {
      setErroAPI(
        "Erro ao carregar cláusulas para descontos. Tente novamente mais tarde."
      );
    }
  };

  const getEditaisAsync = async () => {
    setCarregando(true);
    try {
      const { data } = await getNumerosEditais();
      setEditais(data.results);
    } catch (error) {
      setErroAPI("Erro ao carregar editais. Tente novamente mais tarde.");
    }
  };

  const requisicoesPreRender = async () => {
    await Promise.all([getClausulasAsync(), getEditaisAsync()]).then(() => {
      setCarregando(false);
    });
  };

  useEffect(() => {
    setPaginaAtual(1);
    requisicoesPreRender();
  }, []);

  const formataValor = (value: number) => {
    return (
      `${value}`
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        .replace(/\.(?=\d{0,2}$)/g, ",")
        .replace(/,00/, "") + "%"
    );
  };

  const onChangePage = async (page: number, filtros: FiltrosInterface) => {
    setPaginaAtual(page);
    setCarregando(true);
    await getClausulasAsync(page, filtros);
    setCarregando(false);
  };

  return (
    <div className="clausulas-desconto">
      {erroAPI && <div>{erroAPI}</div>}

      <Spin tip="Carregando..." spinning={carregando}>
        <div className="card mt-3">
          <div className="card-body">
            <Filtros
              onSubmit={async (values) => {
                setFiltros(values);
                onChangePage(1, values);
              }}
              onClear={() => {
                setFiltros({});
                onChangePage(1, {});
              }}
              editais={editais}
            />

            <div className="mt-4">
              <Link
                to={`/${MEDICAO_INICIAL}/${CLAUSULAS_PARA_DESCONTOS}/${CADASTRO_DE_CLAUSULA}/`}
                className="pt-4"
              >
                <Botao
                  texto="Cadastrar Cláusulas"
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.GREEN}
                />
              </Link>

              {clausulas.length === 0 && !carregando ? (
                <div className="text-center mt-4 mb-4">
                  Nenhum resultado encontrado
                </div>
              ) : (
                <div className="tabela-clausulas mt-4 mb-4">
                  <div className="titulo-tabela mt-5 mb-3">
                    Cláusulas Cadastradas
                  </div>

                  <table>
                    <thead>
                      <tr className="row">
                        <th className="col-3">Nº do Edital</th>
                        <th className="col-2">Cláusula</th>
                        <th className="col-1">Item</th>
                        <th className="col-4">Descrição</th>
                        <th className="col-1">% de Desconto</th>
                        <th className="col-1 text-center">Ações</th>
                      </tr>
                    </thead>

                    <tbody>
                      {clausulas.map((clausula) => (
                        <tr className="row" key={clausula.uuid}>
                          <td className="col-3">{clausula.edital.numero}</td>
                          <td className="col-2">{clausula.numero_clausula}</td>
                          <td className="col-1">{clausula.item_clausula}</td>
                          <td className="col-4">{clausula.descricao}</td>
                          <td className="col-1">
                            {formataValor(clausula.porcentagem_desconto)}
                          </td>
                          <td className="col-1 d-flex justify-content-center align-items-center">
                            <Link
                              to={`/${MEDICAO_INICIAL}/${CLAUSULAS_PARA_DESCONTOS}/${EDITAR_CLAUSULA}/?uuid=${clausula.uuid}`}
                            >
                              <span className="px-2">
                                <i
                                  title="Editar Cláusula"
                                  className="verde fas fa-edit"
                                />
                              </span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <Paginacao
                    onChange={(page: number) => onChangePage(page, filtros)}
                    total={responseClausulas?.count}
                    pageSize={responseClausulas?.page_size}
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
}
