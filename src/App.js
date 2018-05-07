import React, { Component } from 'react';
import Calculator from './Calculator'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Calculator</h1>
        </header>
        <main>
          <Calculator/>
        </main>
      </div>
    );
  }
}

export default App;
