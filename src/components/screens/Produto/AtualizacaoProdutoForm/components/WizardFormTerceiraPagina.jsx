import React, { Component } from "react";
import HTTP_STATUS from "http-status-codes";
import { Field, reduxForm } from "redux-form";
import InputText from "../../../../Shareable/Input/InputText";
import { required } from "../../../../../helpers/fieldValidators";
import { TextArea } from "../../../../Shareable/TextArea/TextArea";
import {
  updateProduto,
  excluirImagemDoProduto
} from "services/produto.service";
import { getError } from "helpers/utilities";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import "./styles.scss";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import { withRouter } from "react-router-dom";
import ManagedInputFileField from "components/Shareable/Input/InputFile/ManagedField";

class WizardFormTerceiraPagina extends Component {
  constructor(props) {
    super(props);
    this.state = {
      produto: null,
      arquivos: []
    };
    this.setFiles = this.setFiles.bind(this);
    this.removeFile = this.removeFile.bind(this);
  }

  componentDidMount() {
    if (this.props.produto !== this.state.produto) {
      this.setState({ produto: this.props.produto });
    }

    const { change, produto, terceiroStep, valoresterceiroForm } = this.props;
    if (terceiroStep) {
      change("numero_registro", valoresterceiroForm.numero_registro);
      change("tipo", valoresterceiroForm.tipo);
      change("embalagem", valoresterceiroForm.embalagem);
      change("prazo_validade", valoresterceiroForm.prazo_validade);
      change("info_armazenamento", valoresterceiroForm.info_armazenamento);
      change("outras_informacoes", valoresterceiroForm.outras_informacoes);
    } else {
      change("numero_registro", produto.numero_registro);
      change("tipo", produto.tipo);
      change("embalagem", produto.embalagem);
      change("prazo_validade", produto.prazo_validade);
      change("info_armazenamento", produto.info_armazenamento);
      change("outras_informacoes", produto.outras_informacoes);
    }
  }

  removeFile(index) {
    let { arquivos } = this.state;
    arquivos.splice(index, 1);
    this.setState({ arquivos });
  }

  setFiles(files) {
    const img = files.map(imagem => {
      return {
        arquivo: imagem.base64,
        nome: imagem.nome
      };
    });
    this.setState({ arquivos: img });
  }

