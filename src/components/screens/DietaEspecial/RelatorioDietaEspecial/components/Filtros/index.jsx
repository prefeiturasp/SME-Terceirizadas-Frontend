import moment from "moment";
import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { InputComData } from "components/Shareable/DatePicker";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import "./styles.scss";
import {
  OPTIONS_STATUS_DIETA,
  STATUS_DIETAS,
  TIPO_USUARIO
} from "constants/shared";
import Select from "components/Shareable/Select";
import { meusDados } from "services/perfil.service";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import {
  formataLotes,
  formataClassificacoes,
  formataProtocolos
} from "helpers/terceirizadas";
import {
  gerarExcelRelatorioDietaEspecial,
  getSolicitacoesRelatorioDietasEspeciais
} from "services/dietaEspecial.service";
import { Spin } from "antd";
import { Button } from "react-bootstrap";
import { toastError } from "components/Shareable/Toast/dialogs";

const BuscaDietasForm = ({
  setCarregando,
  setDietasFiltradas,
  setStatusSelecionado,
  setFiltragemRealizada,
  reset
}) => {
  const [dietasEspeciais, setDietasEspeciais] = useState([]);
  const [mostrarFiltrosAutorizadas, setMostrarFiltrosAutorizadas] = useState(
    false
  );
  const [mostrarFiltrosCanceladas, setMostrarFiltrosCanceladas] = useState(
    false
  );
  const [carregandoFiltros, setCarregandoFiltros] = useState(false);
  const [terceirizadaUuid, setTerceirizadaUuid] = useState(null);
  const [dataInicial, setDataInicial] = useState(null);
  const [dataFinal, setDataFinal] = useState(null);
  const [lotesInicio, setLotesInicio] = useState([]);
  const [lotesNoFiltro, setLotesNoFiltro] = useState([]);
  const [lotesSelecionados, setLotesSelecionados] = useState([]);
  const [protocolosInicio, setProtocolosInicio] = useState([]);
  const [protocolosNoFiltro, setProtocolosNoFiltro] = useState([]);
  const [protocolosSelecionados, setProtocolosSelecionados] = useState([]);
  const [classificacoesInicio, setClassificacoesInicio] = useState([]);
  const [classificacoesNoFiltro, setClassificacoesNoFiltro] = useState([]);
  const [classificacoesSelecionadas, setClassificacoesSelecionadas] = useState(
    []
  );

  const getMeusDados = async () => {
    setCarregando(true);
    const response = await meusDados();
    if (
      response.tipo_usuario &&
      response.tipo_usuario.toString() === TIPO_USUARIO.TERCEIRIZADA
    ) {
      setTerceirizadaUuid(response.vinculo_atual.instituicao.uuid);
      setCarregando(false);
    }
  };

  const exportarXLSX = () => {
    const params = {
      status: mostrarFiltrosAutorizadas ? "AUTORIZADAS" : "CANCELADAS",
      lotes: lotesSelecionados.join(),
      classificacoes: classificacoesSelecionadas.join(),
      protocolos: protocolosSelecionados.join(),
      terceirizada_uuid: terceirizadaUuid
    };
    gerarExcelRelatorioDietaEspecial(params)
      .then(() => {})
      .catch(error => {
        error.response.data.text().then(text => toastError(text));
      });
  };

  useEffect(() => {
    getMeusDados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lotesRelacionadosADietas = dietas => {
    let lotesRelacionados = [];
    dietas.forEach(dieta => {
      !(
        lotesRelacionados.filter(lote => lote.uuid === dieta.rastro_lote.uuid)
          .length > 0
      ) && lotesRelacionados.push(dieta.rastro_lote);
    });
    const lotesFormatados = formataLotes(lotesRelacionados);
    setLotesInicio(lotesFormatados);
    setLotesNoFiltro(lotesFormatados);
  };

  const classificacoesRelacionadasADietas = dietas => {
    let classificacoesRelacionadas = [];
    dietas
      .filter(dieta => dieta.classificacao)
      .forEach(dieta => {
        !(
          classificacoesRelacionadas.filter(
            classificacao => classificacao.id === dieta.classificacao.id
          ).length > 0
        ) && classificacoesRelacionadas.push(dieta.classificacao);
      });
    const classificacoesFormatadas = formataClassificacoes(
      classificacoesRelacionadas
    );
    setClassificacoesInicio(classificacoesFormatadas);
    setClassificacoesNoFiltro(classificacoesFormatadas);
  };

  const protocolosRelacionadosADietas = dietas => {
    let protocolosRelacionadas = [];
    dietas.forEach(dieta => {
      if (dieta.protocolo_padrao) {
        !(
          protocolosRelacionadas.filter(
            protocolo => protocolo.uuid === dieta.protocolo_padrao.uuid
          ).length > 0
        ) && protocolosRelacionadas.push(dieta.protocolo_padrao);
      } else {
        !(
          protocolosRelacionadas.filter(
            protocolo => protocolo === dieta.nome_protocolo
          ).length > 0
        ) && protocolosRelacionadas.push(dieta.nome_protocolo);
      }
    });
    const protocolosFormatados = formataProtocolos(protocolosRelacionadas);
    setProtocolosInicio(protocolosFormatados);
    setProtocolosNoFiltro(protocolosFormatados);
  };

  const onChangeStatus = async value => {
    const data = { terceirizada_uuid: terceirizadaUuid };
    setCarregandoFiltros(true);
    setLotesNoFiltro([]);
    setLotesSelecionados([]);
    setClassificacoesNoFiltro([]);
    setClassificacoesSelecionadas([]);
    setProtocolosNoFiltro([]);
    setProtocolosSelecionados([]);
    setStatusSelecionado(true);
    if (value.toUpperCase() === STATUS_DIETAS.AUTORIZADAS.toUpperCase()) {
      data["status"] = value;
      const response = await getSolicitacoesRelatorioDietasEspeciais(data);
      const dietasAutorizadas = response.data;
      lotesRelacionadosADietas(dietasAutorizadas);
      classificacoesRelacionadasADietas(dietasAutorizadas);
      protocolosRelacionadosADietas(dietasAutorizadas);
      setDietasEspeciais(response.data);
      setMostrarFiltrosAutorizadas(true);
      setMostrarFiltrosCanceladas(false);
      setCarregandoFiltros(false);
    }
    if (value.toUpperCase() === STATUS_DIETAS.CANCELADAS.toUpperCase()) {
      data["status"] = value;
      const response = await getSolicitacoesRelatorioDietasEspeciais(data);
      const dietasCanceladas = response.data;
      lotesRelacionadosADietas(dietasCanceladas);
      classificacoesRelacionadasADietas(dietasCanceladas);
      protocolosRelacionadosADietas(dietasCanceladas);
      setDietasEspeciais(response.data);
      setMostrarFiltrosCanceladas(true);
      setMostrarFiltrosAutorizadas(false);
      setCarregandoFiltros(false);
    }
  };

  const renderizarLabelLote = (selected, options) => {
    if (selected.length === 0) {
      return "Selecione";
    }
    if (selected.length === options.length) {
      return "Todos os lotes selecionados";
    }
    if (selected.length === 1) {
      return `${selected.length} lote selecionado`;
    }
    return `${selected.length} lotes selecionados`;
  };

  const onChangeLotesSelecionados = values => {
    setLotesSelecionados(values);
    let classificacoesFiltradasPorProtocolos = [];
    let protocolosFiltradosPorClassificacoes = [];

    values.forEach(value => {
      classificacoesFiltradasPorProtocolos.push(
        dietasEspeciais
          .filter(
            dieta => dieta.rastro_lote.uuid === value && dieta.classificacao
          )
          .map(dieta => dieta.classificacao.id)
      );
      dietasEspeciais
        .filter(dieta => dieta.rastro_lote.uuid === value)
        .map(dieta => dieta.nome_protocolo)
        .forEach(protocolo => {
          protocolosFiltradosPorClassificacoes.push(protocolo);
        });
    });

    classificacoesFiltradasPorProtocolos = [
      ...new Set(classificacoesFiltradasPorProtocolos[0])
    ];
    protocolosFiltradosPorClassificacoes = [
      ...new Set(protocolosFiltradosPorClassificacoes)
    ];

    if (values.length === 0) {
      setClassificacoesNoFiltro(classificacoesInicio);
      setProtocolosNoFiltro(protocolosInicio);
      return;
    }

    const classificacoesFiltradas = classificacoesInicio.filter(
      classificacao => {
        return (
          classificacoesFiltradasPorProtocolos.includes(classificacao.value) &&
          classificacao
        );
      }
    );
    const protocolosFiltrados = protocolosInicio.filter(protocolo => {
      return (
        protocolosFiltradosPorClassificacoes.includes(protocolo.value) &&
        protocolo
      );
    });

    setClassificacoesNoFiltro(classificacoesFiltradas);
    setProtocolosNoFiltro(protocolosFiltrados);
  };

  const renderizarLabelClassificacao = (selected, options) => {
    if (selected.length === 0) {
      return "Selecione";
    }
    if (selected.length === options.length) {
      return "Todas classificações selecionadas";
    }
    if (selected.length === 1) {
      return `${selected.length} classificação selecionada`;
    }
    return `${selected.length} classificações selecionadas`;
  };

  const onChangeClassificacoesSelecionadas = values => {
    setClassificacoesSelecionadas(values);
    let protocolosFiltradosPorClassificacoes = [];
    let lotesFiltradosPorProtocolos = [];

    values.forEach(value => {
      dietasEspeciais
        .filter(
          dieta => dieta.classificacao && dieta.classificacao.id === value
        )
        .map(dieta => dieta.nome_protocolo)
        .forEach(protocolo => {
          protocolosFiltradosPorClassificacoes.push(protocolo);
        });
      dietasEspeciais
        .filter(
          dieta => dieta.classificacao && dieta.classificacao.id === value
        )
        .map(dieta => dieta.rastro_lote.nome)
        .forEach(lote => {
          lotesFiltradosPorProtocolos.push(lote);
        });
    });

    protocolosFiltradosPorClassificacoes = [
      ...new Set(protocolosFiltradosPorClassificacoes)
    ];
    lotesFiltradosPorProtocolos = [...new Set(lotesFiltradosPorProtocolos)];

    if (values.length === 0) {
      setProtocolosNoFiltro(protocolosInicio);
      setLotesNoFiltro(lotesInicio);
      return;
    }

    const protocolosFiltrados = protocolosInicio.filter(protocolo => {
      return (
        protocolosFiltradosPorClassificacoes.includes(protocolo.value) &&
        protocolo
      );
    });
    const lotesFiltrados = lotesInicio.filter(lote => {
      return lotesFiltradosPorProtocolos.includes(lote.label) && lote;
    });

    setProtocolosNoFiltro(protocolosFiltrados);
    setLotesNoFiltro(lotesFiltrados);
  };

  const renderizarLabelProtocolo = (selected, options) => {
    if (selected.length === 0) {
      return "Selecione";
    }
    if (selected.length === options.length) {
      return "Todos os protocolos selecionados";
    }
    if (selected.length === 1) {
      return `${selected.length} protocolo selecionado`;
    }
    return `${selected.length} protocolos selecionados`;
  };

  const onChangeProtocolosSelecionados = values => {
    setProtocolosSelecionados(values);
    let classificacoesFiltradasPorProtocolos = [];
    let lotesFiltradosPorProtocolos = [];

    values.forEach(value => {
      classificacoesFiltradasPorProtocolos.push(
        dietasEspeciais
          .filter(dieta => dieta.nome_protocolo === value)
          .map(dieta => dieta.classificacao.id)[0]
      );
      dietasEspeciais
        .filter(dieta => dieta.nome_protocolo === value)
        .map(dieta => dieta.rastro_lote.nome)
        .forEach(lote => {
          lotesFiltradosPorProtocolos.push(lote);
        });
    });

    classificacoesFiltradasPorProtocolos = [
      ...new Set(classificacoesFiltradasPorProtocolos)
    ];
    lotesFiltradosPorProtocolos = [...new Set(lotesFiltradosPorProtocolos)];

    if (values.length === 0) {
      setClassificacoesNoFiltro(classificacoesInicio);
      setLotesNoFiltro(lotesInicio);
      return;
    }

    const classificacoesFiltradas = classificacoesInicio.filter(
      classificacao => {
        return (
          classificacoesFiltradasPorProtocolos.includes(classificacao.value) &&
          classificacao
        );
      }
    );
    const lotesFiltrados = lotesInicio.filter(lote => {
      return lotesFiltradosPorProtocolos.includes(lote.label) && lote;
    });

    setClassificacoesNoFiltro(classificacoesFiltradas);
    setLotesNoFiltro(lotesFiltrados);
  };

  const limparFiltros = () => {
    reset();
    setDataInicial(null);
    setDataFinal(null);
    setLotesSelecionados([]);
    setClassificacoesSelecionadas([]);
    setProtocolosSelecionados([]);
    setMostrarFiltrosAutorizadas(false);
    setMostrarFiltrosCanceladas(false);
    setDietasFiltradas([]);
    setStatusSelecionado(false);
    setFiltragemRealizada(false);
  };

  let dietasEspeciaisCopy = [...dietasEspeciais];

  const gerarTabela = () => {
    setDietasFiltradas(dietasEspeciaisCopy);
    setFiltragemRealizada(true);
    if (lotesSelecionados.length) {
      dietasEspeciaisCopy = dietasEspeciaisCopy.filter(dieta =>
        lotesSelecionados.includes(dieta.rastro_lote.uuid)
      );
    }
    if (classificacoesSelecionadas.length) {
      dietasEspeciaisCopy = dietasEspeciaisCopy.filter(dieta =>
        classificacoesSelecionadas.includes(dieta.classificacao.id)
      );
    }
    if (protocolosSelecionados.length) {
      dietasEspeciaisCopy = dietasEspeciaisCopy.filter(dieta =>
        protocolosSelecionados.includes(dieta.nome_protocolo)
      );
    }
    setDietasFiltradas(dietasEspeciaisCopy);
    if (dataInicial && dataFinal) {
      dietasEspeciaisCopy = dietasEspeciaisCopy.filter(dieta =>
        moment(dieta.data_ultimo_log, "DD/MM/YYYY").isBetween(
          moment(dataInicial, "DD/MM/YYYY"),
          moment(dataFinal, "DD/MM/YYYY"),
          null,
          "[]"
        )
      );
      setDietasFiltradas(dietasEspeciaisCopy);
      return;
    }
    if (dataInicial) {
      dietasEspeciaisCopy = dietasEspeciaisCopy.filter(dieta =>
        moment(dieta.data_ultimo_log, "DD/MM/YYYY").isSameOrAfter(
          moment(dataInicial, "DD/MM/YYYY")
        )
      );
      setDietasFiltradas(dietasEspeciaisCopy);
      return;
    }
    if (dataFinal) {
      dietasEspeciaisCopy = dietasEspeciaisCopy.filter(dieta =>
        moment(dieta.data_ultimo_log, "DD/MM/YYYY").isSameOrBefore(
          moment(dataFinal, "DD/MM/YYYY")
        )
      );
      setDietasFiltradas(dietasEspeciaisCopy);
      return;
    }
  };

  return (
    <Spin tip="Carregando filtros..." spinning={carregandoFiltros}>
      <div className="filtros-relatorio-dietas">
        <form>
          <div className="row">
            <div className="col-4">
              <Field
                label="Status:"
                component={Select}
                placeholder="Selecione o Status"
                name="status"
                options={OPTIONS_STATUS_DIETA}
                onChange={event => onChangeStatus(event.target.value)}
              />
            </div>
            {mostrarFiltrosCanceladas && (
              <>
                <div className="col-4">
                  <Field
                    component={InputComData}
                    label="Período de:"
                    name="data_inicial"
                    placeholder="Selecione"
                    minDate={null}
                    maxDate={
                      dataFinal
                        ? moment(dataFinal, "DD/MM/YYYY")._d
                        : moment()._d
                    }
                    onChange={value => {
                      value
                        ? setDataInicial(
                            moment(value, "DD/MM/YYYY").format("DD/MM/YYYY")
                          )
                        : setDataInicial(null);
                    }}
                  />
                </div>
                <div className="col-4">
                  <Field
                    component={InputComData}
                    label="Até:"
                    name="data_final"
                    placeholder="Selecione"
                    minDate={
                      dataInicial ? moment(dataInicial, "DD/MM/YYYY")._d : null
                    }
                    maxDate={new Date()}
                    onChange={value =>
                      value
                        ? setDataFinal(
                            moment(value, "DD/MM/YYYY").format("DD/MM/YYYY")
                          )
                        : setDataFinal(null)
                    }
                  />
                </div>
              </>
            )}
          </div>

          {(mostrarFiltrosAutorizadas || mostrarFiltrosCanceladas) && (
            <>
              <div className="row">
                <div className="col-4">
                  <label className="label font-weight-normal pb-2 pt-2">
                    Lote:
                  </label>
                  {lotesNoFiltro.length ? (
                    <Field
                      component={StatefulMultiSelect}
                      name="lote"
                      options={lotesNoFiltro}
                      valueRenderer={renderizarLabelLote}
                      selected={lotesSelecionados}
                      onSelectedChanged={value =>
                        onChangeLotesSelecionados(value)
                      }
                      overrideStrings={{
                        search: "Busca",
                        selectSomeItems: "Selecione",
                        allItemsAreSelected:
                          "Todos os itens estão selecionados",
                        selectAll: "Todos"
                      }}
                    />
                  ) : (
                    <div className="font-weight-normal pt-2">
                      Carregando lotes..
                    </div>
                  )}
                </div>
                <div className="col-4">
                  <label className="label font-weight-normal pb-2 pt-2">
                    Classificação da dieta:
                  </label>
                  {classificacoesNoFiltro.length ? (
                    <Field
                      component={StatefulMultiSelect}
                      name="classificacao_dieta"
                      options={classificacoesNoFiltro}
                      valueRenderer={renderizarLabelClassificacao}
                      selected={classificacoesSelecionadas}
                      onSelectedChanged={value =>
                        onChangeClassificacoesSelecionadas(value)
                      }
                      overrideStrings={{
                        search: "Busca",
                        selectSomeItems: "Selecione",
                        allItemsAreSelected:
                          "Todos os itens estão selecionados",
                        selectAll: "Todos"
                      }}
                    />
                  ) : (
                    <div className="font-weight-normal pt-2">
                      Carregando classificações..
                    </div>
                  )}
                </div>
                <div className="col-4">
                  <label className="label font-weight-normal pb-2 pt-2">
                    Protocolo padrão:
                  </label>
                  {protocolosNoFiltro.length ? (
                    <Field
                      component={StatefulMultiSelect}
                      name="protocolo_padrao"
                      options={protocolosNoFiltro}
                      valueRenderer={renderizarLabelProtocolo}
                      selected={protocolosSelecionados}
                      onSelectedChanged={value =>
                        onChangeProtocolosSelecionados(value)
                      }
                      overrideStrings={{
                        search: "Busca",
                        selectSomeItems: "Selecione",
                        allItemsAreSelected:
                          "Todos os itens estão selecionados",
                        selectAll: "Todos"
                      }}
                    />
                  ) : (
                    <div className="font-weight-normal pt-2">
                      Carregando protocolos..
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 mb-4">
                <Botao
                  texto="Filtrar"
                  style={BUTTON_STYLE.GREEN}
                  icon={BUTTON_ICON.FILTER}
                  className="float-right ml-3"
                  onClick={() => gerarTabela()}
                />
                <Botao
                  texto="Limpar Filtros"
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                  icon={BUTTON_ICON.TIMES}
                  className="float-right ml-3"
                  onClick={() => limparFiltros()}
                />
                <Button
                  className="acoes float-right ml-3"
                  variant="link"
                  onClick={() => exportarXLSX()}
                >
                  <i className="fas fa-file-excel green" />
                  <span className="link-exportar">XLSX</span>
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    </Spin>
  );
};

export default reduxForm({
  form: "buscaDietasForm" // a unique identifier for this form
})(BuscaDietasForm);
