import React from "react";
import { withRouter } from "react-router-dom";
import { Row, Col } from "antd";
import CardLogo from "../../Shareable/CardLogo/CardLogo";
import IconeGestaoDeAlimentacao from "../../Shareable/Icones/IconeGestaoDeAlimentacao";
import IconeGestaoDeProduto from "../../Shareable/Icones/IconeGestaoDeProduto";
import IconeDietaEspecial from "../../Shareable/Icones/IconeDietaEspecial";
import {
  usuarioEhEscola,
  usuarioEhTerceirizada,
  usuarioEhQualquerCODAE,
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhCODAEDietaEspecial,
  usuarioEhDRE,
  usuarioEhNutricionistaSupervisao
} from "helpers/utilities";
import { ENVIRONMENT } from "constants/config";

const PainelInicial = ({ history }) => {
  const ehTreinamento = ENVIRONMENT === "treinamento" ? true : false;

  return (
    <Row className="mt-3" gutter={[16, 16]}>
      {!ehTreinamento &&
        (usuarioEhCODAEGestaoAlimentacao() ||
          usuarioEhTerceirizada() ||
          usuarioEhDRE() ||
          usuarioEhEscola()) && (
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
        usuarioEhCODAEDietaEspecial() ||
        usuarioEhNutricionistaSupervisao() ||
        usuarioEhTerceirizada() ||
        usuarioEhDRE() ||
        usuarioEhEscola()) && (
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
        usuarioEhTerceirizada() ||
        usuarioEhNutricionistaSupervisao() ||
        usuarioEhEscola()) && (
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <CardLogo
            titulo={"Gestão de Produto"}
            onClick={() => history.push("/painel-gestao-produto")}
          >
            <IconeGestaoDeProduto />
          </CardLogo>
        </Col>
      )}
    </Row>
  );
};

export default withRouter(PainelInicial);
