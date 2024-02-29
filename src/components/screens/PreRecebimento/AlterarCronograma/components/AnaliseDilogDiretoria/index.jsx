import React from "react";
import { Radio } from "antd";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import { Field } from "react-final-form";

export default ({ aprovacaoDilog, setAprovacaoDilog }) => {
  const onChangeCampos = (e) => {
    setAprovacaoDilog(e.target.value);
  };

  return (
    <>
      <hr />
      <p className="head-green">Análise DILOG</p>
      <Radio.Group
        size="large"
        onChange={onChangeCampos}
        value={aprovacaoDilog}
      >
        <Radio className="radio-entrega-sim" value={true}>
          Analise Aprovada
        </Radio>
        <Radio className="radio-entrega-nao" value={false}>
          Analise Reprovada
        </Radio>
      </Radio.Group>
      {aprovacaoDilog === false && (
        <div className="mt-4">
          <>
            <label className="label fw-normal">
              <span>* </span>Justificativa
            </label>
            <Field
              component={TextArea}
              name="justificativa_dilog"
              placeholder="Escreva as alterações necessárias"
              className="input-busca-produto"
            />
          </>
        </div>
      )}
    </>
  );
};
