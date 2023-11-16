import React from "react";
import BotaoAnexo from "components/PreRecebimento/BotaoAnexo";
import { TiposDocumentos } from "interfaces/pre_recebimento.interface";

export interface Props {
  lista: TiposDocumentos;
}

const ArquivosTipoRecebimento: React.FC<Props> = ({ lista }) => {
  return (
    <>
      {lista?.arquivos?.map((arquivo, index) => {
        return (
          <div className="row mt-2" key={index}>
            <div className="col-4">
              <BotaoAnexo urlAnexo={arquivo.arquivo} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ArquivosTipoRecebimento;
