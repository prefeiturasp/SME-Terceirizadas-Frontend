import HTTP_STATUS from "http-status-codes";
import moment from "moment";
import React, { Component, Fragment } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";

import { PERFIL, TIPO_SOLICITACAO } from "../../../constants/shared";
import { STATUS_DRE_A_VALIDAR } from "../../../configs/constants";
import {
  maxValue,
  naoPodeSerZero,
  required,
  maxLength
} from "../../../helpers/fieldValidators";
import {
  validateFormKitLanchePasseio,
  validateFormKitLanchePasseioCei
} from "./validators";
import {
  converterDDMMYYYYparaYYYYMMDD,
  comoTipo
} from "../../../helpers/utilities";
import {
  checaSeDataEstaEntre2e5DiasUteis,
  getError
} from "../../../helpers/utilities";
import {
  getSolicitacoesKitLanche,
  inicioPedido,
  registroAtualizaKitLanche,
  removeKitLanche,
  solicitarKitLanche
} from "services/kitLanche";
import { getAlunosPorFaixaEtariaNumaData } from "services/alteracaoDeCardapio";
import { getDietasAtivasInativasPorAluno } from "../../../services/dietaEspecial.service";
import { Botao } from "../../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../../Shareable/Botao/constants";
import CardMatriculados from "../../Shareable/CardMatriculados";
import { InputComData } from "../../Shareable/DatePicker";
import { InputText } from "../../Shareable/Input/InputText";
import ModalDataPrioritaria from "../../Shareable/ModalDataPrioritaria";
import { PedidoKitLanche } from "../../Shareable/PedidoKitLanche";
import TabelaQuantidadePorFaixaEtaria from "../../Shareable/TabelaQuantidadePorFaixaEtaria";
import { TextAreaWYSIWYG } from "../../Shareable/TextArea/TextAreaWYSIWYG";
import { toastError, toastSuccess } from "../../Shareable/Toast/dialogs";
import { extrairKitsLanche } from "../../SolicitacaoUnificada/helper";
import { Rascunhos } from "../Rascunhos";
import { montaObjetoRequisicao } from "./helper";
import "./style.scss";
import { isEqual } from "lodash";
import SeletorAlunosDietaEspecial from "../components/SeletorAlunosDietaEspecial";

const { SOLICITACAO_CEI, SOLICITACAO_NORMAL } = TIPO_SOLICITACAO;

