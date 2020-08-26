import React, { Fragment } from "react";
import { FluxoDeStatus } from "../../../../../Shareable/FluxoDeStatus";
import { getRelatorioDietaEspecial } from "../../../../../../services/relatorios";
import Botao from "../../../../../Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "../../../../../Shareable/Botao/constants";
import { usuarioEhTerceirizada } from "../../../../../../helpers/utilities";
import SolicitacaoVigente from "../../../Escola/componentes/SolicitacaoVigente";
import {
  fluxoDietaEspecialPartindoEscola,
  formatarFluxoDietaEspecial
} from "../../../../../Shareable/FluxoDeStatus/helper";
import { statusEnum } from "../../../../../../constants/shared";
import "./styles.scss";

export const CorpoRelatorio = props => {
  const {
    dietaEspecial: {
      id_externo,
      escola,
      logs,
      ativo,
      aluno,
      nome_completo_pescritor,
      registro_funcional_pescritor,
      anexos,
      observacoes,
      status_solicitacao,
      alergias_intolerancias,
      classificacao,
      motivo_negacao,
      justificativa_negacao,
      nome_protocolo,
      substituicoes,
      informacoes_adicionais,
      registro_funcional_nutricionista,
      data_termino,
      tem_solicitacao_cadastro_produto
    },
    solicitacoesVigentes,
    uuid
  } = props;
  const statusDietaAutorizada = [
    statusEnum.CODAE_AUTORIZADO,
    statusEnum.TERCEIRIZADA_TOMOU_CIENCIA,
    statusEnum.ESCOLA_SOLICITOU_INATIVACAO
  ];
  return (
    <div>
      <div className="row">
        <div className="col-2">
          <span className="badge-sme badge-secondary-sme">
            <span className="id-of-solicitation-dre"># {id_externo}</span>
            <br />{" "}
            <span className="number-of-order-label">ID DA SOLICITAÇÃO</span>
          </span>
        </div>
        <div className="ml-5 col-7">
          <span className="requester">Escola Solicitante</span>
          <br />
          <span className="dre-name">{escola && escola.nome}</span>
        </div>
        <div className="col-2 float-right">
          <a href={getRelatorioDietaEspecial(uuid)}>
            <Botao
              type={BUTTON_TYPE.BUTTON}
              style={BUTTON_STYLE.BLUE}
              icon={BUTTON_ICON.PRINT}
            />
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col-2 report-label-value">
          <p>DRE</p>
          <p className="value-important">
            {escola &&
              escola.diretoria_regional &&
              escola.diretoria_regional.nome}
          </p>
        </div>
        <div className="col-2 report-label-value">
          <p>Lote</p>
          <p className="value-important">
            {escola && escola.lote && escola.lote.nome}
          </p>
        </div>
        <div className="col-2 report-label-value">
          <p>Tipo de Gestão</p>
          <p className="value-important">
            {escola && escola.tipo_gestao && escola.tipo_gestao.nome}
          </p>
        </div>
        {escola.contato && (
          <div className="col-2 report-label-value">
            <p>Telefone</p>
            <p className="value-important">{escola.contato.telefone}</p>
          </div>
        )}
        {escola.contato && (
          <div className="col-4 report-label-value">
            <p>E-mail</p>
            <p className="value-important">{escola.contato.email}</p>
          </div>
        )}
      </div>
      <hr />
      {logs && (
        <div className="row">
          <FluxoDeStatus
            listaDeStatus={logs}
            fluxo={
              logs.find(
                log =>
                  log.status_evento_explicacao === "Escola solicitou inativação"
              ) !== undefined
                ? formatarFluxoDietaEspecial(logs)
                : fluxoDietaEspecialPartindoEscola
            }
          />
        </div>
      )}
      <hr />
      <div className="row">
        <div className="col report-label-value">
          <p className="value">Descrição da Dieta Especial</p>
        </div>
        {tem_solicitacao_cadastro_produto && (
          <div className="col-5 report-label-value">
            <p className="value">
              <i className="pr-1 fas fa-check-circle tem-solicitacao-cadastro-produto" />
              Há solicitação de cadastro de produto em andamento
            </p>
          </div>
        )}

        <div className="col-4 report-label-value">
          <p className="value">
            <i
              style={{ color: ativo ? "green" : "red" }}
              className={`pr-1 fas fa-${ativo ? "check-circle" : "ban"}`}
            />
            {`Dieta ${ativo ? "ativa" : "inativa"}`}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-3 report-label-value">
          <p>Cód. EOL do ALuno</p>
          <p className="value-important">{aluno.codigo_eol}</p>
        </div>
        <div className="col-5 report-label-value">
          <p>Nome Completo do Aluno</p>
          <p className="value-important">{aluno.nome}</p>
        </div>
        <div className="col-4 report-label-value">
          <p>Data de Nascimento</p>
          <p className="value-important">{aluno.data_nascimento}</p>
        </div>
      </div>
      {solicitacoesVigentes && (
        <SolicitacaoVigente
          uuid={uuid}
          solicitacoesVigentes={solicitacoesVigentes}
        />
      )}
      <div className="row">
        {nome_completo_pescritor && (
          <div className="col-8 report-label-value">
            <p>
              Nome do Prescritor da receita (médico, nutricionista,
              fonoaudiólogo)
            </p>
            <p className="value-important">{nome_completo_pescritor}</p>
          </div>
        )}
        {registro_funcional_pescritor && (
          <div className="col-4 report-label-value">
            <p>Registro Funcional (CRM/CRN/CRFa)</p>
            <p className="value-important">{registro_funcional_pescritor}</p>
          </div>
        )}
      </div>
      {!usuarioEhTerceirizada() && (
        <section className="row attachments">
          <div className="report-label-value col-8">
            <p>Laudo</p>
            <p>
              O laudo fornecido pelo profissional. Sem ele, a solicitação de
              Dieta Especial será negada.
            </p>{" "}
          </div>{" "}
          <div className="col-4 report-label-value">
            <p>Anexos</p>
            {anexos.map((anexo, key) => {
              return (
                <div key={key}>
                  <a
                    href={anexo.arquivo}
                    className="value-important link"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {`Anexo ${key + 1}`}
                  </a>
                </div>
              );
            })}
          </div>
        </section>
      )}
      <div className="report-label-value">
        <p>Observações</p>
        <p
          className="texto-wysiwyg"
          dangerouslySetInnerHTML={{
            __html: observacoes
          }}
        />
      </div>
      {status_solicitacao !== statusEnum.CODAE_A_AUTORIZAR && (
        <>
          {alergias_intolerancias && alergias_intolerancias.length > 0 && (
            <Fragment>
              <hr />
              <div className="report-label-value">
                <p>Relação por Diagnóstico</p>
                {alergias_intolerancias.map((alergia, key) => {
                  return (
                    <div className="value" key={key}>
                      {alergia.descricao}
                    </div>
                  );
                })}
              </div>
            </Fragment>
          )}
          {classificacao && (
            <div className="report-label-value">
              <p>Classificação da Dieta</p>
              <div className="value">{classificacao.nome}</div>
            </div>
          )}
          {motivo_negacao && (
            <div className="report-label-value">
              <p>Motivo da Negação</p>
              <div className="value">{motivo_negacao.descricao}</div>
            </div>
          )}
          {justificativa_negacao && (
            <div className="report-label-value">
              <p>Justificativa da Negação</p>
              <div className="texto-wysiwyg">{justificativa_negacao}</div>
            </div>
          )}
          {nome_protocolo && (
            <div className="report-label-value">
              <p>Nome do Protocolo</p>
              <div className="value">{nome_protocolo}</div>
            </div>
          )}
          {substituicoes.length > 0 && (
            <div className="report-label-value">
              <p>Substituições</p>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Alimento</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Isenções / Substituições</th>
                  </tr>
                </thead>
                <tbody>
                  {substituicoes.map((substituicao, key) => (
                    <tr key={key}>
                      <td className="value">{substituicao.alimento.nome}</td>
                      <td className="value">
                        {substituicao.tipo === "I" ? "Isento" : "Substituição"}
                      </td>
                      <td className="value">
                        <ul>
                          {substituicao.substitutos.map((substituto, key2) => (
                            <li key={key2}>{substituto.nome}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="value">{justificativa_negacao}</div>
            </div>
          )}
          {statusDietaAutorizada.includes(status_solicitacao) && (
            <div className="report-label-value">
              <p>Data de término</p>
              <div className="value">
                {data_termino || "Sem data de término"}
              </div>
            </div>
          )}

          {informacoes_adicionais && (
            <div className="report-label-value">
              <p>Informações Adicionais</p>
              <div
                className="texto-wysiwyg"
                dangerouslySetInnerHTML={{
                  __html: informacoes_adicionais
                }}
              />
            </div>
          )}
          {registro_funcional_nutricionista && (
            <div className="report-label-value">
              <p>Identificação do Nutricionista</p>
              <div className="value">{registro_funcional_nutricionista}</div>
            </div>
          )}
        </>
      )}
      {anexos.filter(anexo => anexo.eh_laudo_alta).length > 0 && (
        <Fragment>
          <hr />
          <div className="report-label-value">
            <p>Laudo de Alta - Inativação da Dieta</p>
            {anexos
              .filter(anexo => anexo.eh_laudo_alta)
              .map((anexo, key) => {
                return (
                  <div key={key}>
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href={anexo.arquivo}
                      className="link"
                    >
                      {anexo.nome}
                    </a>
                  </div>
                );
              })}
          </div>
          <div className="pb-3 report-label-value">
            <p>Justificativa</p>
            <p
              className="value"
              dangerouslySetInnerHTML={{
                __html: logs.find(
                  log =>
                    log.status_evento_explicacao ===
                    "Escola solicitou inativação"
                ).justificativa
              }}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default CorpoRelatorio;
