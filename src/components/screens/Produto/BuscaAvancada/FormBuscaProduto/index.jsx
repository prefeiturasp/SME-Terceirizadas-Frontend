import React, { Component } from "react";
import CheckboxField from "components/Shareable/Checkbox/Field";
import { InputText } from "components/Shareable/Input/InputText";
import moment from "moment";
import Botao from "components/Shareable/Botao";
import { AAutoComplete } from "components/Shareable/MakeField";
import { BUTTON_STYLE } from "components/Shareable/Botao/constants";
import { Field } from "redux-form";
import { InputComData } from "../../../../Shareable/DatePicker";
import { SelectWithHideOptions } from "../../../../Shareable/SelectWithHideOptions";

class FormBuscaProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataInicialSelecionada: null,
      dataFinalSelecionada: null
    };
  }

  handleChange = selectedItems => {
    this.props.handleChange(selectedItems);
  };

  onSelectStatus = value => {
    this.props.onSelectStatus(value);
  };

  onDeselectStatus = value => {
    this.props.onDeselectStatus(value);
  };

  checkTipoProduto = (indice, check, nome) => {
    this.props.checkTipoProduto(indice, check, nome);
  };

  checkProdutoAlergenico = () => {
    this.props.checkProdutoAlergenico();
  };

  onChangeDataFinal = (event, newValue) => {
    this.setState({ dataFinalSelecionada: newValue });
  };

  onChangeDataInicial = (event, newValue) => {
    this.setState({ dataInicialSelecionada: newValue });
  };

  onClear = () => {
    this.setState({
      dataInicialSelecionada: null,
      dataFinalSelecionada: null
    });
    this.props.onClear();
  };

  onSearch = values => {
    this.props.onSearch(values);
  };

  render() {
    const {
      statusOptions,
      tipos_produto,
      produto_alergenico,
      selectedItems,
      handleSubmit,
      nomesMarcas,
      nomesFabricantes,
      nomesProdutos,
      minDate,
      maxDate
    } = this.props;
    return (
      <form className="form-busca-avancada">
        <div className="descricao-topo-busca-produto">
          Consulte por produtos no sistema
        </div>
        <div className="tipo-status-barra-busca">
          <label>Data cadastro</label>
          <label>Status</label>
          <label>Tipo de produto</label>

          <div className="input-datas-inicio-termino">
            <Field
              component={InputComData}
              name="data-de"
              className="input-data"
              labelClassName="datepicker-fixed-padding"
              placeholder="De"
              minDate={minDate}
              maxDate={
                this.state.dataFinalSelecionada
                  ? moment(this.state.dataFinalSelecionada, "DD/MM/YYYY")._d
                  : maxDate
              }
              onChange={this.onChangeDataInicial}
            />
            <Field
              component={InputComData}
              name="data-ate"
              labelClassName="datepicker-fixed-padding"
              popperPlacement="bottom-end"
              placeholder="Até"
              minDate={
                moment(this.state.dataInicialSelecionada, "DD/MM/YYYY")._d
              }
              maxDate={maxDate}
              onChange={this.onChangeDataFinal}
            />
          </div>
          <div>
            <Field
              component={SelectWithHideOptions}
              options={statusOptions}
              name="status"
              handleChange={this.handleChange}
              selectedItems={selectedItems}
              onSelect={value => this.onSelectStatus(value)}
              onDeselect={value => this.onDeselectStatus(value)}
            />
          </div>
          <div className="check-tipos-prod">
            {tipos_produto.map((tipo, indice) => {
              return (
                <Field
                  key={indice}
                  className="check-tipo-produto"
                  component={CheckboxField}
                  name={`check_${tipo.nome}`}
                  check={tipo.check}
                  nomeInput={`${tipo.label}`}
                  onChange={() => {
                    this.checkTipoProduto(indice, tipo.check, tipo.nome);
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="grid-produtos-alergenicos">
          <label>Ingredientes/aditivos alergênicos?</label>
          <label>
            Quais? (Possível Informar um ou mais ingredientes separados por
            vírgula)
          </label>
          <div className="check-produto_alergenico">
            <Field
              component={CheckboxField}
              name={`produtos_alergenicos`}
              check={produto_alergenico}
              nomeInput={"Sim"}
              onChange={() => {
                this.checkProdutoAlergenico();
              }}
            />
          </div>
          <div>
            <Field
              component={InputText}
              name="aditivos"
              disabled={!produto_alergenico}
            />
          </div>
        </div>
        <div className="produto-input">
          <label>Nome do Produto</label>
        </div>
        <div>
          <Field
            name="nome"
            component={AAutoComplete}
            dataSource={nomesProdutos}
            filterOption
            className="campos-customizados"
          />
        </div>

        <div className="marca-fabricante-produto">
          <label>Marca do produto</label>
          <label>Fabricante do produto</label>
          <Field
            name="marca"
            component={AAutoComplete}
            dataSource={nomesMarcas}
            filterOption
            className="campos-customizados"
          />
          <Field
            name="fabricante"
            component={AAutoComplete}
            dataSource={nomesFabricantes}
            filterOption
            className="campos-customizados"
          />
        </div>

        <div className="botoes-de-pesquisa-produto">
          <Botao
            style={BUTTON_STYLE.GREEN_OUTLINE}
            texto="Limpar Filtro"
            onClick={() => {
              this.onClear();
            }}
          />
          <Botao
            style={BUTTON_STYLE.GREEN}
            texto="Consultar"
            onClick={handleSubmit(values =>
              this.onSearch({
                ...values
              })
            )}
          />
        </div>
      </form>
    );
  }
}

export default FormBuscaProduto;
