import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { peloMenosUmCaractere, required } from "helpers/fieldValidators";
import { TextAreaWYSIWYG } from "components/Shareable/TextArea/TextAreaWYSIWYG";
import InputText from "components/Shareable/Input/InputText";
import ManagedInputFileField from "components/Shareable/Input/InputFile/ManagedField";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";

import { escolaOuNutriReclamaDoProduto } from "services/produto.service";

import "./style.scss";

import { meusDados } from "services/perfil.service";
//import { CODAENegaDietaEspecial } from "services/produto.service";

export default class ModalReclamacaoProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meusDados: undefined
    };
  }

  componentWillMount = async () => {
    const resposta = await meusDados();
    this.setState({
      meusDados: resposta
    });
  };

  getDadosIniciais = () => {
    const meusDados = this.state.meusDados;
    return meusDados
      ? {
          reclamante_registro_funcional: meusDados.registro_funcional,
          reclamante_nome: meusDados.nome,
          reclamante_cargo: meusDados.cargo || ""
        }
      : {};
  };

  onSubmit = async values => {
    return new Promise(async (resolve, reject) => {
      const homologacaoAtiva = this.props.produto.homologacoes.find(
        h => h.status === "CODAE_HOMOLOGADO"
      );
      const response = await escolaOuNutriReclamaDoProduto(
        homologacaoAtiva.uuid,
        values
      );
      if (response.status === HTTP_STATUS.OK) {
        toastSuccess("Reclamação de produto registrada com sucesso!");
        resolve();
        this.props.closeModal();
        this.props.onAtualizarProduto();
      } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
        toastError("Houve um erro ao registrar a reclamação de produto");
        reject(response.data);
      }
    });
  };

  render() {
    const { showModal, closeModal } = this.props;
    const { meusDados } = this.state;
    const instituicao = meusDados
      ? meusDados.vinculo_atual.instituicao
      : undefined;
    return (
      <Modal
        dialogClassName="modal-reclamacao-produto modal-90w"
        show={showModal}
        onHide={closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reclamação de Produto</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={this.onSubmit}
          initialValues={this.getDadosIniciais()}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Body>
                <div className="form-row">
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="RF/CRN/CRF"
                      name="reclamante_registro_funcional"
                      disabled={true}
                      required
                      validate={required}
                    />
                  </div>
                  <div className="col-8">
                    <Field
                      component={InputText}
                      label="Cargo"
                      name="reclamante_cargo"
                      disabled={true}
                      required
                      validate={required}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-12">
                    <Field
                      component={InputText}
                      label="Nome"
                      name="reclamante_nome"
                      disabled={true}
                      required
                      validate={required}
                    />
                  </div>
                </div>
                {instituicao && (
                  <div className="form-row">
                    <div className="col-6">
                      <label htmlFor="vinculo" className="col-form-label">
                        Instituição
                      </label>
                      <div>{instituicao.nome}</div>
                    </div>
                    {instituicao.codigo_eol && (
                      <div className="col-6">
                        <label htmlFor="vinculo" className="col-form-label">
                          Código EOL
                        </label>
                        <div>{instituicao.codigo_eol}</div>
                      </div>
                    )}
                  </div>
                )}
                <div className="form-row row-reclamacao">
                  <div className="col-12">
                    <Field
                      component={TextAreaWYSIWYG}
                      label="Reclamação"
                      name="reclamacao"
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
              <Modal.Footer>
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
                      disabled={submitting}
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
