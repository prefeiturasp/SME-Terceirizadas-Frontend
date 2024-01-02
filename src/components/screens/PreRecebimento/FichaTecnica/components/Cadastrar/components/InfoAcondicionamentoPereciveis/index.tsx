import React, { Dispatch } from "react";
import { Field } from "react-final-form";

import Collapse, { CollapseControl } from "components/Shareable/Collapse";
import InputText from "components/Shareable/Input/InputText";
import Label from "components/Shareable/Label";
import InputFile from "components/Shareable/Input/InputFile";
import Select from "components/Shareable/Select";
import CheckboxComBorda from "components/Shareable/CheckboxComBorda";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import { required } from "helpers/fieldValidators";
import { CollapseConfig } from "components/Shareable/Collapse/interfaces";
import { OptionsGenerico } from "interfaces/pre_recebimento.interface";

const COLLAPSE_CONFIG_INFO_ACONDICIONAMENTO: CollapseConfig[] = [
  {
    titulo: <span className="verde-escuro">Conservação</span>,
    camposObrigatorios: true,
  },
  {
    titulo: <span className="verde-escuro">Temperatura e Transporte</span>,
    camposObrigatorios: true,
  },
  {
    titulo: <span className="verde-escuro">Armazenamento</span>,
    camposObrigatorios: true,
  },
  {
    titulo: <span className="verde-escuro">Embalagem e Rotulagem</span>,
    camposObrigatorios: true,
  },
  {
    titulo: <span className="verde-escuro">Responsável Técnico e Anexos</span>,
    camposObrigatorios: true,
  },
  {
    titulo: <span className="verde-escuro">Modo de Preparo</span>,
    camposObrigatorios: false,
  },
  {
    titulo: <span className="verde-escuro">Outras Informações</span>,
    camposObrigatorios: false,
  },
];

interface InfoAcondicionamentoPereciveisProps {
  collapse: CollapseControl;
  setCollapse: Dispatch<React.SetStateAction<CollapseControl>>;
  unidadesMedidaOptions: OptionsGenerico[];
}

