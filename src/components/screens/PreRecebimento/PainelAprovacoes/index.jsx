import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import CardCronograma from "components/Shareable/CardCronograma/CardCronograma";
import { cards } from "./constants";
import {
  getDashboardCronograma,
  getDashboardCronogramaComFiltros
} from "services/cronograma.service";
import {
  parseDataHoraBrToMoment,
  comparaObjetosMoment,
  truncarString
} from "helpers/utilities";
import { DETALHE_CRONOGRAMA, PRE_RECEBIMENTO } from "configs/constants";
import { Field, Form } from "react-final-form";
import InputText from "components/Shareable/Input/InputText";
import { OnChange } from "react-final-form-listeners";
import { debounce } from "lodash";

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [filtrado, setFiltrado] = useState(false);

  const ordenaPorLogMaisRecente = (a, b) => {
    let data_a = parseDataHoraBrToMoment(a.log_mais_recente);
    let data_b = parseDataHoraBrToMoment(b.log_mais_recente);
    return comparaObjetosMoment(data_b, data_a);
  };

  const getText = item => {
    const TAMANHO_MAXIMO = 48;

    return `${item.numero} - ${truncarString(item.produto, TAMANHO_MAXIMO)}`;
  };

  const buscaCronogramas = async (filtros = null) => {
    setCarregando(true);
    let dadosDashboard;
    if (!filtros) {
      dadosDashboard = await getDashboardCronograma();
    } else {
      dadosDashboard = await getDashboardCronogramaComFiltros(filtros);
    }
    cards.forEach(card => {
      dadosDashboard.data.results.forEach(data => {
        if (card.incluir_status.includes(data.status)) {
          card.items = data.dados;
        }
      });
    });
    setCarregando(false);
  };
  useEffect(() => {
    buscaCronogramas();
  }, []);

  const formataCards = items => {
    return items.sort(ordenaPorLogMaisRecente).map(item => ({
      text: getText(item),
      date: item.log_mais_recente,
      link: gerarLinkDoItem(item),
      status: item.status
    }));
  };

  const gerarLinkDoItem = item => {
    if (
      ["assinado dinutre", "assinado cronograma"].includes(
        item.status.toLowerCase()
      )
    ) {
      return `/${PRE_RECEBIMENTO}/${DETALHE_CRONOGRAMA}?uuid=${item.uuid}`;
    }
  };

  const filtrarRequisicao = debounce((value, values) => {
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
                    nome_fornecedor: "",
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
                          {value => filtrarRequisicao(value, values)}
                        </OnChange>
                      </div>
                      <div className="col-6">
                        <Field
                          component={InputText}
                          name="nome_produto"
                          placeholder="Nome do Produto"
                        />

                        <OnChange name="nome_produto">
                          {value => filtrarRequisicao(value, values)}
                        </OnChange>
                      </div>
                    </div>
                  )}
                </Form>
              </div>
            </div>
          </div>
          <div className="row">
            {cards.map((card, index) => (
              <div className="col-6" key={index}>
                <CardCronograma
                  cardTitle={card.titulo}
                  cardType={card.style}
                  solicitations={formataCards(card.items ? card.items : [])}
                  icon={card.icon}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Spin>
  );
};
