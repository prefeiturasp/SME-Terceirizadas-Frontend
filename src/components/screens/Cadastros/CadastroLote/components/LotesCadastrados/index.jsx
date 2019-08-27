import React, { Component } from "react";
import EmpresaDoLote from "../EmpresaDoLote";
import BaseButton, {
  ButtonStyle,
  ButtonType
} from "../../../../../Shareable/button";
import { NavLink } from "react-router-dom";
import { getLotes } from "../../../../../../services/diretoriaRegional.service";
import { Stand } from "react-burgers";
import { adicionarParametroAtivo } from "./helper";
import "../../../style.scss";

class LotesCadastrados extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lotes: null,
      lotesFiltrados: null,
      loading: true
    };
    this.filtrarLotes = this.filtrarLotes.bind(this);
  }

  componentDidMount() {
    getLotes().then(response => {
      this.setState({
        lotes: adicionarParametroAtivo(response.results),
        lotesFiltrados: adicionarParametroAtivo(response.results),
        loading: false
      });
    });
  }

  filtrarLotes(event) {
    let lotesFiltrados = this.state.lotes;
    lotesFiltrados = lotesFiltrados.filter(function(item) {
      const palavraAFiltrar = event.target.value.toLowerCase();
      return (
        item.nome.toLowerCase().search(palavraAFiltrar) !== -1 ||
        item.iniciais.toLowerCase().search(palavraAFiltrar) !== -1 ||
        item.diretoria_regional.nome.toLowerCase().search(palavraAFiltrar) !== -1 ||
        item.tipo_gestao.nome.toLowerCase().search(palavraAFiltrar) !== -1
      );
    });
    this.setState({ lotesFiltrados });
  }

  lidarComBurger(lote) {
    lote.ativo = !lote.ativo;
    this.forceUpdate();
  }

  render() {
    const { lotesFiltrados, loading } = this.state;
    return (
      <div>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <div className="card pt-3 mt-3">
            <div className="card-body card-table-cadastro">
              <table className="cadastro">
                <tr>
                  <th>Nome/Nº Lote</th>
                  <th>DRE</th>
                  <th>Tipo de Gestão</th>
                  <th className="text-center">
                    <input
                      className="input-search"
                      onChange={this.filtrarLotes}
                      placeholder="Pesquisar"
                    />
                    <i className="fas fa-search" />
                  </th>
                </tr>
                {lotesFiltrados.map(lote => {
                  return [
                    <tr
                      className={
                        lote.ativo && lote.terceirizada !== null
                          ? "relationed-companies title"
                          : ""
                      }
                    >
                      <td>{`${lote.nome} ${lote.iniciais}`}</td>
                      <td>{lote.diretoria_regional.nome}</td>
                      <td
                        colSpan={
                          lote.terceirizada === null &&
                          lote.escolas.length === 0 &&
                          2
                        }
                      >
                        {lote.tipo_gestao.nome}{" "}
                        {lote.ativo &&
                          (lote.terceirizada !== null ||
                            lote.escolas.length > 0) && (
                            <NavLink
                              to={`/configuracoes/cadastros/lote?uuid=${lote.uuid}`}
                            >
                              <i className="fas fa-pen" />
                            </NavLink>
                          )}{" "}
                      </td>
                      {(lote.terceirizada !== null ||
                        lote.escolas.length > 0) && (
                        <td>
                          <Stand
                            onClick={() => this.lidarComBurger(lote)}
                            color={"#C8C8C8"}
                            width={30}
                            padding={0}
                            lineSpacing={5}
                            active={lote.ativo}
                          />
                        </td>
                      )}
                    </tr>,
                    lote.terceirizada !== null && lote.ativo && (
                      <tr className="relationed-company-title">
                        <td colSpan="4">Empresa:</td>
                      </tr>
                    ),
                    lote.ativo && [
                      lote.terceirizada !== null && (
                        <tr className="relationed-companies">
                          <EmpresaDoLote
                            empresa={lote.terceirizada}
                            ativo={lote.ativo}
                          />
                        </tr>
                      ),
                      lote.escolas.length > 0 && (
                        <tr className="mt-4 relationed-company-title">
                          <td colSpan="4">Unidades especificas do Lote:</td>
                        </tr>
                      ),
                      lote.escolas.length > 0 &&
                        lote.escolas.map((escola, indice) => {
                          return (
                            <tr key={indice} className="relationed-companies">
                              <td className="pt-0 pb-0 blueish" colSpan="4">
                                {`${escola.codigo_eol} - ${escola.nome} - ${escola.lote}`}
                              </td>
                            </tr>
                          );
                        })
                    ]
                  ];
                })}
              </table>
              <div className="row float-right pt-5 pb-5 pr-5">
                <div className="col-4">
                  <NavLink to={"/configuracoes/cadastros/lote"}>
                    <BaseButton
                      label="Voltar"
                      type={ButtonType.BUTTON}
                      style={ButtonStyle.OutlinePrimary}
                      icon={"arrow-left"}
                    />
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default LotesCadastrados;
