import React, {Component} from 'react'
import {Header} from '../components/Main/Header'
import {Sidebar} from '../components/Main/Sidebar'
import {MenuChange} from '../components/MenuChange'



export class MenuChangePage extends Component {
  state = {  }
  render() {
    return (
      <div id="wrapper">
        <Header />
        <Sidebar />
        <div className="pt-5">
          <MenuChange />
        </div>
      </div>
    );
  }
}
