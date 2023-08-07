import { Spin } from "antd";
import { isEqual } from "lodash";
import React, { useEffect, useState } from "react";
import CardCronograma from "components/Shareable/CardCronograma/CardCronograma";
import {
  cards_dinutre,
  cards_dilog,
  cards_alteracao_dinutre,
  cards_alteracao_dilog
} from "./constants";
import {
  getDashboardCronograma,
  getDashboardCronogramaComFiltros,
  getDashboardSolicitacoesAlteracao,
  getDashboardSolicitacoesAlteracaoComFiltros
} from "services/cronograma.service";
import {
  parseDataHoraBrToMoment,
  comparaObjetosMoment,
  truncarString,
  usuarioEhDilogDiretoria
} from "helpers/utilities";
import {
  DETALHAR_ALTERACAO_CRONOGRAMA,
  DETALHE_CRONOGRAMA,
  PRE_RECEBIMENTO
} from "configs/constants";
import { Field, Form } from "react-final-form";
import InputText from "components/Shareable/Input/InputText";
import { OnChange } from "react-final-form-listeners";
import { debounce } from "lodash";
import { useCallback } from "react";

const cardsCronogramaInicial = usuarioEhDilogDiretoria()
  ? cards_dilog
  : cards_dinutre;

const cardsAlteracaoInicial = usuarioEhDilogDiretoria()
  ? cards_alteracao_dilog
  : cards_alteracao_dinutre;

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [filtrado, setFiltrado] = useState(false);
  const [cardsCronograma, setCardsCronograma] = useState(
    cardsCronogramaInicial
  );
  const [cardsAlteracao, setCardsAlteracao] = useState(cardsAlteracaoInicial);

  const ordenaPorLogMaisRecente = (a, b) => {
    let data_a = parseDataHoraBrToMoment(a.log_mais_recente);
    let data_b = parseDataHoraBrToMoment(b.log_mais_recente);
    return comparaObjetosMoment(data_b, data_a);
  };

  const getTextCronograma = item => {
    const TAMANHO_MAXIMO = 48;

    return `${item.numero} - ${truncarString(item.produto, TAMANHO_MAXIMO)}`;
  };

  const getTextAlteracao = item => {
    const TAMANHO_MAXIMO = 48;

    return `${item.cronograma} - ${truncarString(
      item.empresa,
      TAMANHO_MAXIMO
    )}`;
  };

  const buscaCronogramas = useCallback(async (filtros = null) => {
    setCarregando(true);
    let dadosDashboard;
    if (!filtros) {
      dadosDashboard = await getDashboardCronograma();
    } else {
      dadosDashboard = await getDashboardCronogramaComFiltros(filtros);
    }
    let cards = [];
    cardsCronogramaInicial.forEach(card => {
      dadosDashboard.data.results.forEach(data => {
        if (card.incluir_status.includes(data.status)) {
          card.items = data.dados;
          cards.push(card);
        }
      });
    });
    setCardsCronograma(cards);
    setCarregando(false);
  }, []);

  const buscaSolicitacoes = useCallback(async (filtros = null) => {
    setCarregando(true);
    let dadosDashboard;
    if (!filtros) {
      dadosDashboard = await getDashboardSolicitacoesAlteracao();
    } else {
      dadosDashboard = await getDashboardSolicitacoesAlteracaoComFiltros(
        filtros
      );
    }

    let cards = [];
    cardsAlteracao.forEach(card => {
      dadosDashboard.data.results.forEach(data => {
        let status = data.status.replace(/[[\]'\s]+/g, "").split(`,`);
        if (isEqual(card.incluir_status, status)) {
          card.items = data.dados;
          cards.push(card);
        }
      });
    });
    setCardsAlteracao(cards);
    setCarregando(false);
  }, []);

  useEffect(() => {
    buscaCronogramas();
    buscaSolicitacoes();
  }, [buscaCronogramas, buscaSolicitacoes]);

  const formataCardsCronograma = items => {
    return items.sort(ordenaPorLogMaisRecente).map(item => ({
      text: getTextCronograma(item),
      date: item.log_mais_recente,
      link: gerarLinkDoItem(item),
      status: item.status
    }));
  };

  const formataCardsAlteracao = items => {
    return items.sort(ordenaPorLogMaisRecente).map(item => ({
      text: getTextAlteracao(item),
      date: item.log_mais_recente,
      link: gerarLinkSolicitacaoAlteracao(item),
      status: item.status
    }));
  };

  const gerarLinkDoItem = item => {
    if (
      ["assinado dinutre", "assinado fornecedor", "assinado codae"].includes(
        item.status.toLowerCase()
      )
    ) {
      return `/${PRE_RECEBIMENTO}/${DETALHE_CRONOGRAMA}?uuid=${item.uuid}`;
    }
  };

  const gerarLinkSolicitacaoAlteracao = item => {
    return `/${PRE_RECEBIMENTO}/${DETALHAR_ALTERACAO_CRONOGRAMA}?uuid=${
      item.uuid
    }`;
  };

  const filtrarCronograma = debounce((value, values) => {
    const { nome_produto, numero_cronograma } = values;
    const podeFiltrar = [nome_produto, numero_cronograma].some(
      value => value && value.length > 2
    );
    if (podeFiltrar) {
      setCarregando(true);
      let newParams = Object.assign({}, { ...values });
      buscaCronogramas(newParams);
      setFiltrado(true);
    } else if (filtrado) {
      setCarregando(true);
      setFiltrado(false);
      buscaCronogramas();
    }
  }, 500);

  const filtrarSolicitacao = debounce((value, values) => {
    const { numero_cronograma, nome_fornecedor } = values;
    const podeFiltrar = [numero_cronograma, nome_fornecedor].some(
      value => value && value.length > 2
    );
    if (podeFiltrar) {
      setCarregando(true);
      let newParams = Object.assign({}, { ...values });
      buscaSolicitacoes(newParams);
      setFiltrado(true);
    } else if (filtrado) {
      setCarregando(true);
      setFiltrado(false);
      buscaSolicitacoes();
    }
  }, 500);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-painel-cronograma">
        <div className="card-body painel-cronograma">
          <div className="card-title">
            <div className="row">
              <div className="col-5">Programação de Cronogramas</div>
              <div className="col-7">
                <Form
                  initialValues={{
                    numero_cronograma: "",
                    nome_produto: ""
                  }}
                  onSubmit={() => {}}
                >
                  {({ values }) => (
                    <div className="row text-right">
                      <div className="col-6">
                        <Field
                          component={InputText}
                          name="numero_cronograma"
                          placeholder="N° do Cronograma"
                        />

                        <OnChange name="numero_cronograma">
                          {value => filtrarCronograma(value, values)}
                        </OnChange>
                      </div>
                      <div className="col-6">
                        <Field
                          component={InputText}
                          name="nome_produto"
                          placeholder="Nome do Produto"
                        />

                        <OnChange name="nome_produto">
                          {value => filtrarCronograma(value, values)}
                        </OnChange>
                      </div>
                    </div>
                  )}
                </Form>
              </div>
            </div>
          </div>
          <div className="row">
            {cardsCronograma.map((card, index) => (
              <div className="col-6 mb-4" key={index}>
                <CardCronograma
                  cardTitle={card.titulo}
                  cardType={card.style}
                  solicitations={formataCardsCronograma(
                    card.items ? card.items : []
                  )}
                  icon={card.icon}
                  href={card.href}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card mt-3 card-painel-cronograma">
        <div className="card-body painel-cronograma">
          <div className="card-title">
            <div className="row">
              <div className="col-5">Alterações de Cronogramas</div>
              <div className="col-7">
                <Form
                  initialValues={{
                    nome_fornecedor: "",
                    numero_cronograma: ""
                  }}
                  onSubmit={() => {}}
                >
                  {({ values }) => (
                    <div className="row text-right">
                      <div className="col-6">
                        <Field
                          component={InputText}
                          name="numero_cronograma"
                          placeholder="N° do Cronograma"
                        />

                        <OnChange name="numero_cronograma">
                          {value => filtrarSolicitacao(value, values)}
                        </OnChange>
                      </div>
                      <div className="col-6">
                        <Field
                          component={InputText}
                          name="nome_fornecedor"
                          placeholder="Nome do Fornecedor"
                        />

                        <OnChange name="nome_fornecedor">
                          {value => filtrarSolicitacao(value, values)}
                        </OnChange>
                      </div>
                    </div>
                  )}
                </Form>
              </div>
            </div>
          </div>
          <div className="row">
            {cardsAlteracao.map((card, index) => (
              <div className="col-6 mb-4" key={index}>
                <CardCronograma
                  cardTitle={card.titulo}
                  cardType={card.style}
                  solicitations={formataCardsAlteracao(
                    card.items ? card.items : []
                  )}
                  icon={card.icon}
                  href={card.href}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Spin>
  );
};
