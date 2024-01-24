import React from "react";
import { Field } from "react-final-form";
import AutoCompleteField from "components/Shareable/AutoCompleteField";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import SelectSelecione from "components/Shareable/SelectSelecione";
import { statusProdutos } from "helpers/utilities";
import { InputComData } from "components/Shareable/DatePicker";
import { useHistory } from "react-router-dom";
import { CADASTROS, CADASTRO_PRODUTOS, CONFIGURACOES } from "configs/constants";
import CollapseFiltros from "components/Shareable/CollapseFiltros";

export default ({ setResultado, nomes, setFiltros }) => {
  const history = useHistory();

  const cadastrarProduto = () =>
    history.push({
      pathname: `/${CONFIGURACOES}/${CADASTROS}/${CADASTRO_PRODUTOS}`,
    });

  const getNomesProdutosFiltrado = (nomeItem) => {
    if (nomeItem) {
      const reg = new RegExp(nomeItem, "iu");
      return nomes.filter((a) => reg.test(a));
    }
    return [];
  };

  const onSubmit = async (values) => {
    const filtros = { ...values };
    setFiltros({ ...filtros });
  };

  const onClear = () => {
    setResultado(undefined);
  };

  return (
    <div className="filtros-produtos-logistica">
      <CollapseFiltros onSubmit={onSubmit} onClear={onClear}>
        {(values) => (
          <div className="row mt-3 mb-3">
            <div className="col-5">
              <Field
                component={AutoCompleteField}
                dataSource={getNomesProdutosFiltrado(values.nome)}
                name="nome"
                label="Filtrar por Nome do Produto"
                placeholder="Digite o nome do Produto"
                className="input-busca-nome-item"
              />
            </div>
            <div className="col-4">
              <Field
                component={SelectSelecione}
                naoDesabilitarPrimeiraOpcao
                options={statusProdutos}
                label="Filtrar por Status"
                name="status"
                placeholder={"Selecione o Status"}
              />
            </div>
            <div className="col-3">
              <Field
                component={InputComData}
                label="Filtrar por Data do Cadastro"
                name="data_cadastro"
                popperPlacement="bottom-end"
                placeholder="Selecione a Data"
                minDate={null}
                maxDate={null}
                writable={false}
              />
            </div>
          </div>
        )}
      </CollapseFiltros>

      <div className="mt-4 mb-4">
        <Botao
          texto="Cadastrar Produto"
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.GREEN}
          onClick={() => cadastrarProduto()}
        />
      </div>
    </div>
  );
};
