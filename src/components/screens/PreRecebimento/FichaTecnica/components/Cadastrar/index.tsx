import React, { useContext, useEffect, useRef, useState } from "react";
import "./styles.scss";
import { Field, Form } from "react-final-form";
import Label from "components/Shareable/Label";
import { getInformacoesNutricionaisOrdenadas } from "services/produto.service";
import {
  required,
  email,
  composeValidators,
  inteiroOuDecimalComVirgula,
} from "helpers/fieldValidators";
import { Spin, Steps } from "antd";
import { CATEGORIA_OPTIONS } from "../../constants";
import InputText from "components/Shareable/Input/InputText";
import MaskedInputText from "components/Shareable/Input/MaskedInputText";

import Collapse, { CollapseControl } from "components/Shareable/Collapse";
import MeusDadosContext from "context/MeusDadosContext";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
} from "../../../../../Shareable/Botao/constants";
import Botao from "../../../../../Shareable/Botao";
import { cepMask, cnpjMask, telefoneMask } from "constants/shared";
import {
  cadastraRascunhoFichaTecnica,
  editaRascunhoFichaTecnica,
  getFichaTecnica,
} from "services/fichaTecnica.service";
import { exibeError } from "helpers/utilities";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import { getListaFiltradaAutoCompleteSelect } from "helpers/autoCompleteSelect";
import AutoCompleteSelectField from "components/Shareable/AutoCompleteSelectField";
import FormPereciveis from "./components/FormPereciveis";
import FormNaoPereciveis from "./components/FormNaoPereciveis";
import { OnChange } from "react-final-form-listeners";
import TabelaNutricional from "components/Shareable/TabelaNutricional";
import Select from "components/Shareable/Select";
import ModalCadastrarItemIndividual from "components/Shareable/ModalCadastrarItemIndividual";

import { MeusDadosInterfaceOuter } from "context/MeusDadosContext/interfaces";

import {
  ArquivoForm,
  FichaTecnicaDetalhada,
  OptionsGenerico,
} from "interfaces/pre_recebimento.interface";
import { TerceirizadaComEnderecoInterface } from "interfaces/terceirizada.interface";
import {
  ResponseFichaTecnicaDetalhada,
  ResponseInformacoesNutricionais,
} from "interfaces/responses.interface";
import { InformacaoNutricional } from "interfaces/produto.interface";

import InfoAcondicionamentoPereciveis from "./components/InfoAcondicionamentoPereciveis";
import InfoAcondicionamentoNaoPereciveis from "./components/InfoAcondicionamentoNaoPereciveis";

import { FichaTecnicaPayload } from "../../interfaces";
import {
  carregarArquivo,
  carregarFabricantes,
  carregarMarcas,
  carregarProdutos,
  carregarTerceirizada,
  carregarUnidadesMedida,
  cepCalculator,
  formataPayload,
  geraInitialValues,
  validaProximo,
  validaRascunho,
} from "../../helpers";

const ITENS_STEPS = [
  {
    title: "Identificação do Produto",
  },
  {
    title: "Informações Nutricionais",
  },
  {
    title: "Informações de Acondicionamento",
  },
];

