import React from "react";

import "./style.scss";
import { Pagination } from "antd";

export const Paginacao = (props) => {
  const { pageSize, showTitle, showSizeChanger, ...rest } = props;

  return (
    <section className="pagination-container">
      <Pagination
        defaultPageSize={pageSize || 10}
        showTitle={showTitle || false}
        showSizeChanger={showSizeChanger || false}
        {...rest}
      />
    </section>
  );
};
