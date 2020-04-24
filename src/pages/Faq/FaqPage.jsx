import React, { useState, useEffect } from "react";
import { string, shape } from "prop-types";
import PageNoSidebar from "../../components/Shareable/Page/PageNoSidebar";
import Tabs from "../../components/Shareable/Tabs";
import { Card } from "../../components/Faq";
import { getFaq } from "../../services/faq.service";
import "./style.scss";

const TabContent = ({ items }) => {
  return (
    <div className="tab-content">
      {items.length ? (
        items.map((item, index) => (
          <Card key={index} question={item.pergunta} answer={item.resposta} />
        ))
      ) : (
        <div className="no-search-results">
          Nenhum resultado da busca nessa categoria.
        </div>
      )}
    </div>
  );
};
TabContent.propTypes = {
  items: shape({
    pergunta: string,
    resposta: string
  })
};

const FaqPage = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [pattern, setPattern] = useState("");

  useEffect(() => {
    async function fetchData() {
      const result = await getFaq();
      setLoading(false);
      if (result.data) {
        setCategories(result.data);
        setFilteredCategories(result.data);
      }
    }
    fetchData();
  }, [setCategories]);

  useEffect(() => {
    if (!pattern.length) setFilteredCategories(categories);
    const filtered = categories.map(category => {
      return {
        nome: category.name,
        perguntas: category.perguntas.filter(item =>
          item.pergunta.includes(pattern)
        )
      };
    });
    setFilteredCategories(filtered);
  }, [pattern]);

  return (
    <PageNoSidebar titulo={"Ajuda"} botaoVoltar voltarPara={"/"}>
      <div className="container faq-screen mt-4">
        <div className="page-title-container">
          <div className="page-title">
            <h4>Como podemos ajudar?</h4>
          </div>
        </div>
        <div className="row justify-content-center mb-2">
          <div className="col-5 search-input-container p-0 mb-1">
            <input
              id="search-input"
              type="text"
              placeholder="Pesquisar"
              value={pattern}
              onChange={e => setPattern(e.target.value)}
            />
            <i className="fas fa-search fa-lg" />
          </div>
        </div>
        <div className="row justify-content-center no-search-results mb-4">
          <span onClick={() => setPattern("")}>
            {pattern.length ? "Limpar busca" : ""}
          </span>
        </div>

        {loading && (
          <div className="row justify-content-center">
            <img src="/assets/image/ajax-loader.gif" alt="ajax-loader" />
          </div>
        )}

        {!!filteredCategories.length && (
          <Tabs tabs={categories.map(el => el.nome)}>
            {({ activeIndex }) => (
              <TabContent items={filteredCategories[activeIndex].perguntas} />
            )}
          </Tabs>
        )}
      </div>
    </PageNoSidebar>
  );
};

export default FaqPage;
