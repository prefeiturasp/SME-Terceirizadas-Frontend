import React, { useEffect, useState } from "react";
import { FluxoDeStatus } from "components/Shareable/FluxoDeStatus";
import { fluxoPartindoTerceirizada } from "components/Shareable/FluxoDeStatus/helper";
import { Form } from "react-final-form";
import DadosDaEmpresa from "./components/DadosDaEmpresa";
import EditaisVinculados from "./components/EditaisVinculados";
import IdentificacaoProduto from "./components/IdentificacaoProduto";
import InformacoesNutricionais from "./components/InformacoesNutricionais";
import InformacoesProduto from "./components/InformacoesProduto";
import FotosProduto from "./components/FotosProduto";
import DocumentosProduto from "./components/DocumentosProduto";
import BotoesCabecalho from "./components/BotoesCabecalho";
import BotoesGPCODAE from "./components/BotoesGPCODAE";
import BotoesTerceirizada from "./components/BotoesTerceirizada";
import BotoesRodape from "./components/BotoesRodape";
import Respostas from "./components/Respostas/index";
import { AnaliseSensorial } from "./components/AnaliseSensorial";
import {
  usuarioEhCODAEGestaoProduto,
  usuarioEhEmpresaTerceirizada,
} from "helpers/utilities";
import { EDITAIS_INVALIDOS } from "helpers/gestaoDeProdutos";
import "./style.scss";

export const Homologacao = ({
  terceirizadas,
  editaisOptions,
  homologacao,
  produto,
  protocoloAnalise,
  getHomologacaoProdutoAsync,
  formValues,
}) => {
  const setDefaultEditaisVinculados = () => {
    let result = [];
    if (homologacao.eh_para_alunos_com_dieta) {
      result = homologacao.rastro_terceirizada.contratos
        .filter(
          ({ edital }) =>
            !EDITAIS_INVALIDOS.includes(edital.numero.toUpperCase())
        )
        .map((contrato) => {
          return contrato.edital.uuid;
        });
    }
    if (homologacao.produto.vinculos_produto_edital.length) {
      result = homologacao.produto.vinculos_produto_edital
        .filter(
          ({ edital }) =>
            !EDITAIS_INVALIDOS.includes(edital.numero.toUpperCase())
        )
        .map((vinculo) => {
          return vinculo.edital.uuid;
        });
    }
    return result;
  };

  const logAnaliseSensorial = homologacao.logs.filter(
    (log) => log.status_evento_explicacao === "CODAE pediu análise sensorial"
  );
  const [editais, setEditais] = useState(setDefaultEditaisVinculados());
  const [ehCardSuspensos, setEhCardSuspensos] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setEhCardSuspensos(urlParams.get("card_suspensos"));
  }, [ehCardSuspensos]);

  return (
    <div className="card mt-3">
      <div className="card-body">
        <BotoesCabecalho
          homologacao={homologacao}
          getHomologacaoProdutoAsync={() => getHomologacaoProdutoAsync()}
          terceirizadas={terceirizadas}
          protocoloAnalise={protocoloAnalise}
          ehCardSuspensos={ehCardSuspensos}
        />
        <div className="row">
          <div className="col-12 mt-2">
            <p className="titulo-section">Status do Produto</p>
          </div>
          <div className="col-12">
            <FluxoDeStatus
              listaDeStatus={homologacao.logs}
              fluxo={fluxoPartindoTerceirizada}
            />
          </div>
        </div>
        <Respostas
          homologacao={homologacao}
          logAnaliseSensorial={logAnaliseSensorial}
        />
        <Form initialValues={formValues} onSubmit={() => {}}>
          {({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <hr />
              <DadosDaEmpresa />
              {homologacao.logs.filter(
                (log) => log.status_evento_explicacao === "CODAE homologou"
              ).length > 0 && (
                <EditaisVinculados ehCardSuspensos={ehCardSuspensos} />
              )}
              <IdentificacaoProduto homologacao={homologacao} />
              <InformacoesNutricionais homologacao={homologacao} />
              <InformacoesProduto homologacao={homologacao} />
              <FotosProduto homologacao={homologacao} />
              <DocumentosProduto homologacao={homologacao} />
              {usuarioEhCODAEGestaoProduto() &&
                (homologacao.status === "CODAE_PENDENTE_HOMOLOGACAO" ||
                  homologacao.status === "CODAE_QUESTIONADO") && (
                  <>
                    {homologacao.status === "CODAE_PENDENTE_HOMOLOGACAO" && (
                      <AnaliseSensorial />
                    )}
                    <BotoesGPCODAE
                      homologacao={homologacao}
                      terceirizadas={terceirizadas}
                      protocoloAnalise={protocoloAnalise}
                      getHomologacaoProdutoAsync={() =>
                        getHomologacaoProdutoAsync()
                      }
                      editaisOptions={editaisOptions}
                      setEditais={(values) => setEditais(values)}
                      editais={editais}
                      values={values}
                    />
                  </>
                )}
              {usuarioEhEmpresaTerceirizada() &&
                homologacao.status === "CODAE_PENDENTE_HOMOLOGACAO" && (
                  <BotoesTerceirizada
                    homologacao={homologacao}
                    produto={produto}
                    getHomologacaoProdutoAsync={() =>
                      getHomologacaoProdutoAsync()
                    }
                  />
                )}
            </form>
          )}
        </Form>
        <BotoesRodape
          homologacao={homologacao}
          getHomologacaoProdutoAsync={() => getHomologacaoProdutoAsync()}
          ehCardSuspensos={ehCardSuspensos}
        />
      </div>
    </div>
  );
};
export default Homologacao;
