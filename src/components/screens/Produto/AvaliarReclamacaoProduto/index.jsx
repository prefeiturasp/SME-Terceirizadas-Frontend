import React, { Fragment, useState } from "react";
import { FormBuscaProduto } from "components/Shareable/FormBuscaProduto";
import { getProdutosPorFiltro } from "services/produto.service";
import { TabelaProdutos } from "./components/TabelaProdutos";
import { deepCopy } from "helpers/utilities";
import { formatarValues } from "./helpers";
import "./style.scss";
import { VerProduto } from "./components/VerProduto";
import ModalProsseguirReclamacao from "./components/Modal";

export const AvaliarReclamacaoProduto = () => {
  const [endpointModal, setEndpointModal] = useState(null);
  const [tituloModal, setTituloModal] = useState(null);
  const [produtos, setProdutos] = useState(null);
  const [verProduto, setVerProduto] = useState(null);
  const [exibirModal, setExibirModal] = useState(false);

  const setModal = modal => {
    switch (modal) {
      case "questionar":
        setEndpointModal(null);
        setTituloModal("Questionar terceirizada");
        break;
      case "recusar":
        setEndpointModal(null);
        setTituloModal("Recusar reclamação");
        break;
      case "aceitar":
        setEndpointModal(null);
        setTituloModal("Aceitar reclamação");
        break;
      default:
        setEndpointModal(null);
        setTituloModal(null);
    }
    setExibirModal(!exibirModal);
  };

  const onSubmit = async values => {
    const values_ = deepCopy(values);
    const response = await getProdutosPorFiltro(formatarValues(values_));
    setProdutos(response.data.results);
  };

  const exibirDadosProduto = key => {
    const produtos_ = deepCopy(produtos);
    produtos_[key].exibir = !produtos_[key].exibir;
    setProdutos(produtos_);
  };

  return (
    <div className="card avaliar-reclamacao-produto">
      <div className="card-body">
        <ModalProsseguirReclamacao
          showModal={exibirModal}
          closeModal={() => setExibirModal(!exibirModal)}
          tituloModal={tituloModal}
          endpointModal={endpointModal}
        />
        {!verProduto && (
          <Fragment>
            <h2>
              Consulte cadastro completo de produto antes de avaliar reclamação
            </h2>
            <FormBuscaProduto
              naoExibirRowTerceirizadas
              onSubmit={onSubmit}
              statusSelect
            />
            <TabelaProdutos
              verProduto={verProduto}
              setVerProduto={setVerProduto}
              produtos={produtos}
              exibirDadosProduto={exibirDadosProduto}
              setModal={setModal}
            />
          </Fragment>
        )}
        {verProduto && (
          <VerProduto
            setModal={setModal}
            setVerProduto={setVerProduto}
            produto={verProduto}
          />
        )}
      </div>
    </div>
  );
};

export default AvaliarReclamacaoProduto;
