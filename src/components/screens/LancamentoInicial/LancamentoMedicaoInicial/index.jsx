import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import HTTP_STATUS from "http-status-codes";
import { addMonths, getYear, format, getMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Select, Skeleton, Spin } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";

import InformacoesEscola from "./components/InformacoesEscola";
import InformacoesMedicaoInicial from "./components/InformacoesMedicaoInicial";
import { LancamentoPorPeriodo } from "./components/LancamentoPorPeriodo";
import Ocorrencias from "./components/Ocorrencias";
import { FluxoDeStatusMedicaoInicial } from "./components/FluxoDeStatusMedicaoInicial";
import { InformacoesMedicaoInicialCEI } from "./components/InformacoesMedicaoInicialCEI";
import { LancamentoPorPeriodoCEI } from "./components/LancamentoPorPeriodoCEI";
import { toastError } from "../../../Shareable/Toast/dialogs";

import {
  DETALHAMENTO_DO_LANCAMENTO,
  LANCAMENTO_MEDICAO_INICIAL,
} from "configs/constants";
import * as perfilService from "services/perfil.service";
import { getEscolaSimples } from "services/escola.service";
import { getPanoramaEscola } from "services/dietaEspecial.service";
import {
  getPeriodosEscolaCemeiComAlunosEmei,
  getSolicitacaoMedicaoInicial,
  getSolicitacoesLancadas,
} from "services/medicaoInicial/solicitacaoMedicaoInicial.service";
import { getDiasCalendario } from "services/medicaoInicial/periodoLancamentoMedicao.service";
import { getVinculosTipoAlimentacaoPorEscola } from "services/cadastroTipoAlimentacao.service";
import { getPeriodosPermissoesLancamentosEspeciaisMesAno } from "services/medicaoInicial/permissaoLancamentosEspeciais.service";
import {
  ehEscolaTipoCEI,
  ehEscolaTipoCEMEI,
} from "../../../../helpers/utilities";
import "./styles.scss";

