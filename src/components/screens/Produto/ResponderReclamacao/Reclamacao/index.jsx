import React, { useState, Fragment } from "react";
import "./style.scss";
import { STATUS_RECLAMACAO } from "configs/constants";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import ModalResponderReclamacao from "../ModalResponderReclamacao";
import { getReclamacao } from "services/produto.service";

const obterTituloLog = status_evento => {
  switch (status_evento) {
    case "Terceirizada respondeu a reclamação":
      return "Resposta terceirizada";

    case "Aguardando resposta da terceirizada":
      return "Questionamento CODAE";

    default:
      return status_evento;
  }
};

const LogReclamacao = ({ log }) => {
  return (
    <div className="linha linha-3">
      <div />
      <div className="item">
        <div className="label-item">Data reclamação</div>
        <div className="value-item">{log.criado_em.split(" ")[0]}</div>
      </div>
      <div className="item">
        <div className="label-item">
          {obterTituloLog(log.status_evento_explicacao)}
        </div>
        <div
          className="value-item value-uppercase"
          dangerouslySetInnerHTML={{ __html: log.justificativa }}
        />
      </div>
    </div>
  );
};

const Reclamacao = ({
  reclamacao,
  indexReclamacao,
  indexProduto,
  setAtivos,
  produtos,
  setProdutos,
  setCarregando
}) => {
  const [exibirModal, setExibirModal] = useState(null);

  const atualizarReclamacao = () => {
    async function fetchData() {
      setAtivos([]);
      setCarregando(true);
      const response = await getReclamacao(reclamacao.uuid);
      produtos[indexProduto].ultima_homologacao.reclamacoes[
        indexReclamacao - 1
      ] = response.data;
      setProdutos(produtos);
      setCarregando(false);
    }
    fetchData();
  };

  return (
    <Fragment>
      <ModalResponderReclamacao
        showModal={exibirModal}
        closeModal={() => setExibirModal(null)}
        reclamacao={reclamacao}
        atualizarReclamacao={() => atualizarReclamacao()}
      />

      <div className="detalhes-reclamacao">
        <div className="linha linha-1">
          <div className="item">
            <div className="label-item">
              Reclamaçao {indexReclamacao.toString().padStart(2, "0")}
            </div>
          </div>
          <div className="item item-horizontal">
            <div className="label-item">Status Reclamação:</div>
            <div className="value-item">&nbsp; {reclamacao.status_titulo}</div>
          </div>
        </div>
        <div className="linha linha-2">
          <div className="item">
            <div className="label-item">Nome reclamante</div>
            <div className="value-item">{reclamacao.reclamante_nome}</div>
          </div>
          <div className="item">
            <div className="label-item">RF</div>
            <div className="value-item">
              {reclamacao.reclamante_registro_funcional}
            </div>
          </div>
          <div className="item">
            <div className="label-item">Nome Escola</div>
            <div className="value-item">{reclamacao.escola.nome}</div>
          </div>
          <div className="item">
            <div className="label-item">Cód. EOL</div>
            <div className="value-item">{reclamacao.escola.codigo_eol}</div>
          </div>
        </div>
        <div className="linha linha-3">
          <div />
          <div className="item">
            <div className="label-item">Data reclamação</div>
            <div className="value-item">
              {reclamacao.criado_em.split(" ")[0]}
            </div>
          </div>
          <div className="item">
            <div className="label-item">Justificativa reclamação</div>
            <div
              className="value-item value-uppercase"
              dangerouslySetInnerHTML={{ __html: reclamacao.reclamacao }}
            />
          </div>
        </div>
        {reclamacao.logs.map((log, index) => {
          return <LogReclamacao key={index} log={log} />;
        })}
      </div>
      <div className="text-right">
        <Botao
          texto="Responder"
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.GREEN}
          onClick={() => setExibirModal(true)}
          className="ml-3 mr-3"
          disabled={
            reclamacao.status !==
            STATUS_RECLAMACAO.AGUARDANDO_RESPOSTA_TERCEIRIZADA
          }
        />
      </div>
    </Fragment>
  );
};

export default Reclamacao;