const ENTER = 13;
export class SolicitacaoDeKitLanche extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ehCei: localStorage.getItem("perfil") === PERFIL.DIRETOR_CEI, // TODO: investigar
      loading: true,
      qtd_kit_lanche: 0,
      kitsChecked: [],
      initialValues: false,
      radioChanged: false,
      rascunhosSolicitacoesKitLanche: [],
      status: "SEM STATUS",
      title: "Nova solicitação",
      salvarAtualizarLbl: "Salvar Rascunho",
      showModal: false,
      modalConfirmation: false,
      modalMessage: "",
      botaoConfirma: true,
      alunosComDietaEspecial: []
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.refresh = this.refresh.bind(this);
    this.validaDiasUteis = this.validaDiasUteis.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.setInitialValues = this.setInitialValues.bind(this);
    this.handleConfirmation = this.handleConfirmation.bind(this);
    this.updateKitsChecked = this.updateKitsChecked.bind(this);
    this.getNumeroTotalDeKits = this.getNumeroTotalDeKits.bind(this);

    this.validatorsLocalPasseio = [required, maxLength(160)];
  }

  OnDeleteButtonClicked(id_externo, uuid) {
    if (window.confirm("Deseja remover este rascunho?")) {
      removeKitLanche(uuid, this.resolveTipo()).then(
        res => {
          if (res.status === HTTP_STATUS.NO_CONTENT) {
            toastSuccess(`Rascunho # ${id_externo} excluído com sucesso`);
            this.refresh();
          } else {
            toastError(getError(res.data));
          }
        },
        function() {
          toastError("Houve um erro ao excluir o rascunho");
        }
      );
      this.resetForm();
    }
  }

  OnEditButtonClicked(solicitacaoKitLanche) {
    this.props.reset();
    this.props.change("uuid", solicitacaoKitLanche.uuid);
    this.props.change(
      "observacao",
      solicitacaoKitLanche.solicitacao_kit_lanche.descricao
    );
    this.props.change(
      "evento_data",
      solicitacaoKitLanche.solicitacao_kit_lanche.data
    );
    this.props.change("local", solicitacaoKitLanche.local);
    this.props.change(
      "quantidade_alunos",
      solicitacaoKitLanche.quantidade_alunos
    );
    this.props.change(
      "tempo_passeio",
      solicitacaoKitLanche.solicitacao_kit_lanche.tempo_passeio.toString()
    );
    if (this.state.ehCei) {
      solicitacaoKitLanche.faixas_etarias.forEach(faixa =>
        this.props.change(
          `faixas_etarias.${faixa.faixa_etaria.uuid}`,
          faixa.quantidade
        )
      );
      // TODO: caso tenha alunos no rascunho, expandir o seletor
      //       tem que passar state.collapsed do componente SeletorAlunosDietaEspecial pra prop
      //       e guardar no state desse componente
      solicitacaoKitLanche.alunos_com_dieta_especial_participantes.forEach(
        aluno =>
          this.props.change(
            `alunos_com_dieta_especial_participantes.${aluno.codigo_eol}`,
            true
          )
      );
    }
    this.setState({
      status: solicitacaoKitLanche.status,
      title: `Solicitação de Kit Lanche Passeio #${
        solicitacaoKitLanche.id_externo
      }`,
      salvarAtualizarLbl: "Atualizar",
      kitsChecked: extrairKitsLanche(
        solicitacaoKitLanche.solicitacao_kit_lanche.kits
      )
    });
  }

  resetForm() {
    this.props.reset();
    this.props.change("obs", "");
    this.setState({
      status: "SEM STATUS",
      title: "Nova solicitação",
      salvarAtualizarLbl: "Salvar Rascunho",
      qtd_kit_lanche: 0,
      initialValues: true,
      kitsChecked: []
    });
    this.props.dispatch({
      type: "LOAD_ALUNOS_POR_FAIXA_ETARIA",
      data: undefined
    });
    this.props.dispatch({ type: "SET_TOTAL_ALUNOS_SELECIONADOS", data: 0 });
    this.refresh();
  }

  setInitialValues() {
    this.setState({ initialValues: false });
  }

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate() {
    const { meusDados, proximos_dois_dias_uteis } = this.props;
    const { loading } = this.state;
    const dadosDaAPItotalmenteCarregados =
      meusDados !== null && proximos_dois_dias_uteis !== null && loading;
    if (dadosDaAPItotalmenteCarregados) {
      this.setState({
        loading: false
      });
    }
  }

  componentWillUnmount() {
    this.resetForm();
    this.props.reset();
  }

  componentWillMount = async () => {
    const resposta = await getDietasAtivasInativasPorAluno();
    if (resposta.status === 200) {
      this.setState({
        alunosComDietaEspecial: resposta.data.results.solicitacoes.filter(
          s => s.ativas > 0
        )
      });
    }
  };

  validaDiasUteis = event => {
    if (
      checaSeDataEstaEntre2e5DiasUteis(
        event.target.value,
        this.props.proximos_dois_dias_uteis,
        this.props.proximos_cinco_dias_uteis
      )
    ) {
      this.showModal();
    }
  };

  onSubmit(values) {
    values.kit_lanche = this.state.kitsChecked;
    const { ehCei } = this.state;
    if (!ehCei) {
      values.quantidade_alunos = parseInt(values.quantidade_alunos);
    }
    values.escola = this.props.meusDados.vinculo_atual.instituicao.uuid;
    let solicitacao_kit_lanche = montaObjetoRequisicao(values);
    if (values.confirmar) {
      solicitacao_kit_lanche.confirmar = values.confirmar;
    }
    try {
      validateFormKitLanchePasseio(values);
      if (ehCei) {
        validateFormKitLanchePasseioCei(values);
      }
      return new Promise(resolve => {
        this.salvarOuEnviar(
          solicitacao_kit_lanche,
          values,
          ehCei
            ? TIPO_SOLICITACAO.SOLICITACAO_CEI
            : TIPO_SOLICITACAO.SOLICITACAO_NORMAL
        );
        this.handleConfirmation();
        resolve();
      });
    } catch (SubmissionError) {
      toastError(SubmissionError.errors.kit_lanche);
    }
  }

  iniciarPedido(uuid) {
    const tipo = this.state.ehCei ? SOLICITACAO_CEI : SOLICITACAO_NORMAL;
    inicioPedido(uuid, tipo).then(
      res => {
        if (res.status === HTTP_STATUS.OK) {
          toastSuccess(
            "Solicitação de Kit Lanche Passeio enviada com sucesso!"
          );
          this.resetForm();
        } else if (res.status === HTTP_STATUS.BAD_REQUEST) {
          toastError(
            `Houve um erro ao enviar a Solicitação de Kit Lanche Passeio: ${getError(
              res.data.detail
            )}`
          );
        }
      },
      function() {
        toastError(
          "Houve um erro ao enviar a Solicitação de Kit Lanche Passeio"
        );
      }
    );
  }

  resolveTipo = () => {
    return this.state.ehCei ? SOLICITACAO_CEI : SOLICITACAO_NORMAL;
  };

  validaTipoMensagemError = response => {
    const tipoError = response.tipo_error[0];
    const messageModal = response.details[0];
    if (tipoError === "2") {
      this.setState({
        modalConfirmation: true,
        modalMessage: messageModal
      });
    } else if (tipoError === "1") {
      toastError(messageModal);
    }
  };

  salvarOuEnviar(solicitacao_kit_lanche, values, tipoSolicitacao) {
    if (values.status) {
      solicitacao_kit_lanche.status = values.status;
    }
    if (!values.uuid) {
      solicitarKitLanche(solicitacao_kit_lanche, tipoSolicitacao).then(resp => {
        if (resp.status === HTTP_STATUS.CREATED) {
          if (values.status === STATUS_DRE_A_VALIDAR) {
            this.iniciarPedido(resp.data.uuid);
          } else {
            toastSuccess(
              "Solicitação de Kit Lanche Passeio salva com sucesso!"
            );
            this.resetForm();
          }
        } else if (resp.data.tipo_error) {
          this.validaTipoMensagemError(resp.data);
        } else {
          toastError(
            `Erro ao salvar Solicitação de Kit Lanche Passeio ${resp.data}`
          );
        }
      });
    } else {
      registroAtualizaKitLanche(solicitacao_kit_lanche, values.uuid)
        .then(resp => {
          if (resp.status === HTTP_STATUS.OK) {
            if (values.status === STATUS_DRE_A_VALIDAR) {
              this.iniciarPedido(values.uuid);
            } else {
              toastSuccess(
                "Solicitação de Kit Lanche Passeio atualizada com sucesso!"
              );
              this.resetForm();
            }
          } else if (resp.data.tipo_error) {
            this.validaTipoMensagemError(resp.data);
          } else {
            toastError(
              `Erro ao atualizar a solicitação: ${getError(resp.data)}`
            );
          }
        })
        .catch(() => {
          toastError("erro ao atualizar a solicitação");
        });
    }
  }

  salvarOuEnviarCei(solicitacao_kit_lanche, values) {
    if (values.status) {
      solicitacao_kit_lanche.status = values.status;
    }
    if (!values.uuid) {
      solicitarKitLanche(solicitacao_kit_lanche, this.resolveTipo()).then(
        resp => {
          if (resp.status === HTTP_STATUS.CREATED) {
            if (values.status === STATUS_DRE_A_VALIDAR) {
              this.iniciarPedido(resp.data.uuid);
            } else {
              toastSuccess(
                "Solicitação de Kit Lanche Passeio salva com sucesso!"
              );
              this.resetForm();
            }
          } else if (resp.data.tipo_error) {
            this.validaTipoMensagemError(resp.data);
          } else {
            toastError(
              `Erro ao salvar Solicitação de Kit Lanche Passeio ${resp.data}`
            );
          }
        }
      );
    } else {
      registroAtualizaKitLanche(
        solicitacao_kit_lanche,
        values.uuid,
        this.resolveTipo()
      )
        .then(resp => {
          if (resp.status === HTTP_STATUS.OK) {
            if (values.status === STATUS_DRE_A_VALIDAR) {
              this.iniciarPedido(values.uuid);
            } else {
              toastSuccess(
                "Solicitação de Kit Lanche Passeio atualizada com sucesso!"
              );
              this.resetForm();
            }
          } else if (resp.data.tipo_error) {
            this.validaTipoMensagemError(resp.data);
          } else {
            toastError(
              `Erro ao atualizar a solicitação: ${getError(resp.data)}`
            );
          }
        })
        .catch(() => {
          toastError("erro ao atualizar a solicitação");
        });
    }
  }

  refresh() {
    if (this.state.ehCei) {
      // FIXME: remove duplicated code
      getSolicitacoesKitLanche(SOLICITACAO_CEI).then(resp => {
        this.setState({ rascunhosSolicitacoesKitLanche: resp.data.results });
      });
    } else {
      getSolicitacoesKitLanche(SOLICITACAO_NORMAL).then(resp => {
        this.setState({ rascunhosSolicitacoesKitLanche: resp.results });
      });
    }
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  showModal() {
    this.setState({ showModal: true });
  }

  handleConfirmation() {
    this.setState({ modalConfirmation: false });
  }

  updateKitsChecked(kitsChecked) {
    this.setState({ kitsChecked });
  }

  onKeyPress(event) {
    if (event.which === ENTER) {
      event.preventDefault();
    }
  }

  getNumeroTotalDeKits() {
    const qtdeAlunos = this.state.ehCei
      ? this.props.totalAlunosSelecionadosCei || 0
      : this.props.quantidade_alunos && parseInt(this.props.quantidade_alunos);
    return qtdeAlunos * this.state.kitsChecked.length;
  }

  render() {
    const {
      alunosPorFaixaEtaria,
      handleSubmit,
      pristine,
      submitting,
      proximos_dois_dias_uteis,
      meusDados,
      totalAlunosSelecionadosCei
    } = this.props;
    const {
      ehCei,
      rascunhosSolicitacoesKitLanche,
      showModal,
      modalMessage,
      modalConfirmation,
      botaoConfirma,
      loading,
      kitsChecked,
      alunosComDietaEspecial
    } = this.state;
    return (
      <div>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <form onKeyPress={this.onKeyPress} className="solicitacao-kit-lanche">
            <Field component={"input"} type="hidden" name="uuid" />
            {!ehCei && (
              <CardMatriculados numeroAlunos={meusDados.quantidade_alunos} />
            )}
            <Rascunhos
              rascunhosSolicitacoesKitLanche={rascunhosSolicitacoesKitLanche}
              OnDeleteButtonClicked={(id_externo, uuid) =>
                this.OnDeleteButtonClicked(id_externo, uuid)
              }
              resetForm={event => this.resetForm(event)}
              refreshComponent={this.refresh.bind(this)}
              OnEditButtonClicked={params => this.OnEditButtonClicked(params)}
            />
            <br />
            {!ehCei && <h3 className="page-title">{this.state.title}</h3>}
            <div className="card mt-3 p-4">
              {ehCei && (
                <div className="form-group row">
                  <p className="dre-name">
                    Descrição da Solicitação Kit Lanche
                  </p>
                </div>
              )}
              <div className="form-group row">
                <div className="col-3">
                  <Field
                    component={InputComData}
                    label="Data do passeio"
                    name="evento_data"
                    onBlur={event => this.validaDiasUteis(event)}
                    minDate={proximos_dois_dias_uteis}
                    maxDate={moment()
                      .endOf("year")
                      .toDate()}
                    required
                    validate={required}
                  />
                </div>
                <div className="col-9">
                  <Field
                    component={InputText}
                    label="Local do passeio"
                    name="local"
                    required
                    validate={this.validatorsLocalPasseio}
                  />
                </div>
              </div>
              {!ehCei && (
                <div className="form-group row">
                  <div className="col-3">
                    <Field
                      component={InputText}
                      name="quantidade_alunos"
                      type="number"
                      label="Número de alunos"
                      required
                      validate={[
                        required,
                        maxValue(meusDados.quantidade_alunos),
                        naoPodeSerZero
                      ]}
                    />
                  </div>
                </div>
              )}
              <PedidoKitLanche
                nameTempoPasseio="tempo_passeio"
                nomeKitsLanche="kit_lanche"
                updateKitsChecked={this.updateKitsChecked}
                kitsChecked={kitsChecked}
                mostrarExplicacao
                validate={required}
              />
              {ehCei && alunosPorFaixaEtaria && (
                <TabelaQuantidadePorFaixaEtaria
                  alunosPorFaixaEtaria={alunosPorFaixaEtaria}
                  totalSelecionados={totalAlunosSelecionadosCei}
                />
              )}
              <div className="kits-total form-group row mt-2 pt-3">
                <div className="col-12">
                  <label>{"Número total de kits:"}</label>
                  <span className="font-weight-bold pl-2">
                    {this.getNumeroTotalDeKits()}
                  </span>
                </div>
              </div>
              {ehCei && (
                <Fragment>
                  <div className="form-group row sub-title">
                    <p className="dre-name">
                      Selecionar alunos com dieta especial
                    </p>
                  </div>
                  <SeletorAlunosDietaEspecial
                    alunosComDietaEspecial={alunosComDietaEspecial}
                  />
                </Fragment>
              )}
              <div className="form-group">
                <Field
                  component={TextAreaWYSIWYG}
                  label="Observações"
                  name="observacao"
                  placeholder="Campo opcional"
                />
              </div>
              <div className="row mt-5">
                <div className="col-12 text-right">
                  <Botao
                    texto="Cancelar"
                    onClick={e => this.resetForm(e)}
                    disabled={pristine || submitting}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    type={BUTTON_TYPE.BUTTON}
                  />
                  <Botao
                    texto={this.state.salvarAtualizarLbl}
                    disabled={pristine || submitting}
                    onClick={handleSubmit(values =>
                      this.onSubmit({
                        ...values,
                        status: "RASCUNHO"
                      })
                    )}
                    className="ml-3"
                    type={BUTTON_TYPE.SUBMIT}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                  />
                  <Botao
                    texto="Enviar"
                    disabled={pristine || submitting}
                    type={BUTTON_TYPE.SUBMIT}
                    onClick={handleSubmit(values =>
                      this.onSubmit({
                        ...values,
                        status: STATUS_DRE_A_VALIDAR
                      })
                    )}
                    style={BUTTON_STYLE.GREEN}
                    className="ml-3"
                  />
                </div>
              </div>
              <Modal show={modalConfirmation} onHide={this.handleConfirmation}>
                <Modal.Header closeButton>
                  <Modal.Title>Atenção</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <strong>{modalMessage}</strong>
                </Modal.Body>
                <Modal.Footer>
                  {botaoConfirma && (
                    <Botao
                      texto="CONFIRMAR MESMO ASSIM"
                      type={BUTTON_TYPE.BUTTON}
                      onClick={handleSubmit(values =>
                        this.onSubmit({
                          ...values,
                          status: STATUS_DRE_A_VALIDAR,
                          salvo_em: new Date(),
                          confirmar: true
                        })
                      )}
                      style={BUTTON_STYLE.BLUE}
                      className="ml-3"
                    />
                  )}
                  <Botao
                    texto="CANCELAR"
                    type={BUTTON_TYPE.BUTTON}
                    onClick={this.handleConfirmation}
                    style={BUTTON_STYLE.BLUE_OUTLINE}
                    className="ml-3"
                  />
                </Modal.Footer>
              </Modal>
            </div>
          </form>
        )}
        <ModalDataPrioritaria
          showModal={showModal}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}

