import React from "react";
import { Steps } from "antd";
import "./styles.scss";

export interface Props {
  items: {
    title: string;
  }[];
  current: number;
}

const StepsSigpae: React.FC<Props> = ({ items, current }) => {
  return (
    <div className="steps">
      <Steps size="small" current={current} items={items} />
    </div>
  );
};

export default StepsSigpae;
