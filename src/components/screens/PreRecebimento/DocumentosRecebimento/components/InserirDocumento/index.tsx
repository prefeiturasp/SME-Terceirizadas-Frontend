import React from "react";
import { Field } from "react-final-form";
import InputFile from "components/Shareable/Input/InputFile";
import { DEZ_MB } from "../../../../../../constants/shared";
import { OUTROS_DOCUMENTOS_OPTIONS } from "constants/shared";
import { Arquivo, OptionMultiselect } from "../../interfaces";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import { textAreaRequired } from "helpers/fieldValidators";

const FORMATOS_IMAGEM = "PDF, PNG, JPG ou JPEG";

interface Props {
  setFiles(_files: Array<Arquivo>): void;
  removeFile: (_index: number) => void;
  tipoDocumento?: string;
}

const InserirDocumento: React.FC<Props> = ({
  setFiles,
  removeFile,
  tipoDocumento = "",
}) => {
  const titulo = OUTROS_DOCUMENTOS_OPTIONS.find(
    (obj: OptionMultiselect) => obj.value === tipoDocumento
  )?.label;
  return (
    <>
      {titulo && (
        <div className="row mt-3">
          <div className="col">
            <div className="subtitulo mb-0">
              <span className="asterisco">* </span>
              {titulo}
            </div>
          </div>
        </div>
      )}
      {tipoDocumento === "OUTROS" && (
        <div className="mt-1">
          <Field
            component={TextArea}
            label="Descrição dos Documentos"
            name={`descricao_documento`}
            placeholder="Descreva o tipo de documento"
            required
            validate={textAreaRequired}
          />
        </div>
      )}
      <div className="row">
        <Field
          component={InputFile}
          className="inputfile"
          texto={titulo ? "Anexar Documentos" : "Anexar Laudo"}
          name={"files"}
          accept={FORMATOS_IMAGEM}
          setFiles={setFiles}
          removeFile={removeFile}
          toastSuccess={"Imagem incluída com sucesso!"}
          alignLeft
          multiple={true}
          limiteTamanho={DEZ_MB}
          concatenarNovosArquivos
        />
        <label className="col-12 label-imagem">
          <span className="red">Campo Obrigatório: &nbsp;</span>
          {"Envie um arquivo nos formatos: " +
            FORMATOS_IMAGEM +
            ", com até 10MB"}
        </label>
      </div>
    </>
  );
};

export default InserirDocumento;