export default () => {
  const [ano, setAno] = useState(null);
  const [mes, setMes] = useState(null);
  const [panoramaGeral, setPanoramaGeral] = useState();
  const [nomeTerceirizada, setNomeTerceirizada] = useState();
  const [objectoPeriodos, setObjectoPeriodos] = useState([]);
  const [periodoSelecionado, setPeriodoSelecionado] = useState(null);
  const [escolaInstituicao, setEscolaInstituicao] = useState(null);
  const [loteEscolaSimples, setLoteEscolaSimples] = useState(null);
  const [periodosEscolaSimples, setPeriodosEscolaSimples] = useState(null);
  const [
    periodosEscolaCemeiComAlunosEmei,
    setPeriodosEscolaCemeiComAlunosEmei,
  ] = useState(null);
  const [
    periodosPermissoesLancamentosEspeciais,
    setPeriodosPermissoesLancamentosEspeciais,
  ] = useState(null);
  const [solicitacaoMedicaoInicial, setSolicitacaoMedicaoInicial] =
    useState(null);
  const [periodoFromSearchParam, setPeriodoFromSearchParam] = useState(null);
  const [loadingSolicitacaoMedInicial, setLoadingSolicitacaoMedicaoInicial] =
    useState(true);
  const [objSolicitacaoMIFinalizada, setObjSolicitacaoMIFinalizada] = useState({
    anexo: null,
    status: null,
  });
  const [open, setOpen] = useState(false);
  const [naoPodeFinalizar, setNaoPodeFinalizar] = useState(true);
  const [finalizandoMedicao, setFinalizandoMedicao] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const proximosDozeMeses = 12;
  let periodos = [];

  const getPeriodosEscolaCemeiComAlunosEmeiAsync = async (escola, mes, ano) => {
    if (ehEscolaTipoCEMEI(escola)) {
      const payload = {
        mes,
        ano,
      };

      const response = await getPeriodosEscolaCemeiComAlunosEmei(payload);
      if (response.status === HTTP_STATUS.OK) {
        setPeriodosEscolaCemeiComAlunosEmei(response.data.results);
      } else {
        toastError("Erro ao obter períodos com alunos EMEI");
      }
    }
  };

  const getPeriodosPermissoesLancamentosEspeciaisMesAnoAsync = async (
    escola_uuid,
    mes,
    ano
  ) => {
    const payload = {
      escola_uuid,
      mes,
      ano,
    };

    const response = await getPeriodosPermissoesLancamentosEspeciaisMesAno(
      payload
    );
    if (response.status === HTTP_STATUS.OK) {
      setPeriodosPermissoesLancamentosEspeciais(response.data.results);
    } else {
      toastError("Erro ao obter períodos com Permissões de Lançamentos");
    }
  };

  useEffect(() => {
    async function fetch() {
      const meusDados = await perfilService.meusDados();
      const escola =
        meusDados.vinculo_atual && meusDados.vinculo_atual.instituicao;
      const respostaPanorama = await getPanoramaEscola({ escola: escola.uuid });
      const respostaEscolaSimples = await getEscolaSimples(escola.uuid);
      setNomeTerceirizada(
        respostaEscolaSimples.data.lote.terceirizada.nome_fantasia
      );

      setPanoramaGeral(respostaPanorama.data);
      setEscolaInstituicao(escola);
      setLoteEscolaSimples(respostaEscolaSimples.data.lote.nome);

      let solicitacoesLancadas = [];

      if (location.pathname.includes(LANCAMENTO_MEDICAO_INICIAL)) {
        const payload = {
          escola: escola.uuid,
        };

        solicitacoesLancadas = await getSolicitacoesLancadas(payload);
      }

      for (let mes_ = 0; mes_ <= proximosDozeMeses; mes_++) {
        const dataBRT = addMonths(new Date(), -mes_);
        const mesString = format(dataBRT, "LLLL", { locale: ptBR }).toString();
        if (location.pathname.includes(LANCAMENTO_MEDICAO_INICIAL)) {
          const temSolicitacaoLancada = solicitacoesLancadas.data.filter(
            (solicitacao) =>
              Number(solicitacao.mes) === getMonth(dataBRT) + 1 &&
              Number(solicitacao.ano) === getYear(dataBRT)
          ).length;
          if (!temSolicitacaoLancada) {
            periodos.push({
              dataBRT: dataBRT,
              periodo:
                mesString.charAt(0).toUpperCase() +
                mesString.slice(1) +
                " / " +
                getYear(dataBRT).toString(),
            });
            if (!location.search && periodos.length === 1) {
              history.replace({
                pathname: location.pathname,
                search: `?mes=${(getMonth(dataBRT) + 1)
                  .toString()
                  .padStart(2, "0")}&ano=${getYear(dataBRT).toString()}`,
              });
            }
          }
        } else {
          periodos.push({
            dataBRT: dataBRT,
            periodo:
              mesString.charAt(0).toUpperCase() +
              mesString.slice(1) +
              " / " +
              getYear(dataBRT).toString(),
          });
        }
      }

      const params = new URLSearchParams(window.location.search);
      let mes = params.get("mes");
      let ano = params.get("ano");
      setMes(mes);
      setAno(ano);
      const response_vinculos = await getVinculosTipoAlimentacaoPorEscola(
        escola.uuid,
        { ano }
      );
      setPeriodosEscolaSimples(response_vinculos.data.results);
      if (location.search) {
        if (mes <= 0 || mes > 12) {
          mes = format(new Date(), "MM");
        }
        if (isNaN(ano)) {
          ano = getYear(new Date());
        }
        if (ano > getYear(new Date()) || ano < getYear(new Date()) - 1) {
          ano = getYear(new Date());
        }
        if (
          mes > format(new Date(), "MM") &&
          Number(ano) === getYear(new Date())
        ) {
          mes = format(new Date(), "MM");
        }
        if (
          mes < format(new Date(), "MM") &&
          Number(ano) === getYear(new Date()) - 1
        ) {
          mes = format(new Date(), "MM");
        }
        const dataFromSearch = new Date(ano, mes - 1, 1);
        const mesStringFromSearch = format(dataFromSearch, "LLLL", {
          locale: ptBR,
        }).toString();
        const periodoFromSearch =
          mesStringFromSearch.charAt(0).toUpperCase() +
          mesStringFromSearch.slice(1) +
          " / " +
          getYear(dataFromSearch).toString();
        setPeriodoFromSearchParam(periodoFromSearch);
      }

      await getPeriodosEscolaCemeiComAlunosEmeiAsync(escola, mes, ano);
      await getPeriodosPermissoesLancamentosEspeciaisMesAnoAsync(
        escola.uuid,
        mes,
        ano
      );

      const periodoInicialSelecionado = !location.search
        ? periodos[0].dataBRT.toString()
        : new Date(ano, mes - 1, 1);
      setObjectoPeriodos(periodos);
      setPeriodoSelecionado(periodoInicialSelecionado);
      await getSolicitacaoMedInicial(periodoInicialSelecionado, escola.uuid);
      setLoadingSolicitacaoMedicaoInicial(false);
    }
    fetch();
  }, []);

  const getSolicitacaoMedInicial = async (periodo, escolaUuid) => {
    const payload = {
      escola: escolaUuid,
      mes: format(new Date(periodo), "MM").toString(),
      ano: getYear(new Date(periodo)).toString(),
    };

    const solicitacao = await getSolicitacaoMedicaoInicial(payload);
    getDiasCalendarioAsync(payload);
    setSolicitacaoMedicaoInicial(solicitacao.data[0]);
  };

  const { Option } = Select;

  const opcoesPeriodos = objectoPeriodos
    ? objectoPeriodos.map((periodo) => {
        return <Option key={periodo.dataBRT}>{periodo.periodo}</Option>;
      })
    : [];

  const getDiasCalendarioAsync = async (payload) => {
    payload["escola_uuid"] = payload["escola"];
    delete payload["escola"];
    const response = await getDiasCalendario(payload);
    if (response.status === HTTP_STATUS.OK) {
      const listaDiasLetivos = response.data.filter(
        (dia) => dia.dia_letivo === true
      );
      if (listaDiasLetivos.length) {
        const ultimoDiaLetivo = listaDiasLetivos[listaDiasLetivos.length - 1];
        const dataUltimoDia = new Date(
          `${payload["ano"]}/${payload["mes"]}/${ultimoDiaLetivo.dia}`
        );
        const dataHoje = new Date();
        if (dataHoje.getTime() > dataUltimoDia.getTime()) {
          setNaoPodeFinalizar(false);
        } else {
          setNaoPodeFinalizar(true);
        }
      }
    } else {
      toastError(
        "Erro ao carregar calendário do mês. Tente novamente mais tarde."
      );
    }
  };

  const handleChangeSelectPeriodo = async (value) => {
    setMes(null);
    setAno(null);
    setLoadingSolicitacaoMedicaoInicial(true);
    setPeriodoSelecionado(value);
    await getSolicitacaoMedInicial(value, escolaInstituicao.uuid);
    const mes = format(new Date(value), "MM").toString();
    const ano = getYear(new Date(value)).toString();
    setMes(mes);
    setAno(ano);
    const response_vinculos = await getVinculosTipoAlimentacaoPorEscola(
      escolaInstituicao.uuid,
      { ano }
    );
    setPeriodosEscolaSimples(response_vinculos.data.results);
    await getPeriodosEscolaCemeiComAlunosEmeiAsync(escolaInstituicao, mes, ano);
    await getPeriodosPermissoesLancamentosEspeciaisMesAnoAsync(
      escolaInstituicao.uuid,
      mes,
      ano
    );
    setLoadingSolicitacaoMedicaoInicial(false);
    history.replace({
      pathname: location.pathname,
      search: `?mes=${format(new Date(value), "MM").toString()}&ano=${getYear(
        new Date(value)
      ).toString()}`,
    });
  };

  const onClickInfoBasicas = async () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const mes = params.get("mes");
    const ano = params.get("ano");

    const payload = {
      escola: escolaInstituicao.uuid,
      mes: mes.toString(),
      ano: ano.toString(),
    };

    const solicitacao = await getSolicitacaoMedicaoInicial(payload);
    setSolicitacaoMedicaoInicial(solicitacao.data[0]);
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <div className="pb-2">
          <b>Período de Lançamento</b>
        </div>
        <div className="row periodo-info-ue collapse-adjustments">
          <div className="col-4 periodo-lancamento">
            <div className="ps-0">
              {objectoPeriodos.length > 0 ? (
                <Select
                  suffixIcon={
                    <CaretDownOutlined onClick={() => setOpen(!open)} />
                  }
                  disabled={
                    (location.state &&
                      location.state.status === "Aprovado pela DRE") ||
                    location.pathname.includes(DETALHAMENTO_DO_LANCAMENTO)
                  }
                  open={open}
                  onClick={() => setOpen(!open)}
                  onBlur={() => setOpen(false)}
                  name="periodo_lancamento"
                  defaultValue={
                    periodoFromSearchParam || objectoPeriodos[0].periodo
                  }
                  onChange={(value) => handleChangeSelectPeriodo(value)}
                >
                  {opcoesPeriodos}
                </Select>
              ) : (
                <Skeleton paragraph={false} active />
              )}
            </div>
          </div>
          <InformacoesEscola
            escolaInstituicao={escolaInstituicao}
            loteEscolaSimples={loteEscolaSimples}
          />
        </div>
        {loadingSolicitacaoMedInicial ? (
          <Skeleton paragraph={false} active />
        ) : ehEscolaTipoCEI(escolaInstituicao) ||
          ehEscolaTipoCEMEI(escolaInstituicao) ? (
          <InformacoesMedicaoInicialCEI
            periodoSelecionado={periodoSelecionado}
            escolaInstituicao={escolaInstituicao}
            nomeTerceirizada={nomeTerceirizada}
            solicitacaoMedicaoInicial={solicitacaoMedicaoInicial}
            onClickInfoBasicas={onClickInfoBasicas}
          />
        ) : (
          <InformacoesMedicaoInicial
            periodoSelecionado={periodoSelecionado}
            escolaInstituicao={escolaInstituicao}
            nomeTerceirizada={nomeTerceirizada}
            solicitacaoMedicaoInicial={solicitacaoMedicaoInicial}
            onClickInfoBasicas={onClickInfoBasicas}
          />
        )}
        <hr className="linha-form mt-4 mb-4" />
        <FluxoDeStatusMedicaoInicial
          solicitacaoMedicaoInicial={solicitacaoMedicaoInicial}
        />
        <hr className="linha-form mt-4 mb-4" />
        {solicitacaoMedicaoInicial &&
          solicitacaoMedicaoInicial.status !==
            "MEDICAO_EM_ABERTO_PARA_PREENCHIMENTO_UE" && (
            <>
              <Ocorrencias
                solicitacaoMedicaoInicial={solicitacaoMedicaoInicial}
                onClickInfoBasicas={onClickInfoBasicas}
                setObjSolicitacaoMIFinalizada={(value) =>
                  setObjSolicitacaoMIFinalizada(value)
                }
                setFinalizandoMedicao={setFinalizandoMedicao}
              />
              <hr className="linha-form mt-4 mb-4" />
            </>
          )}
        <Spin
          spinning={finalizandoMedicao}
          tip="Finalizando medição inicial. Pode demorar um pouco. Aguarde..."
        >
          {mes &&
            ano &&
            periodosEscolaSimples &&
            !loadingSolicitacaoMedInicial &&
            (ehEscolaTipoCEI(escolaInstituicao) ||
            ehEscolaTipoCEMEI(escolaInstituicao) ? (
              <LancamentoPorPeriodoCEI
                panoramaGeral={panoramaGeral}
                mes={mes}
                ano={ano}
                periodoSelecionado={periodoSelecionado}
                escolaInstituicao={escolaInstituicao}
                periodosEscolaSimples={periodosEscolaSimples}
                periodosEscolaCemeiComAlunosEmei={
                  periodosEscolaCemeiComAlunosEmei
                }
                solicitacaoMedicaoInicial={solicitacaoMedicaoInicial}
                onClickInfoBasicas={onClickInfoBasicas}
                setLoadingSolicitacaoMedicaoInicial={(value) =>
                  setLoadingSolicitacaoMedicaoInicial(value)
                }
                objSolicitacaoMIFinalizada={objSolicitacaoMIFinalizada}
                setObjSolicitacaoMIFinalizada={(value) =>
                  setObjSolicitacaoMIFinalizada(value)
                }
                setSolicitacaoMedicaoInicial={setSolicitacaoMedicaoInicial}
                naoPodeFinalizar={naoPodeFinalizar}
                setFinalizandoMedicao={setFinalizandoMedicao}
              />
            ) : (
              <LancamentoPorPeriodo
                panoramaGeral={panoramaGeral}
                mes={mes}
                ano={ano}
                periodoSelecionado={periodoSelecionado}
                escolaInstituicao={escolaInstituicao}
                periodosEscolaSimples={periodosEscolaSimples}
                solicitacaoMedicaoInicial={solicitacaoMedicaoInicial}
                onClickInfoBasicas={onClickInfoBasicas}
                setLoadingSolicitacaoMedicaoInicial={(value) =>
                  setLoadingSolicitacaoMedicaoInicial(value)
                }
                objSolicitacaoMIFinalizada={objSolicitacaoMIFinalizada}
                setObjSolicitacaoMIFinalizada={(value) =>
                  setObjSolicitacaoMIFinalizada(value)
                }
                periodosPermissoesLancamentosEspeciais={
                  periodosPermissoesLancamentosEspeciais
                }
                setSolicitacaoMedicaoInicial={setSolicitacaoMedicaoInicial}
                naoPodeFinalizar={naoPodeFinalizar}
                setFinalizandoMedicao={setFinalizandoMedicao}
              />
            ))}
        </Spin>
      </div>
    </div>
  );
};
