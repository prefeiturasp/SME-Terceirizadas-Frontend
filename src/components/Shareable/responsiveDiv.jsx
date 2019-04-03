import React, { Component } from 'react'

export default class Div extends Component {
  // Usage: <Div cols='12 9 6 3'> || <Div cols='12 9 6'> || <Div cols='12 9'>
  // xs lg md sm
    toCssClasses(numbers) {
    const cols = numbers ? numbers.split(' ') : []
    let classes = ''

    if (cols[0]) classes += `col-xs-${cols[0]}`
    if (cols[1]) classes += ` col-lg-${cols[1]}`
    if (cols[2]) classes += ` col-md-${cols[2]}`
    if (cols[3]) classes += ` col-sm-${cols[3]}`

    return classes
  }

  render() {
    const gridClasses = this.toCssClasses(this.props.cols || '12 9 6 3')
    return (
      <div className={gridClasses}>
        {this.props.children}
      </div>
    )
  }
}
