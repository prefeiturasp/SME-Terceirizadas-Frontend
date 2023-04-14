import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { Spin } from "antd";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import { InputComData } from "components/Shareable/DatePicker";
import Select from "components/Shareable/Select";
import {
  OPTIONS_STATUS_DIETA,
  STATUS_DIETAS,
  TIPO_USUARIO
} from "constants/shared";
import {
  formataClassificacoes,
  formataDiagnosticos,
  formataLotes,
  formataProtocolos
} from "helpers/terceirizadas";
import { usuarioEhNutricionistaSupervisao } from "helpers/utilities";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Field, reduxForm } from "redux-form";
import {
  getSolicitacoesRelatorioDietasEspeciais,
  getUnidadesEducacionaisTercTotal
} from "services/dietaEspecial.service";
import { meusDados } from "services/perfil.service";
import "./styles.scss";
import { toastError } from "components/Shareable/Toast/dialogs";
import HTTP_STATUS from "http-status-codes";

const BuscaDietasForm = ({
  setCarregando,
  setDietasFiltradas,
  setStatus,
  setStatusSelecionado,
  setFiltragemRealizada,
  lotesSelecionados,
  setLotesSelecionados,
  classificacoesSelecionadas,
  setClassificacoesSelecionadas,
  protocolosSelecionados,
  setProtocolosSelecionados,
  diagnosticosSelecionados,
  setDiagnosticosSelecionados,
  unidadesSelecionadas,
  setUnidadesSelecionadas,
  terceirizadaUuid,
  setTerceirizadaUuid,
  nutriSupervisao,
  setNutriSupervisao,
  dataInicial,
  setDataInicial,
  dataFinal,
  setDataFinal,
  setMostrarFiltrosAutorizadas,
  mostrarFiltrosAutorizadas,
  dietasFiltradas,
  reset
}) => {
  const [dietasEspeciais, setDietasEspeciais] = useState([]);
  const [mostrarFiltrosCanceladas, setMostrarFiltrosCanceladas] = useState(
    false
  );
  const [carregandoFiltros, setCarregandoFiltros] = useState(false);
  const [lotesInicio, setLotesInicio] = useState([]);
  const [lotesNoFiltro, setLotesNoFiltro] = useState([]);
  const [protocolosInicio, setProtocolosInicio] = useState([]);
  const [protocolosNoFiltro, setProtocolosNoFiltro] = useState([]);
  const [diagnosticosInicio, setdiagnosticosInicio] = useState([]);
  const [diagnosticoNoFiltro, setDiagnosticoNoFiltro] = useState([]);
  const [classificacoesInicio, setClassificacoesInicio] = useState([]);
  const [classificacoesNoFiltro, setClassificacoesNoFiltro] = useState([]);
  const [ativaUnidadeEducaionais, setAtivaUnidadeEducaionais] = useState(true);
  const [unidadesEducacionais, setUnidadesEducacionais] = useState([]);

  const getMeusDados = async () => {
    setCarregando(true);
    const response = await meusDados();
    if (
      response.tipo_usuario &&
      response.tipo_usuario.toString() === TIPO_USUARIO.TERCEIRIZADA
    ) {
      setTerceirizadaUuid(response.vinculo_atual.instituicao.uuid);
      setCarregando(false);
    } else if (
      response.tipo_usuario &&
      response.tipo_usuario.toString() === TIPO_USUARIO.NUTRICIONISTA_SUPERVISAO
    ) {
      setNutriSupervisao(true);
      setCarregando(false);
    }
  };

  const getUnidadesEducacionais = async values => {
    let data = { lotes: values };
    const response = await getUnidadesEducacionaisTercTotal(data);
    if (response.status === HTTP_STATUS.OK) {
      const unidades = response.data;
      const unidadesOpcoes = unidades.map(unidade => ({
        label: unidade.codigo_eol_escola,
        value: unidade.codigo_eol
      }));
      setUnidadesEducacionais(unidadesOpcoes);
      setAtivaUnidadeEducaionais(false);
    } else {
      toastError("Erro ao buscar unidades educacionais");
    }
  };

  useEffect(() => {
    getMeusDados();
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

  const diagnosticosRelacionadosADietas = dietas => {
    let diagnosticosRelacionados = [];
    dietas.forEach(dieta => {
      if (dieta.alergias_intolerancias.length > 0) {
        dieta.alergias_intolerancias.map(
          alergia_intolerancia =>
            !(
              diagnosticosRelacionados.filter(
                alergia_intolerancia_2 =>
                  alergia_intolerancia_2.id === alergia_intolerancia.id
              ).length > 0
            ) && diagnosticosRelacionados.push(alergia_intolerancia)
        );
      }
    });
    const diagnosticosFormatados = formataDiagnosticos(
      diagnosticosRelacionados
    );
    setdiagnosticosInicio(diagnosticosFormatados);
    setDiagnosticoNoFiltro(diagnosticosFormatados);
  };

  const onChangeStatus = async value => {
    const data = { terceirizada_uuid: terceirizadaUuid };
    setCarregandoFiltros(true);
    setLotesNoFiltro([]);
    setLotesSelecionados([]);
    setClassificacoesNoFiltro([]);
    setClassificacoesSelecionadas([]);
    setProtocolosNoFiltro([]);
    setDiagnosticoNoFiltro([]);
    setProtocolosSelecionados([]);
    setDiagnosticosSelecionados([]);
    setStatusSelecionado(true);
    setDietasFiltradas([]);
    setFiltragemRealizada(false);
    setStatus(value.toUpperCase());
    if (value.toUpperCase() === STATUS_DIETAS.AUTORIZADAS.toUpperCase()) {
      data["status"] = value;
      let response = [];
      if (nutriSupervisao) {
        delete data["terceirizada_uuid"];
      }
      response = await getSolicitacoesRelatorioDietasEspeciais(data);
      const dietasAutorizadas = response.data;
      lotesRelacionadosADietas(dietasAutorizadas);
      classificacoesRelacionadasADietas(dietasAutorizadas);
      protocolosRelacionadosADietas(dietasAutorizadas);
      diagnosticosRelacionadosADietas(dietasAutorizadas);
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
      diagnosticosRelacionadosADietas(dietasCanceladas);
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
    let diagnosticosFiltradosPorClassificacoes = [];

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
      dietasEspeciais
        .filter(dieta => dieta.rastro_lote.uuid === value)
        .map(dieta => dieta.alergias_intolerancias)
        .map(alergias_intolerancias => {
          return alergias_intolerancias.map(alergia_intolerancia =>
            diagnosticosFiltradosPorClassificacoes.push(
              alergia_intolerancia.descricao
            )
          );
        });
    });

    classificacoesFiltradasPorProtocolos = [
      ...new Set(classificacoesFiltradasPorProtocolos[0])
    ];
    protocolosFiltradosPorClassificacoes = [
      ...new Set(protocolosFiltradosPorClassificacoes)
    ];
    diagnosticosFiltradosPorClassificacoes = [
      ...new Set(diagnosticosFiltradosPorClassificacoes)
    ];

    if (values.length === 0) {
      setClassificacoesNoFiltro(classificacoesInicio);
      setProtocolosNoFiltro(protocolosInicio);
      setDiagnosticoNoFiltro(diagnosticosInicio);
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

    const diagnosticosFiltrados = diagnosticosInicio.filter(diagnostico => {
      return (
        diagnosticosFiltradosPorClassificacoes.includes(diagnostico.value) &&
        diagnostico
      );
    });

    setDiagnosticoNoFiltro(diagnosticosFiltrados);
    setClassificacoesNoFiltro(classificacoesFiltradas);
    setProtocolosNoFiltro(protocolosFiltrados);
    getUnidadesEducacionais(values);
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
    let diagnosticosFiltradosPorClassificacoes = [];

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

      dietasEspeciais
        .filter(
          dieta => dieta.classificacao && dieta.classificacao.id === value
        )
        .map(dieta => dieta.alergias_intolerancias)
        .map(alergias_intolerancias => {
          return alergias_intolerancias.map(alergia_intolerancia =>
            diagnosticosFiltradosPorClassificacoes.push(
              alergia_intolerancia.descricao
            )
          );
        });
    });

    protocolosFiltradosPorClassificacoes = [
      ...new Set(protocolosFiltradosPorClassificacoes)
    ];
    lotesFiltradosPorProtocolos = [...new Set(lotesFiltradosPorProtocolos)];
    diagnosticosFiltradosPorClassificacoes = [
      ...new Set(diagnosticosFiltradosPorClassificacoes)
    ];

    if (values.length === 0) {
      setProtocolosNoFiltro(protocolosInicio);
      setLotesNoFiltro(lotesInicio);
      setDiagnosticoNoFiltro(diagnosticosInicio);
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
    const diagnosticosFiltrados = diagnosticosInicio.filter(diagnostico => {
      return (
        diagnosticosFiltradosPorClassificacoes.includes(diagnostico.value) &&
        diagnostico
      );
    });

    setProtocolosNoFiltro(protocolosFiltrados);
    setLotesNoFiltro(lotesFiltrados);
    setDiagnosticoNoFiltro(diagnosticosFiltrados);
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

  const renderizarLabelDiagnostico = (selected, options) => {
    if (selected.length === 0) {
      return "Selecione";
    }
    if (selected.length === options.length) {
      return "Todos os diagnósticos selecionados";
    }
    if (selected.length === 1) {
      return `${selected.length} diagnóstico selecionado`;
    }
    return `${selected.length} diagnósticos selecionados`;
  };

  const onChangeDiagnosticosSelecionados = values => {
    setDiagnosticosSelecionados(values);
    let classificacoesFiltradasPorDiagnostico = [];
    let lotesFiltradosPorDiagnosticos = [];

    values.forEach(value => {
      classificacoesFiltradasPorDiagnostico.push(
        dietasEspeciais
          .filter(dieta => {
            return dieta.alergias_intolerancias.some(
              alergia_intolerancia => alergia_intolerancia.descricao === value
            );
          })
          .map(dieta => dieta.classificacao.id)[0]
      );
      dietasEspeciais
        .filter(dieta => {
          return dieta.alergias_intolerancias.some(
            alergia_intolerancia => alergia_intolerancia.descricao === value
          );
        })
        .map(dieta => dieta.rastro_lote.nome)
        .forEach(lote => {
          lotesFiltradosPorDiagnosticos.push(lote);
        });
    });
    classificacoesFiltradasPorDiagnostico = [
      ...new Set(classificacoesFiltradasPorDiagnostico)
    ];
    lotesFiltradosPorDiagnosticos = [...new Set(lotesFiltradosPorDiagnosticos)];

    if (values.length === 0) {
      setClassificacoesNoFiltro(classificacoesInicio);
      setLotesNoFiltro(lotesInicio);
      setDiagnosticoNoFiltro(diagnosticosInicio);
      return;
    }

    const classificacoesFiltradas = classificacoesInicio.filter(
      classificacao => {
        return (
          classificacoesFiltradasPorDiagnostico.includes(classificacao.value) &&
          classificacao
        );
      }
    );
    const lotesFiltrados = lotesInicio.filter(lote => {
      return lotesFiltradosPorDiagnosticos.includes(lote.label) && lote;
    });

    setClassificacoesNoFiltro(classificacoesFiltradas);
    setLotesNoFiltro(lotesFiltrados);
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

  const renderizarLabelUnidades = (selected, options) => {
    if (selected.length === 0) {
      return "Selecione";
    }
    if (selected.length === options.length) {
      return "Todas Unidades Educaionais foram selecionadas";
    }
    if (selected.length === 1) {
      return `${selected.length} unidade educacional selecionada`;
    }
    return `${selected.length} unidades educacionais selecionadas`;
  };

  const limparFiltros = () => {
    reset();
    setDataInicial(null);
    setDataFinal(null);
    setLotesSelecionados([]);
    setClassificacoesSelecionadas([]);
    setProtocolosSelecionados([]);
    setDiagnosticosSelecionados([]);
    setMostrarFiltrosAutorizadas(false);
    setMostrarFiltrosCanceladas(false);
    setDietasFiltradas([]);
    setStatusSelecionado(false);
    setFiltragemRealizada(false);
    setUnidadesSelecionadas([]);
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
      dietasEspeciaisCopy = dietasEspeciaisCopy
        .filter(dieta => dieta.classificacao)
        .filter(dieta =>
          classificacoesSelecionadas.includes(dieta.classificacao.id)
        );
    }
    if (protocolosSelecionados.length) {
      dietasEspeciaisCopy = dietasEspeciaisCopy.filter(dieta =>
        protocolosSelecionados.includes(dieta.nome_protocolo)
      );
    }
    if (diagnosticosSelecionados.length) {
      dietasEspeciaisCopy = dietasEspeciaisCopy.filter(dieta => {
        return dieta.alergias_intolerancias.some(alergia_intolerancia =>
          diagnosticosSelecionados.includes(alergia_intolerancia.descricao)
        );
      });
    }
    if (unidadesSelecionadas.length) {
      dietasEspeciaisCopy = dietasEspeciaisCopy.filter(dieta =>
        unidadesSelecionadas.includes(dieta.codigo_eol_escola)
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
                {!usuarioEhNutricionistaSupervisao() ? (
                  <div className="col-6 mt-3">
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
                        onSelectedChanged={value => {
                          onChangeProtocolosSelecionados(value);
                        }}
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
                ) : (
                  <div className="col-4">
                    <label className="label font-weight-normal pb-2 pt-2">
                      Relação por Diagnóstico:
                    </label>
                    {diagnosticoNoFiltro.length ? (
                      <Field
                        component={StatefulMultiSelect}
                        name="diagnostico"
                        options={diagnosticoNoFiltro}
                        valueRenderer={renderizarLabelDiagnostico}
                        selected={diagnosticosSelecionados}
                        onSelectedChanged={value =>
                          onChangeDiagnosticosSelecionados(value)
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
                        Carregando diagnosticos..
                      </div>
                    )}
                  </div>
                )}
                <div className="col-6 mt-3">
                  <label className="label font-weight-normal pb-2 pt-2">
                    Unidades Educacionais :
                  </label>
                  <Field
                    component={StatefulMultiSelect}
                    name="unidades_educacionais"
                    options={unidadesEducacionais}
                    valueRenderer={renderizarLabelUnidades}
                    selected={unidadesSelecionadas}
                    onSelectedChanged={value => {
                      setUnidadesSelecionadas(value);
                    }}
                    overrideStrings={{
                      search: "Busca",
                      selectSomeItems: "Selecione",
                      allItemsAreSelected:
                        "Todos as unidades estão selecionadas",
                      selectAll: "Todos"
                    }}
                    disabled={ativaUnidadeEducaionais}
                  />
                </div>
              </div>
              <div
                className={
                  dietasFiltradas && dietasFiltradas.length > 0
                    ? "mt-4"
                    : "botoes"
                }
              >
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
