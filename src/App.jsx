import React, { Component } from 'react';
import './App.css';
import Login from './components/Login/Login';
import MenuChange from './components/MenuChange/MenuChange'
import DayChange from './components/DayChange/DayChange'

class App extends Component {
    render() {
        return (
            <div>
                <DayChange />
            </div>
        );
    }
}

export default App;
