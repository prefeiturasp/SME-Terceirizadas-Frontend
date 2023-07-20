import React, { Component } from "react";
import HTTP_STATUS from "http-status-codes";
import * as R from "ramda";
import { Modal } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import CKEditorField from "components/Shareable/CKEditorField";
import InputText from "components/Shareable/Input/InputText";
import ManagedInputFileField from "components/Shareable/Input/InputFile/ManagedField";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import MultiSelect from "components/Shareable/FinalForm/MultiSelect";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import { peloMenosUmCaractere, required } from "helpers/fieldValidators";
import { ativarProduto, suspenderProduto } from "services/produto.service";
import { meusDados } from "services/perfil.service";
import "./style.scss";

const capitalizar = R.replace(/^./, R.toUpper);

export default class ModalAtivacaoSuspensaoProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meusDados: undefined
    };
  }

  UNSAFE_componentWillMount = async () => {
    const resposta = await meusDados();
    this.setState({
      meusDados: resposta
    });
  };

  getDadosIniciais = () => {
    const meusDados = this.state.meusDados;
    return meusDados
      ? {
          funcionario_registro_funcional: meusDados.registro_funcional,
          funcionario_nome: meusDados.nome,
          funcionario_cargo: meusDados.cargo || ""
        }
      : {};
  };

  onSubmit = async values => {
    const endpoint =
      this.props.acao === "ativação" ? ativarProduto : suspenderProduto;
    const response = await endpoint(this.props.idHomologacao, values);
    if (response.status === HTTP_STATUS.OK) {
      toastSuccess(
        `${capitalizar(this.props.acao)} de produto enviada com sucesso.`
      );
      if (this.props.ehSuspensaoFluxoAlteracaoDados) {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("uuid", response.data.uuid);
        const newRelativePathQuery =
          window.location.pathname + "?" + searchParams.toString();
        history.pushState(null, "", newRelativePathQuery);
      }
      this.props.atualizarDados();
    } else {
      toastError(`Houve um erro ao registrar a ${this.props.acao} de produto`);
    }
    this.props.closeModal();
  };

  opcoesEditais = () => {
    let vinculos_produto_edital = this.props.produto.vinculos_produto_edital;
    if (vinculos_produto_edital) {
      if (
        this.props.ehCardSuspensos ||
        this.props.status === "CODAE_SUSPENDEU" ||
        this.props.suspenso
      ) {
        vinculos_produto_edital = vinculos_produto_edital.filter(
          vinculo => vinculo.suspenso
        );
      } else {
        vinculos_produto_edital = vinculos_produto_edital.filter(
          vinculo => !vinculo.suspenso
        );
      }
      return vinculos_produto_edital.map(vinculo => ({
        value: vinculo.edital.uuid,
        label: vinculo.edital.numero
      }));
    }
    return vinculos_produto_edital;
  };

  render() {
    const { showModal, closeModal } = this.props;
    return (
      <Modal
        dialogClassName="modal-ativacao-produto modal-90w"
        show={showModal}
        onHide={closeModal}
      >
        <Modal.Header className="border-0" closeButton>
          <Modal.Title>
            {" "}
            {`${capitalizar(this.props.acao || "")} de Produto`}{" "}
          </Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={this.onSubmit}
          initialValues={this.getDadosIniciais()}
          render={({ handleSubmit, submitting, values }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Body>
                <div className="form-row">
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="RF/CRN/CRF"
                      name="funcionario_registro_funcional"
                      disabled
                    />
                  </div>
                  <div className="col-8">
                    <Field
                      component={InputText}
                      label="Cargo"
                      name="funcionario_cargo"
                      disabled
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="multiselect-editais col-6">
                    <Field
                      label={`${
                        this.props.acao === "suspensão" ? "Suspender" : "Ativar"
                      } produto nos editais`}
                      component={MultiSelect}
                      disableSearch
                      name="editais_para_suspensao_ativacao"
                      multiple
                      nomeDoItemNoPlural="itens"
                      options={this.opcoesEditais()}
                      required
                    />
                  </div>
                  <div className="col-6 input-nome">
                    <Field
                      component={InputText}
                      label="Nome"
                      name="funcionario_nome"
                      disabled
                    />
                  </div>
                </div>
                <div className="form-row row-ativacao mt-3">
                  <div className="col-12">
                    <Field
                      component={CKEditorField}
                      label="Justificativa"
                      name="justificativa"
                      required
                      validate={value => {
                        for (let validator of [
                          peloMenosUmCaractere,
                          required
                        ]) {
                          const erro = validator(value);
                          if (erro) return erro;
                        }
                      }}
                    />
                  </div>
                </div>
                <section className="form-row attachments">
                  <div className="col-9">
                    <div className="card-title font-weight-bold cinza-escuro">
                      Anexar
                    </div>
                    <div className="text">
                      Anexar fotos, documentos ou relatórios relacionados à
                      reclamação do produto.
                    </div>
                  </div>
                  <div className="col-3 btn">
                    <Field
                      component={ManagedInputFileField}
                      className="inputfile"
                      texto="Anexar"
                      name="anexos"
                      accept=".png, .doc, .pdf, .docx, .jpeg, .jpg"
                      icone={BUTTON_ICON.ATTACH}
                      toastSuccessMessage="Anexo incluso com sucesso"
                      concatenarNovosArquivos
                    />
                  </div>
                </section>
              </Modal.Body>
              <Modal.Footer className="border-0">
                <div className="row mt-4">
                  <div className="col-12">
                    <Botao
                      texto="Voltar"
                      type={BUTTON_TYPE.BUTTON}
                      onClick={closeModal}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      className="ml-3"
                    />
                    <Botao
                      texto="Enviar"
                      type={BUTTON_TYPE.SUBMIT}
                      style={BUTTON_STYLE.GREEN}
                      className="ml-3"
                      disabled={
                        submitting ||
                        peloMenosUmCaractere(values.justificativa) !==
                          undefined ||
                        (!values.editais_para_suspensao_ativacao ||
                          (values.editais_para_suspensao_ativacao &&
                            values.editais_para_suspensao_ativacao.length ===
                              0))
                      }
                    />
                  </div>
                </div>
              </Modal.Footer>
            </form>
          )}
        />
      </Modal>
    );
  }
}
