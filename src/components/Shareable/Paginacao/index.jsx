import React from "react";
import "antd/dist/antd.css";
import "./style.scss";
import { Pagination } from "antd";

export const Paginacao = props => {
  const { totalResponse, onChange } = props;
  return (
    <section className="footer-paginacao-componente pt-3">
      <Pagination
        defaultCurrent={1}
        defaultPageSize={100}
        onChange={onChange}
        total={totalResponse}
        size="medium"
      />
    </section>
  );
};
