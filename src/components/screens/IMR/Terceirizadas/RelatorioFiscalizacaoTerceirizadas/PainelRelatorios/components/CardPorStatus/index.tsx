import React from "react";

import { formatarPara4Digitos } from "components/screens/helper";
import {
  FiltrosRelatoriosVisitasInterface,
  RelatorioVisitaItemListagem,
} from "interfaces/imr.interface";
import { DashboardSupervisaoInterface } from "../../interfaces";
import { CLASSE_COR_CARD } from "./constants";

type CardPorStatusType = {
  cardStatus: DashboardSupervisaoInterface;
  statusSelecionado: string;
  setStatusSelecionado: (_statusSelecionado: string) => void;
  filtros: FiltrosRelatoriosVisitasInterface;
  setFiltros: (_filtros: FiltrosRelatoriosVisitasInterface) => void;
  setPage: (_page: number) => void;
  setRelatoriosVisita: (
    _relatoriosVisita: RelatorioVisitaItemListagem[]
  ) => void;
  setConsultaRealizada: (_consultaRealizada: boolean) => void;
};

export const CardPorStatus = ({ ...props }: CardPorStatusType) => {
  const {
    cardStatus,
    filtros,
    setFiltros,
    statusSelecionado,
    setStatusSelecionado,
    setPage,
    setRelatoriosVisita,
    setConsultaRealizada,
  } = props;

  const onClickCard = () => {
    if (!cardStatus.total) return;
    setPage(1);
    setRelatoriosVisita([]);
    setConsultaRealizada(false);
    setStatusSelecionado(cardStatus.status);
    setFiltros({
      ...filtros,
      status:
        cardStatus.status !== "TODOS_OS_FORMULARIOS" ? cardStatus.status : "",
    });
  };

  const getClassNameCorCard = () => {
    if (!cardStatus.total || statusSelecionado !== cardStatus.status)
      return "cinza";
    return CLASSE_COR_CARD[cardStatus.status];
  };

  const getClassNameCursorPointer = () => {
    return cardStatus.total ? "cursor-pointer" : "";
  };

  return (
    <div
      onClick={() => onClickCard()}
      className={`card-medicao-por-status ${getClassNameCorCard()} ${getClassNameCursorPointer()} me-3 mb-3`}
    >
      <div className="pt-2">
        <div className="titulo">{cardStatus.label}</div>
        <hr />
        <div className="total">{formatarPara4Digitos(cardStatus.total)}</div>
        <div className="conferir-lista float-end">Conferir lista</div>
      </div>
    </div>
  );
};
