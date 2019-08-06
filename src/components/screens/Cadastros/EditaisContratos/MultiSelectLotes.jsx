import React, { Component, Fragment } from "react";
import { Field } from "redux-form";
import StatefulMultiSelect from "@khanacademy/react-multi-select";

class MultiSelectLotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }



  lidarComLotesSelecionados(value) {
    this.setState({ lotesSelecionados: "value" });
  }

  renderizarLabelLote(selected, options) {
    if (selected.length === 0) {
      return "Selecione um ou mais lotes...";
    }
    if (selected.length === options.length) {
      return "Todos os lotes foram selecionados";
    }
    if (selected.length === 1) {
      return `${selected.length} lote selecionado`;
    }
    return `${selected.length} lotes selecionados`;
  }

  render() {
    const { contratoRelacionado, lotesSelecionados, lotes } = this.props;
    return (
      <Fragment>
        {lotes.length ? (
          <Field
            component={StatefulMultiSelect}
            name={`${contratoRelacionado}lotes`}
            selected={lotesSelecionados}
            options={lotes}
            valueRenderer={this.renderizarLabelLote}
            onSelectedChanged={value => this.lidarComLotesSelecionados(value)}
            overrideStrings={{
              search: "Busca",
              selectSomeItems: "Selecione",
              allItemsAreSelected: "Todos os itens estão selecionados",
              selectAll: "Todos"
            }}
          />
        ) : (
          <div>Carregando lotes..</div>
        )}

        
      </Fragment>
    );
  }
}

export default MultiSelectLotes;
