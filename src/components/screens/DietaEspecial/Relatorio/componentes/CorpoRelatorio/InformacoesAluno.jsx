import React, { useEffect, useRef, useState } from "react";
import { Field } from "react-final-form";
import { InputText } from "components/Shareable/Input/InputText";
import {
  deleteFotoAluno,
  getFotoAluno,
  updateFotoAluno,
} from "services/aluno.service";
import HTTP_STATUS from "http-status-codes";
import "./styles.scss";
import Botao from "components/Shareable/Botao";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import {
  getError,
  usuarioEhEscolaTerceirizadaDiretor,
  usuarioEhEscolaTerceirizada,
} from "helpers/utilities";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import { solicitacaoEhDoCardAutorizadas } from "../../helpers";
import { podeAtualizarFoto } from "components/screens/DietaEspecial/Escola/helper";

const InformacoesAluno = ({ aluno, status_solicitacao }) => {
  const [fotoAlunoSrc, setFotoAlunoSrc] = useState(null);
  const [criadoRf, setCriadoRf] = useState(null);
  const [deletandoImagem, setDeletandoImagem] = useState(false);
  const [atualizandoImagem, setAtualizandoImagem] = useState(false);
  const inputRef = useRef(null);

  async function getFoto() {
    setAtualizandoImagem(true);
    const responseFoto = await getFotoAluno(aluno.codigo_eol);
    if (responseFoto.status === HTTP_STATUS.OK) {
      setFotoAlunoSrc(
        `data:${responseFoto.data.data.download.item2};base64,${responseFoto.data.data.download.item1}`
      );
      setCriadoRf(responseFoto.data.data.criadoRf);
    } else {
      setFotoAlunoSrc(null);
      setCriadoRf(null);
    }
    setAtualizandoImagem(false);
  }

  useEffect(() => {
    aluno.codigo_eol && getFoto();
  }, []);

  const atualizarFoto = async (files) => {
    if (files.length > 0) {
      setAtualizandoImagem(true);
      const response = await updateFotoAluno(aluno.codigo_eol, files);
      if (response.status === HTTP_STATUS.OK) {
        toastSuccess("Foto atualizada com sucesso");
        const responseFoto = await getFotoAluno(aluno.codigo_eol);
        if (responseFoto) {
          if (responseFoto.status === HTTP_STATUS.OK) {
            setFotoAlunoSrc(
              `data:${responseFoto.data.data.download.item2};base64,${responseFoto.data.data.download.item1}`
            );
            setCriadoRf(responseFoto.data.data.criadoRf);
          } else {
            setFotoAlunoSrc(null);
            setCriadoRf(null);
          }
          setAtualizandoImagem(false);
        }
      } else {
        toastError(getError(response.data));
      }
    }
  };

  const deletarFoto = async () => {
    if (window.confirm("Deseja realmente excluir a foto deste aluno?")) {
      setDeletandoImagem(true);
      const response = await deleteFotoAluno(aluno.codigo_eol);
      if (response) {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Foto deletada com sucesso");
          setFotoAlunoSrc(null);
          setCriadoRf(null);
          inputRef.current.value = "";
        } else {
          toastError(getError(response.data));
        }
        setDeletandoImagem(false);
      }
    }
  };

  return (
    <div className="mb-3">
      <div className="col-12 mb-3 p-0">
        <label className="sectionName">Dados do aluno</label>
      </div>
      <div className="row col-3 mb-3 p-0">
        <Field
          component={InputText}
          name="aluno.codigo_eol"
          label="Código EOL do Aluno"
          disabled={true}
        />
      </div>
      <div className="row">
        <div className="col-xl-1 col-lg-2 my-auto foto-aluno">
          {fotoAlunoSrc ? (
            <>
              <img src={fotoAlunoSrc} alt="foto-aluno" />
              {deletandoImagem && (
                <div className="foto-legenda">
                  Deletando imagem...
                  <div className="text-center">
                    <img
                      src="/assets/image/ajax-loader.gif"
                      alt="ajax-loader"
                    />
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <img src="/assets/image/no-avatar.png" alt="foto-anonymous" />
              {atualizandoImagem ? (
                <div className="foto-legenda">
                  Carregando imagem...
                  <div className="text-center">
                    <img
                      src="/assets/image/ajax-loader.gif"
                      alt="ajax-loader"
                    />
                  </div>
                </div>
              ) : (
                <div className="foto-legenda">Foto não encontrada</div>
              )}
            </>
          )}
        </div>
        <div className="row col-xl-11 col-lg-10 pe-0 ps-5">
          <div className="col-8">
            <Field
              component={InputText}
              name="aluno.nome"
              label="Nome Completo do Aluno"
              disabled={true}
            />
          </div>
          <div className="col-4 pe-0">
            <Field
              component={InputText}
              name="aluno.data_nascimento"
              label="Data de Nascimento"
              disabled={true}
            />
          </div>
          {(usuarioEhEscolaTerceirizadaDiretor() ||
            usuarioEhEscolaTerceirizada()) &&
            solicitacaoEhDoCardAutorizadas(status_solicitacao) && (
              <div className="row ps-4 mt-2">
                <span className="input-file custom-col-width p-0">
                  <input
                    className="inputfile"
                    name="foto_aluno"
                    ref={inputRef}
                    accept=".png, .jpeg, .jpg"
                    type="file"
                    onChange={(e) => atualizarFoto(e.target.files)}
                  />
                </span>
                <Botao
                  texto={!atualizandoImagem ? "Atualizar imagem" : "Aguarde..."}
                  className="custom-col-width me-3"
                  onClick={() => inputRef.current.click()}
                  disabled={fotoAlunoSrc || atualizandoImagem}
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                />
                <Botao
                  disabled={
                    !podeAtualizarFoto(criadoRf) ||
                    !fotoAlunoSrc ||
                    deletandoImagem
                  }
                  texto={!deletandoImagem ? "Deletar imagem" : "Aguarde..."}
                  className="custom-col-width"
                  onClick={() => deletarFoto()}
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.RED}
                />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default InformacoesAluno;
