import React from "react";

import { useNavigationType } from "react-router-dom";

const withNavigationType = (Component) => {
  return (props) => {
    const navigationType = useNavigationType();

    return <Component {...props} navigationType={navigationType} />;
  };
};

export default withNavigationType;
