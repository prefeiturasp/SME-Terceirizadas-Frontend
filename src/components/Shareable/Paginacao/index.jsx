import React from "react";
import "./style.scss";
import { Pagination } from "antd";

export const Paginacao = (props) => {
  const { pageSize, showTitle, showSizeChanger, total, ...rest } = props;

  const getItemText = (page, type, originalElement) => {
    if (type === "page") {
      return page;
    }
    return originalElement;
  };

  const getPaginationSize = () => {
    if (total > 100) {
      return "large";
    }
    return "default";
  };

  return (
    <section className="pagination-container mt-3">
      <Pagination
        defaultPageSize={pageSize || 10}
        showTitle={showTitle || false}
        showSizeChanger={showSizeChanger || false}
        total={total}
        itemRender={getItemText}
        size={getPaginationSize()}
        {...rest}
      />
    </section>
  );
};