SolicitacaoDeKitLanche = reduxForm({
  form: "formKitLanche",
  destroyOnUnmount: false,
  onChange: async (values, dispatch, props, previousValues) => {
    if (
      localStorage.getItem("perfil") === PERFIL.DIRETOR_CEI &&
      values.evento_data &&
      (previousValues.evento_data === undefined ||
        previousValues.evento_data !== values.evento_data)
    ) {
      const periodo = props.meusDados.vinculo_atual.instituicao.periodos_escolares.find(
        p => p.nome === "INTEGRAL"
      );
      const response = await getAlunosPorFaixaEtariaNumaData(
        periodo.uuid,
        converterDDMMYYYYparaYYYYMMDD(values.evento_data)
      );
      if (response.status === 200 && response.data.count > 0) {
        dispatch({
          type: "LOAD_ALUNOS_POR_FAIXA_ETARIA",
          data: response.data.results
            .filter(info => info.faixa_etaria.inicio >= 12)
            .sort((a, b) => a.faixa_etaria.inicio - b.faixa_etaria.inicio)
        });
      }
    }
    if (
      values.faixas_etarias &&
      !isEqual(values.faixas_etarias, previousValues.faixas_etarias)
    ) {
      let totalAlunos = 0;
      Object.values(values.faixas_etarias).forEach(
        v => (totalAlunos += parseInt(v))
      );
      dispatch({ type: "SET_TOTAL_ALUNOS_SELECIONADOS", data: totalAlunos });
    }
  }
})(SolicitacaoDeKitLanche);

const selector = formValueSelector("formKitLanche");
const mapStateToProps = state => {
  return {
    tempo_passeio: selector(state, "tempo_passeio"),
    quantidade_alunos: selector(state, "quantidade_alunos"),
    alunosPorFaixaEtaria: state.kitLanche.alunosPorFaixaEtaria,
    totalAlunosSelecionadosCei: state.kitLanche.totalAlunosSelecionadosCei
  };
};
export default connect(mapStateToProps)(SolicitacaoDeKitLanche);
