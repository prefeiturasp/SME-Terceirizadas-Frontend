import {
  DETALHAR_ALTERACAO_CRONOGRAMA,
  PRE_RECEBIMENTO,
} from "configs/constants";
import React from "react";
import { useHistory } from "react-router-dom";
import { tipoDeStatusClasse, tituloItem } from "./helper";
import { validate } from "uuid";
import "./style.scss";
import { LogSolicitacoesUsuarioSimples } from "interfaces/dados_comuns.interface";

interface FluxoDeStatusPreRecebimentoProps {
  listaDeStatus: LogSolicitacoesUsuarioSimples[];
  itensClicaveisCronograma?: boolean;
}

export const FluxoDeStatusPreRecebimento = ({
  listaDeStatus,
  itensClicaveisCronograma,
}: FluxoDeStatusPreRecebimentoProps) => {
  const history = useHistory();

  let ultimoStatus = listaDeStatus.slice(-1)[0];

  if (
    ultimoStatus.status_evento_explicacao === "Alteração enviada ao fornecedor"
  ) {
    listaDeStatus.push({
      status_evento_explicacao: "Fornecedor Ciente",
      criado_em: "",
      usuario: { nome: "", uuid: "" },
      justificativa: "",
    });
  }

  const item = (status: LogSolicitacoesUsuarioSimples, key: number) => {
    const content = (
      <>
        {status.criado_em}
        <br />
        {status.usuario && <span>{status.usuario.nome}</span>}
      </>
    );

    const uuidValido = validate(status.justificativa);

    return (
      <li
        key={key}
        className={`${tipoDeStatusClasse(status)}`}
        style={{
          width: `${100 / listaDeStatus.length}%`,
          cursor:
            itensClicaveisCronograma && uuidValido ? "pointer" : "default",
        }}
        onClick={() => {
          itensClicaveisCronograma &&
            uuidValido &&
            history.push(
              `/${PRE_RECEBIMENTO}/${DETALHAR_ALTERACAO_CRONOGRAMA}?uuid=${status.justificativa}`
            );
        }}
      >
        {content}
      </li>
    );
  };

  return (
    <div className="w-100">
      <ul className={`progressbar-titles fluxos`}>
        {listaDeStatus.map((status, key) => (
          <li key={key}>{tituloItem(status.status_evento_explicacao)}</li>
        ))}
      </ul>
      <ul className="progressbar-dados">
        {listaDeStatus.map((status, key) => item(status, key))}
      </ul>
    </div>
  );
};
