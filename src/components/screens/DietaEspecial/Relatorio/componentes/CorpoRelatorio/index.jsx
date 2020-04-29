import React, { Fragment } from "react";
import { FluxoDeStatus } from "../../../../../Shareable/FluxoDeStatus";
import { getRelatorioDietaEspecial } from "../../../../../../services/relatorios";
import Botao from "../../../../../Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "../../../../../Shareable/Botao/constants";
import { usuarioTerceirizada } from "../../../../../../helpers/utilities";
import SolicitacaoVigente from "../../../Escola/componentes/SolicitacaoVigente";
import {
  fluxoDietaEspecialPartindoEscola,
  formatarFluxoDietaEspecial
} from "../../../../../Shareable/FluxoDeStatus/helper";
import { statusEnum } from "../../../../../../constants/shared";

export const CorpoRelatorio = props => {
  const { dietaEspecial, solicitacoesVigentes, uuid } = props;
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
            <span className="id-of-solicitation-dre">
              # {dietaEspecial.id_externo}
            </span>
            <br />{" "}
            <span className="number-of-order-label">ID DA SOLICITAÇÃO</span>
          </span>
        </div>
        <div className="ml-5 col-7">
          <span className="requester">Escola Solicitante</span>
          <br />
          <span className="dre-name">
            {dietaEspecial.escola && dietaEspecial.escola.nome}
          </span>
        </div>
        <div className="col-2 float-right">
          <a href={getRelatorioDietaEspecial(dietaEspecial.uuid)}>
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
            {dietaEspecial &&
              dietaEspecial.escola &&
              dietaEspecial.escola.diretoria_regional &&
              dietaEspecial.escola.diretoria_regional.nome}
          </p>
        </div>
        <div className="col-2 report-label-value">
          <p>Lote</p>
          <p className="value-important">
            {dietaEspecial.escola &&
              dietaEspecial.escola.lote &&
              dietaEspecial.escola.lote.nome}
          </p>
        </div>
        <div className="col-2 report-label-value">
          <p>Tipo de Gestão</p>
          <p className="value-important">
            {dietaEspecial.escola &&
              dietaEspecial.escola.tipo_gestao &&
              dietaEspecial.escola.tipo_gestao.nome}
          </p>
        </div>
        {dietaEspecial.escola.contato && (
          <div className="col-2 report-label-value">
            <p>Telefone</p>
            <p className="value-important">
              {dietaEspecial.escola.contato.telefone}
            </p>
          </div>
        )}
        {dietaEspecial.escola.contato && (
          <div className="col-4 report-label-value">
            <p>E-mail</p>
            <p className="value-important">
              {dietaEspecial.escola.contato.email}
            </p>
          </div>
        )}
      </div>
      <hr />
      {dietaEspecial.logs && (
        <div className="row">
          <FluxoDeStatus
            listaDeStatus={dietaEspecial.logs}
            fluxo={
              dietaEspecial.logs.find(
                log =>
                  log.status_evento_explicacao === "Escola solicitou inativação"
              ) !== undefined
                ? formatarFluxoDietaEspecial(dietaEspecial.logs)
                : fluxoDietaEspecialPartindoEscola
            }
          />
        </div>
      )}
      <hr />
      <div className="row">
        <div className="col-8 report-label-value">
          <p className="value">Descrição da Dieta Especial</p>
        </div>
        <div className="col-4 report-label-value">
          <p className="value">
            <i
              style={{ color: dietaEspecial.ativo ? "green" : "red" }}
              className={`pr-1 fas fa-${
                dietaEspecial.ativo ? "check-circle" : "ban"
              }`}
            />
            {`Dieta ${dietaEspecial.ativo ? "ativa" : "inativa"}`}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-3 report-label-value">
          <p>Cód. EOL do ALuno</p>
          <p className="value-important">{dietaEspecial.aluno.codigo_eol}</p>
        </div>
        <div className="col-5 report-label-value">
          <p>Nome Completo do Aluno</p>
          <p className="value-important">{dietaEspecial.aluno.nome}</p>
        </div>
        <div className="col-4 report-label-value">
          <p>Data de Nascimento</p>
          <p className="value-important">
            {dietaEspecial.aluno.data_nascimento}
          </p>
        </div>
      </div>
      {solicitacoesVigentes && (
        <SolicitacaoVigente
          uuid={uuid}
          solicitacoesVigentes={solicitacoesVigentes}
        />
      )}
      <div className="row">
        {dietaEspecial.nome_completo_pescritor && (
          <div className="col-8 report-label-value">
            <p>
              Nome do Prescritor da receita (médico, nutricionista,
              fonoaudiólogo)
            </p>
            <p className="value-important">
              {dietaEspecial.nome_completo_pescritor}
            </p>
          </div>
        )}
        {dietaEspecial.registro_funcional_pescritor && (
          <div className="col-4 report-label-value">
            <p>Registro Funcional (CRM/CRN/CRFa)</p>
            <p className="value-important">
              {dietaEspecial.registro_funcional_pescritor}
            </p>
          </div>
        )}
      </div>
      {!usuarioTerceirizada() && (
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
            {dietaEspecial.anexos.map((anexo, key) => {
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
            __html: dietaEspecial.observacoes
          }}
        />
      </div>
      {dietaEspecial.alergias_intolerancias &&
        dietaEspecial.alergias_intolerancias.length > 0 && (
          <Fragment>
            <hr />
            <div className="report-label-value">
              <p>Relação por Diagnóstico</p>
              {dietaEspecial.alergias_intolerancias.map((alergia, key) => {
                return (
                  <div className="value" key={key}>
                    {alergia.descricao}
                  </div>
                );
              })}
            </div>
          </Fragment>
        )}
      {dietaEspecial.classificacao && (
        <div className="report-label-value">
          <p>Classificação da Dieta</p>
          <div className="value">{dietaEspecial.classificacao.nome}</div>
        </div>
      )}
      {dietaEspecial.motivo_negacao && (
        <div className="report-label-value">
          <p>Motivo da Negação</p>
          <div className="value">{dietaEspecial.motivo_negacao.descricao}</div>
        </div>
      )}
      {dietaEspecial.justificativa_negacao && (
        <div className="report-label-value">
          <p>Justificativa da Negação</p>
          <div className="texto-wysiwyg">
            {dietaEspecial.justificativa_negacao}
          </div>
        </div>
      )}
      {dietaEspecial.nome_protocolo && (
        <div className="report-label-value">
          <p>Nome do Protocolo</p>
          <div className="value">{dietaEspecial.nome_protocolo}</div>
        </div>
      )}
      {dietaEspecial.substituicoes.length > 0 && (
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
              {dietaEspecial.substituicoes.map((s, key) => (
                <tr key={key}>
                  <td className="value">{s.alimento.nome}</td>
                  <td className="value">
                    {s.tipo === "I" ? "Isento" : "Substituição"}
                  </td>
                  <td className="value">
                    <ul>
                      {s.substitutos.map((ss, key2) => (
                        <li key={key2}>{ss.nome}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="value">{dietaEspecial.justificativa_negacao}</div>
        </div>
      )}
      {statusDietaAutorizada.includes(dietaEspecial.status_solicitacao) && (
        <div className="report-label-value">
          <p>Data de término</p>
          <div className="value">
            {dietaEspecial.data_termino || "Sem data de término"}
          </div>
        </div>
      )}

      {dietaEspecial.informacoes_adicionais && (
        <div className="report-label-value">
          <p>Informações Adicionais</p>
          <div
            className="texto-wysiwyg"
            dangerouslySetInnerHTML={{
              __html: dietaEspecial.informacoes_adicionais
            }}
          />
        </div>
      )}
      {dietaEspecial.registro_funcional_nutricionista && (
        <div className="report-label-value">
          <p>Identificação do Nutricionista</p>
          <div className="value">
            {dietaEspecial.registro_funcional_nutricionista}
          </div>
        </div>
      )}
      {dietaEspecial.anexos.filter(anexo => anexo.eh_laudo_alta).length > 0 && (
        <Fragment>
          <hr />
          <div className="report-label-value">
            <p>Laudo de Alta - Inativação da Dieta</p>
            {dietaEspecial.anexos
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
                __html: dietaEspecial.logs.find(
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
