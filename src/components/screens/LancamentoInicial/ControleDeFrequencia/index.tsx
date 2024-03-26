import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { Filtros } from "./components/Filtros/Index";
import {
  getFiltros,
  getMesesAnos,
  getTotalAlunosMatriculados,
} from "services/medicaoInicial/controleDeFrequencia.service";
import { adicionaDias, formataData } from "helpers/utilities";
import { MESES } from "constants/shared";
import "./styles.scss";

type MesAno = {
  mes: number;
  ano: number;
};

type Periodo = {
  uuid: string;
  nome: string;
};

type FiltrosProps = {
  data_inicial?: string;
  data_final?: string;
  periodos?: string[];
  mes_ano?: string;
};

export function ControleDeFrequencia() {
  const [mesesAnos, setMesesAnos] = useState<MesAno[]>([]);
  const [periodos, setPeriodos] = useState<Periodo[]>([]);
  const [erroAPI, setErroAPI] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [filtros, setFiltros] = useState<FiltrosProps>({});
  const [totalAlunosPorPeriodo, setTotalAlunosPorPeriodo] =
    useState<Record<string, number>>(null);
  const [totalMatriculados, setTotalMatriculados] = useState(0);

  const getMesesAnosAsync = async () => {
    setCarregando(true);
    try {
      const { data } = await getMesesAnos();
      setMesesAnos(data.results);
    } catch (error) {
      setErroAPI(
        "Erro ao carregar meses de referência. Tente novamente mais tarde."
      );
    } finally {
      setCarregando(false);
    }
  };

  const getFiltrosAsync = async (mesSelecionado: string) => {
    const [mes, ano] = mesSelecionado.split("_");
    setCarregando(true);
    try {
      const { data } = await getFiltros(mes, ano);
      setPeriodos(data.periodos);
      setDataInicial(data.data_inicial);
      setDataFinal(data.data_final);
    } catch (error) {
      setErroAPI("Erro ao carregar períodos. Tente novamente mais tarde.");
    } finally {
      setCarregando(false);
    }
  };

  const validaPeriodos = (valores: string[]) => {
    if (!valores) {
      return JSON.stringify(periodos.map((periodo) => periodo.uuid));
    }
    return JSON.stringify(valores);
  };

  const validaDatas = (data_inicial: string, data_final: string) => {
    if (!data_inicial && !data_final) {
      return {
        data_inicial: dataInicial,
        data_final: dataFinal,
      };
    } else if (data_inicial && !data_final) {
      return {
        data_inicial,
        data_final: adicionaDias(data_inicial, "YYYY-MM-DD", 1),
      };
    } else if (!data_inicial && data_final) {
      return {
        data_inicial: data_final,
        data_final: adicionaDias(data_final, "YYYY-MM-DD", 1),
      };
    } else {
      return {
        data_inicial,
        data_final,
      };
    }
  };

  const getAlunosMatriculados = async (filtros: FiltrosProps) => {
    setCarregando(true);
    try {
      const periodos = validaPeriodos(filtros.periodos);
      const datas = validaDatas(filtros.data_inicial, filtros.data_final);
      const params = {
        periodos,
        ...datas,
      };
      const { data } = await getTotalAlunosMatriculados(params);
      setTotalAlunosPorPeriodo(data.periodos);
      setTotalMatriculados(data.total_matriculados);
    } catch (error) {
      setErroAPI(
        "Erro ao carregar os dados dos alunos matriculados. Tente novamente mais tarde."
      );
    } finally {
      setCarregando(false);
    }
  };

  const getTitulo = () => {
    const dataInicialFormatada = formataData(
      filtros.data_inicial,
      "YYYY-MM-DD",
      "DD/MM/YYYY"
    );
    const dataFinalFormatada = formataData(
      filtros.data_final,
      "YYYY-MM-DD",
      "DD/MM/YYYY"
    );

    if (filtros.data_inicial && filtros.data_final) {
      return `ENTRE ${dataInicialFormatada} E ${dataFinalFormatada}`;
    } else if (filtros.data_inicial || filtros.data_final) {
      return `EM ${dataInicialFormatada || dataFinalFormatada}`;
    } else {
      return "";
    }
  };

  const mesAnoFiltrado = filtros.mes_ano ? filtros.mes_ano.split("_") : null;

  useEffect(() => {
    getMesesAnosAsync();
  }, []);

  return (
    <div className="controle-de-frequencia">
      {erroAPI && <div>{erroAPI}</div>}

      <Spin tip="Carregando..." spinning={carregando}>
        {!erroAPI ? (
          <div className="card mt-3">
            <div className="card-body">
              <Filtros
                onSubmit={(values) => {
                  setFiltros(values);
                  getAlunosMatriculados(values);
                }}
                onClear={() => {
                  setFiltros({});
                  setTotalAlunosPorPeriodo(null);
                  setTotalMatriculados(0);
                }}
                mesesAnos={mesesAnos}
                periodos={periodos}
                getOpcoesFiltros={getFiltrosAsync}
                dataInicial={dataInicial}
                dataFinal={dataFinal}
              />

              <div className="mt-4">
                {totalMatriculados === 0 && !carregando && filtros.mes_ano && (
                  <div className="text-center mt-4 mb-4">
                    Nenhum resultado encontrado
                  </div>
                )}
                {totalMatriculados !== 0 && (
                  <div className="mt-4 mb-4">
                    <div className="container-titulo mt-4 mb-3">
                      <p>{`TOTAL DE MATRICULADOS NA UNIDADE ${getTitulo()}:`}</p>
                      <span className="card-total">{totalMatriculados}</span>
                    </div>

                    {Object.entries(totalAlunosPorPeriodo).map(
                      ([index, valor]) => {
                        return (
                          <div key={index} className="row container-cards mb-4">
                            <div
                              className={`card-total-matriculados-periodo periodo-${index.trim()}`}
                            >
                              <p>
                                MATRICULADOS <strong>PERÍODO {index}</strong>
                              </p>
                              <span className="card-total">{valor}</span>
                            </div>

                            <div className="mes-ano">
                              {`Mês: ${MESES[
                                Number(mesAnoFiltrado[0]) - 1
                              ].toUpperCase()}/${mesAnoFiltrado[1]}`}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </Spin>
    </div>
  );
}
