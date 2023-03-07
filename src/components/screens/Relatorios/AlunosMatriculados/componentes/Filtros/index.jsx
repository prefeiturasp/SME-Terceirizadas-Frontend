import React, { Fragment } from "react";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { Field, Form } from "react-final-form";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { toastInfo } from "components/Shareable/Toast/dialogs";
import { formataOpcoes } from "../../helpers";

export const Filtros = ({ ...props }) => {
  const {
    dres,
    lotes,
    tiposUnidades,
    unidadesEducacionais,
    listaOpcoes
  } = props;

  const onSubmit = () => {
    toastInfo("Essa funcionalidade ainda não foi implementada.");
  };

  const filtrarOpcoesEscola = values => {
    let escolas = listaOpcoes.escolas;
    if (values.diretorias_regionais && values.diretorias_regionais.length) {
      escolas = escolas.filter(escola =>
        values.diretorias_regionais.includes(escola.diretoria_regional.uuid)
      );
    }
    if (values.lotes && values.lotes.length) {
      const dresDosLotesSelecionados = listaOpcoes.lotes
        .filter(lote => values.lotes.includes(lote.uuid))
        .map(lote => lote.diretoria_regional.uuid);
      escolas = escolas.filter(escola =>
        dresDosLotesSelecionados.includes(escola.diretoria_regional.uuid)
      );
    }
    return formataOpcoes(escolas);
  };

  return (
    <Fragment>
      <Form onSubmit={onSubmit}>
        {({ form, handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-8">
                <label>DRE</label>
                <Field
                  component={StatefulMultiSelect}
                  name="diretorias_regionais"
                  selected={values.diretorias_regionais || []}
                  options={dres}
                  onSelectedChanged={values_ => {
                    form.change("diretorias_regionais", values_);
                    form.change("lotes", []);
                    form.change("unidades_educacionais", []);
                  }}
                  hasSelectAll
                  overrideStrings={{
                    selectSomeItems: "Selecione",
                    allItemsAreSelected: "Todas as DREs",
                    selectAll: "Todas"
                  }}
                />
              </div>
              <div className="col-4">
                <label>Lote</label>
                <Field
                  component={StatefulMultiSelect}
                  name="lotes"
                  selected={values.lotes || []}
                  options={
                    values.diretorias_regionais &&
                    values.diretorias_regionais.length
                      ? formataOpcoes(
                          listaOpcoes.lotes.filter(lote =>
                            values.diretorias_regionais.includes(
                              lote.diretoria_regional.uuid
                            )
                          )
                        )
                      : lotes
                  }
                  onSelectedChanged={values_ => {
                    form.change("lotes", values_);
                    form.change("unidades_educacionais", []);
                  }}
                  hasSelectAll
                  overrideStrings={{
                    selectSomeItems: "Selecione",
                    allItemsAreSelected: "Todos os lotes",
                    selectAll: "Todos"
                  }}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-4">
                <label>Tipo de unidade</label>
                <Field
                  component={StatefulMultiSelect}
                  name="tipos_unidades"
                  selected={values.tipos_unidades || []}
                  options={tiposUnidades}
                  onSelectedChanged={values_ =>
                    form.change("tipos_unidades", values_)
                  }
                  hasSelectAll
                  overrideStrings={{
                    selectSomeItems: "Selecione",
                    allItemsAreSelected: "Todos os Tipos de Unidades",
                    selectAll: "Todos"
                  }}
                />
              </div>
              <div className="col-8">
                <label>Unidade Educacional</label>
                <Field
                  component={StatefulMultiSelect}
                  name="unidades_educacionais"
                  selected={values.unidades_educacionais || []}
                  options={
                    (values.diretorias_regionais &&
                      values.diretorias_regionais.length) ||
                    (values.lotes && values.lotes.length)
                      ? filtrarOpcoesEscola(values)
                      : unidadesEducacionais
                  }
                  onSelectedChanged={values_ =>
                    form.change("unidades_educacionais", values_)
                  }
                  hasSelectAll
                  overrideStrings={{
                    selectSomeItems: "Selecione",
                    allItemsAreSelected: "Todas as Unidades Educacionais",
                    selectAll: "Todas"
                  }}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 text-right">
                <Botao
                  texto="Limpar Filtros"
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                  onClick={() => {
                    form.reset();
                  }}
                />
                <Botao
                  texto="Consultar"
                  type={BUTTON_TYPE.SUBMIT}
                  style={BUTTON_STYLE.GREEN}
                  className="ml-3"
                />
              </div>
            </div>
          </form>
        )}
      </Form>
    </Fragment>
  );
};
