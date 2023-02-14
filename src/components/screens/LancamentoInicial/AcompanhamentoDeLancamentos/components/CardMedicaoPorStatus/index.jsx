import React from "react";

export const CardMedicaoPorStatus = ({ ...props }) => {
  const {
    children,
    classeCor,
    dados,
    form,
    onPageChanged,
    page,
    setResultados,
    setStatusSelecionado,
    total
  } = props;

  return (
    <div
      onClick={() => {
        if (total) {
          setResultados(dados);
          form.reset();
          setStatusSelecionado(dados.status);
          page !== 1 && onPageChanged(1);
        }
      }}
      className={`card-medicao-por-status ${classeCor} mr-3`}
    >
      <div className="p-2">
        <div className="titulo">{children}</div>
        <hr />
        <div className="total">{total}</div>
        <div className="conferir-lista">Conferir lista</div>
      </div>
    </div>
  );
};