  onSubmit = values => {
    const { arquivos } = this.state;
    const { valoresSegundoForm, produto } = this.props;
    values["uuid"] = produto.uuid;
    values["cadastro_atualizado"] = true;
    values["cadastro_finalizado"] = false;
    values["imagens"] = arquivos;
    values["informacoes_nutricionais"] =
      valoresSegundoForm["informacoes_nutricionais"];
    const arrayKeys = Object.keys(values);
    arrayKeys.forEach(item => {
      item.includes("informacao=") && delete values[item];
    });
    if (values["eh_para_alunos_com_dieta"] === "1") {
      values["eh_para_alunos_com_dieta"] = true;
    } else {
      values["eh_para_alunos_com_dieta"] = false;
    }

    if (values["tem_aditivos_alergenicos"] === "1") {
      values["tem_aditivos_alergenicos"] = true;
    } else {
      values["tem_aditivos_alergenicos"] = false;
    }

    return new Promise(async (resolve, reject) => {
      const response = await updateProduto(values);
      if (response.status === HTTP_STATUS.OK) {
        toastSuccess("Homologação atualizada com sucesso.");
        this.props.history.push("/painel-gestao-produto");
        resolve();
      } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
        toastError(getError(response.data));
        reject();
      } else {
        toastError(`Erro ao atualizar homologação`);
        reject();
        this.props.history.push("/painel-gestao-produto");
      }
    });
  };

  removerAnexo = async (uuid, index) => {
    if (window.confirm("Deseja remover este anexo do produto?")) {
      excluirImagemDoProduto(uuid)
        .then(response => {
          if (response.status === HTTP_STATUS.NO_CONTENT) {
            toastSuccess("Arquivo excluído do produto com sucesso!");
            let produto = this.state.produto;
            produto.imagens.splice(index, 1);
            this.setState({ produto });
          } else {
            toastError("Erro ao excluir o arquivo");
          }
        })
        .catch(() => {
          toastError("Erro ao excluir o arquivo");
        });
    }
  };

  render() {
    const {
      handleSubmit,
      pristine,
      previousPage,
      submitting,
      valuesForm,
      produto
    } = this.props;
    return (
      <form onSubmit={handleSubmit} className="cadastro-produto-step3">
        <div className="header-card-title">
          Informação do Produto (classificação)
        </div>
        <div className="row">
          <div className="col-6 pt-3">
            <Field
              component={InputText}
              label="N° de registro do produto no órgão competente"
              name="numero_registro"
              type="text"
              placeholder="Registro no Ministério da Agricultura SP 000499-5.000060"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 pt-3">
            <Field
              component={InputText}
              label="Tipo"
              name="tipo"
              type="text"
              placeholder="Digite o tipo"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-6 pt-3">
            <Field
              component={InputText}
              label="Embalagem primária"
              name="embalagem"
              type="text"
              placeholder="Digite os dados"
              required
              validate={required}
            />
          </div>
          <div className="col-6 pt-3">
            <Field
              component={InputText}
              label="Prazo de Validade"
              name="prazo_validade"
              type="text"
              placeholder="Digite o prazo da validade"
              required
              validate={required}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 pt-3">
            <Field
              component={InputText}
              label="Condições de armazenamento, conservação e prazo máximo para consumo após a abertura da embalagem"
              name="info_armazenamento"
              type="text"
              placeholder="Digite as informações necessárias"
              required
              validate={required}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 pb-5">
            <Field
              component={TextArea}
              placeholder="Digite as informações"
              label={"Outras informações que a empresa julgar necessário"}
              name="outras_informacoes"
            />
          </div>
        </div>

        <section className="row attachments">
          <div className="col-9">
            <div className="card-title font-weight-bold cinza-escuro mt-4">
              Imagens do Produto
            </div>
            <div className="text">Anexe uma ou mais imagens do produto.</div>
            <div className="card-warning mt-2">
              <strong>IMPORTANTE:</strong> Envie um arquivo formato .doc, .docx,
              .pdf, .png, .jpg ou .jpeg, com até 10Mb. <br />
            </div>
          </div>
          <div className="col-3 btn">
            <Field
              component={ManagedInputFileField}
              concatenarNovosArquivos
              className="inputfile"
              texto="Anexar"
              name="anexos"
              accept=".png, .doc, .pdf, .docx, .jpeg, .jpg"
              onChange={this.props.setFiles}
              removeFile={this.props.removeFile}
              toastSuccessMessage="Imagem do produto inclusa com sucesso"
            />
          </div>
        </section>

        <div className="row pt-3 pb-3">
          {produto.imagens !== null && produto.imagens.length > 0 && (
            <div className="section-cards-imagens">
              {produto.imagens
                .filter(anexo => anexo.arquivo.includes("media"))
                .map((anexo, key) => {
                  return (
                    <div key={key} className="pt-2">
                      <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href={anexo.arquivo}
                        className="link"
                      >
                        {anexo.nome}
                      </a>
                      <span
                        onClick={() => this.removerAnexo(anexo.uuid, key)}
                        className="delete"
                      >
                        x
                      </span>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        <div className="section-botoes">
          <Botao
            texto={"Voltar"}
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.GREEN_OUTLINE}
            onClick={() => {
              previousPage();
              this.props.passouTerceiroStep(valuesForm);
            }}
          />
          <Botao
            texto={"Enviar"}
            className="ml-3"
            type={BUTTON_TYPE.SUBMIT}
            style={BUTTON_STYLE.GREEN_OUTLINE}
            disabled={pristine || submitting}
            onClick={handleSubmit(() => this.onSubmit(valuesForm))}
          />
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: "atualizacaoProduto",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(withRouter(WizardFormTerceiraPagina));
