import React, {Component} from "react";
import { Grid } from "./responsiveBs4";
import './custom.css'

export default class Weekly extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: []
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(value) {

    if (this.state.clicked.includes(value)){
        this.state.clicked.splice(this.state.clicked.indexOf(value), 1);
      } else {
        this.state.clicked.push(value);
      }
      this.setState({
        ...this.state
      });
      this.props.input.onChange(this.state.clicked)
    }


  render() {
    const props = this.props;
    const arrayToUse = this.props.input.value.length ? this.props.input.value : this.state.clicked;
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
    return (
      <Grid cols={props.cols || ""} classNameArgs={props.classNameArgs || ""}>
        <label htmlFor={props.name} className={"col-form-label"}>
          {props.label}
        </label>
        <div>
        {week.map((day) => {
          return <span
            onClick={() => this.handleClick(day.value)}
            className={
              arrayToUse.includes(day.value) ? "week-circle-clicked" : "week-circle"
            }
            value={day.value}>{day.label}</span>
          }
        )}
        </div>
      </Grid>
    );
  }
};
