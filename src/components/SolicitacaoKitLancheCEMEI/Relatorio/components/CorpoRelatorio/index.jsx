import React, { useContext, useState } from "react";
import { Collapse } from "react-collapse";
import HTTP_STATUS from "http-status-codes";
import {
  corDaMensagem,
  justificativaAoNegarSolicitacao,
  visualizaBotoesDoFluxo
} from "helpers/utilities";
import {
  totalAlunosCEI,
  tempoPasseio,
  checaPrazo,
  getNumeroTotalKits
} from "components/SolicitacaoKitLancheCEMEI/helpers";
import Botao from "components/Shareable/Botao";
import { FluxoDeStatus } from "components/Shareable/FluxoDeStatus";
import { ToggleExpandir } from "components/Shareable/ToggleExpandir";
import { fluxoPartindoEscola } from "components/Shareable/FluxoDeStatus/helper";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import RelatorioHistoricoJustificativaEscola from "components/Shareable/RelatorioHistoricoJustificativaEscola";
import { CODAE, TERCEIRIZADA } from "configs/constants";
import { statusEnum, TIPO_PERFIL, TIPO_SOLICITACAO } from "constants/shared";
import ModalMarcarConferencia from "components/Shareable/ModalMarcarConferencia";
import RelatorioHistoricoQuestionamento from "components/Shareable/RelatorioHistoricoQuestionamento";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import { getSolicitacaoKitLancheCEMEI } from "services/kitLanche";
import { SolicitacaoAlimentacaoContext } from "context/SolicitacaoAlimentacao";
import "../../style.scss";

