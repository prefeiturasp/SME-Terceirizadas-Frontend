import React, { useEffect, useState } from "react";

import { getLotesSimples } from "services/lote.service";
import { getGrupoUnidadeEscolar } from "services/escola.service";
import { getMesesAnosSolicitacoesMedicaoinicial } from "services/medicaoInicial/dashboard.service";
import { getRelatoriosFinanceiros } from "services/medicaoInicial/relatorioFinanceiro.service";
import {
  FiltrosInterface,
  RelatorioFinanceiroInterface,
  RelatorioFinanceiroResponse,
} from "interfaces/relatorio_financeiro.interface";

import { Spin } from "antd";
import { Filtros } from "./components/Filtros/Index";
import { toastError } from "components/Shareable/Toast/dialogs";
import { Paginacao } from "components/Shareable/Paginacao";

import { MESES } from "constants/shared";
import { STATUS_RELATORIO_FINANCEIRO } from "../constants";
import "./styles.scss";

type SelectOption = {
  uuid: string;
  nome: string;
};

type MultiSelectOption = {
  value: string;
  label: string;
};

export function RelatorioFinanceiro() {
  const [lotes, setLotes] = useState<MultiSelectOption[]>([]);
  const [gruposUnidadeEscolar, setGruposUnidadeEscolar] = useState<
    SelectOption[]
  >([]);
  const [mesesAnos, setMesesAnos] = useState<SelectOption[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [filtros, setFiltros] = useState<FiltrosInterface>({});
  const [relatoriosFinanceiros, setRelatoriosFinanceiros] = useState<
    RelatorioFinanceiroInterface[]
  >([]);
  const [relatoriosFinanceirosResponse, setResponseEmpenhosResponse] =
    useState<RelatorioFinanceiroResponse>();
  const [paginaAtual, setPaginaAtual] = useState(1);

  const getLotesAsync = async () => {
    try {
      const { data } = await getLotesSimples();
      const lotesOrdenados = data.results.sort((loteA, loteB) => {
        return loteA.diretoria_regional.nome < loteB.diretoria_regional.nome;
      });
      const lotes = lotesOrdenados.map((lote) => {
        return {
          value: lote.uuid,
          label: `${lote.nome} - ${lote.diretoria_regional.nome}`,
        };
      });
      setLotes(lotes);
    } catch (error) {
      toastError("Erro ao carregar lotes. Tente novamente mais tarde.");
    }
  };

  const getGruposUnidades = async () => {
    try {
      const { data } = await getGrupoUnidadeEscolar();
      const tiposUnidades = data.results.map((grupo) => ({
        uuid: grupo.uuid,
        nome: grupo.tipos_unidades
          ?.map((unidade) => unidade.iniciais)
          .join(", "),
      }));

      setGruposUnidadeEscolar(
        [
          {
            uuid: "",
            nome: "Selecione o tipo de UE",
          },
        ].concat(tiposUnidades)
      );
    } catch (error) {
      toastError(
        "Erro ao carregar tipos de unidade escolar. Tente novamente mais tarde."
      );
    }
  };

  const getMesesAnosAsync = async () => {
    try {
      const { data } = await getMesesAnosSolicitacoesMedicaoinicial({
        status: "MEDICAO_APROVADA_PELA_CODAE",
      });
      const mesesAnos = data.results.map((mesAno) => ({
        uuid: `${mesAno.mes}_${mesAno.ano}`,
        nome: `${MESES[parseInt(mesAno.mes) - 1]} de ${mesAno.ano}`,
      }));
      setMesesAnos(
        [
          {
            uuid: "",
            nome: "Selecione o mês de referência",
          },
        ].concat(mesesAnos)
      );
    } catch (error) {
      toastError(
        "Erro ao carregar meses de referência. Tente novamente mais tarde."
      );
    }
  };

  const getRelatoriosFinanceirosAsync = async (
    page: number = null,
    filtros: FiltrosInterface = null
  ) => {
    try {
      filtros = { ...filtros, lote: filtros?.lote?.toString() };

      const { data } = await getRelatoriosFinanceiros(page, filtros);

      setRelatoriosFinanceiros(data.results);
      setResponseEmpenhosResponse(data);
    } catch (error) {
      toastError(
        "Erro ao carregar relatórios financeiros. Tente novamente mais tarde."
      );
    }
  };

  const requisicoesPreRender = async (): Promise<void> => {
    Promise.all([
      getLotesAsync(),
      getGruposUnidades(),
      getMesesAnosAsync(),
      getRelatoriosFinanceirosAsync(),
    ]).then(() => {
      setCarregando(false);
    });
  };

  useEffect(() => {
    setPaginaAtual(1);
    requisicoesPreRender();
  }, []);

  const onChangePage = async (page: number, filtros: FiltrosInterface) => {
    setPaginaAtual(page);
    setCarregando(true);
    await getRelatoriosFinanceirosAsync(page, filtros);
    setCarregando(false);
  };

  return (
    <div className="relatorio-financeiro">
      <Spin tip="Carregando..." spinning={carregando}>
        <div className="card mt-3">
          <div className="card-body">
            <Filtros
              onSubmit={(values) => {
                setFiltros(values);
                onChangePage(1, values);
              }}
              onClear={() => {
                setFiltros({});
                onChangePage(1, {});
              }}
              lotes={lotes}
              gruposUnidadeEscolar={gruposUnidadeEscolar}
              mesesAnos={mesesAnos}
            />

            <div className="mt-4">
              {relatoriosFinanceiros.length === 0 && !carregando ? (
                <div className="text-center mt-4 mb-4">
                  Nenhum resultado encontrado
                </div>
              ) : (
                <div className="tabela-relatorios-financeiros mt-4 mb-4">
                  <div className="titulo-tabela mt-5 mb-3">
                    Resultados da Pesquisa
                  </div>

                  <table>
                    <thead>
                      <tr className="row">
                        <th className="col-4">DRE</th>
                        <th className="col-3">Tipo de UE</th>
                        <th className="col-1 text-center">Lote</th>
                        <th className="col-2 text-center">Mês de Referência</th>
                        <th className="col-2 text-center">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {relatoriosFinanceiros.map((relatorioFinanceiro) => (
                        <tr key={relatorioFinanceiro.uuid} className="row">
                          <td className="col-4">
                            {relatorioFinanceiro.lote.diretoria_regional.nome}
                          </td>
                          <td className="col-3">
                            {relatorioFinanceiro.grupo_unidade_escolar.tipos_unidades
                              .map((unidade) => unidade.iniciais)
                              .join(", ")}
                          </td>
                          <td className="col-1 text-center">
                            {relatorioFinanceiro.lote.nome}
                          </td>
                          <td className="col-2 text-center">{`${
                            MESES[parseInt(relatorioFinanceiro.mes) - 1]
                          } de ${relatorioFinanceiro.ano}`}</td>
                          <td className="col-2 text-center">
                            {
                              STATUS_RELATORIO_FINANCEIRO[
                                relatorioFinanceiro.status
                              ]
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <Paginacao
                    onChange={(page: number) => onChangePage(page, filtros)}
                    total={relatoriosFinanceirosResponse?.count}
                    pageSize={relatoriosFinanceirosResponse?.page_size}
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
