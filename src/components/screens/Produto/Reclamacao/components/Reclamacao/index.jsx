import React from "react";
import { RECLAMACAO_PRODUTO_STATUS_EXPLICACAO } from "constants/shared";
import "./style.scss";

const {
  CODAE_AUTORIZOU_RECLAMACAO,
  CODAE_RECUSOU_RECLAMACAO,
  CODAE_QUESTIONOU_TERCEIRIZADA,
  CODAE_RESPONDEU_RECLAMACAO,
  TERCEIRIZADA_RESPONDEU_RECLAMACAO
} = RECLAMACAO_PRODUTO_STATUS_EXPLICACAO;

const Reclamacao = ({ reclamacao, indice }) => {
  const logQuestionamentoCodae = reclamacao.logs.find(
    log => log.status_evento_explicacao === CODAE_QUESTIONOU_TERCEIRIZADA
  );
  const logRespostaTerceirizada = reclamacao.logs.find(
    log => log.status_evento_explicacao === TERCEIRIZADA_RESPONDEU_RECLAMACAO
  );
  const logAceiteOuRecusa = reclamacao.logs.find(
    log =>
      log.status_evento_explicacao === CODAE_AUTORIZOU_RECLAMACAO ||
      log.status_evento_explicacao === CODAE_RECUSOU_RECLAMACAO
  );
  const logRespostaCodae = reclamacao.logs.find(
    log => log.status_evento_explicacao === CODAE_RESPONDEU_RECLAMACAO
  );
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
      {logQuestionamentoCodae && (
        <div className="linha linha-3">
          <div />
          <div className="item">
            <div className="label-item">Data quest. CODAE</div>
            <div className="value-item">
              {logQuestionamentoCodae.criado_em.split(" ")[0]}
            </div>
          </div>
          <div className="item">
            <div className="label-item">Questionamento CODAE</div>
            <div
              className="value-item value-uppercase"
              dangerouslySetInnerHTML={{
                __html: logQuestionamentoCodae.justificativa
              }}
            />
          </div>
        </div>
      )}
      {logRespostaTerceirizada && (
        <div className="linha linha-3">
          <div />
          <div className="item">
            <div className="label-item">Data resposta terc.</div>
            <div className="value-item">
              {logRespostaTerceirizada.criado_em.split(" ")[0]}
            </div>
          </div>
          <div className="item">
            <div className="label-item">Resposta terceirizada</div>
            <div
              className="value-item value-uppercase"
              dangerouslySetInnerHTML={{
                __html: logRespostaTerceirizada.justificativa
              }}
            />
          </div>
        </div>
      )}
      {logAceiteOuRecusa && (
        <div className="linha linha-3">
          <div />
          <div className="item">
            <div className="label-item">Data avaliação CODAE</div>
            <div className="value-item">
              {logAceiteOuRecusa.criado_em.split(" ")[0]}
            </div>
          </div>
          <div className="item">
            <div className="label-item">Justificativa avaliação CODAE</div>
            <div
              className="value-item value-uppercase"
              dangerouslySetInnerHTML={{
                __html: logAceiteOuRecusa.justificativa
              }}
            />
          </div>
        </div>
      )}
      {logRespostaCodae && (
        <div className="linha linha-3">
          <div />
          <div className="item">
            <div className="label-item">Data resposta CODAE</div>
            <div className="value-item">
              {logRespostaCodae.criado_em.split(" ")[0]}
            </div>
          </div>
          <div className="item">
            <div className="label-item">Resposta CODAE</div>
            <div
              className="value-item value-uppercase"
              dangerouslySetInnerHTML={{
                __html: logRespostaCodae.justificativa
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Reclamacao;
