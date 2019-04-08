import React, { Component } from 'react'
import Header from './Header';
import { Sidebar } from './Sidebar';


class Main extends Component {
  state = {  }
  render() {
    return (
      <div>
        <Header />
        <Sidebar />

      </div>
    )
  }
}

export default Main;