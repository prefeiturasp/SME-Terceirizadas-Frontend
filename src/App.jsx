import React, { Component } from 'react';
import './App.css';
import Login from './components/Login/Login';
import MenuChange from './components/menuChange'

class App extends Component {
    render() {
        return (
            <div>
                <MenuChange />
            </div>
        );
    }
}

export default App;
