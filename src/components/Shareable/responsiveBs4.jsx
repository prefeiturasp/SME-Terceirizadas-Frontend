import React, { Component } from 'react'

export function toCssClasses(numbers) {
  const cols = numbers ? numbers.split(' ') : []
  let classes = ''

  if (cols[0]) classes += `col-xs-${cols[0]}`
  if (cols[1]) classes += ` col-lg-${cols[1]}`
  if (cols[2]) classes += ` col-md-${cols[2]}`
  if (cols[3]) classes += ` col-sm-${cols[3]}`

  return classes
}

export class Grid extends Component {
  render() {
    const gridClasses = toCssClasses(this.props.cols || '12 9 6 3')
    const extraARgs = this.props.classNameArgs || ''
    const params = gridClasses + ' ' + extraARgs
    return (
      <div className={params}>
        {this.props.children}
      </div>
    )
  }
}

export class Label extends Component {
  render() {
    const labelClasses = toCssClasses(this.props.cols || '12 9 6 3')
    return (
      <label htmlFor={this.props.for}
        className={labelClasses + "col-form-label"}>
        {this.props.text}</label>
    )
  }
}

export class Input extends Component {
  render() {
    const inputClasses = toCssClasses(this.props.cols || '12 9 6 3')
    return (
      <input className={inputClasses + "form-control"}
        type={this.props.type}
        name={this.props.name}>{this.props.text}</input>
    )
  }
}
