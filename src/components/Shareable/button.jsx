import React, { Component } from 'react'



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
      <button type="submit"
        className="btn btn-primary"
        onClick={this.props.onClick}>
        {this.props.text}
      </button>
    )
  }
}
