import { addMonths, getYear, format } from "date-fns";
import { ptBR } from "date-fns/locale";

import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";

import InformacoesEscola from "./components/InformacoesEscola";
import InformacoesMedicaoInicial from "./components/InformacoesMedicaoInicial";
import FluxoDeStatusMedicaoInicial from "./components/FluxoDeStatusMedicaoInicial";

import * as perfilService from "services/perfil.service";
import { getPanoramaEscola } from "services/dietaEspecial.service";
import LancamentoPorPeriodo from "./components/LancamentoPorPeriodo";
import { getEscolaSimples } from "services/escola.service";

import { Icon, Select, Skeleton } from "antd";
import "./styles.scss";
import { getSolicitacaoMedicaoInicial } from "services/medicaoInicial/solicitacaoMedicaoInicial.service";

export default () => {
  const [panoramaGeral, setPanoramaGeral] = useState();
  const [nomeTerceirizada, setNomeTerceirizada] = useState();
  const [objectoPeriodos, setObjectoPeriodos] = useState([]);
  const [periodoSelecionado, setPeriodoSelecionado] = useState(null);
  const [escolaInstituicao, setEscolaInstituicao] = useState(null);
  const [loteEscolaSimples, setLoteEscolaSimples] = useState(null);
  const [solicitacaoMedicaoInicial, setSolicitacaoMedicaoInicial] = useState(
    null
  );
  const [
    loadingSolicitacaoMedInicial,
    setLoadingSolicitacaoMedicaoInicial
  ] = useState(true);
  const history = useHistory();
  const location = useLocation();

  const proximosDozeMeses = 12;
  let periodos = [];

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

      for (let mes = 0; mes <= proximosDozeMeses; mes++) {
        const dataBRT = addMonths(new Date(), -mes);
        const mesString = format(dataBRT, "LLLL", { locale: ptBR }).toString();
        periodos.push({
          dataBRT: dataBRT,
          periodo:
            mesString.charAt(0).toUpperCase() +
            mesString.slice(1) +
            " / " +
            getYear(dataBRT).toString()
        });
      }

      const periodoInicialSelecionado = periodos[0].dataBRT.toString();
      setObjectoPeriodos(periodos);
      setPeriodoSelecionado(periodoInicialSelecionado);
      await getSolicitacaoMedInicial(periodoInicialSelecionado, escola.uuid);
      setLoadingSolicitacaoMedicaoInicial(false);
    }
    fetch();

    history.replace({
      pathname: location.pathname,
      search: `?mes=${format(new Date(), "MM").toString()}&ano=${getYear(
        new Date()
      ).toString()}`
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSolicitacaoMedInicial = async (periodo, escolaUuid) => {
    const payload = {
      escola: escolaUuid,
      mes: format(new Date(periodo), "MM").toString(),
      ano: getYear(new Date(periodo)).toString()
    };

    const solicitacao = await getSolicitacaoMedicaoInicial(payload);
    setSolicitacaoMedicaoInicial(solicitacao.data[0]);
  };

  const { Option } = Select;

  const opcoesPeriodos = objectoPeriodos
    ? objectoPeriodos.map(periodo => {
        return <Option key={periodo.dataBRT}>{periodo.periodo}</Option>;
      })
    : [];

  const handleChangeSelectPeriodo = async value => {
    setLoadingSolicitacaoMedicaoInicial(true);
    setPeriodoSelecionado(value);
    await getSolicitacaoMedInicial(value, escolaInstituicao.uuid);
    setLoadingSolicitacaoMedicaoInicial(false);
    history.replace({
      pathname: location.pathname,
      search: `?mes=${format(new Date(value), "MM").toString()}&ano=${getYear(
        new Date(value)
      ).toString()}`
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
      ano: ano.toString()
    };

    const solicitacao = await getSolicitacaoMedicaoInicial(payload);
    setSolicitacaoMedicaoInicial(solicitacao.data[0]);
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <div className="row pb-2">
          <div className="col">
            <b>Período de Lançamento</b>
          </div>
        </div>
        <div className="row periodo-info-ue collapse-adjustments">
          <div className="col-4 periodo-lancamento">
            <div className="pl-0">
              {objectoPeriodos.length > 0 ? (
                <Select
                  suffixIcon={<Icon type="caret-down" />}
                  name="periodo_lancamento"
                  defaultValue={objectoPeriodos[0].periodo}
                  onChange={value => handleChangeSelectPeriodo(value)}
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
        {panoramaGeral && !loadingSolicitacaoMedInicial && (
          <LancamentoPorPeriodo
            panoramaGeral={panoramaGeral}
            periodoSelecionado={periodoSelecionado}
            escolaInstituicao={escolaInstituicao}
            solicitacaoMedicaoInicial={solicitacaoMedicaoInicial}
            onClickInfoBasicas={onClickInfoBasicas}
          />
        )}
      </div>
    </div>
  );
};
