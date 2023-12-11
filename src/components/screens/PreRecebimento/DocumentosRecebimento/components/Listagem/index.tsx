import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";
import { DocumentosRecebimento } from "interfaces/pre_recebimento.interface";
import {
  PRE_RECEBIMENTO,
  DETALHAR_DOCUMENTO_RECEBIMENTO,
  CORRIGIR_DOCUMENTOS_RECEBIMENTO,
} from "../../../../../../configs/constants";
import { downloadArquivoLaudoAssinado } from "services/documentosRecebimento.service";
import { saveAs } from "file-saver";

interface Props {
  objetos: Array<DocumentosRecebimento>;
}

const Listagem: React.FC<Props> = ({ objetos }) => {
  const renderizarStatus = (status: string) => {
    const perfilFornecedor =
      JSON.parse(localStorage.getItem("perfil")) === "ADMINISTRADOR_EMPRESA";

    return perfilFornecedor && status === "Enviado para Correção" ? (
      <span className="orange">Solicitada Correção</span>
    ) : (
      status
    );
  };

  const renderizarAcoes = (objeto: DocumentosRecebimento): ReactElement => {
    const botaoDetalharVerde = (
      <NavLink
        className="float-left"
        to={`/${PRE_RECEBIMENTO}/${DETALHAR_DOCUMENTO_RECEBIMENTO}?uuid=${objeto.uuid}`}
      >
        <span className="link-acoes px-2">
          <i title="Detalhar" className="fas fa-eye green" />
        </span>
      </NavLink>
    );

    const baixarArquivoLaudo = async () => {
      const response = await downloadArquivoLaudoAssinado(objeto.uuid);
      saveAs(response.data, `laudo_cronograma_${objeto.numero_cronograma}.pdf`);
    };

    const botaoBaixarLaudo = (
      <span className="link-acoes px-2">
        <button onClick={baixarArquivoLaudo}>
          <i title="Baixar Laudo" className="fas fa-file-download green" />
        </button>
      </span>
    );

    const botaoCorrigirLaranja = (
      <NavLink
        className="float-left"
        to={`/${PRE_RECEBIMENTO}/${CORRIGIR_DOCUMENTOS_RECEBIMENTO}?uuid=${objeto.uuid}`}
      >
        <span className="link-acoes px-2">
          <i title="Corrigir" className="fas fa-edit orange" />
        </span>
      </NavLink>
    );

    return (
      <>
        {["Enviado para Análise", "Aprovado"].includes(objeto.status) &&
          botaoDetalharVerde}
        {objeto.status === "Enviado para Correção" && botaoCorrigirLaranja}
        {objeto.status === "Aprovado" && botaoBaixarLaudo}
      </>
    );
  };

  return (
    <div className="listagem-documentos-recebimento">
      <div className="titulo-verde mt-4 mb-3">Documentos Cadastrados</div>

      <article>
        <div className="grid-table header-table">
          <div>Nº do Cronograma</div>
          <div>Nº do Pregão/Chamada Pública</div>
          <div>Nome do Produto</div>
          <div>Data de Cadastro</div>
          <div>Status</div>
          <div>Ações</div>
        </div>

        {objetos.map((objeto) => {
          return (
            <>
              <div key={objeto.uuid} className="grid-table body-table">
                <div>{objeto.numero_cronograma}</div>
                <div>{objeto.pregao_chamada_publica}</div>
                <div>{objeto.nome_produto}</div>
                <div>{objeto.criado_em}</div>
                <div>{renderizarStatus(objeto.status)}</div>
                <div className="actions">{renderizarAcoes(objeto)}</div>
              </div>
            </>
          );
        })}
      </article>
    </div>
  );
};

export default Listagem;
