import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import MenuChange from './components/MenuChange'
import DayChange from './components/DayChange'

class App extends Component {
    render() {
        return (
            <div>
                <Login />
            </div>
        );
    }
}

export default App;
