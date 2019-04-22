import React, {Component} from "react";
import { Grid } from "./responsiveBs4";
import './custom.css'

export default class Weekly extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: null
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(value) {
    this.setState({
      ...this.state,
      clicked: value
    })
  }
  render() {
    const props = this.props;
    const week = [{
      label: 'S',
      value: 'Segunda'
    },
    {
      label: 'T',
      value: 'Terça'
    },
    {
      label: 'Q',
      value: 'Quarta'
    },
    {
      label: 'Q',
      value: 'Quinta'
    },
    {
      label: 'S',
      value: 'Sexta'
    },
    {
      label: 'S',
      value: 'Sábado'
    },
    {
      label: 'D',
      value: 'Domingo'
    }
    ]
    const { clicked } = this.state;
    return (
      <Grid cols={props.cols || ""} classNameArgs={props.classNameArgs || ""}>
        <label htmlFor={props.name} className={"col-form-label"}>
          {props.label}
        </label>
        <div>
        {week.map((day) => {
          return <span
            onClick={() => this.handleClick(day.value)}
            className={(clicked === day.value) ? "week-circle-clicked" : "week-circle"}
            value={day.value}>{day.label}</span>
          }
        )}
        </div>
      </Grid>
    );
  }
};
