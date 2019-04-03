import React, { Component } from 'react'
import { toCssClasses } from './responsiveBs4'


export class ButtonCancel extends Component {
  render() {
    return (
      <button type="reset"
        className="btn btn-outline-primary"
        onClick={this.props.onClick}>
        {this.props.text}
      </button>
    )
  }
}

export class ButtonConfirm extends Component {
  render() {
    return (
      <button type={this.props.type}
        className="btn btn-primary"
        onClick={this.props.onClick}>
        {this.props.text}
      </button>
    )
  }
}

export class ButtonActionOk extends Component {
  render() {
    const responsiveClasses = toCssClasses(this.props.cols || '')
    return (
      <button type={this.props.type}
        className={responsiveClasses + " btn btn-outline-dark " + this.props.className}
        onClick={this.props.onClick}>
        {this.props.text}
      </button>
    )
  }
}
