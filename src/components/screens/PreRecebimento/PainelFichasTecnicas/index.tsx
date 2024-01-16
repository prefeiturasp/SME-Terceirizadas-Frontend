import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import CardCronograma from "components/Shareable/CardCronograma/CardCronograma";
import { cardsPainel } from "./constants";
import {
  parseDataHoraBrToMoment,
  comparaObjetosMoment,
  truncarString,
} from "helpers/utilities";
import { Field, Form } from "react-final-form";
import InputText from "components/Shareable/Input/InputText";
import { OnChange } from "react-final-form-listeners";
import { debounce } from "lodash";
import { useCallback } from "react";
import {
  CardConfig,
  CardItem,
  FichaTecnicaDashboard,
  FiltrosDashboardFichasTecnicas,
} from "interfaces/pre_recebimento.interface";
import { ResponseFichasTecnicasDashboard } from "interfaces/responses.interface";
import { getDashboardFichasTecnicas } from "services/fichaTecnica.service";

export default () => {
  const [carregando, setCarregando] = useState<boolean>(false);
  const [filtrado, setFiltrado] = useState<boolean>(false);

  const [cards, setCards] =
    useState<CardConfig<FichaTecnicaDashboard>[]>(cardsPainel);

  const formatarCards = (items: FichaTecnicaDashboard[]): CardItem[] => {
    return items.sort(ordenarPorLogMaisRecente).map((item) => ({
      text: gerarTextoCard(item),
      date: item.log_mais_recente.slice(0, 10),
      link: "#",
      status: item.status,
      fullText: gerarTextoCompletoCard(item),
    }));
  };

  const ordenarPorLogMaisRecente = (
    a: FichaTecnicaDashboard,
    b: FichaTecnicaDashboard
  ) => {
    let data_a = parseDataHoraBrToMoment(a.log_mais_recente);
    let data_b = parseDataHoraBrToMoment(b.log_mais_recente);
    return comparaObjetosMoment(data_b, data_a);
  };

  const gerarTextoCard = (item: FichaTecnicaDashboard) => {
    const TAMANHO_MAXIMO = 20;

    return `${item.numero_ficha} - ${truncarString(
      item.nome_produto,
      TAMANHO_MAXIMO
    )} - ${truncarString(item.nome_empresa, TAMANHO_MAXIMO)}`;
  };

  const gerarTextoCompletoCard = (item: FichaTecnicaDashboard) => {
    return `${item.numero_ficha} - ${item.nome_produto} - ${item.nome_empresa}`;
  };

  const filtrarItens = debounce((values: FiltrosDashboardFichasTecnicas) => {
    const { nome_produto, numero_ficha, nome_empresa } = values;

    const podeFiltrar = [nome_produto, numero_ficha, nome_empresa].some(
      (value) => value && value.length > 2
    );

    if (podeFiltrar) {
      setCarregando(true);
      let newParams = Object.assign({}, { ...values });
      buscarItens(newParams);
      setFiltrado(true);
    } else if (filtrado) {
      setCarregando(true);
      setFiltrado(false);
      buscarItens();
    }
  }, 500);

  const buscarItens = useCallback(
    async (filtros: FiltrosDashboardFichasTecnicas = null) => {
      setCarregando(true);

      let dadosDashboard = await getDashboardFichasTecnicas(
        filtros ? filtros : null
      );

      let cardsAprovacao = agruparCardsPorStatus(cards, dadosDashboard);

      setCards(cardsAprovacao);
      setCarregando(false);
    },
    []
  );

  const agruparCardsPorStatus = (
    cardsIniciais: CardConfig<FichaTecnicaDashboard>[],
    dadosDashboard: ResponseFichasTecnicasDashboard
  ) => {
    const cardsAgrupados: CardConfig<FichaTecnicaDashboard>[] = [];

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

  useEffect(() => {
    buscarItens();
  }, [buscarItens]);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-painel-fichas-tecnicas">
        <div className="card-body painel-fichas-tecnicas">
          <div className="row mt-4">
            <div className="col">
              <Form
                initialValues={{
                  numero_ficha: "",
                  nome_produto: "",
                  nome_empresa: "",
                }}
                onSubmit={() => {}}
              >
                {({ values }) => (
                  <div className="row text-end">
                    <div className="col-4">
                      <Field
                        component={InputText}
                        name="numero_ficha"
                        placeholder="Filtrar por Nº da Ficha Técnica"
                      />

                      <OnChange name="numero_ficha">
                        {() => filtrarItens(values)}
                      </OnChange>
                    </div>
                    <div className="col-4">
                      <Field
                        component={InputText}
                        name="nome_produto"
                        placeholder="Filtrar por Nome do Produto"
                      />

                      <OnChange name="nome_produto">
                        {() => filtrarItens(values)}
                      </OnChange>
                    </div>
                    <div className="col-4">
                      <Field
                        component={InputText}
                        name="nome_empresa"
                        placeholder="Filtrar por Nome do Fornecedor"
                      />

                      <OnChange name="nome_empresa">
                        {() => filtrarItens(values)}
                      </OnChange>
                    </div>
                  </div>
                )}
              </Form>
            </div>
          </div>

          <div className="row mt-4">
            {cards.map((card, index) => (
              <div className="col-6 mb-4" key={index}>
                <CardCronograma
                  cardTitle={card.titulo}
                  cardType={card.style}
                  solicitations={formatarCards(card.items ? card.items : [])}
                  icon={card.icon}
                  href={card.href}
                  exibirTooltip
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Spin>
  );
};