export const CorpoRelatorio = ({ ...props }) => {
  const {
    solicitacaoKitLancheCEMEI,
    ModalNaoAprova,
    endpointNaoAprovaSolicitacao,
    visao,
    textoBotaoNaoAprova,
    textoBotaoAprova,
    motivosDREnaoValida,
    endpointAprovaSolicitacao,
    toastAprovaMensagem,
    toastAprovaMensagemErro,
    fetchData,
    ModalQuestionamento,
    endpointQuestionamento
  } = props;

  const [collapseAlunosCEI, setCollapseAlunosCEI] = useState(false);
  const [collapseAlunosEMEI, setCollapseAlunosEMEI] = useState(false);
  const [showNaoAprovaModal, setShowNaoAprovaModal] = useState(false);
  const [showModalMarcarConferencia, setShowModalMarcarConferencia] = useState(
    false
  );
  const [showQuestionamentoModal, setShowQuestionamentoModal] = useState(false);
  const [respostaSimNao, setRespostaSimNao] = useState(null);

  const urlParams = new URLSearchParams(window.location.search);
  const tipoPerfil = localStorage.getItem("tipo_perfil");
  const tipoSolicitacao = urlParams.get("tipoSolicitacao");

  const EXIBIR_BOTAO_NAO_APROVAR =
    visao !== TERCEIRIZADA ||
    (solicitacaoKitLancheCEMEI &&
      solicitacaoKitLancheCEMEI.prioridade !== "REGULAR" &&
      solicitacaoKitLancheCEMEI.status === statusEnum.CODAE_QUESTIONADO &&
      textoBotaoNaoAprova);
  const EXIBIR_BOTAO_MARCAR_CONFERENCIA =
    visao === TERCEIRIZADA &&
    solicitacaoKitLancheCEMEI &&
    [statusEnum.CODAE_AUTORIZADO, statusEnum.ESCOLA_CANCELOU].includes(
      solicitacaoKitLancheCEMEI.status
    );
  const EXIBIR_BOTAO_APROVAR =
    (![
      TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA,
      TIPO_PERFIL.TERCEIRIZADA
    ].includes(tipoPerfil) &&
      textoBotaoAprova) ||
    (solicitacaoKitLancheCEMEI &&
      (solicitacaoKitLancheCEMEI.prioridade === "REGULAR" ||
        [
          statusEnum.TERCEIRIZADA_RESPONDEU_QUESTIONAMENTO,
          statusEnum.CODAE_AUTORIZADO
        ].includes(solicitacaoKitLancheCEMEI.status)) &&
      textoBotaoAprova);
  const EXIBIR_BOTAO_QUESTIONAMENTO =
    [
      TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA,
      TIPO_PERFIL.TERCEIRIZADA
    ].includes(tipoPerfil) &&
    solicitacaoKitLancheCEMEI &&
    (solicitacaoKitLancheCEMEI.prioridade !== "REGULAR" ||
      (visao === CODAE &&
        solicitacaoKitLancheCEMEI.prioridade !== "REGULAR")) &&
    [statusEnum.DRE_VALIDADO, statusEnum.CODAE_QUESTIONADO].includes(
      solicitacaoKitLancheCEMEI.status
    );

  const solicitacaoAlimentacaoContext = useContext(
    SolicitacaoAlimentacaoContext
  );

  const justificativaNegacao = justificativaAoNegarSolicitacao(
    solicitacaoKitLancheCEMEI.logs
  );

  const onClickBotaoAprovar = async () => {
    const resp = await endpointAprovaSolicitacao(
      solicitacaoKitLancheCEMEI.uuid
    );
    if (resp.status === HTTP_STATUS.OK) {
      toastSuccess(toastAprovaMensagem);
      const response = await getSolicitacaoKitLancheCEMEI(
        solicitacaoKitLancheCEMEI.uuid
      );
      if (response.status === HTTP_STATUS.OK) {
        solicitacaoAlimentacaoContext.updateSolicitacaoAlimentacao(
          response.data
        );
      }
    } else {
      toastError(toastAprovaMensagemErro);
    }
  };

  const kitsSelecionados = kits => {
    let nomeKits = [];
    kits.forEach(kit => nomeKits.push(kit.nome));
    return nomeKits.join(", ");
  };

  return (
    <>
      <div className="row mb-2">
        <p
          className={`col-6 ${corDaMensagem(
            checaPrazo(solicitacaoKitLancheCEMEI.prioridade)
          )}`}
        >
          <b>{checaPrazo(solicitacaoKitLancheCEMEI.prioridade)}</b>
        </p>
        <div className="col-6">
          <Botao
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.GREEN}
            icon={BUTTON_ICON.PRINT}
            onClick={() => {}}
            className="float-right"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-3 my-auto">
          <div className="badge-sme badge-secondary-sme">
            <span className="id-of-solicitation-dre">
              # {solicitacaoKitLancheCEMEI.id_externo}
            </span>
            <br />{" "}
            <span className="number-of-order-label">Nº DA SOLICITAÇÃO</span>
          </div>
        </div>
        <div className="col-5 my-auto report-label-value">
          <p className="mb-2">Escola Solicitante</p>
          <p className="value-important">
            {solicitacaoKitLancheCEMEI.escola.nome}
          </p>
        </div>
        <div className="col-2 my-auto report-label-value">
          <p className="mb-2">Código EOL</p>
          <p className="value-important">
            {solicitacaoKitLancheCEMEI.escola.codigo_eol}
          </p>
        </div>
        <div className="col-2 my-auto" />
      </div>
      <div className="row">
        <div className="col-3 report-label-value">
          <p>DRE</p>
          <p className="value-important">
            {solicitacaoKitLancheCEMEI.escola.diretoria_regional.nome}
          </p>
        </div>
        <div className="col-3 report-label-value">
          <p>Lote</p>
          <p className="value-important">
            {solicitacaoKitLancheCEMEI.escola.lote.nome}
          </p>
        </div>
        <div className="col-3 report-label-value">
          <p>Tipo de Gestão</p>
          <p className="value-important">
            {solicitacaoKitLancheCEMEI.escola.tipo_gestao.nome}
          </p>
        </div>
        <div className="col-3 report-label-value">
          <p>Empresa</p>
          <p className="value-important">
            {solicitacaoKitLancheCEMEI.rastro_terceirizada.nome_fantasia}
          </p>
        </div>
      </div>
      <hr />
      <div className="row">
        <FluxoDeStatus
          listaDeStatus={solicitacaoKitLancheCEMEI.logs}
          fluxo={fluxoPartindoEscola}
          eh_gestao_alimentacao={true}
        />
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <p>
            <b>Solicitação de Kit Lanche Passeio</b>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-4 report-label-value mt-0">
          <p className="mb-2">Data do passeio:</p>
          <p className="value-important">{solicitacaoKitLancheCEMEI.data}</p>
        </div>
        <div className="col-4 report-label-value mt-0">
          <p className="mb-2">Local do passeio:</p>
          <p className="value-important">{solicitacaoKitLancheCEMEI.local}</p>
        </div>
      </div>
      {solicitacaoKitLancheCEMEI.solicitacao_cei && (
        <>
          <div className="alunos-label mt-3">Alunos CEI</div>
          <div className="row">
            <div className="col">
              <p className="mt-3">
                Número de alunos:{" "}
                <b className="green ml-1">
                  {
                    totalAlunosCEI(solicitacaoKitLancheCEMEI)
                      .totalQuantidadeAlunos
                  }
                </b>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <p>
                Tempo previsto de passeio:{" "}
                <b className="green ml-1">
                  {tempoPasseio(solicitacaoKitLancheCEMEI.solicitacao_cei)}
                </b>
              </p>
            </div>
            <div className="col-6">
              <p>
                Opção desejada:{" "}
                <b className="green ml-1">
                  {kitsSelecionados(
                    solicitacaoKitLancheCEMEI.solicitacao_cei.kits
                  )}
                </b>
              </p>
            </div>
          </div>
          <section className="tabela-faixa-etaria-cei">
            <article>
              <div className="faixa-etaria">Faixa etária</div>
              <div className="alunos-matriculados">Alunos matriculados</div>
              <div className="quantidade">Quantidade</div>
            </article>
            {solicitacaoKitLancheCEMEI.solicitacao_cei.faixas_quantidades.map(
              (faixa, key) => (
                <article key={key}>
                  <div className="faixa-etaria">
                    {faixa.faixa_etaria.__str__}
                  </div>
                  <div className="alunos-matriculados">
                    {faixa.matriculados_quando_criado}
                  </div>
                  <div className="quantidade">{faixa.quantidade_alunos}</div>
                </article>
              )
            )}
            <article>
              <div className="faixa-etaria">Total</div>
              <div className="alunos-matriculados">
                {totalAlunosCEI(solicitacaoKitLancheCEMEI).totalMatriculados}
              </div>
              <div className="quantidade">
                {
                  totalAlunosCEI(solicitacaoKitLancheCEMEI)
                    .totalQuantidadeAlunos
                }
              </div>
            </article>
          </section>
        </>
      )}
      {solicitacaoKitLancheCEMEI.solicitacao_cei &&
        solicitacaoKitLancheCEMEI.solicitacao_cei
          .alunos_com_dieta_especial_participantes.length > 0 && (
          <>
            <div className="row">
              <div className="col">
                <p className="mb-0">
                  <b>Aluno(s) com dieta especial</b>
                </p>
              </div>
            </div>
            <div className="card card-history mt-3 seletor-alunos-dieta-especial">
              <div className="card-header">
                <div className="row">
                  <div className="col-2 ml-0">Código EOL</div>
                  <div className="col-8">Nome do Aluno</div>
                  <div className="col-2 ml-0 toggle-right">
                    <ToggleExpandir
                      onClick={() => setCollapseAlunosCEI(!collapseAlunosCEI)}
                      ativo={collapseAlunosCEI}
                    />
                  </div>
                </div>
              </div>
              <Collapse isOpened={collapseAlunosCEI}>
                <table className="table">
                  <tbody>
                    {solicitacaoKitLancheCEMEI.solicitacao_cei.alunos_com_dieta_especial_participantes.map(
                      (aluno, key) => {
                        return (
                          <tr className="row-alunos" key={key}>
                            <td>{aluno.codigo_eol}</td>
                            <td>{aluno.nome}</td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </Collapse>
            </div>
          </>
        )}
      {solicitacaoKitLancheCEMEI.solicitacao_emei && (
        <>
          <div className="alunos-label mt-6">Alunos EMEI</div>
          <div className="row">
            <div className="col">
              <p className="mt-3">
                Número de alunos:{" "}
                <b className="green ml-1">
                  {solicitacaoKitLancheCEMEI.solicitacao_emei.quantidade_alunos}
                </b>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <p>
                Tempo previsto de passeio:{" "}
                <b className="green ml-1">
                  {tempoPasseio(solicitacaoKitLancheCEMEI.solicitacao_emei)}
                </b>
              </p>
            </div>
            <div className="col-6">
              <p>
                Opção desejada:{" "}
                <b className="green ml-1">
                  {kitsSelecionados(
                    solicitacaoKitLancheCEMEI.solicitacao_emei.kits
                  )}
                </b>
              </p>
            </div>
          </div>
          <section className="tabela-matriculados">
            <article>
              <div className="alunos-matriculados">
                Alunos Matriculados:{" "}
                {
                  solicitacaoKitLancheCEMEI.solicitacao_emei
                    .matriculados_quando_criado
                }
              </div>
              <div className="quantidade">
                Quantidade:{" "}
                {solicitacaoKitLancheCEMEI.solicitacao_emei.quantidade_alunos}
              </div>
            </article>
          </section>
        </>
      )}
      {solicitacaoKitLancheCEMEI.solicitacao_emei &&
        solicitacaoKitLancheCEMEI.solicitacao_emei
          .alunos_com_dieta_especial_participantes.length > 0 && (
          <>
            <div className="row">
              <div className="col">
                <p className="mb-0">
                  <b>Aluno(s) com dieta especial</b>
                </p>
              </div>
            </div>
            <div className="card card-history mt-3 seletor-alunos-dieta-especial">
              <div className="card-header">
                <div className="row">
                  <div className="col-2 ml-0">Código EOL</div>
                  <div className="col-8">Nome do Aluno</div>
                  <div className="col-2 ml-0 toggle-right">
                    <ToggleExpandir
                      onClick={() => setCollapseAlunosEMEI(!collapseAlunosEMEI)}
                      ativo={collapseAlunosEMEI}
                    />
                  </div>
                </div>
              </div>
              <Collapse isOpened={collapseAlunosEMEI}>
                <table className="table">
                  <tbody>
                    {solicitacaoKitLancheCEMEI.solicitacao_emei.alunos_com_dieta_especial_participantes.map(
                      (aluno, key) => {
                        return (
                          <tr className="row-alunos" key={key}>
                            <td>{aluno.codigo_eol}</td>
                            <td>{aluno.nome}</td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </Collapse>
            </div>
          </>
        )}
      <div className="row">
        <div className="col">
          <p className="total-kits">
            Número total de kits:{" "}
            <b className="green ml-1">
              {getNumeroTotalKits(solicitacaoKitLancheCEMEI, true)}
            </b>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p>Observações:</p>
          <p
            dangerouslySetInnerHTML={{
              __html: solicitacaoKitLancheCEMEI.observacao
            }}
          />
        </div>
      </div>
      {justificativaNegacao && (
        <div className="row">
          <div className="col-12 report-label-value">
            <p>Justificativa da negação</p>
            <p
              className="value"
              dangerouslySetInnerHTML={{
                __html: justificativaNegacao
              }}
            />
          </div>
        </div>
      )}
      <RelatorioHistoricoJustificativaEscola
        solicitacao={solicitacaoKitLancheCEMEI}
      />
      <RelatorioHistoricoQuestionamento
        solicitacao={solicitacaoKitLancheCEMEI}
      />
      {visualizaBotoesDoFluxo(solicitacaoKitLancheCEMEI) && (
        <>
          <div className="form-group row float-right mt-4">
            {EXIBIR_BOTAO_NAO_APROVAR && (
              <Botao
                texto={textoBotaoNaoAprova}
                className="float-right"
                type={BUTTON_TYPE.BUTTON}
                style={BUTTON_STYLE.GREEN_OUTLINE}
                onClick={() => {
                  setRespostaSimNao("Não");
                  setShowNaoAprovaModal(true);
                }}
              />
            )}
            {ModalNaoAprova && (
              <ModalNaoAprova
                showModal={showNaoAprovaModal}
                closeModal={() => setShowNaoAprovaModal(false)}
                motivosDREnaoValida={motivosDREnaoValida}
                endpoint={endpointNaoAprovaSolicitacao}
                solicitacao={solicitacaoKitLancheCEMEI}
                resposta_sim_nao={respostaSimNao}
                loadSolicitacao={
                  visao === TERCEIRIZADA
                    ? fetchData
                    : getSolicitacaoKitLancheCEMEI
                }
                tipoSolicitacao={tipoSolicitacao}
              />
            )}
            {EXIBIR_BOTAO_APROVAR &&
              (textoBotaoAprova !== "Ciente" &&
                (visao === CODAE &&
                solicitacaoKitLancheCEMEI.logs.filter(
                  log =>
                    log.status_evento_explicacao ===
                      "Terceirizada respondeu questionamento" &&
                    !log.resposta_sim_nao
                ).length > 0 ? null : (
                  <Botao
                    texto={textoBotaoAprova}
                    type={BUTTON_TYPE.SUBMIT}
                    onClick={() => onClickBotaoAprovar()}
                    style={BUTTON_STYLE.GREEN}
                    className="ml-3"
                  />
                )))}
            {EXIBIR_BOTAO_QUESTIONAMENTO && (
              <Botao
                texto={
                  tipoPerfil === TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA
                    ? "Questionar"
                    : "Sim"
                }
                type={BUTTON_TYPE.SUBMIT}
                onClick={() => {
                  setRespostaSimNao("Sim");
                  setShowQuestionamentoModal(true);
                }}
                style={BUTTON_STYLE.GREEN}
                className="ml-3"
              />
            )}
            {EXIBIR_BOTAO_MARCAR_CONFERENCIA && (
              <div className="form-group float-right mt-4">
                {solicitacaoKitLancheCEMEI.terceirizada_conferiu_gestao ? (
                  <label className="ml-3 conferido">
                    <i className="fas fa-check mr-2" />
                    Solicitação Conferida
                  </label>
                ) : (
                  <Botao
                    texto="Marcar Conferência"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN}
                    className="ml-3"
                    onClick={() => {
                      setShowModalMarcarConferencia(true);
                    }}
                  />
                )}
              </div>
            )}
            <ModalMarcarConferencia
              showModal={showModalMarcarConferencia}
              closeModal={() => setShowModalMarcarConferencia(false)}
              onMarcarConferencia={() => {
                fetchData();
              }}
              uuid={solicitacaoKitLancheCEMEI.uuid}
              endpoint={
                tipoSolicitacao === TIPO_SOLICITACAO.SOLICITACAO_CEI
                  ? "solicitacoes-kit-lanche-cei-avulsa"
                  : tipoSolicitacao === TIPO_SOLICITACAO.SOLICITACAO_CEMEI
                  ? "solicitacao-kit-lanche-cemei"
                  : "solicitacoes-kit-lanche-avulsa"
              }
            />
            {ModalQuestionamento && (
              <ModalQuestionamento
                closeModal={() => setShowQuestionamentoModal(false)}
                showModal={showQuestionamentoModal}
                loadSolicitacao={fetchData}
                resposta_sim_nao={respostaSimNao}
                endpoint={endpointQuestionamento}
                tipoSolicitacao={tipoSolicitacao}
                solicitacao={solicitacaoKitLancheCEMEI}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};
