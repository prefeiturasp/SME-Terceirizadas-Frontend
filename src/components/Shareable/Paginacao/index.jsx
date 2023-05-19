import React from "react";

import "./style.scss";
import { Pagination } from "antd";

export const Paginacao = props => {
  const { pageSize, ...rest } = props;
  return (
    <section className="pt-3 footer-pagination-default">
      <Pagination
        defaultPageSize={pageSize || 100}
        showSizeChanger={false}
        {...rest}
      />
    </section>
  );
};
