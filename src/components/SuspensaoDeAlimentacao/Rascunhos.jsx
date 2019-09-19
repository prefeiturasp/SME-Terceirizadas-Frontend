import React, { Component } from "react";
import { stringSeparadaPorVirgulas } from "../../helpers/utilities";

export class Rascunhos extends Component {
  render() {
    const {
      suspensoesDeAlimentacaoList,
      OnDeleteButtonClicked,
      OnEditButtonClicked
    } = this.props;
    const allDaysInfo = suspensoesDeAlimentacaoList.map(
      suspensaoDeAlimentacao => {
        suspensaoDeAlimentacao.suspensoes_alimentacao.forEach(value => {
          const idx = suspensaoDeAlimentacao.suspensoes_alimentacao.findIndex(
            value2 => value2.data === value.data
          );
          suspensaoDeAlimentacao.suspensoes_alimentacao[idx][`data${idx}`] =
            suspensaoDeAlimentacao.suspensoes_alimentacao[idx][`data`];
          suspensaoDeAlimentacao.suspensoes_alimentacao[idx][`motivo${idx}`] =
            suspensaoDeAlimentacao.suspensoes_alimentacao[idx][`motivo`];
        });

        const { id_externo, uuid } = suspensaoDeAlimentacao;
        let backgroundColor =
          suspensaoDeAlimentacao.status === "SALVO" ? "#82B7E8" : "#DADADA";
        return (
          <div className="bg-white draft border rounded mt-1 p-2">
            <div className="mt-2">
              <label className="bold ml-3">{`Suspensão de Alimentação # ${id_externo}`}</label>
              <span
                className="ml-3 p-1 border rounded"
                style={{ background: backgroundColor }}
              >
                {suspensaoDeAlimentacao.status}
              </span>
            </div>
            <div className="icon-draft-card float-right">
              Criado em: {suspensaoDeAlimentacao.criado_em}
              <span onClick={() => OnDeleteButtonClicked(id_externo, uuid)}>
                <i className="fas fa-trash" />
              </span>
              <span
                onClick={() =>
                  OnEditButtonClicked({
                    suspensaoDeAlimentacao
                  })
                }
              >
                <i className="fas fa-edit" />
              </span>
            </div>
            <div className="ml-3">
              <p>
                {`Data(s): ${stringSeparadaPorVirgulas(
                  suspensaoDeAlimentacao.suspensoes_alimentacao,
                  "data"
                )}`}
              </p>
            </div>
          </div>
        );
      }
    );
    return <div>{allDaysInfo}</div>;
  }
}
