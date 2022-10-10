import React, { useState } from "react";
import { Collapse } from "react-collapse";
import { corDaMensagem } from "helpers/utilities";
import {
  totalAlunosCEI,
  tempoPasseio,
  kitsSelecionados,
  checaPrazo,
  filtraAlunosCEIcomDietaEspecial,
  getNumeroTotalKits,
  filtraAlunosEMEIcomDietaEspecial
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
import "../../style.scss";
import { getSolicitacaoKitLancheCEMEI } from "services/kitLanche";
import RelatorioHistoricoJustificativaEscola from "components/Shareable/RelatorioHistoricoJustificativaEscola";
import { statusEnum } from "constants/shared";

export const CorpoRelatorio = ({ ...props }) => {
  const {
    solicitacaoKitLancheCEMEI,
    kits,
    alunosComDietaEspecial,
    ModalNaoAprova,
    endpointNaoAprovaSolicitacao
  } = props;

  const [collapseAlunosCEI, setCollapseAlunosCEI] = useState(false);
  const [collapseAlunosEMEI, setCollapseAlunosEMEI] = useState(false);
  const [showNaoAprovaModal, setShowNaoAprovaModal] = useState(false);

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
      {["TODOS", "CEI"].includes(
        solicitacaoKitLancheCEMEI.alunos_cei_e_ou_emei
      ) && (
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
                    solicitacaoKitLancheCEMEI.solicitacao_cei,
                    kits
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
      {filtraAlunosCEIcomDietaEspecial(
        solicitacaoKitLancheCEMEI,
        alunosComDietaEspecial
      ).length > 0 && (
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
                  {filtraAlunosCEIcomDietaEspecial(
                    solicitacaoKitLancheCEMEI,
                    alunosComDietaEspecial
                  ).map((aluno, key) => {
                    return (
                      <tr className="row-alunos" key={key}>
                        <td>{aluno.codigo_eol}</td>
                        <td>{aluno.nome}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Collapse>
          </div>
        </>
      )}
      {["TODOS", "EMEI"].includes(
        solicitacaoKitLancheCEMEI.alunos_cei_e_ou_emei
      ) && (
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
                    solicitacaoKitLancheCEMEI.solicitacao_emei,
                    kits
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
      {filtraAlunosEMEIcomDietaEspecial(
        solicitacaoKitLancheCEMEI,
        alunosComDietaEspecial
      ).length > 0 && (
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
                  {filtraAlunosEMEIcomDietaEspecial(
                    solicitacaoKitLancheCEMEI,
                    alunosComDietaEspecial
                  ).map((aluno, key) => {
                    return (
                      <tr className="row-alunos" key={key}>
                        <td>{aluno.codigo_eol}</td>
                        <td>{aluno.nome}</td>
                      </tr>
                    );
                  })}
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
      <RelatorioHistoricoJustificativaEscola
        solicitacao={solicitacaoKitLancheCEMEI}
      />
      {solicitacaoKitLancheCEMEI.status !== statusEnum.ESCOLA_CANCELOU && (
        <Botao
          texto={props.textoBotaoNaoAprova}
          className="float-right"
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.GREEN_OUTLINE}
          onClick={() => setShowNaoAprovaModal(true)}
        />
      )}
      {ModalNaoAprova && (
        <ModalNaoAprova
          showModal={showNaoAprovaModal}
          closeModal={() => setShowNaoAprovaModal(false)}
          endpoint={endpointNaoAprovaSolicitacao}
          solicitacao={solicitacaoKitLancheCEMEI}
          loadSolicitacao={getSolicitacaoKitLancheCEMEI}
        />
      )}
    </>
  );
};
