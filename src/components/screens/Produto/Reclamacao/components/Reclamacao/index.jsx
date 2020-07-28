import React from "react";
import "./style.scss";

const Reclamacao = ({ reclamacao, indice }) => {
  return (
    <div className="detalhes-reclamacao">
      <div className="linha linha-1">
        <div className="item">
          <div className="label-item">
            Reclamaçao {indice.toString().padStart(2, "0")}
          </div>
        </div>
        <div className="item item-horizontal">
          <div className="label-item">Status Reclamação:</div>
          <div className="value-item">{reclamacao.status_titulo}</div>
        </div>
      </div>
      <div className="linha linha-2">
        <div className="item">
          <div className="label-item">Nome Reclamante</div>
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
          <div className="value-item">{reclamacao.criado_em.split(" ")[0]}</div>
        </div>
        <div className="item">
          <div className="label-item">Justificativa reclamação</div>
          <div
            className="value-item value-uppercase"
            dangerouslySetInnerHTML={{ __html: reclamacao.reclamacao }}
          />
        </div>
      </div>
    </div>
  );
};

export default Reclamacao;
