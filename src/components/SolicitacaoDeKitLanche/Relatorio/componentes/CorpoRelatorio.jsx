import React, { Fragment } from "react";
import { FluxoDeStatus } from "../../../Shareable/FluxoDeStatus";
import { corDaMensagem, ehInclusaoCei } from "../../../../helpers/utilities";
import Botao from "../../../Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "../../../Shareable/Botao/constants";
import {
  stringSeparadaPorVirgulas,
  justificativaAoNegarSolicitacao
} from "../../../../helpers/utilities";
import { getDetalheKitLancheAvulso } from "../../../../services/relatorios";
import { fluxoPartindoEscola } from "../../../Shareable/FluxoDeStatus/helper";
import TabelaFaixaEtaria from "../../../Shareable/TabelaFaixaEtaria";
import "./style.scss";

export const CorpoRelatorio = props => {
  const {
    tipoSolicitacao,
    solicitacaoKitLanche,
    prazoDoPedidoMensagem
  } = props;

  const justificativaNegacao = justificativaAoNegarSolicitacao(
    solicitacaoKitLanche.logs
  );

  return (
    <div>
      <div className="row">
        <p
          className={`col-12 title-message ${corDaMensagem(
            prazoDoPedidoMensagem
          )}`}
        >
          {prazoDoPedidoMensagem}
          <Botao
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.BLUE}
            icon={BUTTON_ICON.PRINT}
            className="float-right"
            onClick={() => {
              getDetalheKitLancheAvulso(
                solicitacaoKitLanche.uuid,
                tipoSolicitacao
              );
            }}
          />
        </p>
        <div className="col-2">
          <span className="badge-sme badge-secondary-sme">
            <span className="id-of-solicitation-dre">
              # {solicitacaoKitLanche.id_externo}
            </span>
            <br />{" "}
            <span className="number-of-order-label">Nº DA SOLICITAÇÃO</span>
          </span>
        </div>
        <div className="pl-2 my-auto offset-1 col-5">
          <span className="requester">Escola Solicitante</span>
          <br />
          <span className="dre-name">
            {solicitacaoKitLanche.escola && solicitacaoKitLanche.escola.nome}
          </span>
        </div>
        <div className="my-auto col-4">
          <span className="requester">Código EOL</span>
          <br />
          <span className="dre-name">
            {solicitacaoKitLanche.escola &&
              solicitacaoKitLanche.escola.codigo_eol}
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-3 report-label-value">
          <p>DRE</p>
          <p className="value-important">
            {solicitacaoKitLanche.escola &&
              solicitacaoKitLanche.escola.diretoria_regional &&
              solicitacaoKitLanche.escola.diretoria_regional.nome}
          </p>
        </div>
        <div className="col-3 report-label-value">
          <p>Lote</p>
          <p className="value-important">
            {solicitacaoKitLanche.escola &&
              solicitacaoKitLanche.escola.lote &&
              solicitacaoKitLanche.escola.lote.nome}
          </p>
        </div>
        <div className="col-3 report-label-value">
          <p>Tipo de Gestão</p>
          <p className="value-important">
            {solicitacaoKitLanche.escola &&
              solicitacaoKitLanche.escola.tipo_gestao &&
              solicitacaoKitLanche.escola.tipo_gestao.nome}
          </p>
        </div>
        <div className="col-3 report-label-value">
          <p>Empresa</p>
          <p className="value-important">
            {solicitacaoKitLanche.rastro_terceirizada &&
              solicitacaoKitLanche.rastro_terceirizada.nome_fantasia}
          </p>
        </div>
      </div>
      <hr />
      <div className="row">
        <FluxoDeStatus
          listaDeStatus={solicitacaoKitLanche.logs}
          fluxo={fluxoPartindoEscola}
        />
      </div>
      <hr />
      <div className="row">
        <div className="col-4 report-label-value">
          <p>Data do evento</p>
          <p className="value">
            {solicitacaoKitLanche.solicitacao_kit_lanche &&
              solicitacaoKitLanche.solicitacao_kit_lanche.data}
          </p>
        </div>
        <div className="col-8 report-label-value">
          <p>Local do passeio</p>
          <p className="value">{solicitacaoKitLanche.local}</p>
        </div>
      </div>
      <table className="table-report">
        <tr>
          <th>Nº de Alunos</th>
          <th>Tempo Previsto de Passeio</th>
          <th>Opção Desejada</th>
          <th>Nº Total de Kits</th>
        </tr>
        <tr>
          <td>{solicitacaoKitLanche.quantidade_alunos}</td>
          <td>
            {
              solicitacaoKitLanche.solicitacao_kit_lanche
                .tempo_passeio_explicacao
            }
          </td>
          <td>
            {stringSeparadaPorVirgulas(
              solicitacaoKitLanche.solicitacao_kit_lanche.kits,
              "nome"
            )}
          </td>
          <td>
            {solicitacaoKitLanche.solicitacao_kit_lanche.kits.length *
              solicitacaoKitLanche.quantidade_alunos}
          </td>
        </tr>
      </table>
      {ehInclusaoCei(tipoSolicitacao) && (
        <Fragment>
          <TabelaFaixaEtaria faixas={solicitacaoKitLanche.faixas_etarias} />
        </Fragment>
      )}
      {solicitacaoKitLanche.alunos_com_dieta_especial_participantes &&
        !!solicitacaoKitLanche.alunos_com_dieta_especial_participantes
          .length && (
          <Fragment>
            <div className="row report-label-value">
              <div className="col-12 report-label-value">
                <p>Alunos com dieta especial</p>
              </div>
            </div>
            <section className="table-report-dieta-especial">
              <article>
                <div className="codigo-eol">Código EOL</div>
                <div className="nome">Nome</div>
              </article>
              {solicitacaoKitLanche.alunos_com_dieta_especial_participantes.map(
                (aluno, key) => {
                  return (
                    <article key={key}>
                      <div className="codigo-eol">{aluno.codigo_eol}</div>
                      <div className="nome">{aluno.nome}</div>
                    </article>
                  );
                }
              )}
            </section>
          </Fragment>
        )}

      <div className="row">
        <div className="col-12 report-label-value">
          <p>Observações</p>
          <p
            className="value"
            dangerouslySetInnerHTML={{
              __html:
                solicitacaoKitLanche.solicitacao_kit_lanche &&
                solicitacaoKitLanche.solicitacao_kit_lanche.descricao
            }}
          />
        </div>
      </div>
      {justificativaNegacao && (
        <div className="row">
          <div className="col-12 report-label-value">
            <p>Justificativa da rejeição</p>
            <p
              className="value"
              dangerouslySetInnerHTML={{
                __html: justificativaNegacao
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CorpoRelatorio;
