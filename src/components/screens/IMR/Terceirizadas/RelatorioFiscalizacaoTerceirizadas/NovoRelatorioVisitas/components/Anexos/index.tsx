import React from "react";
import InputFileField from "components/Shareable/InputFileField";
import {
  ArquivoInterface,
  ArquivoFormInterface,
} from "interfaces/imr.interface";

const FORMATOS_ARQUIVOS = "PDF, XLS, XLSX, XLSXM, PNG, JPG ou JPEG";

type AnexosType = {
  setAnexos: React.Dispatch<React.SetStateAction<ArquivoInterface[]>>;
  anexos: Array<ArquivoInterface>;
};

export const Anexos = ({ ...props }: AnexosType) => {
  const { setAnexos, anexos } = props;

  const setFiles = (files: Array<ArquivoFormInterface>): void => {
    const arquivosAtualizados = files.map((arquivo: ArquivoFormInterface) => {
      return {
        nome: arquivo.nome,
        arquivo: arquivo.base64,
      };
    });

    setAnexos(arquivosAtualizados);
  };

  const removeFiles = (index: number): void => {
    let newFiles = [...anexos];
    newFiles.splice(index, 1);
    setAnexos(newFiles);
  };

  return (
    <>
      <div className="anexos">
        <div className="row">
          <div className="col-12 pb-2">
            <span className="titulo-anexo">ANEXOS</span>
          </div>
        </div>

        <div className="row">
          <InputFileField
            name="anexos"
            setFiles={setFiles}
            removeFile={removeFiles}
            formatosAceitos={FORMATOS_ARQUIVOS}
            toastSuccess="Anexo incluído com sucesso!"
            textoBotao="Anexar Arquivos"
            helpText="Envie o(s) arquivo(s) no formato PDF, PNG, JPG, JPEG e Excel (Todos os formatos), com até 10MB."
          />
        </div>
      </div>
    </>
  );
};
