import React from "react";
import { withRouter } from "react-router-dom";
import { Row, Col } from "antd";
import CardLogo from "components/Shareable/CardLogo/CardLogo";
import IconeGestaoDeAlimentacao from "components/Shareable/Icones/IconeGestaoDeAlimentacao";
import IconeGestaoDeProduto from "components/Shareable/Icones/IconeGestaoDeProduto";
import IconeDietaEspecial from "components/Shareable/Icones/IconeDietaEspecial";
import IconeAbastecimento from "components/Shareable/Icones/IconeAbastecimento";
import IconeMedicaoInicial from "components/Shareable/Icones/IconeMedicaoInicial";
import {
  usuarioEhEmpresaTerceirizada,
  usuarioEhQualquerCODAE,
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhCODAENutriManifestacao,
  usuarioEhCODAEDietaEspecial,
  usuarioEhDRE,
  usuarioEhMedicao,
  usuarioEhNutricionistaSupervisao,
  usuarioEhEscolaAbastecimento,
  exibirGA,
  usuarioEhEscolaTerceirizadaDiretor,
  usuarioEhEscolaTerceirizada,
  usuarioEhEscolaAbastecimentoDiretor,
  exibirModuloMedicaoInicial,
  usuarioEhOrgaoFiscalizador,
  usuarioEscolaEhGestaoDireta,
  usuarioEscolaEhGestaoParceira,
} from "helpers/utilities";
import { ACOMPANHAMENTO_DE_LANCAMENTOS } from "configs/constants";
import { ENVIRONMENT } from "constants/config";

const PainelInicial = ({ history }) => {
  const exibeMenuValidandoAmbiente = exibirGA();

  const usuarioEscolaEhGestaoDiretaParceira =
    (usuarioEscolaEhGestaoDireta() || usuarioEscolaEhGestaoParceira()) &&
    !["production"].includes(ENVIRONMENT);

  return (
    <Row className="mt-3" gutter={[16, 16]}>
      {exibeMenuValidandoAmbiente &&
        (usuarioEhCODAEGestaoAlimentacao() ||
          usuarioEhCODAENutriManifestacao() ||
          usuarioEhEmpresaTerceirizada() ||
          usuarioEhDRE() ||
          usuarioEhMedicao() ||
          usuarioEhNutricionistaSupervisao() ||
          usuarioEhEscolaTerceirizadaDiretor() ||
          usuarioEhEscolaTerceirizada()) && (
          <Col xs={24} sm={24} md={24} lg={8} xl={8}>
            <CardLogo
              titulo={"Gestão de Alimentação"}
              onClick={() => history.push("/painel-gestao-alimentacao")}
            >
              <IconeGestaoDeAlimentacao />
            </CardLogo>
          </Col>
        )}
      {(usuarioEhCODAEGestaoAlimentacao() ||
        usuarioEhCODAENutriManifestacao() ||
        usuarioEhCODAEDietaEspecial() ||
        usuarioEhMedicao() ||
        usuarioEhNutricionistaSupervisao() ||
        usuarioEhEmpresaTerceirizada() ||
        usuarioEhDRE() ||
        usuarioEhEscolaTerceirizadaDiretor() ||
        usuarioEhEscolaTerceirizada() ||
        usuarioEscolaEhGestaoDiretaParceira) && (
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <CardLogo
            titulo={"Dieta Especial"}
            onClick={() => history.push("/painel-dieta-especial")}
          >
            <IconeDietaEspecial />
          </CardLogo>
        </Col>
      )}
      {(usuarioEhQualquerCODAE() ||
        usuarioEhCODAENutriManifestacao() ||
        usuarioEhEmpresaTerceirizada() ||
        usuarioEhNutricionistaSupervisao() ||
        usuarioEhDRE() ||
        usuarioEhEscolaTerceirizadaDiretor() ||
        usuarioEhEscolaTerceirizada() ||
        usuarioEhOrgaoFiscalizador()) && (
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <CardLogo
            titulo={"Gestão de Produto"}
            onClick={() => history.push("/painel-gestao-produto")}
          >
            <IconeGestaoDeProduto />
          </CardLogo>
        </Col>
      )}
      {exibirModuloMedicaoInicial() && (
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <CardLogo
            titulo={"Medição Inicial"}
            onClick={() => {
              (usuarioEhEscolaTerceirizada() ||
                usuarioEhEscolaTerceirizadaDiretor()) &&
                history.push("/lancamento-inicial/lancamento-medicao-inicial");
              (usuarioEhDRE() ||
                usuarioEhMedicao() ||
                usuarioEhCODAEGestaoAlimentacao() ||
                usuarioEhCODAENutriManifestacao()) &&
                history.push(
                  `/medicao-inicial/${ACOMPANHAMENTO_DE_LANCAMENTOS}`
                );
            }}
          >
            <IconeMedicaoInicial />
          </CardLogo>
        </Col>
      )}
      {usuarioEhDRE() && (
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <CardLogo
            titulo={"Abastecimento"}
            onClick={() => history.push("/logistica/entregas-dre")}
          >
            <IconeAbastecimento />
          </CardLogo>
        </Col>
      )}
      {(usuarioEhEscolaAbastecimento() ||
        usuarioEhEscolaAbastecimentoDiretor()) && (
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <CardLogo
            titulo={"Abastecimento"}
            onClick={() => history.push("/logistica/conferir-entrega")}
          >
            <IconeAbastecimento />
          </CardLogo>
        </Col>
      )}
    </Row>
  );
};

export default withRouter(PainelInicial);
