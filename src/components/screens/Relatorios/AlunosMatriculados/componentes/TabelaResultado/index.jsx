import { deepCopy } from "helpers/utilities";
import React, { Fragment } from "react";
import { DetalhesCEIouCEMEI } from "../DetalhesCEIouCEMEI";
import { formataNome } from "../../helpers";
import { Tooltip } from "antd";

export const TabelaResultado = ({ ...props }) => {
  const {
    resultado,
    faixasEtarias,
    showPeridosFaixas,
    setShowPeriodosFaixas
  } = props;

  const changeToActive = index => {
    let lista = deepCopy(showPeridosFaixas);
    lista[index].active = !lista[index].active;
    setShowPeriodosFaixas(lista);
  };

  return (
    <Fragment>
      <div className="row mt-3">
        <div className="col-5">
          <p className="titulo-grid-alunos-matriculados">
            Relação de alunos matriculados
          </p>
        </div>
        <div className="col-7 text-right">
          <p className="helper-grid-alunos-matriculados">
            <i className="fa fa-info-circle mr-2" />
            Veja o nome da Unid. Educacional passando o mouse sobre o número.
          </p>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <table className="table table-bordered table-items">
            <thead>
              <tr className="table-head-items">
                <th className="col-3">DRE</th>
                <th className="col-1">Lote</th>
                <th className="col-1">Tipo de unid.</th>
                <th className="col-3">Unid. educacional</th>
                <th className="col-2 text-center">Períodos</th>
                <th className="col-1 text-center">Matriculados</th>
                <th className="col-1" />
              </tr>
            </thead>
            <tbody>
              {resultado.map((item, index) => {
                const periodosString = item.periodos_escolares
                  .filter(periodo => periodo.possui_alunos_regulares)
                  .map(periodo => periodo.nome)
                  .join(", ");
                return (
                  <Fragment key={index}>
                    <tr className="table-body-items" key={index}>
                      <td>
                        {item.diretoria_regional &&
                          item.diretoria_regional.nome}
                      </td>
                      <td>{item.lote && item.lote.nome}</td>
                      <td>{item.tipo_unidade && item.tipo_unidade.iniciais}</td>
                      <td>
                        <Tooltip
                          color="#42474a"
                          overlayStyle={{
                            maxWidth: "320px",
                            fontSize: "12px",
                            fontWeight: "700"
                          }}
                          title={item.nome}
                        >
                          {formataNome(item.nome)}
                        </Tooltip>
                      </td>
                      <td className="text-center">{periodosString}</td>
                      <td className="text-center">{item.quantidade_alunos}</td>
                      <td className="text-center">
                        {item.eh_cei || item.eh_cemei ? (
                          <i
                            className={`fas fa-${
                              showPeridosFaixas[index] &&
                              showPeridosFaixas[index].active
                                ? "angle-up"
                                : "angle-down"
                            }`}
                            onClick={() => changeToActive(index)}
                          />
                        ) : (
                          <></>
                        )}
                      </td>
                    </tr>
                    {showPeridosFaixas[index] &&
                      showPeridosFaixas[index].active && (
                        <DetalhesCEIouCEMEI
                          faixasEtarias={faixasEtarias}
                          item={item}
                        />
                      )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};