export default ({
  collapse,
  setCollapse,
  unidadesMedidaOptions,
}: InfoAcondicionamentoPereciveisProps) => {
  // TODO: implementar funções de adição e remoção de arquivos
  const inserirArquivoFichaAssinadaRT = () => {};

  const removerArquivoFichaAssinadaRT = () => {};

  return (
    <Collapse
      collapse={collapse}
      setCollapse={setCollapse}
      id="collapseFichaTecnica"
      collapseConfigs={COLLAPSE_CONFIG_INFO_ACONDICIONAMENTO}
    >
      <section id="formConservacao">
        <div className="row">
          <div className="col">
            <Field
              component={InputText}
              label="Prazo de validade após o descongelamento e mantido sob refrigeração:"
              name={`prazo_validade_apos_descongelamento`}
              placeholder="Digite o prazo de validade"
              className="input-ficha-tecnica"
              required
              validate={required}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <Field
              component={TextArea}
              label="Condições de conservação e prazo máximo para consumo após a abertura da embalagem primária:"
              name={`condicao_conservacao_prazo_max_consumo`}
              placeholder="Descreva as condições de conservação e o prazo máximo de consumo"
              className="textarea-ficha-tecnica"
              required
              validate={required}
            />
          </div>
        </div>
      </section>

      <section id="formTemperaturaTransporte">
        <div className="row">
          <div className="col-5">
            <Field
              component={InputText}
              label="Temperatura de congelamento do produto:"
              name={`temperatura_congelamento`}
              placeholder="Digite a temperatura de congelamento"
              className="input-ficha-tecnica"
              required
              validate={required}
            />
          </div>
          <div className="col-1 label-unidade-medida">
            <span>ºC</span>
          </div>
          <div className="col-5">
            <Field
              component={InputText}
              label="Temperatura interna do veículo para transporte:"
              name={`temperatura_interna_veiculo_transporte`}
              placeholder="Digite a temperatura de transporte"
              className="input-ficha-tecnica"
              required
              validate={required}
            />
          </div>
          <div className="col-1 label-unidade-medida">
            <span>ºC</span>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <Field
              component={TextArea}
              label="Condições de transporte:"
              name={`condicoes_transporte`}
              className="textarea-ficha-tecnica"
              required
              validate={required}
            />
          </div>
        </div>
      </section>

      <section id="formArmazenamento">
        <div className="row">
          <div className="col">
            Informações que constarão da rotulagem das embalagens primária e
            secundária, fechadas.
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <Field
              component={TextArea}
              label="Embalagem primária:"
              name={`armazenamento_embalagem_primaria`}
              className="textarea-ficha-tecnica"
              placeholder="Digite as informações de armazenamento para embalagem primária"
              required
              validate={required}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <Field
              component={TextArea}
              label="Embalagem secundária:"
              name={`armazenamento_embalagem_secundaria`}
              className="textarea-ficha-tecnica"
              placeholder="Digite as informações de armazenamento para embalagem secundária"
              required
              validate={required}
            />
          </div>
        </div>
      </section>

      <section id="formEmbalagemRotulagem">
        <div className="subtitulo">Embalagem</div>

        <div className="row mt-3">
          <div className="col">
            <Field
              name={`checkbox_embalagem`}
              component={CheckboxComBorda}
              label="Declaro que as embalagens primária e secundária em que serão entregues o
              produto estarão de acordo com as especificações do Anexo I do Edital."
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            <Field
              component={TextArea}
              label="Descreva o material de embalagem primária:"
              name={`material_embalagem_primaria`}
              className="textarea-ficha-tecnica"
              placeholder="Digite as informações da embalagem primária"
              required
              validate={required}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="row">
            <div className="col-6">
              <Label
                content="Peso líquido do produto na embalagem primária:"
                required
              />
            </div>

            <div className="col-6">
              <Label
                content="Peso líquido do produto na embalagem secundária:"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <Field
                component={InputText}
                name={`peso_liquido_embalagem_primaria`}
                placeholder="Digite o peso"
                className="input-ficha-tecnica"
                apenasNumeros
                required
                validate={required}
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
                name={`unidade_medida_peso_liquido_embalagem_primaria`}
                className="input-ficha-tecnica"
                required
                validate={required}
              />
            </div>

            <div className="col-3">
              <Field
                component={InputText}
                name={`peso_liquido_embalagem_secundaria`}
                placeholder="Digite o peso"
                className="input-ficha-tecnica"
                apenasNumeros
                required
                validate={required}
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
                name={`unidade_medida_peso_liquido_embalagem_secundaria`}
                className="input-ficha-tecnica"
                required
                validate={required}
              />
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="row">
            <div className="col-6">
              <Label content="Peso da embalagem primária vazia:" required />
            </div>

            <div className="col-6">
              <Label content="Peso da embalagem secundária vazia:" required />
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <Field
                component={InputText}
                name={`peso_embalagem_primaria_vazia`}
                placeholder="Digite o peso"
                className="input-ficha-tecnica"
                apenasNumeros
                required
                validate={required}
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
                name={`unidade_medida_peso_embalagem_primaria_vazia`}
                className="input-ficha-tecnica"
                required
                validate={required}
              />
            </div>

            <div className="col-3">
              <Field
                component={InputText}
                name={`peso_embalagem_secundaria_vazia`}
                placeholder="Digite o peso"
                className="input-ficha-tecnica"
                apenasNumeros
                required
                validate={required}
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
                name={`unidade_medida_peso_embalagem_secundaria_vazia`}
                className="input-ficha-tecnica"
                required
                validate={required}
              />
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="row">
            <div className="col-6">
              <Label
                content="Variação porcentual do peso do produto ao descongelar:"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-2">
              <Field
                component={InputText}
                name={`variacao_porcentual_descongelar`}
                placeholder="Digite % do Peso"
                className="input-ficha-tecnica"
                apenasNumeros
                required
                validate={required}
              />
            </div>

            <div className="col-1 label-unidade-medida">
              <span>%</span>
            </div>
          </div>
        </div>

        <hr />

        <div className="subtitulo">Rotulagem</div>

        <div className="row mt-3">
          <div className="col">
            <Field
              name={`checkbox_rotulagem`}
              component={CheckboxComBorda}
              label="Declaro que no rótulo da embalagem primária e, se for o
              caso, da secundária, constarão, de forma legível e indelével,
              todas as informações solicitadas do Anexo I do Edital."
            />
          </div>
        </div>
      </section>

      <section id="formResponsavelTecnico">
        <div className="row">
          <div className="col">
            <Field
              component={InputText}
              label="Nome completo do Responsável Técnico:"
              name={`nome_responsavel_tecnico`}
              placeholder="Digite o nome completo"
              className="input-ficha-tecnica"
              required
              validate={required}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <Field
              component={InputText}
              label="Habilitação:"
              name={`habilitacao_responsavel_tecnico`}
              placeholder="Digite a habilitação"
              className="input-ficha-tecnica"
              required
              validate={required}
            />
          </div>
          <div className="col-6">
            <Field
              component={InputText}
              label="Nº do Registro em Órgão Competente:"
              name={`num_registro_responsavel_tecnico`}
              placeholder="Digite o número do registro"
              className="input-ficha-tecnica"
              required
              validate={required}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <Field
              component={InputText}
              label="Habilitação:"
              name={`habilitacao_responsavel_tecnico`}
              placeholder="Digite a habilitação"
              className="input-ficha-tecnica"
              required
              validate={required}
            />
          </div>
          <div className="col-6">
            <Field
              component={InputText}
              label="Nº do Registro em Órgão Competente:"
              name={`num_registro_responsavel_tecnico`}
              placeholder="Digite o número do registro"
              className="input-ficha-tecnica"
              required
              validate={required}
            />
          </div>
        </div>
        <div className="row mt-3">
          <Field
            component={InputFile}
            // arquivosPreCarregados={arquivosIniciais}
            className="inputfile"
            texto="Anexar Ficha Assinada pelo RT"
            name={"ficha_assinada_rt"}
            accept="PDF"
            setFiles={inserirArquivoFichaAssinadaRT}
            removeFile={removerArquivoFichaAssinadaRT}
            toastSuccess={"Arquivo incluído com sucesso!"}
            alignLeft
          />
        </div>
      </section>

      <section id="formModoPreparo">
        <div className="row">
          <div className="col">
            <Field
              component={TextArea}
              label="Descreva o modo de preparo do produto:"
              name={`modo_preparo`}
              className="textarea-ficha-tecnica"
              placeholder="Insira aqui as informações de modo de preparo"
            />
          </div>
        </div>
      </section>

      <section id="formOutrasInfos">
        <div className="row">
          <div className="col">
            <Field
              component={TextArea}
              label="Informações Adicionais:"
              name={`outras_infos`}
              className="textarea-ficha-tecnica"
              placeholder="Insira aqui as informações adicionais sobre o produto"
            />
          </div>
        </div>
      </section>
    </Collapse>
  );
};
