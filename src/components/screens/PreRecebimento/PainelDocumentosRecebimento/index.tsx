import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import CardCronograma from "components/Shareable/CardCronograma/CardCronograma";
import { cardsPainel } from "./constants";
import {
  ANALISAR_DOCUMENTO_RECEBIMENTO,
  DETALHAR_FORNECEDOR_DOCUMENTO_RECEBIMENTO,
  DETALHAR_CODAE_DOCUMENTO_RECEBIMENTO,
  PRE_RECEBIMENTO,
} from "configs/constants";
import {
  parseDataHoraBrToMoment,
  comparaObjetosMoment,
  truncarString,
  usuarioEhDilogQualidade,
} from "helpers/utilities";
import { Field, Form } from "react-final-form";
import InputText from "components/Shareable/Input/InputText";
import { OnChange } from "react-final-form-listeners";
import { debounce } from "lodash";
import { useCallback } from "react";
import { getDashboardDocumentosRecebimento } from "services/documentosRecebimento.service";
import {
  CardConfig,
  CardItem,
  DocumentosRecebimentoDashboard,
  FiltrosDashboardDocumentos,
} from "interfaces/pre_recebimento.interface";
import { ResponseDocumentosRecebimentoDashboard } from "interfaces/responses.interface";

export default () => {
  const [carregando, setCarregando] = useState<boolean>(false);
  const [filtrado, setFiltrado] = useState<boolean>(false);

  const [cardsAprovacaoDocumento, setCardsAprovacaoDocumento] =
    useState<CardConfig<DocumentosRecebimentoDashboard>[]>(cardsPainel);

  const ordenarPorLogMaisRecente = (
    a: DocumentosRecebimentoDashboard,
    b: DocumentosRecebimentoDashboard
  ) => {
    let data_a = parseDataHoraBrToMoment(a.log_mais_recente);
    let data_b = parseDataHoraBrToMoment(b.log_mais_recente);
    return comparaObjetosMoment(data_b, data_a);
  };

  const gerarTextoCardDocumento = (item: DocumentosRecebimentoDashboard) => {
    const TAMANHO_MAXIMO = 20;

    return `${item.numero_cronograma} - ${truncarString(
      item.nome_produto,
      TAMANHO_MAXIMO
    )} - ${truncarString(item.nome_empresa, TAMANHO_MAXIMO)}`;
  };

  const formatarCardsDocumento = (
    items: DocumentosRecebimentoDashboard[]
  ): CardItem[] => {
    return items.sort(ordenarPorLogMaisRecente).map((item) => ({
      text: gerarTextoCardDocumento(item),
      date: item.log_mais_recente.slice(0, 10),
      link: gerarLinkDocumento(item),
      status: item.status,
    }));
  };

  const gerarLinkDocumento = (item: DocumentosRecebimentoDashboard): string => {
    if (item.status === "Enviado para Análise") {
      if (usuarioEhDilogQualidade()) {
        return `/${PRE_RECEBIMENTO}/${ANALISAR_DOCUMENTO_RECEBIMENTO}?uuid=${item.uuid}`;
      }

      return `/${PRE_RECEBIMENTO}/${DETALHAR_FORNECEDOR_DOCUMENTO_RECEBIMENTO}?uuid=${item.uuid}`;
    }

    return `/${PRE_RECEBIMENTO}/${DETALHAR_CODAE_DOCUMENTO_RECEBIMENTO}?uuid=${item.uuid}`;
  };

  const agruparCardsPorStatus = (
    cardsIniciais: CardConfig<DocumentosRecebimentoDashboard>[],
    dadosDashboard: ResponseDocumentosRecebimentoDashboard
  ) => {
    const cardsAgrupados: CardConfig<DocumentosRecebimentoDashboard>[] = [];

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

  const buscarDocumentos = useCallback(
    async (filtros: FiltrosDashboardDocumentos = null) => {
      setCarregando(true);

      let dadosDashboard = await getDashboardDocumentosRecebimento(
        filtros ? filtros : null
      );

      let cardsAprovacao = agruparCardsPorStatus(
        cardsAprovacaoDocumento,
        dadosDashboard
      );

      setCardsAprovacaoDocumento(cardsAprovacao);
      setCarregando(false);
    },
    []
  );

  const filtrarDocumentos = debounce((values: FiltrosDashboardDocumentos) => {
    const { nome_produto, numero_cronograma, nome_fornecedor } = values;

    const podeFiltrar = [nome_produto, numero_cronograma, nome_fornecedor].some(
      (value) => value && value.length > 2
    );

    if (podeFiltrar) {
      setCarregando(true);
      let newParams = Object.assign({}, { ...values });
      buscarDocumentos(newParams);
      setFiltrado(true);
    } else if (filtrado) {
      setCarregando(true);
      setFiltrado(false);
      buscarDocumentos();
    }
  }, 500);

  useEffect(() => {
    buscarDocumentos();
  }, [buscarDocumentos]);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-painel-documentos-recebimento">
        <div className="card-body painel-documentos-recebimento">
          <h5 className="card-title mt-3">Aprovação de Documentos</h5>

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
                  <div className="row text-end">
                    <div className="col-4">
                      <Field
                        component={InputText}
                        name="numero_cronograma"
                        placeholder="Filtrar por N° do Cronograma"
                      />

                      <OnChange name="numero_cronograma">
                        {() => filtrarDocumentos(values)}
                      </OnChange>
                    </div>
                    <div className="col-4">
                      <Field
                        component={InputText}
                        name="nome_produto"
                        placeholder="Filtrar por Nome do Produto"
                      />

                      <OnChange name="nome_produto">
                        {() => filtrarDocumentos(values)}
                      </OnChange>
                    </div>
                    <div className="col-4">
                      <Field
                        component={InputText}
                        name="nome_fornecedor"
                        placeholder="Filtrar por Nome do Fornecedor"
                      />

                      <OnChange name="nome_fornecedor">
                        {() => filtrarDocumentos(values)}
                      </OnChange>
                    </div>
                  </div>
                )}
              </Form>
            </div>
          </div>

          <div className="row mt-4">
            {cardsAprovacaoDocumento.map((card, index) => (
              <div className="col-6 mb-4" key={index}>
                <CardCronograma
                  cardTitle={card.titulo}
                  cardType={card.style}
                  solicitations={formatarCardsDocumento(
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