export default () => {
  const { meusDados } = useContext<MeusDadosInterfaceOuter>(MeusDadosContext);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [produtosOptions, setProdutosOptions] = useState<OptionsGenerico[]>([]);
  const [marcasOptions, setMarcasOptions] = useState<OptionsGenerico[]>([]);
  const [fabricantesOptions, setFabricantesOptions] = useState<
    OptionsGenerico[]
  >([]);
  const [unidadesMedidaOptions, setUnidadesMedidaOptions] = useState<
    OptionsGenerico[]
  >([]);
  const [proponente, setProponente] =
    useState<TerceirizadaComEnderecoInterface>(
      {} as TerceirizadaComEnderecoInterface
    );
  const [desabilitaEndereco, setDesabilitaEndereco] = useState(true);
  const [collapse, setCollapse] = useState<CollapseControl>({});
  const [ficha, setFicha] = useState<FichaTecnicaDetalhada>(
    {} as FichaTecnicaDetalhada
  );
  const [initialValues, setInitialValues] = useState<Record<string, any>>({});
  const [stepAtual, setStepAtual] = useState(0);
  const listaCompletaInformacoesNutricionais = useRef<InformacaoNutricional[]>(
    []
  );
  const listaInformacoesNutricionaisFichaTecnica = useRef<
    InformacaoNutricional[]
  >([]);
  const [showModal, setShowModal] = useState(false);
  const [tipoCadastro, setTipoCadastro] = useState("");
  const [arquivo, setArquivo] = useState<ArquivoForm[]>([]);

  const onSubmit = (): void => {};

  const atualizarDadosCarregados = async () => {
    setCarregando(true);
    await carregarProdutos(setProdutosOptions);
    await carregarMarcas(setMarcasOptions);
    await carregarFabricantes(setFabricantesOptions);
    setCarregando(false);
  };

  const gerenciaModalCadastroExterno = (tipo: string) => {
    setTipoCadastro(tipo);
    setShowModal(true);
  };

  const salvarRascunho = async (values: FichaTecnicaPayload) => {
    const payload = formataPayload(
      values,
      proponente,
      produtosOptions,
      fabricantesOptions,
      arquivo
    );

    try {
      setCarregando(true);
      let response: ResponseFichaTecnicaDetalhada;
      if (ficha.uuid) {
        response = await editaRascunhoFichaTecnica(payload, ficha.uuid);
      } else {
        response = await cadastraRascunhoFichaTecnica(payload);
      }

      if (response.status === 201 || response.status === 200) {
        toastSuccess("Rascunho salvo com sucesso!");
        setFicha(response.data);
      } else {
        toastError("Ocorreu um erro ao salvar a Ficha Técnica");
      }
    } catch (error) {
      exibeError(error, "Ocorreu um erro ao salvar a Ficha Técnica");
    } finally {
      setCarregando(false);
    }
  };

  const carregarDados = async () => {
    const responseInformacoes: ResponseInformacoesNutricionais =
      await getInformacoesNutricionaisOrdenadas();
    listaCompletaInformacoesNutricionais.current =
      responseInformacoes.data.results;

    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) {
      const responseFicha = await getFichaTecnica(uuid);
      const fichaTecnica = responseFicha.data;

      listaInformacoesNutricionaisFichaTecnica.current =
        fichaTecnica.informacoes_nutricionais.map(
          ({ informacao_nutricional }) => informacao_nutricional
        );

      setFicha(fichaTecnica);
      setInitialValues(geraInitialValues(fichaTecnica));

      if (fichaTecnica.arquivo) {
        const arquivo = await carregarArquivo(fichaTecnica.arquivo);
        setArquivo(arquivo);
      }
    }
  };

  useEffect(() => {
    (async () => {
      setCarregando(true);
      await carregarProdutos(setProdutosOptions);
      await carregarMarcas(setMarcasOptions);
      await carregarFabricantes(setFabricantesOptions);
      await carregarUnidadesMedida(setUnidadesMedidaOptions);
      await carregarDados();
      setCarregando(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!proponente.uuid) {
        setCarregando(true);
        await carregarTerceirizada(ficha, meusDados, setProponente);
        setCarregando(false);
      }
    })();
  }, [meusDados, ficha]);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-cadastro-ficha-tecnica">
        <div className="card-body cadastro-ficha-tecnica">
          <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            decorators={[cepCalculator(setDesabilitaEndereco)]}
            render={({ form, handleSubmit, values, errors }) => (
              <form onSubmit={handleSubmit}>
                <div className="steps">
                  <Steps size="small" current={stepAtual} items={ITENS_STEPS} />
                </div>

                <hr />

                {stepAtual === 0 && (
                  <>
                    <div className="subtitulo">Identificação do Produto</div>

                    <div className="row mt-4">
                      <div className="col-6">
                        <Field
                          component={AutoCompleteSelectField}
                          options={getListaFiltradaAutoCompleteSelect(
                            produtosOptions.map((e) => e.nome),
                            values["produto"],
                            true
                          )}
                          label="Produto"
                          name={`produto`}
                          placeholder="Selecione um Produto"
                          className="input-ficha-tecnica"
                          required
                          validate={required}
                          tooltipText={
                            "Caso não localize o produto no seletor, faça o cadastro no botão Cadastrar Produto."
                          }
                        />
                        <OnChange name="produto">
                          {(value) => {
                            if (form.getState().dirty) {
                              form.restart({ produto: value });
                            }
                          }}
                        </OnChange>
                      </div>
                      <div className="col-2 cadastro-externo">
                        <Botao
                          texto="Cadastrar Produto"
                          type={BUTTON_TYPE.BUTTON}
                          style={BUTTON_STYLE.GREEN_OUTLINE}
                          className="botao-cadastro-externo"
                          onClick={() =>
                            gerenciaModalCadastroExterno("PRODUTO")
                          }
                        />
                      </div>
                      <div className="col-4">
                        <Field
                          component={Select}
                          naoDesabilitarPrimeiraOpcao
                          options={[
                            { nome: "Selecione uma Categoria", uuid: "" },
                            ...CATEGORIA_OPTIONS,
                          ]}
                          label="Categoria"
                          name={`categoria`}
                          className="input-ficha-tecnica"
                          required
                          validate={required}
                        />
                      </div>
                      <div className="col-6">
                        <Field
                          component={Select}
                          naoDesabilitarPrimeiraOpcao
                          options={[
                            { nome: "Selecione uma Marca", uuid: "" },
                            ...marcasOptions,
                          ]}
                          label="Marca"
                          name={`marca`}
                          className="input-ficha-tecnica"
                          required
                          validate={required}
                          tooltipText={
                            "Caso não localize a marca no seletor, faça o cadastro no botão Cadastrar Marca."
                          }
                        />
                      </div>
                      <div className="col-2 cadastro-externo">
                        <Botao
                          texto="Cadastrar Marca"
                          type={BUTTON_TYPE.BUTTON}
                          style={BUTTON_STYLE.GREEN_OUTLINE}
                          className="botao-cadastro-externo"
                          onClick={() => gerenciaModalCadastroExterno("MARCA")}
                        />
                      </div>
                      <div className="col-4">
                        <Field
                          component={InputText}
                          label="Nº do Pregão/Chamada Pública"
                          name={`pregao_chamada_publica`}
                          placeholder="Nº do Pregão/Chamada Pública"
                          className="input-ficha-tecnica"
                          required
                          validate={required}
                          tooltipText={
                            "Pode ser informado o número do Edital do Pregão Eletrônico ou Chamada Pública referente ao Produto."
                          }
                        />
                      </div>
                    </div>
                    <hr />

                    <Collapse
                      collapse={collapse}
                      setCollapse={setCollapse}
                      titulos={[
                        <span key={0}>
                          Empresa ou Organização{" "}
                          <span className="verde-escuro">Proponente</span>
                        </span>,
                        <span className="fw-bold" key={1}>
                          Empresa ou Organização{" "}
                          <span className="verde-escuro">Fabricante</span>
                        </span>,
                        <span className="fw-bold" key={1}>
                          Detalhes do{" "}
                          <span className="verde-escuro">Produto</span>
                        </span>,
                      ]}
                      id="collapseFichaTecnica"
                    >
                      <section id="formProponente">
                        <div className="row">
                          <div className="col-6">
                            <InputText
                              label="CNPJ"
                              valorInicial={proponente.cnpj}
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-8">
                            <InputText
                              label="Nome da Empresa/Organização"
                              valorInicial={proponente.nome_fantasia}
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-8">
                            <InputText
                              label="Endereço"
                              valorInicial={proponente.endereco}
                              disabled={true}
                            />
                          </div>
                          <div className="col-4">
                            <InputText
                              label="Nº"
                              valorInicial={proponente.numero}
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                            <InputText
                              label="Complemento"
                              valorInicial={proponente.complemento}
                              disabled={true}
                            />
                          </div>
                          <div className="col-4">
                            <InputText
                              label="Bairro"
                              valorInicial={proponente.bairro}
                              disabled={true}
                            />
                          </div>
                          <div className="col-4">
                            <InputText
                              label="CEP"
                              valorInicial={proponente.cep}
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-8">
                            <InputText
                              label="Cidade"
                              valorInicial={proponente.cidade}
                              disabled={true}
                            />
                          </div>
                          <div className="col-4">
                            <InputText
                              label="Estado"
                              valorInicial={proponente.estado}
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-8">
                            <InputText
                              label="E-mail"
                              valorInicial={proponente.responsavel_email}
                              required
                              disabled={true}
                            />
                          </div>
                          <div className="col-4">
                            <InputText
                              label="Telefone"
                              valorInicial={proponente.responsavel_telefone}
                              required
                              disabled={true}
                            />
                          </div>
                        </div>
                      </section>

                      <section id="formFabricante">
                        <div className="row">
                          <div className="col-6">
                            <Field
                              component={AutoCompleteSelectField}
                              options={getListaFiltradaAutoCompleteSelect(
                                fabricantesOptions.map((e) => e.nome),
                                values["fabricante"],
                                true
                              )}
                              label="Fabricantes"
                              name={`fabricante`}
                              placeholder="Selecione um Fabricante"
                              className="input-ficha-tecnica"
                              required
                              validate={required}
                            />
                          </div>
                          <div className="col-2 cadastro-externo">
                            <Botao
                              texto="Cadastrar Fabricante"
                              type={BUTTON_TYPE.BUTTON}
                              style={BUTTON_STYLE.GREEN_OUTLINE}
                              className="botao-cadastro-externo"
                              onClick={() =>
                                gerenciaModalCadastroExterno("FABRICANTE")
                              }
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <Field
                              component={MaskedInputText}
                              mask={cnpjMask}
                              label="CNPJ"
                              name={`cnpj_fabricante`}
                              placeholder="Digite o CNPJ"
                              className="input-ficha-tecnica"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                            <Field
                              component={MaskedInputText}
                              mask={cepMask}
                              label="CEP"
                              name={`cep_fabricante`}
                              placeholder="Digite o CEP"
                              className="input-ficha-tecnica"
                            />
                          </div>
                          <div className="col-8">
                            <Field
                              component={InputText}
                              label="Endereço"
                              name={`endereco_fabricante`}
                              placeholder="Digite o Endereço"
                              className="input-ficha-tecnica"
                              disabled={desabilitaEndereco}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                            <Field
                              component={InputText}
                              label="Número"
                              name={`numero_fabricante`}
                              placeholder="Digite o Número"
                              className="input-ficha-tecnica"
                            />
                          </div>
                          <div className="col-4">
                            <Field
                              component={InputText}
                              label="Complemento"
                              name={`complemento_fabricante`}
                              placeholder="Digite o Complemento"
                              className="input-ficha-tecnica"
                            />
                          </div>
                          <div className="col-4">
                            <Field
                              component={InputText}
                              label="Bairro"
                              name={`bairro_fabricante`}
                              placeholder="Digite o Bairro"
                              className="input-ficha-tecnica"
                              disabled={desabilitaEndereco}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-8">
                            <Field
                              component={InputText}
                              label="Cidade"
                              name={`cidade_fabricante`}
                              placeholder="Digite o Cidade"
                              className="input-ficha-tecnica"
                              disabled={desabilitaEndereco}
                            />
                          </div>
                          <div className="col-4">
                            <Field
                              component={InputText}
                              label="Estado"
                              name={`estado_fabricante`}
                              placeholder="Digite o Estado"
                              className="input-ficha-tecnica"
                              disabled={desabilitaEndereco}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-8">
                            <Field
                              component={InputText}
                              label="E-mail"
                              name={`email_fabricante`}
                              placeholder="Digite o E-mail"
                              className="input-ficha-tecnica"
                              validate={email}
                            />
                          </div>
                          <div className="col-4">
                            <Field
                              component={MaskedInputText}
                              mask={telefoneMask}
                              label="Telefone"
                              name={`telefone_fabricante`}
                              placeholder="Digite o Telefone"
                              className="input-ficha-tecnica"
                            />
                          </div>
                        </div>
                      </section>

                      <section id="formProduto">
                        {values["categoria"] === "PERECIVEIS" && (
                          <FormPereciveis values={values} />
                        )}
                        {values["categoria"] === "NAO_PERECIVEIS" && (
                          <FormNaoPereciveis values={values} />
                        )}
                      </section>
                    </Collapse>
                  </>
                )}

                {stepAtual === 1 && (
                  <>
                    <div className="subtitulo">Informações Nutricionais</div>

                    <div className="row">
                      <div className="col-6">
                        <Label content="Porção" required />
                      </div>
                      <div className="col-6">
                        <Label content="Unidade Caseira" required />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-3">
                        <Field
                          component={InputText}
                          name={`porcao`}
                          placeholder="Apenas Números"
                          className="input-ficha-tecnica"
                          required
                          proibeLetras
                          validate={composeValidators(
                            required,
                            inteiroOuDecimalComVirgula
                          )}
                        />
                      </div>
                      <div className="col-3">
                        <Field
                          component={Select}
                          naoDesabilitarPrimeiraOpcao
                          options={[
                            { nome: "Unidade de Medida", uuid: "" },
                            ...unidadesMedidaOptions,
                          ]}
                          name={`unidade_medida_porcao`}
                          className="input-ficha-tecnica"
                          required
                          validate={required}
                        />
                      </div>
                      <div className="col-3">
                        <Field
                          component={InputText}
                          name={`valor_unidade_caseira`}
                          placeholder="Apenas Números"
                          className="input-ficha-tecnica"
                          required
                          proibeLetras
                          validate={composeValidators(
                            required,
                            inteiroOuDecimalComVirgula
                          )}
                        />
                      </div>
                      <div className="col-3">
                        <Field
                          component={InputText}
                          name={`unidade_medida_caseira`}
                          placeholder="Unidade de Medida"
                          className="input-ficha-tecnica"
                          required
                          validate={required}
                        />
                      </div>
                    </div>

                    <TabelaNutricional
                      values={values}
                      listaCompletaInformacoesNutricionais={
                        listaCompletaInformacoesNutricionais.current
                      }
                      informacoesNutricionaisCarregadas={
                        listaInformacoesNutricionaisFichaTecnica.current
                      }
                    />
                  </>
                )}

                {stepAtual === 2 &&
                  (values["categoria"] === "PERECIVEIS" ? (
                    <InfoAcondicionamentoPereciveis
                      collapse={collapse}
                      setCollapse={setCollapse}
                      unidadesMedidaOptions={unidadesMedidaOptions}
                      arquivo={arquivo}
                      setArquivo={setArquivo}
                    />
                  ) : (
                    <InfoAcondicionamentoNaoPereciveis
                      collapse={collapse}
                      setCollapse={setCollapse}
                      unidadesMedidaOptions={unidadesMedidaOptions}
                      arquivo={arquivo}
                      setArquivo={setArquivo}
                      values={values}
                    />
                  ))}

                <hr />

                {stepAtual < ITENS_STEPS.length - 1 && (
                  <div className="mt-4 mb-4">
                    <Botao
                      texto="Próximo"
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      className="float-end ms-3"
                      onClick={() => setStepAtual((stepAtual) => stepAtual + 1)}
                      disabled={validaProximo(
                        values as FichaTecnicaPayload,
                        errors,
                        stepAtual
                      )}
                    />
                  </div>
                )}

                <div className="mt-4 mb-4">
                  <Botao
                    texto="Salvar Rascunho"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    className="float-end ms-3"
                    onClick={() =>
                      salvarRascunho(values as FichaTecnicaPayload)
                    }
                    disabled={validaRascunho(values as FichaTecnicaPayload)}
                  />
                </div>

                {stepAtual > 0 && (
                  <div className="mt-4 mb-4">
                    <Botao
                      texto="Anterior"
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      className="float-end ms-3"
                      onClick={() => setStepAtual((stepAtual) => stepAtual - 1)}
                    />
                  </div>
                )}
              </form>
            )}
          />
        </div>
      </div>

      <ModalCadastrarItemIndividual
        closeModal={() => setShowModal(false)}
        showModal={showModal}
        atualizarDadosCarregados={() => atualizarDadosCarregados()}
        tipoCadastro={tipoCadastro}
        tipoCadastroVisualizacao={
          tipoCadastro[0] + tipoCadastro.slice(1).toLowerCase()
        }
      />
    </Spin>
  );
};
