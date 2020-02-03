import React from "react";
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
  fluxoDietaEspecialComInativacao,
  fluxoDietaEspecialPartindoEscola
} from "../../../../../Shareable/FluxoDeStatus/helper";

export const CorpoRelatorio = props => {
  const { dietaEspecial, solicitacoesVigentes, uuid } = props;
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
                ? fluxoDietaEspecialComInativacao
                : fluxoDietaEspecialPartindoEscola
            }
          />
        </div>
      )}
      <hr />
      <div className="row">
        <div className="col-12 report-label-value">
          <p className="value">Descrição da Dieta Especial</p>
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
            <p>Laudo Médico</p>
            <p>
              O laudo fornecido pelo médico. Sem ele, a solicitação de Dieta
              Especial será negada.
            </p>{" "}
          </div>{" "}
          <div className="col-4 report-label-value">
            <p>Anexos</p>
            {dietaEspecial.anexos
              .filter(anexo => anexo.eh_laudo_medico)
              .map((anexo, key) => {
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
          className="value"
          dangerouslySetInnerHTML={{
            __html: dietaEspecial.observacoes
          }}
        />
      </div>
      {dietaEspecial.alergias_intolerancias &&
        dietaEspecial.alergias_intolerancias.length > 0 && (
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
        )}
      {dietaEspecial.classificacao && (
        <div className="report-label-value">
          <p>Classificação da Dieta</p>
          <div className="value">{dietaEspecial.classificacao.nome}</div>
        </div>
      )}
      {dietaEspecial.anexos.filter(anexo => !anexo.eh_laudo_medico).length >
        0 && (
        <div className="pb-3 report-label-value">
          <p>Protocolo da Dieta Especial</p>
          {dietaEspecial.anexos
            .filter(anexo => !anexo.eh_laudo_medico)
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
      )}
      {dietaEspecial.registro_funcional_nutricionista && (
        <div className="report-label-value">
          <p>Identificação do Nutricionista</p>
          <div className="value">
            {dietaEspecial.registro_funcional_nutricionista}
          </div>
        </div>
      )}
    </div>
  );
};

export default CorpoRelatorio;
