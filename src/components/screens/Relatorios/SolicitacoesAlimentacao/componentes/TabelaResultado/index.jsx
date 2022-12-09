import React from "react";
import { InclusaoBody } from "../InclusaoBody";
import { InclusaoCEIBody } from "../InclusaoCEIBody";
import { InclusaoCEMEIBody } from "../InclusaoCEMEIBody";
import { InclusaoContiniuaBody } from "../InclusaoContinuaBody";

export const TabelaResultado = ({ ...props }) => {
  const { solicitacoes, filtros, resultadoPaginado } = props;

  const mapComponentePorSolicitacao = (solicitacao, item, index) => {
    switch (item.tipo_doc) {
      case "INC_ALIMENTA":
        return (
          <InclusaoBody
            solicitacao={solicitacao}
            item={item}
            index={index}
            filtros={filtros}
            key={index}
          />
        );
      case "INC_ALIMENTA_CONTINUA":
        return (
          <InclusaoContiniuaBody
            solicitacao={solicitacao}
            item={item}
            index={index}
            filtros={filtros}
            key={index}
          />
        );
      case "INC_ALIMENTA_CEI":
        return (
          <InclusaoCEIBody
            solicitacao={solicitacao}
            item={item}
            index={index}
            filtros={filtros}
            key={index}
          />
        );
      case "INC_ALIMENTA_CEMEI":
        return (
          <InclusaoCEMEIBody
            solicitacao={solicitacao}
            item={item}
            index={index}
            filtros={filtros}
            key={index}
          />
        );
      case "ALT_CARDAPIO":
      case "ALT_CARDAPIO_CEI":
      case "ALT_CARDAPIO_CEMEI":
      case "KIT_LANCHE_AVULSA":
      case "KIT_LANCHE_UNIFICADA":
      case "KIT_LANCHE_AVULSA_CEI":
      case "SUSP_ALIMENTACAO":
      case "SUSP_ALIMENTACAO_CEI":
      case "INV_CARDAPIO":
      default:
        return (
          <tr className="table-body-items" key={index}>
            <td>
              {item.dre_iniciais} - {item.lote_nome}
            </td>
            {filtros.status && filtros.status === "EM_ANDAMENTO" ? (
              <td>{item.terceirizada_nome}</td>
            ) : (
              <td>{item.escola_nome}</td>
            )}
            <td>{item.desc_doc}</td>
            <td className="text-center">
              {item.data_evento}{" "}
              {item.data_evento_fim && item.data_evento !== item.data_evento_fim
                ? `- ${item.data_evento_fim}`
                : ""}
            </td>
            <td className="text-center">
              {item.numero_alunos !== 0 ? item.numero_alunos : "-"}
            </td>
            <td />
          </tr>
        );
    }
  };

  return solicitacoes.length ? (
    <div className="row">
      <div className="col-12 mt-3">
        <p>
          <b>Resultado detalhado</b>
        </p>
      </div>
      <div className="col-12 mt-1">
        <table className="table table-bordered table-items">
          <thead>
            <tr className="table-head-items">
              <th className="col-2">Lote</th>
              {filtros.status && filtros.status === "EM_ANDAMENTO" ? (
                <th className="col-3">Terceirizada</th>
              ) : (
                <th className="col-3">Unidade Educadional</th>
              )}
              <th className="col-2">Tipo de Solicitação</th>
              <th className="col-2 text-center">Data do Evento</th>
              <th className="col-2 text-center">N° de Alunos</th>
              <th className="col-1" />
            </tr>
          </thead>
          <tbody>
            {resultadoPaginado.map((item, index) => {
              const solicitacao = solicitacoes.find(
                solicitacao => solicitacao.uuid === item.uuid
              );
              const componente = mapComponentePorSolicitacao(
                solicitacao,
                item,
                index
              );
              return componente;
            })}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div className="row">
      <div className="col-12 mt-3">
        <p className="text-center">
          <b>
            Não existe solicitações cadastradas para os filtros selecionados
          </b>
        </p>
      </div>
    </div>
  );
};
