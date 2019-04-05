import React, { Component } from 'react';
import './App.css';
import Routes from './routes'
import MenuChange from './components/MenuChange'
import DayChange from './components/DayChange'

class App extends Component {
    render() {
        return (
            <div>
                <Routes />
            </div>
        );
    }
}

export default App;
