import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import CardCronograma from "components/Shareable/CardCronograma/CardCronograma";
import { cardsAprovacao, cardsAlteracao } from "./constants";
import {
  parseDataHoraBrToMoment,
  comparaObjetosMoment,
  truncarString,
} from "helpers/utilities";
import { ANALISAR_LAYOUT_EMBALAGEM, PRE_RECEBIMENTO } from "configs/constants";
import { Field, Form } from "react-final-form";
import InputText from "components/Shareable/Input/InputText";
import { OnChange } from "react-final-form-listeners";
import { debounce } from "lodash";
import { useCallback } from "react";
import { getDashboardLayoutEmbalagem } from "services/layoutEmbalagem.service";

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [filtrado, setFiltrado] = useState(false);

  const [cardsAprovacaoLayout, setCardsAprovacaoLayout] =
    useState(cardsAprovacao);

  const [cardsAlteracaoLayout, setCardsAlteracaoLayout] =
    useState(cardsAlteracao);

  const ordenarPorLogMaisRecente = (a, b) => {
    let data_a = parseDataHoraBrToMoment(a.log_mais_recente);
    let data_b = parseDataHoraBrToMoment(b.log_mais_recente);
    return comparaObjetosMoment(data_b, data_a);
  };

  const gerarTextoCardLayout = (item) => {
    const TAMANHO_MAXIMO = 20;

    return `${item.numero_cronograma} - ${truncarString(
      item.nome_produto,
      TAMANHO_MAXIMO
    )} - ${truncarString(item.nome_empresa, TAMANHO_MAXIMO)}`;
  };

  const gerarLinkLayout = (item) => {
    return `/${PRE_RECEBIMENTO}/${ANALISAR_LAYOUT_EMBALAGEM}?uuid=${item.uuid}`;
  };

  const formatarCardsLayout = (items) => {
    return items.sort(ordenarPorLogMaisRecente).map((item) => ({
      text: gerarTextoCardLayout(item),
      date: item.log_mais_recente.slice(0, 10),
      link: gerarLinkLayout(item),
      status: item.status,
    }));
  };

  const agruparCardsPorStatus = (cardsIniciais, dadosDashboard) => {
    const cardsAgrupados = [];

    cardsIniciais.forEach((card) => {
      card.items = [];
      dadosDashboard.data.results.forEach((data) => {
        if (card.incluir_status.includes(data.status)) {
          card.items = [...card.items, ...data.dados];
        }
      });
      cardsAgrupados.push(card);
    });

    return cardsAgrupados;
  };

  const buscarLayouts = useCallback(async (filtros = null) => {
    setCarregando(true);

    let dadosDashboard = await getDashboardLayoutEmbalagem(
      filtros ? filtros : {}
    );

    let cardsAprovacao = agruparCardsPorStatus(
      cardsAprovacaoLayout,
      dadosDashboard
    );

    let cardsAlteracao = agruparCardsPorStatus(
      cardsAlteracaoLayout,
      dadosDashboard
    );

    setCardsAprovacaoLayout(cardsAprovacao);
    setCardsAlteracaoLayout(cardsAlteracao);
    setCarregando(false);
  }, []);

  const filtrarLayouts = debounce((value, values) => {
    const { nome_produto, numero_cronograma, nome_fornecedor } = values;

    const podeFiltrar = [nome_produto, numero_cronograma, nome_fornecedor].some(
      (value) => value && value.length > 2
    );

    if (podeFiltrar) {
      setCarregando(true);
      let newParams = Object.assign({}, { ...values });
      buscarLayouts(newParams);
      setFiltrado(true);
    } else if (filtrado) {
      setCarregando(true);
      setFiltrado(false);
      buscarLayouts();
    }
  }, 500);

  useEffect(() => {
    buscarLayouts();
  }, [buscarLayouts]);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-painel-layout-embalagem">
        <div className="card-body painel-layout-embalagem">
          <h5 className="card-title mt-3">Aprovação de Layouts</h5>

          <div className="row mt-4">
            <div className="col">
              <Form
                initialValues={{
                  numero_cronograma: "",
                  nome_produto: "",
                  nome_fornecedor: "",
                }}
                onSubmit={() => {}}
              >
                {({ values }) => (
                  <div className="row text-right">
                    <div className="col-4">
                      <Field
                        component={InputText}
                        name="numero_cronograma"
                        placeholder="Filtrar por N° do Cronograma"
                      />

                      <OnChange name="numero_cronograma">
                        {(value) => filtrarLayouts(value, values)}
                      </OnChange>
                    </div>
                    <div className="col-4">
                      <Field
                        component={InputText}
                        name="nome_produto"
                        placeholder="Filtrar por Nome do Produto"
                      />

                      <OnChange name="nome_produto">
                        {(value) => filtrarLayouts(value, values)}
                      </OnChange>
                    </div>
                    <div className="col-4">
                      <Field
                        component={InputText}
                        name="nome_fornecedor"
                        placeholder="Filtrar por Nome do Fornecedor"
                      />

                      <OnChange name="nome_fornecedor">
                        {(value) => filtrarLayouts(value, values)}
                      </OnChange>
                    </div>
                  </div>
                )}
              </Form>
            </div>
          </div>

          <div className="row mt-4">
            {cardsAprovacaoLayout.map((card, index) => (
              <div className="col-6 mb-4" key={index}>
                <CardCronograma
                  cardTitle={card.titulo}
                  cardType={card.style}
                  solicitations={formatarCardsLayout(
                    card.items ? card.items : []
                  )}
                  icon={card.icon}
                  href={card.href}
                />
              </div>
            ))}
          </div>

          <h5 className="card-title mt-3">Alteração de Layout</h5>

          <div className="row mt-4">
            {cardsAlteracaoLayout.map((card, index) => (
              <div className="col-6 mb-4" key={index}>
                <CardCronograma
                  cardTitle={card.titulo}
                  cardType={card.style}
                  solicitations={formatarCardsLayout(
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
