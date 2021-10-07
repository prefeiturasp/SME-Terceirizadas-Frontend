import React, { useState, useEffect } from "react";
import { Field } from "redux-form";
import InputText from "components/Shareable/Input/InputText";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import Select from "components/Shareable/Select";
import ModalCadastrarItem from "components/Shareable/ModalCadastrarItem";
import "./style.scss";

const Especificaoes = ({
  fields,
  meta: { error, submitFailed },
  unidades_de_medida,
  embalagens,
  especificacoesIniciais,
  updateOpcoesItensCadastrados
}) => {
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const opcoesUnidadesDeMedida =
    unidades_de_medida &&
    [
      {
        uuid: undefined,
        nome: "Selecione a Unidade de Medida"
      }
    ].concat(
      unidades_de_medida.map(unidade_de_medida => {
        return { uuid: unidade_de_medida.uuid, nome: unidade_de_medida.nome };
      })
    );

  const opcoesEmbalagens =
    embalagens &&
    [
      {
        uuid: undefined,
        nome: "Selecione a Embalagem"
      }
    ].concat(
      embalagens.map(embalagem => {
        return { uuid: embalagem.uuid, nome: embalagem.nome };
      })
    );

  useEffect(() => {
    if (!mounted) {
      if (
        opcoesUnidadesDeMedida &&
        opcoesEmbalagens &&
        ([null, undefined].includes(especificacoesIniciais) ||
          especificacoesIniciais.length === 0)
      ) {
        fields.push({});
        setMounted(true);
      }
    }
  });

  return (
    <>
      <div className="row pt-3">
        <div className="col-12">
          <p>
            <b>
              Insira as informações referentes ao volume e unidade de medida
            </b>
          </p>
        </div>
        <div className="col-12">
          <Botao
            texto="Cadastrar Item"
            onClick={() => setShowModal(true)}
            style={BUTTON_STYLE.GREEN}
          />
        </div>
      </div>
      {fields.map((name, index) => {
        return (
          <div className="row pt-3" key={index}>
            <div className="col-3">
              <Field
                component={InputText}
                className={"select-form-produto"}
                name={`${name}.volume`}
                label="Volume"
                type="number"
                step="0.01"
                min={1}
                tooltipText="Campo específico para inserir a quantidade em volumes Ex: 01"
                required
              />
            </div>
            <div className="col-4">
              <Field
                component={Select}
                name={`${name}.unidade_de_medida`}
                label="Unidade de Medida"
                options={opcoesUnidadesDeMedida}
                naoDesabilitarPrimeiraOpcao
                tooltipText="Campo específico referente a unidade de medida do produto Ex: LT, ML..."
                required
              />
            </div>
            <div className="col-4">
              <Field
                component={Select}
                name={`${name}.embalagem_produto`}
                label="Embalagem"
                options={opcoesEmbalagens}
                naoDesabilitarPrimeiraOpcao
                required
              />
            </div>
            <div className="col-1 excluir-especificacoes">
              {fields.length > 1 && (
                <Botao
                  icon={BUTTON_ICON.TRASH}
                  onClick={() => fields.remove(index)}
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                />
              )}
            </div>
            <div className="col-12">
              {submitFailed && error && (
                <span className="erro-especificacoes">{error}</span>
              )}
            </div>
          </div>
        );
      })}
      <div className="row  pt-3">
        <div className="col-12">
          <Botao
            texto="Adicionar"
            onClick={() => fields.push({})}
            style={BUTTON_STYLE.GREEN}
          />
        </div>
      </div>
      <ModalCadastrarItem
        closeModal={() => setShowModal(false)}
        showModal={showModal}
        item={undefined}
        changePage={() => updateOpcoesItensCadastrados}
      />
    </>
  );
};

export default Especificaoes;
