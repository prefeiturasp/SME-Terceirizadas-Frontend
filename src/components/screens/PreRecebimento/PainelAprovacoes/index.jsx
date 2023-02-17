import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import CardCronograma from "components/Shareable/CardCronograma/CardCronograma";
import { cards } from "./constants";
import { getDashboardCronograma } from "services/cronograma.service";
import {
  parseDataHoraBrToMoment,
  comparaObjetosMoment,
  truncarString
} from "helpers/utilities";
import { DETALHE_CRONOGRAMA, PRE_RECEBIMENTO } from "configs/constants";

export default () => {
  const [carregando, setCarregando] = useState(false);

  const ordenaPorLogMaisRecente = (a, b) => {
    let data_a = parseDataHoraBrToMoment(a.log_mais_recente);
    let data_b = parseDataHoraBrToMoment(b.log_mais_recente);
    return comparaObjetosMoment(data_b, data_a);
  };

  const getText = item => {
    const TAMANHO_MAXIMO = 48;

    return `${item.numero} - ${truncarString(item.produto, TAMANHO_MAXIMO)}`;
  };

  useEffect(() => {
    let buscaCronogramas = async () => {
      setCarregando(true);
      let dadosDashboard = await getDashboardCronograma();
      cards.forEach(card => {
        dadosDashboard.data.results.forEach(data => {
          if (card.incluir_status.includes(data.status)) {
            card.items = data.dados;
          }
        });
      });
      setCarregando(false);
    };

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

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-painel-cronograma">
        <div className="card-body painel-cronograma">
          <div className="card-title">Programação de Cronogramas</div>
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
