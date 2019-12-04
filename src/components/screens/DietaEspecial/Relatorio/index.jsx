import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { getDietaEspecial } from "../../../../services/dietaEspecial";
import { FluxoDeStatus } from "../../../Shareable/FluxoDeStatus";
import { TIPO_FLUXO } from "../../../Shareable/FluxoDeStatus/constants";
import "./style.scss";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dietaEspecial: null,
      uuid: null
    };
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) {
      getDietaEspecial(uuid).then(response => {
        this.setState({
          dietaEspecial: response.data,
          uuid
        });
      });
    }
  }

  render() {
    const { dietaEspecial } = this.state;
    return (
      <div>
        {!dietaEspecial ? (
          <div>Carregando...</div>
        ) : (
          <form onSubmit={this.props.handleSubmit}>
            <span className="page-title">{`Dieta Especial - Solicitação # ${
              dietaEspecial.id_externo
            }`}</span>
            <div className="card mt-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-2">
                    <span className="badge-sme badge-secondary-sme">
                      <span className="id-of-solicitation-dre">
                        # {dietaEspecial.id_externo}
                      </span>
                      <br />{" "}
                      <span className="number-of-order-label">
                        ID DA SOLICITAÇÃO
                      </span>
                    </span>
                  </div>
                  <div className="ml-5 col-8">
                    <span className="requester">Escola Solicitante</span>
                    <br />
                    <span className="dre-name">
                      {dietaEspecial.escola && dietaEspecial.escola.nome}
                    </span>
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
                </div>
                <hr />
                {dietaEspecial.logs && (
                  <div className="row">
                    <FluxoDeStatus
                      listaDeStatus={dietaEspecial.logs}
                      tipoDeFluxo={TIPO_FLUXO.PARTINDO_DRE}
                    />
                  </div>
                )}
                <hr />
                <div className="row">
                  <div className="report-students-div col-3">
                    <span>Nº de alunos matriculados total</span>
                    <span>{dietaEspecial.escola.quantidade_alunos}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p className="value">Descrição da Dieta Especial</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3 report-label-value">
                    <p>Cód. EOL do ALuno</p>
                    <p className="value-important">
                      {dietaEspecial.codigo_eol_aluno}
                    </p>
                  </div>
                  <div className="col-5 report-label-value">
                    <p>Nome Completo do Aluno</p>
                    <p className="value-important">
                      {dietaEspecial.nome_completo_aluno}
                    </p>
                  </div>
                  <div className="col-4 report-label-value">
                    <p>Data de Nascimento</p>
                    <p className="value-important">
                      {dietaEspecial.data_nascimento_aluno}
                    </p>
                  </div>
                </div>
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
                <section className="row attachments">
                  <div className="report-label-value col-8">
                    <p>Laudo Médico</p>
                    <p>
                      O laudo fornecido pelo médico. Sem ele, a solicitação de
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
                          >
                            {`Anexo ${key}`}
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </section>
                <table className="table-periods">
                  <tr>
                    <th>Observações</th>
                  </tr>
                  <tr>
                    <td>
                      <p
                        className="value"
                        dangerouslySetInnerHTML={{
                          __html: dietaEspecial.observacoes
                        }}
                      />
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
}

const formName = "relatorioDietaEspecial";
const RelatorioForm = reduxForm({
  form: formName,
  enableReinitialize: true
})(Relatorio);

export default RelatorioForm;
