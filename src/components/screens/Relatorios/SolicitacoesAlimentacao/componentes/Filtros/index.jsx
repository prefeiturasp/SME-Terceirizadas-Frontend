import StatefulMultiSelect from "@khanacademy/react-multi-select";
import Select from "components/Shareable/Select";
import HTTP_STATUS from "http-status-codes";
import { required } from "helpers/fieldValidators";
import { agregarDefault, usuarioEhDRE } from "helpers/utilities";
import React, { useState } from "react";
import { useEffect } from "react";
import { Field, Form } from "react-final-form";
import { getLotesSimples } from "services/lote.service";
import { Spin } from "antd";
import { lotesToOptions } from "../../helpers";
import "../../style.scss";
import { getTiposUnidadeEscolar } from "services/cadastroTipoAlimentacao.service";
import { STATUS_SOLICITACOES, TIPOS_SOLICITACAO } from "../../constants";
import { getEscolasTrecTotal } from "services/escola.service";

export const Filtros = ({ ...props }) => {
  const [lotes, setLotes] = useState([]);
  const [tiposUnidades, setTiposUnidades] = useState([]);
  const [unidadesEducacionais, setUnidadesEducacionais] = useState([]);

  const { erroAPI, meusDados, setErroAPI } = props;

  const getLotesSimplesAsync = async () => {
    let params = {};
    if (usuarioEhDRE()) {
      params["diretoria_regional__uuid"] =
        meusDados.vinculo_atual.instituicao.uuid;
    }
    const response = await getLotesSimples(params);
    if (response.status === HTTP_STATUS.OK) {
      setLotes(lotesToOptions(response.data.results));
    } else {
      setErroAPI("Erro ao carregar lotes.");
    }
  };

  const getTiposUnidadeEscolarAsync = async () => {
    const response = await getTiposUnidadeEscolar();
    if (response.status === HTTP_STATUS.OK) {
      setTiposUnidades(response.data.results);
    } else {
      setErroAPI("Erro ao carregar tipos de unidades.");
    }
  };

  const getEscolasSimplissimaComDREUnpaginatedAsync = async () => {
    const response = await getEscolasTrecTotal(
      usuarioEhDRE() && meusDados.vinculo_atual.instituicao.uuid
    );
    if (response.status === HTTP_STATUS.OK) {
      setUnidadesEducacionais(response.data);
    } else {
      setErroAPI("Erro ao carregar unidades educacionais.");
    }
  };

  useEffect(() => {
    getLotesSimplesAsync();
    getTiposUnidadeEscolarAsync();
    getEscolasSimplissimaComDREUnpaginatedAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async () => {};

  const LOADING =
    !lotes.length || !tiposUnidades.length || !unidadesEducacionais.length;

  return (
    <Spin tip="Carregando..." spinning={LOADING && !erroAPI}>
      {!erroAPI && (
        <Form onSubmit={onSubmit}>
          {({ form, handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-4">
                  <Field
                    component={Select}
                    name="status"
                    label="Status da Solicitação"
                    options={agregarDefault(STATUS_SOLICITACOES)}
                    required
                    validate={required}
                    naoDesabilitarPrimeiraOpcao
                  />
                </div>
                <div className="col-4">
                  <label>Lote</label>
                  <Field
                    component={StatefulMultiSelect}
                    name="lotes"
                    selected={values.lotes || []}
                    options={lotes}
                    onSelectedChanged={values_ => form.change(`lotes`, values_)}
                    hasSelectAll
                    overrideStrings={{
                      selectSomeItems: "Selecione",
                      allItemsAreSelected: "Todos os lotes estão selecionados",
                      selectAll: "Todos"
                    }}
                  />
                </div>
                <div className="col-4">
                  <label>Tipo de Solicitação</label>
                  <Field
                    component={StatefulMultiSelect}
                    name="tipos_solicitacao"
                    selected={values.tipos_solicitacao || []}
                    options={TIPOS_SOLICITACAO}
                    onSelectedChanged={values_ =>
                      form.change(`tipos_solicitacao`, values_)
                    }
                    hasSelectAll
                    overrideStrings={{
                      selectSomeItems: "Selecione",
                      allItemsAreSelected:
                        "Todos os tipos de alimentação estão selecionados",
                      selectAll: "Todos"
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <label>Tipo de Unidade</label>
                  <Field
                    component={StatefulMultiSelect}
                    name="tipos_unidade"
                    selected={values.tipos_unidade || []}
                    options={tiposUnidades.map(tipoUnidade => ({
                      label: tipoUnidade.iniciais,
                      value: tipoUnidade.uuid
                    }))}
                    onSelectedChanged={values_ =>
                      form.change(`tipos_unidade`, values_)
                    }
                    hasSelectAll
                    overrideStrings={{
                      selectSomeItems: "Selecione",
                      allItemsAreSelected:
                        "Todos os tipos de unidade estão selecionados",
                      selectAll: "Todos"
                    }}
                  />
                </div>
                <div className="col-8">
                  <label>Unidades Educacionais</label>
                  <Field
                    component={StatefulMultiSelect}
                    name="unidades_educacionais"
                    selected={values.unidades_educacionais || []}
                    options={unidadesEducacionais.map(unidadeEducacional => ({
                      label: unidadeEducacional.nome,
                      value: unidadeEducacional.uuid
                    }))}
                    onSelectedChanged={values_ =>
                      form.change(`unidades_educacionais`, values_)
                    }
                    hasSelectAll
                    overrideStrings={{
                      selectSomeItems: "Selecione",
                      allItemsAreSelected:
                        "Todos os tipos de unidade estão selecionados",
                      selectAll: "Todos"
                    }}
                  />
                </div>
              </div>
            </form>
          )}
        </Form>
      )}
    </Spin>
  );
};
