import { Spin } from "antd";
import { OK } from "http-status-codes";
import { get, set } from "lodash";
import moment from "moment";
import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import { OnChange } from "react-final-form-listeners";

import { InputComData } from "components/Shareable/DatePicker";
import { toastError } from "components/Shareable/Toast/dialogs";

import { getLancamentosPorMes } from "services/lancamentoInicial.service";

import CabecalhoDietaConvencional from "../TabelaLancamento/CabecalhoDietaConvencional";
import CabecalhoDietaConvencionalFrequencia from "../TabelaLancamento/CabecalhoDietaConvencionalFrequencia";

const Lancamentos = ({ lancamentos, panorama, totaisAbsolutos }) => {
  return (
    <div className="row">
      <div className="tabela-lancamento tabela-dieta-convencional col-4">
        <CabecalhoDietaConvencional />
        {lancamentos.map((lancamento, indice) => (
          <div
            key={indice}
            className={`linha-tabela${
              lancamento.eh_feriado_ou_fds ? " linha-tabela-fds-feriado" : ""
            }`}
          >
            <div>{lancamento.dia}</div>
            <div />
            <div>{get(lancamento.lancamento, "merenda_seca")}</div>
            <div />
            <div>
              {get(lancamento.lancamento, "eh_dia_de_sobremesa_doce") && (
                <input style={{ width: "35%" }} type="checkbox" checked />
              )}
            </div>
          </div>
        ))}
        <div className="linha-tabela mt-4">
          <div>Totais</div>
          <div />
          <div>{totaisAbsolutos && totaisAbsolutos.merenda_seca}</div>
          <div />
          <div />
        </div>
      </div>
      <div className="tabela-lancamento tabela-dieta-convencional-frequencia col-8">
        <CabecalhoDietaConvencionalFrequencia panorama={panorama} />
        {lancamentos.map(({ eh_feriado_ou_fds, lancamento }, indice) => {
          return (
            <div
              key={indice}
              className={`linha-tabela${
                eh_feriado_ou_fds ? " linha-tabela-fds-feriado" : ""
              }`}
            >
              <div>{lancamento && lancamento.frequencia}</div>
              {panorama.horas_atendimento !== 5 && (
                <div>{lancamento && lancamento.lanche_4h}</div>
              )}
              {panorama.horas_atendimento !== 4 && (
                <div>{lancamento && lancamento.lanche_5h}</div>
              )}
              <div>{get(lancamento, "refeicoes.0.ref_oferta")}</div>
              <div>{get(lancamento, "refeicoes.0.ref_repet")}</div>
              <div>{get(lancamento, "refeicoes.0.sob_oferta")}</div>
              <div>{get(lancamento, "refeicoes.0.sob_repet")}</div>
              {panorama.periodo === "INTEGRAL" && (
                <>
                  <div>{get(lancamento, "refeicoes.1.ref_oferta")}</div>
                  <div>{get(lancamento, "refeicoes.1.ref_repet")}</div>
                  <div>{get(lancamento, "refeicoes.1.sob_oferta")}</div>
                  <div>{get(lancamento, "refeicoes.1.sob_repet")}</div>
                </>
              )}
              <div>{lancamento && lancamento.observacoes}</div>
            </div>
          );
        })}
        <div className="linha-tabela mt-4">
          <div>{totaisAbsolutos && totaisAbsolutos.frequencia}</div>
          {panorama.horas_atendimento !== 5 && (
            <div>{totaisAbsolutos && totaisAbsolutos.lanche_4h}</div>
          )}
          {panorama.horas_atendimento !== 4 && (
            <div>{totaisAbsolutos && totaisAbsolutos.lanche_5h}</div>
          )}
          <div>{get(totaisAbsolutos, "refeicoes.0.ref_oferta")}</div>
          <div>{get(totaisAbsolutos, "refeicoes.0.ref_repet")}</div>
          <div>{get(totaisAbsolutos, "refeicoes.0.sob_oferta")}</div>
          <div>{get(totaisAbsolutos, "refeicoes.0.sob_repet")}</div>
          {panorama.periodo === "INTEGRAL" && (
            <>
              <div>{get(totaisAbsolutos, "refeicoes.1.ref_oferta")}</div>
              <div>{get(totaisAbsolutos, "refeicoes.1.ref_repet")}</div>
              <div>{get(totaisAbsolutos, "refeicoes.1.sob_oferta")}</div>
              <div>{get(totaisAbsolutos, "refeicoes.1.sob_repet")}</div>
            </>
          )}
          <div>{totaisAbsolutos && totaisAbsolutos.observacoes}</div>
        </div>
      </div>
    </div>
  );
};

