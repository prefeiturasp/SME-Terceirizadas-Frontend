import React from "react";
import HTTP_STATUS from "http-status-codes";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { ASelect } from "components/Shareable/MakeField";
import { Icon, Select as SelectAntd } from "antd";
import { getProtocoloPadrao } from "services/dietaEspecial.service";
import { toastError } from "components/Shareable/Toast/dialogs";
import { selectValidate } from "helpers/fieldValidators";

const Protocolos = ({ protocolos, setProtocoloPadrao, form }) => {
  const { Option } = SelectAntd;

  const getProtocolo = async (payload, form) => {
    if (payload.length > 0 && payload !== "selecione") {
      const respProtocoloPadrao = await getProtocoloPadrao(payload);
      if (respProtocoloPadrao.status === HTTP_STATUS.OK) {
        setProtocoloPadrao(respProtocoloPadrao.data);
        const substituicoes = respProtocoloPadrao.data.substituicoes.map(
          substituicao => {
            const alimentos_substitutos = substituicao.alimentos_substitutos.map(
              alimento => alimento.uuid
            );
            const substitutos = substituicao.substitutos.map(
              alimento => alimento.uuid
            );
            return {
              alimento: String(substituicao.alimento.id),
              tipo: substituicao.tipo === "Substituir" ? "S" : "I",
              substitutos: alimentos_substitutos.concat(substitutos)
            };
          }
        );
        form.change("substituicoes", undefined);
        form.change("substituicoes", substituicoes);
        form.change(
          "orientacoes_gerais",
          respProtocoloPadrao.data.orientacoes_gerais
        );
      } else {
        toastError("Houve um erro ao carregar Protocolo Padrão");
      }
    } else {
      setProtocoloPadrao(undefined);
      form.change("substituicoes", undefined);
      form.change("orientacoes_gerais", undefined);
    }
  };

  return (
    <div className="row">
      <div className="col-12 input title">
        <span className="required-asterisk">*</span>
        <label>Nome do Protocolo Padrão</label>
      </div>
      <div className="col-12">
        <Field
          component={ASelect}
          className={"select-form-produto"}
          suffixIcon={<Icon type="caret-down" />}
          showSearch
          required
          validate={selectValidate}
          name="protocolo_padrao"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {protocolos.map(protocolo => {
            return (
              <Option key={protocolo.uuid}>{protocolo.nome_protocolo}</Option>
            );
          })}
        </Field>
        <OnChange name="protocolo_padrao">
          {value => {
            getProtocolo(value, form);
          }}
        </OnChange>
      </div>
    </div>
  );
};

export default Protocolos;
