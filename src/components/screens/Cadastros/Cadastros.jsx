import React, { Component } from "react";
import { Link } from "react-router-dom";
import CardLogo from "../../Shareable/CardLogo/CardLogo";
import IconePerfil from "../../Shareable/Icones/Cadastros/IconePerfil";
import IconeUnidadeEscolar from "../../Shareable/Icones/Cadastros/IconeUnidadeEscolar";
import IconeLote from "../../Shareable/Icones/Cadastros/IconeLote";
import IconeEmpresa from "../../Shareable/Icones/Cadastros/IconeEmpresa";
import IconeEdital from "../../Shareable/Icones/Cadastros/IconeCadastroEdital";
import IconeTipoAlimentacao from "../../Shareable/Icones/Cadastros/IconeTipoAlimentacao";
import IconeHorarioCombo from "../../Shareable/Icones/Cadastros/IconeCadastroHorarioComboAlimentacao";
import "./style.scss";
import {
  checarSeUsuarioEhEscola,
  checarSeUsuarioEhCODAEGestaoAlimentacao,
  checarSeUsuarioEhCODAEDietaEspecial,
  checarSeUsuarioEhDiretoriaRegional,
  checarSeUsuarioEhTerceirizada
} from "../../../helpers/utilities";

class Cadastros extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gestaoDeAlimentacao: false,
      hoverLotes: false,
      hoverEmpresas: false,
      hoverEdital: false,
      hoverHorarios: false
    };
    this.cardEdital = React.createRef();
  }

  render() {
    const {
      hoverEdital,
      hoverEmpresas,
      hoverTipoAlimentacao,
      hoverLotes,
      hoverHorarios,
      gestaoDeAlimentacao
    } = this.state;
    const USUARIO_CODAE =
      checarSeUsuarioEhCODAEGestaoAlimentacao() ||
      checarSeUsuarioEhCODAEDietaEspecial();
    const USUARIO_SEM_PERMISSAO =
      checarSeUsuarioEhDiretoriaRegional() || checarSeUsuarioEhTerceirizada();
    return (
      <div>
        {USUARIO_SEM_PERMISSAO && (
          <div>Você não ter permissão para acessar nenhum cadastro.</div>
        )}
        {USUARIO_CODAE && (
          <div className="row mt-3">
            <div
              className="col-4"
              onClick={() =>
                this.setState({ gestaoDeAlimentacao: !gestaoDeAlimentacao })
              }
            >
              <CardLogo titulo={"Cadastro de Perfis"} disabled>
                <IconePerfil />
              </CardLogo>
            </div>
            <div className="col-4">
              <CardLogo titulo={"Cadastro de Unidades Escolares"} disabled>
                <IconeUnidadeEscolar />
              </CardLogo>
            </div>
            <div
              onMouseEnter={() => this.setState({ hoverLotes: true })}
              onMouseLeave={() => this.setState({ hoverLotes: false })}
              className="linked-card col-4"
            >
              <Link to="/configuracoes/cadastros/lote">
                <CardLogo titulo={"Cadastro de Lotes"}>
                  <IconeLote hover={hoverLotes} />
                </CardLogo>
              </Link>
            </div>
          </div>
        )}
        {USUARIO_CODAE && (
          <div className="row mt-3">
            <div
              onMouseEnter={() => this.setState({ hoverEmpresas: true })}
              onMouseLeave={() => this.setState({ hoverEmpresas: false })}
              className="linked-card col-4"
            >
              <Link to="/configuracoes/cadastros/empresa">
                <CardLogo titulo={"Cadastro de Empresas"}>
                  <IconeEmpresa hover={hoverEmpresas} />
                </CardLogo>
              </Link>
            </div>
            <div
              onMouseEnter={() => this.setState({ hoverEdital: true })}
              onMouseLeave={() => this.setState({ hoverEdital: false })}
              className="linked-card col-4"
            >
              <Link to="/configuracoes/cadastros/editais-contratos">
                <CardLogo titulo={"Cadastro de Editais e Contratos"}>
                  <IconeEdital hover={hoverEdital} />
                </CardLogo>
              </Link>
            </div>

            <div
              onMouseEnter={() => this.setState({ hoverTipoAlimentacao: true })}
              onMouseLeave={() =>
                this.setState({ hoverTipoAlimentacao: false })
              }
              className="linked-card col-4"
            >
              <Link to="/configuracoes/cadastros/tipos-alimentacao">
                <CardLogo titulo={"Cadastro de Tipos de Alimentações"}>
                  <IconeTipoAlimentacao hover={hoverTipoAlimentacao} />
                </CardLogo>
              </Link>
            </div>
          </div>
        )}

        {checarSeUsuarioEhEscola() && (
          <div className="row mt-3">
            <div
              onMouseEnter={() => this.setState({ hoverHorarios: true })}
              onMouseLeave={() => this.setState({ hoverHorarios: false })}
              className="linked-card col-4"
            >
              <Link to="/configuracoes/cadastros/horario-combos-alimentacao">
                <CardLogo titulo={"Horários de alimentações"}>
                  <IconeHorarioCombo hover={hoverHorarios} />
                </CardLogo>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Cadastros;