const TotaisPagamento = ({ totaisPagamento }) => {
  return (
    <div className="row mt-4">
      <div className="tabela-lancamento tabela-totais-pagamento col-8 offset-4">
        <div className="linha-tabela">
          <div>Qtd. refeições para pagamento</div>
          <div>{totaisPagamento.totalRefeicoes}</div>
        </div>
        <div className="linha-tabela">
          <div>Qtd. sobremesas para pagamento</div>
          <div>{totaisPagamento.totalSobremesas}</div>
        </div>
      </div>
    </div>
  );
};

const camposPossiveis = [
  "frequencia",
  "merenda_seca",
  "lanche_4h",
  "lanche_5h",
  "refeicoes.0.ref_oferta",
  "refeicoes.0.ref_repet",
  "refeicoes.0.sob_oferta",
  "refeicoes.0.sob_repet",
  "refeicoes.1.ref_oferta",
  "refeicoes.1.ref_repet",
  "refeicoes.1.sob_oferta",
  "refeicoes.1.sob_repet"
];

const calculaTotaisAbsolutos = lancamentos => {
  const totaisAbsolutos = {};
  for (let dadosLancamento of lancamentos) {
    const lancamento = dadosLancamento.lancamento;
    if (lancamento === null) continue;
    for (let campo of camposPossiveis) {
      const valor = get(lancamento, campo);
      if (valor) {
        set(totaisAbsolutos, campo, valor + get(totaisAbsolutos, campo, 0));
      }
    }
  }
  return totaisAbsolutos;
};

const calculaTotaisPagamento = (lancamentos, panorama) => {
  let totalRefeicoes = 0;
  let totalSobremesas = 0;
  for (let dadosLancamento of lancamentos) {
    const lancamento = dadosLancamento.lancamento;
    if (lancamento === null) continue;
    for (let refeicao of lancamento.refeicoes) {
      const somaRefeicao = refeicao.ref_oferta + refeicao.ref_repet;
      totalRefeicoes +=
        somaRefeicao > panorama.qtde_alunos
          ? panorama.qtde_alunos
          : somaRefeicao;
      const somaSobremesa = refeicao.sob_oferta + refeicao.sob_repet;
      totalSobremesas +=
        somaSobremesa > panorama.qtde_alunos
          ? panorama.qtde_alunos
          : somaSobremesa;
    }
  }
  return {
    totalRefeicoes,
    totalSobremesas
  };
};

export default ({ panorama }) => {
  const [listagemAberta, setListagemAberta] = useState(false);
  const [lancamentos, setLancamentos] = useState([]);
  const [totaisAbsolutos, setTotaisAbsolutos] = useState({});
  const [totaisPagamento, setTotaisPagamento] = useState({});
  const [carregando, setCarregando] = useState(false);
  const onMesLancamentoChange = value => {
    setCarregando(true);
    getLancamentosPorMes({
      escola_periodo_escolar: panorama.uuid_escola_periodo_escolar,
      mes: value
    }).then(response => {
      if (response.status === OK) {
        setLancamentos(response.data);
        setTotaisAbsolutos(calculaTotaisAbsolutos(response.data));
        setTotaisPagamento(calculaTotaisPagamento(response.data, panorama));
      } else {
        toastError(
          "Erro ao obter os lançamentos do mês: " + response.errorMessage
        );
      }
      setCarregando(false);
    });
  };

  const toggleListagemAberta = () => {
    if (listagemAberta) {
      setLancamentos([]);
      setTotaisAbsolutos({});
      setTotaisPagamento({});
    }
    setListagemAberta(!listagemAberta);
  };
  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="row cabecalho-lancamentos-por-mes mt-3">
        <div>Lançamentos por mês</div>
        <div onClick={toggleListagemAberta}>
          {listagemAberta ? "Fechar" : "Abrir"}
        </div>
      </div>
      {listagemAberta && (
        <>
          <Form
            onSubmit={() => {}}
            render={({ handleSubmit }) => (
              <form id="myform" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-3 data-lancamento-container">
                    <Field
                      component={InputComData}
                      name="mes_lancamento"
                      label="Mês do lançamento"
                      required
                      dateFormat="MM/YYYY"
                      showMonthYearPicker
                      showFullMonthYearPicker
                      minDate={null}
                      maxDate={moment()._d}
                    />
                    <OnChange name="mes_lancamento">
                      {onMesLancamentoChange}
                    </OnChange>
                  </div>
                </div>
              </form>
            )}
          />
          {lancamentos.length > 0 && (
            <>
              <Lancamentos
                lancamentos={lancamentos}
                panorama={panorama}
                totaisAbsolutos={totaisAbsolutos}
              />
              <TotaisPagamento totaisPagamento={totaisPagamento} />
            </>
          )}
        </>
      )}
    </Spin>
  );
};
